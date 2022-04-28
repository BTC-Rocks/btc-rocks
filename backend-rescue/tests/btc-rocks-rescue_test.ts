import { toBoom, upgrade } from "./client/btc-rocks-mint.ts";
import { transfer, setApproved } from "./client/btc-rocks.ts";
import { Clarinet, Chain, Account, assertEquals, Tx, types } from "./client/deps.ts";
import { mintBoomRocks, transferBoom } from "./client/boom-nfts.ts";
import { rescue, transferRock, unrescue } from "./client/btc-rocks-rescue.ts";

// rock 1 owned by wallet1
// rock 2 owned by artist
function setupRocks(
  chain: Chain,
  artist: string,
  deployer: Account,
  wallet1: Account
) {
  let block = chain.mineBlock(mintBoomRocks(artist));
  assertEquals(block.receipts.length, 600);
  block = chain.mineBlock([
    Tx.transferSTX(120_000_000, artist, wallet1.address),
    transferBoom(5193, artist, wallet1.address, artist),
    upgrade(1, wallet1.address),
    upgrade(2, artist),
    transfer(2, artist, deployer.address, artist), // will fail
  ]);
  block.receipts[0].result.expectOk();
  block.receipts[1].result.expectOk();
  block.receipts[2].result.expectOk();
  block.receipts[3].result.expectOk();
  block.receipts[4].result.expectErr().expectUint(1); // not enough funds to transfer btc rock
}
Clarinet.test({
  name: "on resuce, user gets an nft and artist transfers a btc rock",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!;
    let wallet1 = accounts.get("wallet_1")!;
    const artist = "SP1B6FGZWBJK2WJHJP76C2E4AW3HA4BVAR5DGK074";

    setupRocks(chain, artist, deployer, wallet1);

    let block = chain.mineBlock([rescue(2, 100_000_000, deployer.address)]);
    block.receipts[0].result.expectOk();
    console.log(block.receipts[0].events);

    block = chain.mineBlock([
      setApproved(2, `${deployer.address}.btc-rocks-rescue`, true, artist),
      transferRock(2, artist),
    ]);
    block.receipts[0].result.expectOk();
    block.receipts[1].result.expectOk();
    // transfer fee paid by artist to owner of rock 1
    block.receipts[1].events.expectSTXTransferEvent(
      100_000_000,
      artist,
      wallet1.address
    );
    // rescue nft with same id is minted
    block.receipts[1].events.expectNonFungibleTokenMintEvent(
      types.uint(2),
      deployer.address,
      "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.btc-rocks-rescue",
      "rescue-nft"
    );
  },
});

Clarinet.test({
  name: "user can unrescue after 100 blocks",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!;
    let wallet1 = accounts.get("wallet_1")!;
    const artist = "SP1B6FGZWBJK2WJHJP76C2E4AW3HA4BVAR5DGK074";

    setupRocks(chain, artist, deployer, wallet1);
    let block = chain.mineBlock([rescue(2, 100_000_000, deployer.address)]);
    block.receipts[0].result.expectOk();
    console.log(block.receipts[0].events);

    block = chain.mineBlock([unrescue(2, deployer.address)]);
    block.receipts[0].result.expectErr().expectUint(501);

    chain.mineEmptyBlock(99);

    block = chain.mineBlock([unrescue(2, deployer.address)]);
    block.receipts[0].result.expectOk();
    console.log(block.receipts[0].events);
  },
});

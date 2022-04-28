import { toBoom, upgrade } from "./client/btc-rocks-rescue.ts";
import { Clarinet, Chain, Account, assertEquals } from "./client/deps.ts";
import { mintBoomRocks } from "./client/boom-nfts.ts";
import { rescue, transferRock } from "./client/btc-rocks-rescue";

Clarinet.test({
  name: "use can mint a rescue nft and artist can transfer a btc rock",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!;
    let wallet1 = accounts.get("wallet_1")!;
    let block = chain.mineBlock(mintBoomRocks(wallet1));
    assertEquals(block.receipts.length, 600);
    block = chain.mineBlock([upgrade(1, wallet1)]);
    block.receipts[0].result.expectOk();

    block = chain.mineBlock([rescue(1, 1000, deployer)]);
    block.receipts[0].result.expectOk();

    block = chain.mineBlock([transferRock(1, deployer)]);
    block.receipts[0].result.expectOk();
  },
});

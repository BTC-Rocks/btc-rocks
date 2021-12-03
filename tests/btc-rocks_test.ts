import { mineBoomRocks } from "../src/client/boom-nfts.ts";
import { upgrade } from "../src/client/btc-rocks-mint.ts";
import { transfer, upgrade as upgradeNft } from "../src/client/btc-rocks.ts";
import {
  Clarinet,
  Tx,
  Chain,
  Account,
  assertEquals,
} from "../src/client/deps.ts";

Clarinet.test({
  name: "User can't call upgrade directly",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!;
    let block = chain.mineBlock([upgradeNft(1, deployer)]);
    block.receipts[0].result.expectErr().expectUint(403);
  },
});

Clarinet.test({
  name: "User can transfer upgraded rocks",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!;
    let wallet1 = accounts.get("wallet_1")!;
    let block = chain.mineBlock(mineBoomRocks(wallet1));
    assertEquals(block.receipts.length, 600);
    block = chain.mineBlock([
      upgrade(1, wallet1),
      transfer(1, wallet1, deployer, wallet1),
    ]);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // no floor price paid because there is only 1 btc rock
    // that is owned by sender (wallet1)
    assertEquals(block.receipts[1].events.length, 1);
    block.receipts[1].events[0].nft_transfer_event.value.expectUint(1);
  },
});

Clarinet.test({
  name: "User pays floor price for transfering upgraded rocks",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let wallet1 = accounts.get("wallet_1")!;
    let wallet2 = accounts.get("wallet_2")!;
    let wallet3 = accounts.get("wallet_3")!;
    let block = chain.mineBlock(mineBoomRocks(wallet1));
    assertEquals(block.receipts.length, 600);

    // upgrade and transfer btc rock #1 to wallet 2
    // upgrade and hold btc rock #2
    block = chain.mineBlock([
      upgrade(1, wallet1),
      transfer(1, wallet1, wallet2, wallet1),
      upgrade(2, wallet1),
    ]);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    block = chain.mineBlock([transfer(1, wallet2, wallet3, wallet2)]);

    block.receipts[0].result.expectOk().expectBool(true);
    // pay floor price for 1 other btc rock to wallet1
    assertEquals(2, block.receipts[0].events.length);
    console.log(block.receipts[0].events.map((e) => console.log(e)));
    block.receipts[0].events[0].stx_transfer_event.amount.expectInt(
      100_000_000
    ); // 100 STX
    block.receipts[0].events[0].stx_transfer_event.sender.expectPrincipal(
      wallet2.address
    ); // sender
    block.receipts[0].events[0].stx_transfer_event.recipient.expectPrincipal(
      wallet1.address
    ); // holder of rock #2
    block.receipts[0].events[1].nft_transfer_event.value.expectUint(1);
  },
});

Clarinet.test({
  name: "User can't transfer old rocks with this contract",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!;
    let wallet1 = accounts.get("wallet_1")!;
    let block = chain.mineBlock(mineBoomRocks(wallet1));
    assertEquals(block.receipts.length, 600);
    block = chain.mineBlock([transfer(1, deployer, wallet1, deployer)]);
    block.receipts[0].result.expectErr().expectUint(404);
  },
});

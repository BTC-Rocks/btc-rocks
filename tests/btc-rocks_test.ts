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
    block.receipts[0].events.map((e: any) => console.log(e));
  },
});

Clarinet.test({
  name: "User can't transfer old rocks",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!;
    let wallet1 = accounts.get("wallet_1")!;
    let block = chain.mineBlock(mineBoomRocks(wallet1));
    assertEquals(block.receipts.length, 600);
    block = chain.mineBlock([transfer(1, deployer, wallet1, deployer)]);
    block.receipts[0].result.expectErr().expectUint(404);
  },
});

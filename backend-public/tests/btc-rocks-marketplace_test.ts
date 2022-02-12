import {
  assertEquals,
  Clarinet,
  Chain,
  Account,
} from "./client/deps.ts";
import { transfer } from "./client/btc-rocks.ts";
import { list, unlist, buy} from "./client/btc-rocks-marketplace.ts";
import { mintBoomRocks } from "./client/boom-nfts.ts";
import { upgrade } from "./client/btc-rocks-mint.ts";

Clarinet.test({
  name: "Ensure that NFT can be listed and unlisted",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!;
    let wallet1 = accounts.get("wallet_1")!;
    let wallet2 = accounts.get("wallet_2")!;

    let block = chain.mineBlock(mintBoomRocks(wallet1));
    assertEquals(block.receipts.length, 600);
    // upgrade rock #1
    block = chain.mineBlock([upgrade(1, wallet1)]);

    block = chain.mineBlock([
      list(1, 51_000_000, deployer.address + ".commission-nop", wallet1),
      unlist(1, wallet1),
    ]);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
  },
});

Clarinet.test({
  name: "Ensure that NFT can be listed and bought",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!;
    let wallet1 = accounts.get("wallet_1")!;
    let wallet2 = accounts.get("wallet_2")!;

    let block = chain.mineBlock(mintBoomRocks(wallet1));
    assertEquals(block.receipts.length, 600);
    // upgrade rock #1
    block = chain.mineBlock([upgrade(1, wallet1)]);

    block = chain.mineBlock([
      list(1, 101_000_000, deployer.address + ".commission-nop", wallet1),
      buy(1, deployer.address + ".commission-nop", wallet2),
    ]);
    assertEquals(block.receipts.length, 2);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    let feeStxEvent = block.receipts[1].events[0];
    let stxEvent = block.receipts[1].events[1];
    let nftEvent = block.receipts[1].events[2];
    let logEvent = block.receipts[1].events[3];
    assertEquals(feeStxEvent.stx_transfer_event.amount, "1000000");
    assertEquals(stxEvent.stx_transfer_event.amount, "100000000");
    assertEquals(nftEvent.nft_transfer_event.recipient, wallet2.address);
    assertEquals(logEvent.contract_event.value, '{action: "buy-in-ustx", id: u1}');
  },
});

Clarinet.test({
  name: "Ensure that NFT can't be bought with different commission trait",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!;
    let wallet1 = accounts.get("wallet_1")!;
    let wallet2 = accounts.get("wallet_2")!;

    let block = chain.mineBlock(mintBoomRocks(wallet1));
    assertEquals(block.receipts.length, 600);
    // upgrade rock #1
    block = chain.mineBlock([upgrade(1, wallet1)]);

    block = chain.mineBlock([
      list(1, 101_000_000, deployer.address + ".commission-fixed", wallet1),
      buy(1, deployer.address + ".commission-nop", wallet2),
    ]);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectErr().expectUint(500);
  },
});

Clarinet.test({
  name: "Ensure that NFT can't be bought when unlisted",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!;
    let wallet1 = accounts.get("wallet_1")!;
    let wallet2 = accounts.get("wallet_2")!;

    let block = chain.mineBlock(mintBoomRocks(wallet1));
    assertEquals(block.receipts.length, 600);
    // upgrade rock #1
    block = chain.mineBlock([upgrade(1, wallet1)]);

    block = chain.mineBlock([
      list(1, 101_000_000, deployer.address + ".commission-nop", wallet1),
      unlist(1, wallet1),
      buy(1, deployer.address + ".commission-nop", wallet2),
    ]);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectErr().expectUint(501);
  },
});

Clarinet.test({
  name: "Ensure that NFT can be transferred even when listed",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!;
    let wallet1 = accounts.get("wallet_1")!;
    let wallet2 = accounts.get("wallet_2")!;

    let block = chain.mineBlock(mintBoomRocks(wallet1));
    assertEquals(block.receipts.length, 600);
    // upgrade rock #1
    block = chain.mineBlock([upgrade(1, wallet1)]);

    block = chain.mineBlock([
      list(1, 51_000_000, deployer.address + ".commission-nop", wallet1),
      transfer(1, wallet1, wallet2, wallet1),
    ]);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
  },
});

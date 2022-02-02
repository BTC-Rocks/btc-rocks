import { toBoom, upgrade } from "./client/btc-rocks-mint.ts";
import { Clarinet, Chain, Account, assertEquals } from "./client/deps.ts";
import { mineBoomRocks } from "./client/boom-nfts.ts";

Clarinet.test({
  name: "rock id is mapped to boom id",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!;

    let result = toBoom(1, chain, deployer);
    result.result.expectSome().expectUint(5193);
    result = toBoom(50, chain, deployer);
    result.result.expectSome().expectUint(5592);
    result = toBoom(51, chain, deployer);
    result.result.expectNone();
  },
});

Clarinet.test({
  name: "user can upgrade own boom rock",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!;
    let block = chain.mineBlock(mineBoomRocks(deployer));
    assertEquals(block.receipts.length, 600);
    block = chain.mineBlock([upgrade(1, deployer)]);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[0].events[0].stx_transfer_event.amount.expectInt(60000000);
    block.receipts[0].events[1].nft_burn_event.value.expectUint(5193);
    block.receipts[0].events[2].nft_mint_event.value.expectUint(1);
  },
});

Clarinet.test({
  name: "user can't upgrade own boom rock twice",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    let block = chain.mineBlock(mineBoomRocks(deployer));
    assertEquals(block.receipts.length, 600);
    block = chain.mineBlock([upgrade(1, deployer)]);
    block.receipts[0].result.expectOk();

    block = chain.mineBlock([upgrade(1, deployer)]);
    block.receipts[0].result.expectErr().expectUint(900);
  },
});

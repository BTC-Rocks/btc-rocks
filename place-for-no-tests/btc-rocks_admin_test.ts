import { mintBoomRocks } from "./client/boom-nfts.ts";
import { upgrade } from "./client/btc-rocks-mint.ts";
import {
  transfer,
  setApproved,
  isApproved,
  upgrade as upgradeNft,
} from "./client/btc-rocks.ts";
import {
  Clarinet,
  Tx,
  Chain,
  Account,
  assertEquals,
  types,
} from "./client/deps.ts";

Clarinet.test({
  name: "Fees per rock can be changed by admin only",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!;
    let wallet1 = accounts.get("wallet_1")!;
    let feeResult = chain.callReadOnlyFn(
      "btc-rocks",
      "get-fee-per-rock",
      [],
      deployer.address
    );
    feeResult.result.expectUint(100_000_000);

    let block = chain.mineBlock([
      Tx.contractCall(
        "btc-rocks",
        "set-fee-per-rock",
        [types.uint(1)],
        deployer.address
      ),
    ]);
    block.receipts[0].result.expectOk().expectBool(true);

    block = chain.mineBlock([
      Tx.contractCall(
        "btc-rocks",
        "set-fee-per-rock",
        [types.uint(100)],
        wallet1.address
      ),
    ]);
    block.receipts[0].result.expectErr().expectUint(403);

    feeResult = chain.callReadOnlyFn(
      "btc-rocks",
      "get-fee-per-rock",
      [],
      deployer.address
    );
    feeResult.result.expectUint(1);
  },
});

Clarinet.test({
  name: "Admin can be changed by admin only",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!;
    let wallet1 = accounts.get("wallet_1")!;
    let block = chain.mineBlock([
      Tx.contractCall(
        "btc-rocks",
        "set-admin",
        [types.principal(wallet1.address)],
        wallet1.address
      ),
    ]);
    block.receipts[0].result.expectErr().expectUint(403);

    block = chain.mineBlock([
      Tx.contractCall(
        "btc-rocks",
        "set-admin",
        [types.principal(wallet1.address)],
        deployer.address
      ),
    ]);
    block.receipts[0].result.expectOk().expectBool(true);
  },
});

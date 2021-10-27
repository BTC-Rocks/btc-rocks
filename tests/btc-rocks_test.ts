import { isBoomId } from "./client/btc-rocks";
import {
  Clarinet,
  Tx,
  Chain,
  Account,
  types,
  assertEquals,
} from "./client/deps";

Clarinet.test({
  name: "Ensure that isBoomId returns true",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!;

    let result = isBoomId(1000, chain, deployer);
    assertEquals(result, false);
    result = isBoomId(5193, chain, deployer);
    assertEquals(result, true);
  },
});

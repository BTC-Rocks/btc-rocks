import {
  Tx,
  Chain,
  Account,
  types,
} from "./deps.ts";

export function toBoom(id: number, chain: Chain, user: Account) {
  return chain.callReadOnlyFn(
    "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.btc-rocks-mint",
    "to-boom",
    [types.uint(id)],
    user.address
  );
}

export function upgrade(id: number, address: string) {
  return Tx.contractCall(
    "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.btc-rocks-mint",
    "upgrade",
    [types.uint(id)],
    address
  );
}

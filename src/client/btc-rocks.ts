import { Tx, Account, types } from "./deps.ts";


export function transfer(
  id: number,
  from: Account,
  to: Account,
  user: Account
) {
  return Tx.contractCall(
    "btc-rocks",
    "transfer",
    [types.uint(id), types.principal(from.address), types.principal(to.address)],
    user.address
  );
}

export function upgrade(
  id: number,
  user: Account
) {
  return Tx.contractCall(
    "btc-rocks",
    "upgrade",
    [types.uint(id)],
    user.address
  );
}

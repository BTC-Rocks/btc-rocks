import { Tx, Account, types } from "./deps.ts";

export function transfer(
  id: number,
  from: Account,
  to: Account,
  user: Account
) {
  return Tx.contractCall(
    "btc-rocks-rescue",
    "transfer",
    [
      types.uint(id),
      types.principal(from.address),
      types.principal(to.address),
    ],
    user.address
  );
}

export function rescue(id: number, amount: number, user: Account) {
  return Tx.contractCall(
    "btc-rocks-rescue",
    "rescue",
    [types.uint(id), types.uint(amount)],
    user.address
  );
}

export function unrescue(id: number, user: Account) {
  return Tx.contractCall(
    "btc-rocks-rescue",
    "unrescue",
    [types.uint(id)],
    user.address
  );
}

export function transferRock(
  id: number,
  user: Account
) {
  return Tx.contractCall(
    "btc-rocks-rescue",
    "transfer-rock",
    [types.uint(id)],
    user.address
  );
}

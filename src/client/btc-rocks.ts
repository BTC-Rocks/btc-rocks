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


export function list(
  id: number,
  price: number,
  commission: string,
  user: Account
) {
  return Tx.contractCall(
    "btc-rocks",
    "list-in-ustx",
    [types.uint(id), types.uint(price), types.principal(commission)],
    user.address
  );
}

export function unlist(id: number, user: Account) {
  return Tx.contractCall(
    "btc-rocks",
    "unlist-in-ustx",
    [types.uint(id)],
    user.address
  );
}

export function buy(id: number, commission: string, user: Account) {
  return Tx.contractCall(
    "btc-rocks",
    "buy-in-ustx",
    [types.uint(id), types.principal(commission)],
    user.address
  );
}

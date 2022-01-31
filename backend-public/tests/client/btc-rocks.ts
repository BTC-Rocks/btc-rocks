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
    [
      types.uint(id),
      types.principal(from.address),
      types.principal(to.address),
    ],
    user.address
  );
}

export function upgrade(id: number, user: Account) {
  return Tx.contractCall(
    "btc-rocks",
    "upgrade",
    [types.uint(id)],
    user.address
  );
}

export function setApproved(
  id: number,
  operator: Account,
  approved: boolean,
  user: Account
) {
  return Tx.contractCall(
    "btc-rocks",
    "set-approved",
    [types.uint(id), types.principal(operator.address), types.bool(approved)],
    user.address
  );
}

export function isApproved(id: number, operatorAddress: string, user: Account) {
  return Tx.contractCall(
    "btc-rocks",
    "is-approved",
    [types.uint(id), types.principal(operatorAddress)],
    user.address
  );
}

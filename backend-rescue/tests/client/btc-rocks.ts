import { Tx, Account, types } from "./deps.ts";

export function transfer(
  id: number,
  from: string,
  to: string,
  senderAddress: string
) {
  return Tx.contractCall(
    "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.btc-rocks",
    "transfer",
    [types.uint(id), types.principal(from), types.principal(to)],
    senderAddress
  );
}

export function upgrade(id: number, user: Account) {
  return Tx.contractCall(
    "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.btc-rocks",
    "upgrade",
    [types.uint(id)],
    user.address
  );
}

export function setApproved(
  id: number,
  operator: string,
  approved: boolean,
  senderAddress: string
) {
  return Tx.contractCall(
    "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.btc-rocks",
    "set-approved",
    [types.uint(id), types.principal(operator), types.bool(approved)],
    senderAddress
  );
}

export function isApproved(id: number, operatorAddress: string, user: Account) {
  return Tx.contractCall(
    "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.btc-rocks",
    "is-approved",
    [types.uint(id), types.principal(operatorAddress)],
    user.address
  );
}

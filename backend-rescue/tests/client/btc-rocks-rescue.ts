import { Tx, Account, types } from "./deps.ts";

export function transfer(
  id: number,
  from: string,
  to: string,
  senderAddress: string
) {
  return Tx.contractCall(
    "btc-rocks-rescue",
    "transfer",
    [types.uint(id), types.principal(from), types.principal(to)],
    senderAddress
  );
}

export function rescue(id: number, amount: number, senderAddress: string) {
  return Tx.contractCall(
    "btc-rocks-rescue",
    "rescue",
    [types.uint(id), types.uint(amount)],
    senderAddress
  );
}

export function unrescue(id: number, senderAddress: string) {
  return Tx.contractCall(
    "btc-rocks-rescue",
    "unrescue",
    [types.uint(id)],
    senderAddress
  );
}

export function transferRock(id: number, senderAddress: string) {
  return Tx.contractCall(
    "btc-rocks-rescue",
    "transfer-rock",
    [types.uint(id)],
    senderAddress
  );
}

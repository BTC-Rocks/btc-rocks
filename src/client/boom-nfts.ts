import { Tx, Chain, Account, types } from "./deps.ts";

function mintNFT(account: Account) {
  return Tx.contractCall(
    "boom-nfts",
    "mint",
    [
      types.list(
        Array.from(Array(10).keys()).map((i) =>
          types.tuple({
            name: types.utf8("name"),
            number: types.uint(i),
            uri: types.ascii("uri"),
            "mime-type": types.ascii("mime-type"),
            hash: "0x00",
          })
        )
      ),
    ],
    account.address
  );
}

function burnNFT(account: Account, id: number) {
  return Tx.contractCall(
    "boom-nfts",
    "burn",
    [types.uint(id)],
    account.address
  );
}

export function mineBoomRocks(user: Account) {
  const txs = [];
  for (let i = 0; i < 600; i++) {
    txs.push(mintNFT(user));
  }
  return txs;
}

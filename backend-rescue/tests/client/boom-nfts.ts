import { Tx, Chain, Account, types } from "./deps.ts";

function mintNFT(address: string) {
  return Tx.contractCall(
    "SP497E7RX3233ATBS2AB9G4WTHB63X5PBSP5VGAQ.boom-nfts",
    "mint-series",
    [
      types.principal(address),
      types.none(),
      types.none(),
      types.utf8("series"),
      types.ascii("uri"),
      types.ascii("mime-type"),
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
    address
  );
}

function burnNFT(account: Account, id: number) {
  return Tx.contractCall(
    "SP497E7RX3233ATBS2AB9G4WTHB63X5PBSP5VGAQ.boom-nfts",
    "burn",
    [types.uint(id)],
    account.address
  );
}

export function transferBoom(id: number, from: string, to: string, senderAddress: string) {
  return Tx.contractCall(
    "SP497E7RX3233ATBS2AB9G4WTHB63X5PBSP5VGAQ.boom-nfts",
    "transfer",
    [types.uint(id), types.principal(from), types.principal(to)],
    senderAddress
  );
}

export function mintBoomRocks(address: string) {
  const txs = [];
  for (let i = 0; i < 600; i++) {
    txs.push(mintNFT(address));
  }
  return txs;
}

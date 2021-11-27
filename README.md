# btc-rocks

BTC Rocks have been created by Benny Cage.

BTC Rock #4 and Rock #5 share the same image. BTC Rock #14 and Rock #18 as well.

Registered hash of Rock 8 starts with `dead...`

## Contract Rules

The number of BTC Rocks is limited to 50. These are created by upgrading the original Boom NFTs to NFTs of the btc-rock contract. The metadata is unchanged and hosted on IPFS.

The BTC Rock NFTs are SIP-009 compliant and implement the operable trait 
and the transfer-memo trait.

### Upgrade

An upgrade fee of 60 STX has to be paid to the contract developer.
During upgrade, the original Boom NFT is burnt and the corresponding BTC Rock NFT is minted.

### Transfer

BTC Rocks can be transferred by the owner or by an approved operator. 

When a BTC Rock is transferred a fee of currently 100 STX has to be paid to each BTC Rock holder. The contract administrator can change this fee.

### Approved Operator
Each BTC Rock holder can define whether an operator is allowed to move a BTC Rock. Operators are for example trusted smart contracts that control trade deals.

#### Non-Custodian Marketplace
By default, all BTC Rocks have the non-custodian marketplace approved as operator. Individual BTC Rock holders can remove the approval by calling `(set-approved id .marketplace false)`.

The marketplace contract is a separate contract implementing the marketplace trait. It allows owners to list, unlist their NFTs with a price attached in micro STX. Buyers can immediately pay and receive the NFT without confirmation of the seller. 

The seller defines the commission of the marketplace. These trade fees have to be paid by the buyer. The commission rules can even implement an auction and only the auction winner can finally receive the NFT through "paying" the commission fees.

BTC Rocks can be transferred even if they have been listed on the marketplace. If this happens, the listing becomes invalid and an attempt to buy the NFT will fail.

### Administrator

The contract administrator can change the transfer fee and the administrator. Initially, the contract deployer is the administrator.

### Royalties and Copyrights
No royalties are paid to the artist.

Each BTC Rock holder receives a right to use the art associated with the NFT according to the for BTC Rocks adapted version of NFT License 2.0, https://www.nftlicense.org/.


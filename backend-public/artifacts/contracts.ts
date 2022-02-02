// Code generated with the stacksjs-helper-generator extension
// Manual edits will be overwritten

import { ClarityValue, BooleanCV, TrueCV, FalseCV, IntCV, UIntCV, BufferCV, OptionalCV, NoneCV, SomeCV, ResponseCV, ResponseOkCV, ResponseErrorCV, PrincipalCV, StandardPrincipalCV, ContractPrincipalCV, ListCV, TupleCV, StringAsciiCV, StringUtf8CV } from "@stacks/transactions"

export namespace CommissionTraitContract {
    export const address = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM";
    export const name = "commission-trait";

}

export namespace BtcRocksContract {
    export const address = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM";
    export const name = "btc-rocks";

    // Functions
    export namespace Functions {
        // buy-in-ustx
        export namespace BuyInUstx {
            export const name = "buy-in-ustx";

            export interface BuyInUstxArgs {
                id: UIntCV,
                comm: ClarityValue,
            }

            export function args(args: BuyInUstxArgs): ClarityValue[] {
                return [
                    args.id,
                    args.comm,
                ];
            }

        }

        // get-owner
        export namespace GetOwner {
            export const name = "get-owner";

            export interface GetOwnerArgs {
                id: UIntCV,
            }

            export function args(args: GetOwnerArgs): ClarityValue[] {
                return [
                    args.id,
                ];
            }

        }

        // get-token-uri
        export namespace GetTokenUri {
            export const name = "get-token-uri";

            export interface GetTokenUriArgs {
                id: UIntCV,
            }

            export function args(args: GetTokenUriArgs): ClarityValue[] {
                return [
                    args.id,
                ];
            }

        }

        // list-in-ustx
        export namespace ListInUstx {
            export const name = "list-in-ustx";

            export interface ListInUstxArgs {
                id: UIntCV,
                price: UIntCV,
                comm: ClarityValue,
            }

            export function args(args: ListInUstxArgs): ClarityValue[] {
                return [
                    args.id,
                    args.price,
                    args.comm,
                ];
            }

        }

        // set-mint
        export namespace SetMint {
            export const name = "set-mint";

        }

        // transfer
        export namespace Transfer {
            export const name = "transfer";

            export interface TransferArgs {
                id: UIntCV,
                sender: PrincipalCV,
                recipient: PrincipalCV,
            }

            export function args(args: TransferArgs): ClarityValue[] {
                return [
                    args.id,
                    args.sender,
                    args.recipient,
                ];
            }

        }

        // unlist-in-ustx
        export namespace UnlistInUstx {
            export const name = "unlist-in-ustx";

            export interface UnlistInUstxArgs {
                id: UIntCV,
            }

            export function args(args: UnlistInUstxArgs): ClarityValue[] {
                return [
                    args.id,
                ];
            }

        }

        // upgrade
        export namespace Upgrade {
            export const name = "upgrade";

            export interface UpgradeArgs {
                id: UIntCV,
            }

            export function args(args: UpgradeArgs): ClarityValue[] {
                return [
                    args.id,
                ];
            }

        }

        // get-last-token-id
        export namespace GetLastTokenId {
            export const name = "get-last-token-id";

        }

        // get-listing-in-ustx
        export namespace GetListingInUstx {
            export const name = "get-listing-in-ustx";

            export interface GetListingInUstxArgs {
                id: UIntCV,
            }

            export function args(args: GetListingInUstxArgs): ClarityValue[] {
                return [
                    args.id,
                ];
            }

        }

        // get-number-of-rocks
        export namespace GetNumberOfRocks {
            export const name = "get-number-of-rocks";

        }

    }
}

export namespace BtcRocksMintContract {
    export const address = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM";
    export const name = "btc-rocks-mint";

    // Functions
    export namespace Functions {
        // upgrade
        export namespace Upgrade {
            export const name = "upgrade";

            export interface UpgradeArgs {
                id: UIntCV,
            }

            export function args(args: UpgradeArgs): ClarityValue[] {
                return [
                    args.id,
                ];
            }

        }

        // get-owner-boom
        export namespace GetOwnerBoom {
            export const name = "get-owner-boom";

            export interface GetOwnerBoomArgs {
                id: UIntCV,
            }

            export function args(args: GetOwnerBoomArgs): ClarityValue[] {
                return [
                    args.id,
                ];
            }

        }

        // to-boom
        export namespace ToBoom {
            export const name = "to-boom";

            export interface ToBoomArgs {
                id: UIntCV,
            }

            export function args(args: ToBoomArgs): ClarityValue[] {
                return [
                    args.id,
                ];
            }

        }

    }
}

import React from "react";
import { openContractCall } from "@stacks/connect";
import {
  createAssetInfo,
  FungibleConditionCode,
  makeContractSTXPostCondition,
  makeStandardNonFungiblePostCondition,
  makeStandardSTXPostCondition,
  NonFungibleConditionCode,
  PostConditionMode,
  standardPrincipalCV,
  uintCV,
} from "@stacks/transactions";
import { accountsApi, network } from "../common/constants";
import {
  BTC_ROCKS_CONTRACT,
  SUPPORT_BTC_ROCKS_TRANSFER_CONTRACT,
} from "../common/contracts";
import { feePerRock } from "../common/btc-rocks";

const SponsoredTransferButton = ({ rockId, userData, numberOfRocks, setStatus }) => {
  const transfer = async () => {
    const sponsoredFundBalance = await accountsApi.getAccountBalance({
      principal: `${SUPPORT_BTC_ROCKS_TRANSFER_CONTRACT.address}.${SUPPORT_BTC_ROCKS_TRANSFER_CONTRACT.name}`,
    });
    const sponsoredFundAmount = sponsoredFundBalance.stx.balance;
    const userAddress = userData?.profile?.stxAddress?.mainnet;
    setStatus(`Transferring... Check and confirm in your wallet`);
    await openContractCall({
      contractAddress: SUPPORT_BTC_ROCKS_TRANSFER_CONTRACT.address,
      contractName: SUPPORT_BTC_ROCKS_TRANSFER_CONTRACT.name,
      functionName: "sponsored-transfer",
      functionArgs: [
        uintCV(rockId),
        standardPrincipalCV("SP1937WX73M8Z530X5G36WKGB9D7TJNSP7WMKGNBV"),
      ],
      network,
      postConditionMode: PostConditionMode.Deny,
      postConditions: [
        makeContractSTXPostCondition(
          SUPPORT_BTC_ROCKS_TRANSFER_CONTRACT.address,
          SUPPORT_BTC_ROCKS_TRANSFER_CONTRACT.name,
          FungibleConditionCode.LessEqual,
          sponsoredFundAmount
        ),
        makeStandardSTXPostCondition(
          userAddress,
          FungibleConditionCode.LessEqual,
          feePerRock * numberOfRocks
        ),
        makeStandardNonFungiblePostCondition(
          userAddress,
          NonFungibleConditionCode.DoesNotOwn,
          createAssetInfo(
            BTC_ROCKS_CONTRACT.address,
            BTC_ROCKS_CONTRACT.name,
            "rock"
          ),
          uintCV(rockId)
        ),
        makeStandardSTXPostCondition(
          userAddress,
          FungibleConditionCode.LessEqual,
          sponsoredFundAmount
        ),
      ],
      onFinish: (tx) => {
        setStatus(`Transaction submitted: ${tx.txId}`);
      },
      onCancel: () => {
        setStatus(`Transaction not submitted.`);
      },
    });
  };

  return (
    <div>
      <button onClick={transfer} disabled={!userData || !rockId}>
        {`Send BTC Rock #${rockId} to Benny's new adress`}
      </button>
    </div>
  );
};

export default SponsoredTransferButton;

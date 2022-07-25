import React, { useRef } from "react";
import { openContractCall } from "@stacks/connect";
import {
  contractPrincipalCV,
  createAssetInfo,
  FungibleConditionCode,
  makeStandardNonFungiblePostCondition,
  makeStandardSTXPostCondition,
  NonFungibleConditionCode,
  PostConditionMode,
  uintCV,
} from "@stacks/transactions";
import { network } from "../common/constants";
import {
  BTC_ROCKS_CONTRACT,
  BTC_ROCKS_MARKETPLACE_CONTRACT,
  COMMISSION_CONTRACT,
} from "../common/contracts";
import { feePerRock, getBtcRockOwner } from "../common/btc-rocks";

const BuyButton = ({ rockId, userData, setStatus, numberOfRocks }) => {
  const buyRock = async () => {
    setStatus(`Buy BTC Rock ${rockId} ..`);
    const owner = await getBtcRockOwner(rockId);
    const userAddress = userData?.profile?.stxAddress?.mainnet;
    if (owner !== userAddress) {
      setStatus(`Check and confirm in your wallet`);
      await openContractCall({
        contractAddress: BTC_ROCKS_MARKETPLACE_CONTRACT.address,
        contractName: BTC_ROCKS_MARKETPLACE_CONTRACT.name,
        functionName: "buy-in-ustx",
        functionArgs: [
          uintCV(rockId),
          contractPrincipalCV(
            COMMISSION_CONTRACT.address,
            COMMISSION_CONTRACT.name
          ),
        ],
        network,
        postConditionMode: PostConditionMode.Deny,
        postConditions: [
          makeStandardSTXPostCondition(
            userAddress,
            FungibleConditionCode.LessEqual,
            feePerRock * numberOfRocks
          ),
          makeStandardNonFungiblePostCondition(
            owner,
            NonFungibleConditionCode.DoesNotOwn,
            createAssetInfo(
              BTC_ROCKS_CONTRACT.address,
              BTC_ROCKS_CONTRACT.name,
              "rock"
            ),
            uintCV(rockId)
          ),
        ],
        onFinish: (tx) => {
          setStatus(`Transaction submitted: ${tx.txId}`);
        },
        onCancel: () => {
          setStatus(`Transaction not submitted.`);
        },
      });
    } else {
      setStatus(`You own BTC Rock #${rockId}`);
    }
  };

  return (
    <div>
      <button onClick={buyRock} disabled={!userData || !rockId}>
        {`Buy BTC Rock ${rockId ? "#" + rockId : ""}`}
      </button>
    </div>
  );
};

export default BuyButton;

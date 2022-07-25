import React, { useRef } from "react";
import { openContractCall } from "@stacks/connect";
import {
  contractPrincipalCV,
  makeStandardNonFungiblePostCondition,
  makeStandardSTXPostCondition,
  PostConditionMode,
  uintCV,
} from "@stacks/transactions";
import { rocksData } from "../common/rocks-data";
import { getOwner } from "../common/boom";
import { network } from "../common/constants";
import { BTC_ROCKS_MARKETPLACE_CONTRACT } from "../common/contracts";
import { getBtcRockOwner } from "../common/btc-rocks";

const UnlistButton = ({ rockId, userData, setStatus, numberOfRocks }) => {
  const unlistRock = async () => {
    setStatus(`Unlisting BTC Rock ${rockId} ..`);
    const owner = await getBtcRockOwner(rockId);
    if (owner === userData?.profile?.stxAddress?.mainnet) {
      setStatus(`Check and confirm in your wallet`);
      await openContractCall({
        contractAddress: BTC_ROCKS_MARKETPLACE_CONTRACT.address,
        contractName: BTC_ROCKS_MARKETPLACE_CONTRACT.name,
        functionName: "unlist-in-ustx",
        functionArgs: [uintCV(rockId)],
        network,
        postConditionMode: PostConditionMode.Deny,
        postConditions: [],
        onFinish: (tx) => {
          setStatus(`Transaction submitted: ${tx.txId}`);
        },
        onCancel: () => {
          setStatus(`Transaction not submitted.`);
        },
      });
    } else {
      setStatus(`You do not own BTC Rock #${rockId}`);
    }
  };

  return (
    <div>
      <button onClick={unlistRock} disabled={!userData || !rockId}>
        {`Unlist BTC Rock ${rockId ? "#" + rockId : ""}`}
      </button>
    </div>
  );
};

export default UnlistButton;

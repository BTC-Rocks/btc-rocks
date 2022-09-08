import React, { useEffect, useRef, useState } from "react";
import { openContractCall } from "@stacks/connect";
import {
  callReadOnlyFunction,
  ClarityType,
  contractPrincipalCV,
  FungibleConditionCode,
  makeStandardSTXPostCondition,
  PostConditionMode,
  standardPrincipalCV,
  trueCV,
  uintCV,
} from "@stacks/transactions";
import { network, smartContractsApi } from "../common/constants";
import { SUPPORT_BTC_ROCKS_TRANSFER_CONTRACT } from "../common/contracts";

const ApproveContractButton = ({ userData, setStatus }) => {
  const approve = async () => {
    setStatus(`Approving... Check and confirm in your wallet`);
    await openContractCall({
      contractAddress: BTC_ROCKS_CONTRACT.address,
      contractName: BTC_ROCKS_CONTRACT.name,
      functionName: "set-approved-all",
      functionArgs: [
        contractPrincipalCV(
          SUPPORT_BTC_ROCKS_TRANSFER_CONTRACT.address,
          SUPPORT_BTC_ROCKS_TRANSFER_CONTRACT.name
        ),
        trueCV,
      ],
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
  };

  return (
    <div>
      <button onClick={approve} disabled={!userData}>
        {`Allow support contract for sponsored transfers to manage your BTC Rocks`}
      </button>
    </div>
  );
};

export default ApproveContractButton;

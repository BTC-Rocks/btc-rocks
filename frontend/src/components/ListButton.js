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
import {
  BTC_ROCKS_MARKETPLACE_CONTRACT,
  COMMISSION_CONTRACT,
} from "../common/contracts";
import { feePerRock, getBtcRockOwner } from "../common/btc-rocks";

const ListButton = ({ rockId, userData, setStatus, numberOfRocks }) => {
  const amountRef = useRef();

  const listRock = async () => {
    setStatus(`Listing BTC Rock ${rockId} ..`);
    const owner = await getBtcRockOwner(rockId);
    console.log({ owner, add: userData?.profile?.stxAddress?.mainnet });
    if (owner === userData?.profile?.stxAddress?.mainnet) {
      setStatus(`Check and confirm in your wallet`);
      await openContractCall({
        contractAddress: BTC_ROCKS_MARKETPLACE_CONTRACT.address,
        contractName: BTC_ROCKS_MARKETPLACE_CONTRACT.name,
        functionName: "list-in-ustx",
        functionArgs: [
          uintCV(rockId),
          uintCV(amountRef.current.value * 1_000_000), // convert amount to ustx
          contractPrincipalCV(
            COMMISSION_CONTRACT.address,
            COMMISSION_CONTRACT.name
          ),
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
    } else {
      setStatus(`You do not own BTC Rock #${rockId}`);
    }
  };

  return (
    <div>
      Amount in STX
      <br />
      <input
        ref={amountRef}
        defaultValue={(numberOfRocks * feePerRock) / 1_000_000} // in STX
      />
      <br />
      <button onClick={listRock} disabled={!userData || !rockId}>
        {`List BTC Rock ${rockId ? "#" + rockId : ""} for ${
          amountRef?.current ? `${amountRef?.current?.value} STX` : "sale"
        }`}
      </button>
    </div>
  );
};

export default ListButton;

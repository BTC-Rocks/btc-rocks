import React, { useRef } from "react";
import { openContractCall } from "@stacks/connect";
import {
  FungibleConditionCode,
  makeStandardSTXPostCondition,
  PostConditionMode,
  uintCV,
} from "@stacks/transactions";
import { network } from "../common/constants";
import { SUPPORT_BTC_ROCKS_TRANSFER_CONTRACT } from "../common/contracts";
import { feePerRock } from "../common/btc-rocks";

const DepositButton = ({ userData, numberOfRocks, setStatus }) => {
  const amountRef = useRef();

  const depositStx = async () => {
    const sponsor = userData?.profile?.stxAddress?.mainnet;
    console.log({ sponsor });
    setStatus(`Depositing... Check and confirm in your wallet`);
    const amountUstx = amountRef.current.value * 1_000_000; // convert amount to ustx
    await openContractCall({
      contractAddress: SUPPORT_BTC_ROCKS_TRANSFER_CONTRACT.address,
      contractName: SUPPORT_BTC_ROCKS_TRANSFER_CONTRACT.name,
      functionName: "deposit",
      functionArgs: [uintCV(amountUstx)],
      network,
      postConditionMode: PostConditionMode.Deny,
      postConditions: [
        makeStandardSTXPostCondition(
          sponsor,
          FungibleConditionCode.Equal,
          amountUstx
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
      Amount in STX
      <br />
      <input
        ref={amountRef}
        defaultValue={(numberOfRocks * feePerRock) / 1_000_000} // in STX
      />
      <br />
      <button onClick={depositStx} disabled={!userData}>
        {`Deposit STX for sponsored transfers`}
      </button>
    </div>
  );
};

export default DepositButton;

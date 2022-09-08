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
  uintCV,
} from "@stacks/transactions";
import { network, smartContractsApi } from "../common/constants";
import { SUPPORT_BTC_ROCKS_TRANSFER_CONTRACT } from "../common/contracts";

const WithdrawButton = ({ userData, numberOfRocks, setStatus }) => {
  const amountRef = useRef();
  const [depositedAmount, setDepositedAmount] = useState(0);
  const user = userData?.profile?.stxAddress?.mainnet;
  useEffect(() => {
    const fn = async () => {
      const sponsorAmount = await callReadOnlyFunction({
        contractAddress: SUPPORT_BTC_ROCKS_TRANSFER_CONTRACT.address,
        contractName: SUPPORT_BTC_ROCKS_TRANSFER_CONTRACT.name,
        functionName: "get-sponsor-amount",
        functionArgs: [user],
      });
      if (sponsorAmount.type === ClarityType.OptionalNone) {
        setDepositedAmount(0);
      } else {
        setDepositedAmount(sponsorAmount.value.value);
      }
    };
    fn();
  }, []);
  const withdrawStx = async () => {
    const sponsor = userData?.profile?.stxAddress?.mainnet;
    setStatus(`Withdrawing... Check and confirm in your wallet`);
    const amountUstx = amountRef.current.value * 1_000_000; // convert amount to ustx
    await openContractCall({
      contractAddress: SUPPORT_BTC_ROCKS_TRANSFER_CONTRACT.address,
      contractName: SUPPORT_BTC_ROCKS_TRANSFER_CONTRACT.name,
      functionName: "withdraw",
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
        defaultValue={depositedAmount / 1_000_000} // in STX
      />
      <br />
      <button onClick={withdrawStx} disabled={!userData}>
        {`Withdraw STX from sponsored transfer fund`}
      </button>
    </div>
  );
};

export default WithdrawButton;

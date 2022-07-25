import { callReadOnlyFunction, cvToString, uintCV } from "@stacks/transactions";
import { network } from "./constants";
import { BOOM_CONTRACT } from "./contracts";

export const getOwner = async (boomId) => {
  const resultCV = await callReadOnlyFunction({
    contractAddress: BOOM_CONTRACT.address,
    contractName: BOOM_CONTRACT.name,
    functionName: "get-owner",
    functionArgs: [uintCV(boomId)],
    senderAddress: BOOM_CONTRACT.address,
    network,
  });
  console.log(resultCV);
  let owner =
    resultCV.value.type === ClarityType.OptionalSome
      ? cvToString(resultCV.value.value)
      : undefined;
  return owner;
};

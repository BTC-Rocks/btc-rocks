import {
  callReadOnlyFunction,
  ClarityType,
  contractPrincipalCV,
  standardPrincipalCV,
} from "@stacks/transactions";
import { network } from "./constants";

export async function getUsername(address) {
  if (
    address === "SPM6Q24H3R7FA3WE4690TQ2JQ6E125XZHP47HQYY" ||
    address === "SP8Q8QHDCZFG661H8431T2B1WX1FBD7PH76ZY1EF" ||
    address === "SP1DKW0QTVVWQT96W159BMDAFZB68R1SG6YWFN23T" ||
    address === "SP1B6FGZWBJK2WJHJP76C2E4AW3HA4BVAR5DGK074"
  ) {
    return "bennycage.btc";
  }
  const contractParts = address.split(".");
  const nameCV = await callReadOnlyFunction({
    contractAddress: "SP000000000000000000002Q6VF78",
    contractName: "bns",
    functionName: "resolve-principal",
    functionArgs: [
      contractParts.length > 1
        ? contractPrincipalCV(contractParts[0], contractParts[1])
        : standardPrincipalCV(address),
    ],
    senderAddress: "SP000000000000000000002Q6VF78",
    network,
  });
  return nameCV.type === ClarityType.ResponseOk
    ? nameToString(nameCV.value)
    : address;
}

function nameToString(nameCV) {
  return (
    nameCV.data.name.buffer.toString("ascii") +
    "." +
    nameCV.data.namespace.buffer.toString("ascii")
  );
}

import {
  callReadOnlyFunction,
  ClarityType,
  contractPrincipalCV,
  cvToHex,
  cvToString,
  hexToCV,
  tupleCV,
  uintCV,
} from "@stacks/transactions";
import { network, smartContractsApi } from "./constants";
import { BOOM_CONTRACT } from "./contracts";
import { rocksData } from "./rocks-data";

export const getStacksArtData = async (rockId) => {
  const result = await smartContractsApi.getContractDataMapEntry({
    contractAddress: "SPNWZ5V2TPWGQGVDR6T7B6RQ4XMGZ4PXTEE0VQ0S",
    contractName: "marketplace-v2-alt",
    mapName: "on-sale",
    key: cvToHex(
      tupleCV({
        tradables: contractPrincipalCV(
          BOOM_CONTRACT.address,
          BOOM_CONTRACT.name
        ),
        "tradable-id": uintCV(rocksData[rockId - 1].id),
      })
    ),
    proof: 0,
    network,
  });
  const resultCV = hexToCV(result.data);
  console.log(cvToString(resultCV));
};

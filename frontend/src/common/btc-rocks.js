import {
  callReadOnlyFunction,
  ClarityType,
  cvToString,
  uintCV,
} from "@stacks/transactions";
import { AccountsApi, Configuration } from "@stacks/blockchain-api-client";
import { network } from "./constants";
import {
  BTC_ROCKS_CONTRACT,
  BTC_ROCKS_MARKETPLACE_CONTRACT,
} from "./contracts";

export const getBtcRockOwner = async (rockId) => {
  const resultCV = await callReadOnlyFunction({
    contractAddress: BTC_ROCKS_CONTRACT.address,
    contractName: BTC_ROCKS_CONTRACT.name,
    functionName: "get-owner",
    functionArgs: [uintCV(rockId)],
    senderAddress: BTC_ROCKS_CONTRACT.address,
    network,
  });
  console.log(resultCV);
  let owner =
    resultCV.value.type === ClarityType.OptionalSome
      ? cvToString(resultCV.value.value)
      : undefined;
  return owner;
};

/**
 * Number of upgraded BTC Rocks
 * @returns number of rocks as number
 */
export const getNumberOfRocks = async () => {
  const resultCV = await callReadOnlyFunction({
    contractAddress: BTC_ROCKS_CONTRACT.address,
    contractName: BTC_ROCKS_CONTRACT.name,
    functionName: "get-number-of-rocks",
    functionArgs: [],
    senderAddress: BTC_ROCKS_CONTRACT.address,
    network,
  });
  return Number(resultCV.value);
};

export const accountsApi = new AccountsApi(
  new Configuration({
    basePath: network.coreApiUrl,
    fetchApi: fetch,
  })
);

export const getMarketActivites = async () => {
  const transactionsResult = await accountsApi.getAccountTransactions({
    principal: `${BTC_ROCKS_MARKETPLACE_CONTRACT.address}.${BTC_ROCKS_MARKETPLACE_CONTRACT.name}`,
    unanchored: true,
  });
  console.log(transactionsResult.results);
  return transactionsResult.results;
};

export const feePerRock = 100_000_000;

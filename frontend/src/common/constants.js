import { AccountsApi, Configuration, SmartContractsApi } from "@stacks/blockchain-api-client";
import { StacksMainnet } from "@stacks/network";
export const network = new StacksMainnet();

const config = new Configuration({
  basePath: network.coreApiUrl,
  fetchApi: fetch,
});

export const accountsApi = new AccountsApi(config);
export const smartContractsApi = new SmartContractsApi(config);

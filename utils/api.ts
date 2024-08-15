import { Address, Hash } from "viem";
import { PaginationSort } from "@/config/types";
import { API_KEYS, API_URLS, type SupportedChains } from "@/config/constants";

// @ts-ignore
// const API_URLS = Object.values(CHAINS).reduce((acc: Record<SupportedChains, string | undefined>, chain: Chain) => {
//   const id = String(chain.id) as SupportedChains;
//   acc[id] = chain.blockExplorers?.default.apiUrl;
//   return acc;
// }, {}) as Record<SupportedChainIDs, string>;

export const getApiKey = (chain: SupportedChains) => API_KEYS[chain] || Object.values(API_KEYS)[0];
export const getApiUrl = (chain: SupportedChains) => API_URLS[chain] || Object.values(API_URLS)[0];

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export type TransactionsApiProps = {
  address: Address;
  chain: SupportedChains;

  page?: number;
  offset?: number;
  sort?: PaginationSort;
};

export const getTransactionsFetchUrl = ({ address, chain, page, offset, sort }: TransactionsApiProps) => {
  const query = new URLSearchParams(JSON.parse(JSON.stringify({ address, chain, page, offset, sort })));
  return `${BASE_URL}/api/transactions?${query.toString()}`;
};

export type TxStatusApiProps = {
  txhash: Hash;
  chain: SupportedChains;
};

export const getTxStatusFetchUrl = ({ txhash, chain }: TxStatusApiProps) => {
  const query = new URLSearchParams({ txhash, chain });
  return `${BASE_URL}/api/tx?${query.toString()}`;
};

export type BalanceApiProps = {
  address: Address;
  chain: SupportedChains;
};

export const getBalanceFetchUrl = ({ address, chain }: BalanceApiProps) => {
  const query = new URLSearchParams({ address, chain });
  return `${BASE_URL}/api/balance?${query.toString()}`;
};

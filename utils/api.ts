import { API_KEYS, API_URLS, type SupportedChainIDs } from "@/config/constants";

// @ts-ignore
// const API_URLS = Object.values(CHAINS).reduce((acc: Record<SupportedChains, string | undefined>, chain: Chain) => {
//   const id = String(chain.id) as SupportedChains;
//   acc[id] = chain.blockExplorers?.default.apiUrl;
//   return acc;
// }, {}) as Record<SupportedChainIDs, string>;

export const getApiKey = (chainID: SupportedChainIDs) => API_KEYS[chainID] || Object.values(API_KEYS)[0];
export const getApiUrl = (chainID: SupportedChainIDs) => API_URLS[chainID] || Object.values(API_URLS)[0];

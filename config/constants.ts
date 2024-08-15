import { mainnet, polygon } from "viem/chains";

const toLowerCaseTyped = function <S extends string>(input: S) {
  return input.toLowerCase() as Lowercase<S>;
};

export const API_KEYS = {
  [mainnet.id]: process.env.NEXT_PUBLIC_API_KEY_ETHERSCAN,
  [polygon.id]: process.env.NEXT_PUBLIC_API_KEY_POLYGONSCAN,
};

export const API_URLS = {
  [mainnet.id]: mainnet.blockExplorers?.default.apiUrl,
  [polygon.id]: polygon.blockExplorers?.default.apiUrl,
};

export const SUPPORTED_CHAINS = [toLowerCaseTyped(mainnet.name), toLowerCaseTyped(polygon.name)] as const;

export const DEFAULT_CHAIN = SUPPORTED_CHAINS[0];

export const CHAINS = {
  [toLowerCaseTyped(mainnet.name)]: mainnet,
  [toLowerCaseTyped(polygon.name)]: polygon,
};

export const CHAIN_IDS = {
  [toLowerCaseTyped(mainnet.name)]: mainnet.id,
  [toLowerCaseTyped(polygon.name)]: polygon.id,
};

export type SupportedChains = (typeof SUPPORTED_CHAINS)[number];
export type SupportedChainIDs = (typeof CHAIN_IDS)[SupportedChains];

export const CHAIN_COLORS: Record<SupportedChains, string> = {
  [toLowerCaseTyped(mainnet.name)]: "#0784c3",
  [toLowerCaseTyped(polygon.name)]: "#7342dc",
};

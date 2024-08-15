import { mainnet, polygon } from "viem/chains";

const toLowerCaseTyped = function <S extends string>(input: S) {
  return input.toLowerCase() as Lowercase<S>;
};

export const API_KEYS = {
  [toLowerCaseTyped(mainnet.name)]: process.env.NEXT_PUBLIC_API_KEY_ETHERSCAN,
  [toLowerCaseTyped(polygon.name)]: process.env.NEXT_PUBLIC_API_KEY_POLYGONSCAN,
};

export const API_URLS = {
  [toLowerCaseTyped(mainnet.name)]: mainnet.blockExplorers?.default.apiUrl,
  [toLowerCaseTyped(polygon.name)]: polygon.blockExplorers?.default.apiUrl,
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

import { mainnet, polygon } from "viem/chains";

const toLowerCaseTyped = function <S extends string>(strIn: S) {
  return strIn.toLowerCase() as Lowercase<S>;
};

export const SUPPORTED_CHAINS = [toLowerCaseTyped(mainnet.name), toLowerCaseTyped(polygon.name)] as const;

export const DEFAULT_CHAIN = SUPPORTED_CHAINS[0];

export type SupportedChains = (typeof SUPPORTED_CHAINS)[number];

export const CHAIN_COLORS: Record<SupportedChains, string> = {
  [toLowerCaseTyped(mainnet.name)]: "#0784c3",
  [toLowerCaseTyped(polygon.name)]: "#7342dc",
};

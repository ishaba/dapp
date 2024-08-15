import { formatEther as viemFormatEther } from "viem";

export const formatEther = (value: string = "0", decimals = 7) => (+viemFormatEther(BigInt(value))).toFixed(decimals);

export const formatGasPrice = (input?: string) => {
  if (!input) return;
  const wei = BigInt(input);
  const gwei = wei / BigInt(1e9);
  const decimals = wei % BigInt(1e9);
  return `${gwei}.${decimals.toString().padStart(9, "0")}`;
};

export const formatWeiToEth = (input?: bigint) => {
  if (!input) return;
  const wei = BigInt(input.toString());
  const eth = wei / BigInt(1e18);
  const decimals = wei % BigInt(1e18);
  return eth.toString() + "." + decimals.toString().padStart(18, "0").slice(0, 18);
};

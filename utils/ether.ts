import { formatEther } from "viem";

export const format = (value: string = "0", decimals = 7) => (+formatEther(BigInt(value))).toFixed(decimals);

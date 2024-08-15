import { formatEther } from "viem";

export const format = (value: string, decimals = 7) => (+formatEther(BigInt(value))).toFixed(decimals);

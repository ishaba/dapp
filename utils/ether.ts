import { formatEther } from "viem";

export const format = (value: string, decimals = 8) => (+formatEther(BigInt(value))).toFixed(decimals);

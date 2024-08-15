import { CHAINS, SupportedChains } from "@/config/constants";
import { TokenEth, TokenMatic } from "@/config/icons";

import { Address } from "viem";
import { formatEther } from "@/utils/ether";
import { getBalanceFetchUrl } from "@/utils/api";
import useSWR from "swr";

const TokenLogo = {
  [CHAINS.ethereum.name.toLowerCase()]: <TokenEth />,
  [CHAINS.polygon.name.toLowerCase()]: <TokenMatic />,
};

export default function AddressBalance({ address, chain }: { address: Address; chain: SupportedChains }) {
  const { data, isLoading, error } = useSWR<{ data: string }>(getBalanceFetchUrl({ address, chain }));

  if (isLoading) {
    // TODO: Add loader
  }

  if (error) {
    // TODO: Add error handler
  }

  const balance = formatEther(data?.data, 3);

  return (
    <div className="flex gap-2">
      <span className="opacity-50">Balance:</span>
      {balance}
      <span>{CHAINS[chain].nativeCurrency.symbol}</span>
      <span>{TokenLogo[chain]}</span>
    </div>
  );
}

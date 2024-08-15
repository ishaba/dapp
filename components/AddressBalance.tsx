import useSWR from "swr";
import fetcher from "@/utils/fetcher";

import { CHAINS, SupportedChains } from "@/config/constants";
import TokenEth from "~icons/cryptocurrency-color/eth";
import TokenMatic from "~icons/cryptocurrency-color/matic";
import { Address } from "viem";
import { format } from "@/utils/ether";

const TokenLogo = {
  [CHAINS.ethereum.name.toLowerCase()]: <TokenEth />,
  [CHAINS.polygon.name.toLowerCase()]: <TokenMatic />,
};

export default function AddressBalance({ address, chain }: { address: Address; chain: SupportedChains }) {
  const { data, isLoading, error } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/balance?address=${address}&chain=${chain}`, fetcher<{ data: string }>, {
    refreshInterval: 3000,
  });

  const balance = format(data?.data, 3);

  return (
    <div className="flex gap-2">
      <span className="opacity-50">Balance:</span>
      {balance}
      <span>{CHAINS[chain].nativeCurrency.symbol}</span>
      <span>{TokenLogo[chain]}</span>
    </div>
  );
}

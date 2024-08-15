import { CHAINS, SupportedChains } from "@/config/constants";

import Ethereum from "~icons/logos/ethereum";
import Matic from "~icons/token-branded/matic";

const ChainLogo = {
  [CHAINS.ethereum.name.toLowerCase()]: <Ethereum />,
  [CHAINS.polygon.name.toLowerCase()]: <Matic />,
};

export default function Logo({ chain }: { chain: SupportedChains }) {
  return (
    <>
      {ChainLogo[chain]}
      <span className="ml-2 mr-2 capitalize">{chain}</span> Transactions
    </>
  );
}

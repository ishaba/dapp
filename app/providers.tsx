"use client";

import { SWRConfig } from "swr";
import { usePathname } from "next/navigation";
import fetcher from "@/utils/fetcher";
import { CHAIN_COLORS, type SupportedChains } from "@/config/constants";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // After dancing with this for a while i have no idea why i decided to do it like this
  // It doesn't looks good but I don't want to spend more time on this
  const currentChain = pathname.split("/")[1] as SupportedChains;
  const currentChainColor = Object.entries(CHAIN_COLORS).filter((colors) => currentChain === colors[0])[0];

  const style = { "--color-primary": currentChainColor ? currentChainColor[1] : "white" } as React.CSSProperties;

  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher,
      }}
    >
      <div style={style}>{children}</div>
    </SWRConfig>
  );
}

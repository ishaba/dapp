"use client";

import { useRouter } from "next/navigation";
import { SUPPORTED_CHAINS, type SupportedChains } from "@/config/constants";
import Logo from "@/components/Logo";
import Link from "next/link";
import NextLogo from "~icons/logos/nextjs.jsx";
import UilSearch from "~icons/uil/search";
import UilSun from "~icons/uil/sun";
import VercelLogo from "~icons/logos/vercel.jsx";

const recentlyViewed = {
  [SUPPORTED_CHAINS[0]]: ["0xa83114a443da1cecefc50368531cace9f37fcccb"],
  [SUPPORTED_CHAINS[1]]: ["0x8a1e7a12663b18b7f4257936824c89fdfccda82e"],
};

function NotSupportedChainScreen({ chain }: { chain: SupportedChains }) {
  return (
    <div className="-mb-20 flex min-h-screen flex-col items-center justify-center pb-40">
      <div>
        Chain <span className="mr-1 inline-block font-light italic">“{chain}”</span> not supported yet 😔
      </div>
      <div className="mb-1 mt-6 text-[10px] uppercase opacity-50">Chose one of:</div>
      <div className="flex">
        {SUPPORTED_CHAINS.map((chain, index) => (
          <>
            <Link key={chain} className={`mx-2 capitalize hover:underline text-${chain}`} href={`/${chain}`}>
              {chain}
            </Link>
          </>
        ))}
      </div>
    </div>
  );
}

export default function ChainPage({ params: { chain } }: { params: { chain: SupportedChains } }) {
  const router = useRouter();

  if (!SUPPORTED_CHAINS.includes(chain)) {
    return <NotSupportedChainScreen chain={chain} />;
  }

  const searchFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const address = formData.get("address");

    if (address) {
      router.push(`./address/${address}`);
    }
  };

  const explorerSwicher = SUPPORTED_CHAINS.filter((c) => c != chain);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 lg:-mb-14 lg:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="flex w-full justify-center pb-6 pt-8 font-bold lg:static lg:w-auto lg:rounded-xl lg:p-4">
          <Logo chain={chain} />
        </div>
        <div className="flex w-full items-center justify-center pb-6 pt-8 font-bold lg:static lg:w-auto lg:rounded-xl lg:p-4">
          <div className="inline-block align-middle">
            <Link href={`/${explorerSwicher}`} className={`hover:text-${explorerSwicher} hover:underline`}>
              Go to {explorerSwicher} explorer
            </Link>
          </div>
          <button className="ml-4 rounded-lg border border-white/60 px-1 py-1 opacity-75 transition-all duration-200 ease-in hover:bg-white/20 hover:opacity-100" title="Sorry! Theme switcher not implemented 😔">
            <UilSun />
          </button>
        </div>
      </div>

      <div className="relative w-full lg:max-w-5xl">
        <div className="absolute left-1/2 z-[-1] flex place-items-center opacity-30 before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]"></div>
        <form onSubmit={searchFormSubmit} className="relative flex justify-center">
          <input name="address" className="mr-2 w-full rounded-lg px-3 py-2 text-black lg:w-1/2" type="text" placeholder="Search transactions by address" />
          <button className="group rounded-lg border-2 border-gray-300/20 px-3 py-2.5 hover:bg-black/20 active:scale-95 hover:dark:bg-white/20" type="submit" title="Get Transtions List">
            <UilSearch width="20" height="20" className="transition-transform ease-in group-hover:scale-110" />
          </button>
        </form>
      </div>

      <div className="mb-32 lg:w-full lg:max-w-5xl">
        <div className="mb-4 text-xs opacity-60 lg:w-full lg:text-left">Recently viewed:</div>
        <div className="text-center text-xs lg:mb-0 lg:w-full lg:text-left">
          {recentlyViewed[chain].map((address) => (
            <Link key={address} href={`./address/${address}`} className="group border-b border-transparent text-primary transition-colors hover:underline">
              {address}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex gap-10">
        <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="group text-[10px] transition-transform duration-300 ease-out hover:scale-105">
          <span className="opacity-50 transition-opacity duration-500 ease-out group-hover:opacity-100">Powered by</span>
          <div className="mt-2">
            <NextLogo width={60} fill="white" />
          </div>
        </a>

        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="group text-[10px] transition-transform duration-300 ease-out hover:scale-105">
          <span className="opacity-50 transition-opacity duration-500 ease-out group-hover:opacity-100">Hosted by</span>
          <div className="mt-2">
            <VercelLogo width={70} fill="white" />
          </div>
        </a>
      </div>
    </main>
  );
}

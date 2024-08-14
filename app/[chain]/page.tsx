import { SUPPORTED_CHAINS, type SupportedChains } from "@/config/constants";
import Link from "next/link";
import NextLogo from "~icons/logos/nextjs.jsx";
import UilSearch from "~icons/uil/search";
import UilTransaction from "~icons/uil/transaction";
import VercelLogo from "~icons/logos/vercel.jsx";

const recentlyViewed = ["0x0000000000000000000000000000000000000000"];

function NotSupportedChainScreen({ chain }: { chain: string }) {
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
  if (!SUPPORTED_CHAINS.includes(chain)) {
    return <NotSupportedChainScreen chain={chain} />;
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 lg:-mb-14 lg:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="flex w-full justify-center pb-6 pt-8 font-bold lg:static lg:w-auto lg:rounded-xl lg:p-4">
          <UilTransaction className="mr-2" />
          <span className="mr-2 capitalize">{chain}</span> Transactions Explorer
        </div>
        <div className="flex w-full justify-center pb-6 pt-8 font-bold lg:static lg:w-auto lg:rounded-xl lg:p-4">
          <select name="" id="" className="bg-transparent">
            <option value="">Dark</option>
            <option value="">Light</option>
            <option value="">System</option>
          </select>
        </div>
      </div>

      <div className="relative w-full lg:max-w-5xl">
        <div className="absolute left-1/2 z-[-1] flex place-items-center opacity-30 before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]"></div>
        <form className="relative flex justify-center">
          <input className="mr-2 w-full rounded-lg px-3 py-2 text-black lg:w-1/2" type="text" placeholder="Search transactions by address" />
          <button className="group rounded-lg border-2 border-gray-300/20 px-3 py-2.5 hover:bg-black/20 active:scale-95 hover:dark:bg-white/20" type="submit" title="Get Transtions List">
            <UilSearch width="20" height="20" className="transition-transform ease-in group-hover:scale-110" />
          </button>
        </form>
      </div>

      <div className="mb-32 lg:w-full lg:max-w-5xl">
        <div className="mb-4 text-xs opacity-60 lg:w-full lg:text-left">Recently viewed:</div>
        <div className="text-center lg:mb-0 lg:w-full lg:text-left">
          {recentlyViewed.map((address) => (
            <Link key={address} href={`/address/${address}`} className="group border-b border-transparent text-primary transition-colors hover:border-gray-300 hover:dark:border-neutral-700">
              <span className="text-lg font-semibold">{address}</span>
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

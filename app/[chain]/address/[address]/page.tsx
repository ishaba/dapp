"use client";

import { useState } from "react";
import AddressEntry from "@/components/AddressEntry";
import BxChevronLeft from "~icons/bx/chevron-left";
import Link from "next/link";
import UilTransaction from "~icons/uil/transaction";
import fetcher from "@/utils/fetcher";
import { type Transaction } from "@/config/types";
import useSWR from "swr";
import TimeAgo from "@/components/TimeAgo";
import { format } from "@/utils/ether";
import { CHAINS, type SupportedChains } from "@/config/constants";
import UilArrowDown from "~icons/uil/arrow-down";
import UilArrowUp from "~icons/uil/arrow-up";

var rf = new Intl.RelativeTimeFormat("en-US");

export default function AddressPage({ params: { address, chain } }: { params: { address: string; chain: SupportedChains } }) {
  const [sort, setSort] = useState();
  const balance = 0;

  const changeSort = () => {};

  const { data, isLoading, error } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/transactions?address=${address}`, fetcher<{ data: Transaction[] }>, {
    refreshInterval: 3000,
  });

  if (isLoading) {
    // TODO: Add loader
  }

  if (error) {
    // TODO: Add error handler
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-6 lg:-mb-20 lg:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="flex w-full justify-center pb-6 pt-8 font-bold lg:static lg:w-auto lg:rounded-xl lg:p-4">
          <Link href={`/${chain}`} className="group relative flex hover:text-primary">
            <BxChevronLeft className="absolute -left-5 top-0 translate-x-1 opacity-0 transition-all duration-100 ease-out group-hover:translate-x-0 group-hover:opacity-80 group-hover:duration-200" />
            <UilTransaction className="mr-2" />
            <span className="mr-2 capitalize">{chain}</span> Transactions Explorer
          </Link>
        </div>
        <div className="flex w-full justify-center pb-6 pt-8 font-bold lg:static lg:w-auto lg:rounded-xl lg:p-4">
          <AddressEntry address={address} />
        </div>
        <div className="flex w-full justify-center pb-6 pt-8 font-bold lg:static lg:w-auto lg:rounded-xl lg:p-4">
          <div>
            <span className="opacity-50">Balance:</span> {balance}
          </div>
        </div>
      </div>

      <div className="mt-10 w-full lg:max-w-4xl">
        <div className="w-full rounded-md border border-white/10 text-sm">
          <div className="flex border-b border-b-white/10">
            <div className="w-8/12 p-3 text-left opacity-40">Hash</div>
            <div className="w-2/12 p-3 text-left">
              <button className="opacity-40 hover:opacity-70 active:scale-95" onClick={changeSort}>
                Timestamp <UilArrowDown className="inline-block" />
              </button>
            </div>
            <div className="w-2/12 p-3 text-left">
              <button className="opacity-40 hover:opacity-70 active:scale-95" onClick={changeSort}>
                Amount <UilArrowUp className="inline-block opacity-0" />
              </button>
            </div>
          </div>
          {/* TODO: Refactor this should be just data */}
          {data?.data?.map(({ hash, timeStamp, value }) => (
            <div key={hash} className="flex border-b border-b-white/10 transition-colors hover:bg-black/5 hover:dark:bg-white/10">
              <div className="w-8/12 p-3 text-left font-mono">
                <Link className="text-primary" href={`../../tx/${hash}`}>
                  {hash}
                </Link>
              </div>
              <div className="w-2/12 p-3 text-left">
                <TimeAgo timeStamp={timeStamp} />
              </div>
              <div className="w-2/12 p-3 text-left font-mono">
                {format(value)} {CHAINS[chain].nativeCurrency.symbol}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

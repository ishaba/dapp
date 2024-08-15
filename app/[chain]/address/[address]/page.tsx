"use client";

import { useState } from "react";
import AddressEntry from "@/components/AddressEntry";
import BxChevronLeft from "~icons/bx/chevron-left";
import Link from "next/link";
import Logo from "@/components/Logo";
import fetcher from "@/utils/fetcher";
import { PaginationSort, type Transaction } from "@/config/types";
import useSWR from "swr";
import TimeAgo from "@/components/TimeAgo";
import { format } from "@/utils/ether";
import { CHAINS, type SupportedChains } from "@/config/constants";
import UilArrowDown from "~icons/uil/arrow-down";
import AddressBalance from "@/components/AddressBalance";
import { Address } from "viem";

const initialSort = PaginationSort.DESC;

export default function AddressPage({ params: { address, chain } }: { params: { address: Address; chain: SupportedChains } }) {
  const [sortByTampStamp, setSortByTampStamp] = useState<PaginationSort | null>(initialSort);
  const [sortByValue, setSortByValue] = useState<PaginationSort | null>(null);

  const setSortingByTimeStamp = () => {
    if (sortByTampStamp === PaginationSort.DESC) {
      setSortByTampStamp(PaginationSort.ASC);
    } else {
      setSortByTampStamp(PaginationSort.DESC);
    }
    setSortByValue(null);
  };
  const setSortingByValue = () => {
    if (sortByValue === PaginationSort.DESC) {
      setSortByValue(PaginationSort.ASC);
    } else {
      setSortByValue(PaginationSort.DESC);
    }
    setSortByTampStamp(null);
  };

  const { data, isLoading, error } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/transactions?address=${address}&chain=${chain}&sort=${sortByTampStamp}`, fetcher<{ data: Transaction[] }>, {
    refreshInterval: 3000,
  });

  if (isLoading) {
    // TODO: Add loader
  }

  if (error) {
    // TODO: Add error handler
  }

  // NOTE: ehterscan api doesn't support sort by value
  // since we don't need to implement pagination
  // it is not a big problem we just can sort data array localy
  function sortTransaction(data: Transaction[] | undefined) {
    if (sortByValue && data) {
      const sorter = sortByValue === PaginationSort.DESC ? -1 : 1;
      return [...data].sort((a, b) => (a.value < b.value ? 1 * sorter : a.value > b.value ? -1 * sorter : 0));
    }
    return data;
  }

  // TODO: Something strange happened here
  // Refactor this should be just data
  const transactions = sortTransaction(data?.data);

  return (
    <main className="flex min-h-screen flex-col items-center p-6 lg:-mb-20 lg:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="flex w-full justify-center pb-6 pt-8 font-bold lg:static lg:w-auto lg:rounded-xl lg:p-4">
          <Link href={`/${chain}`} className="group relative flex hover:text-primary">
            <BxChevronLeft className="absolute -left-5 top-0 translate-x-1 opacity-0 transition-all duration-100 ease-out group-hover:translate-x-0 group-hover:opacity-80 group-hover:duration-200" />
            <Logo chain={chain} />
          </Link>
        </div>
        <div className="flex w-full justify-center pb-6 pt-8 font-bold lg:static lg:w-auto lg:rounded-xl lg:p-4">
          <AddressEntry address={address} />
        </div>
        <div className="flex w-full justify-center pb-6 pt-8 font-bold lg:static lg:w-auto lg:rounded-xl lg:p-4">
          <AddressBalance address={address} chain={chain} />
        </div>
      </div>

      <div className="mt-10 w-full lg:max-w-4xl">
        <div className="w-full rounded-md border border-white/10 text-sm">
          <div className="flex border-b border-b-white/10">
            <div className="w-8/12 p-3 text-left opacity-40">Hash</div>
            <div className="w-2/12 p-3 text-left">
              <button className="opacity-40 hover:opacity-70 active:scale-95" onClick={setSortingByTimeStamp}>
                Timestamp
                {sortByTampStamp && <UilArrowDown className={`inline-block transition-transform ease-in duration-200 ${sortByTampStamp === PaginationSort.ASC && "rotate-180"}`} />}
              </button>
            </div>
            <div className="w-2/12 p-3 text-left">
              <button className="opacity-40 hover:opacity-70 active:scale-95" onClick={setSortingByValue}>
                Amount
                {sortByValue && <UilArrowDown className={`inline-block transition-transform ease-in duration-200 ${sortByValue === PaginationSort.ASC && "rotate-180"}`} />}
              </button>
            </div>
          </div>

          {transactions?.map(({ hash, timeStamp, value }) => (
            <div key={hash} className="flex border-b border-b-white/10 text-xs transition-colors hover:bg-black/5 hover:dark:bg-white/10">
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

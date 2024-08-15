"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";
import Link from "next/link";
import Logo from "@/components/Logo";
import { PaginationSort, type Transaction } from "@/config/types";
import useSWR from "swr";
import TimeAgo from "@/components/TimeAgo";
import { formatEther } from "@/utils/ether";
import { CHAINS, type SupportedChains } from "@/config/constants";
import { BxChevronLeft, UilArrowDown } from "@/config/icons";
import AddressBalance from "@/components/AddressBalance";
import { Address } from "viem";
import { getTransactionsFetchUrl } from "@/utils/api";
import LoaderTxList from "@/components/LoaderTxList";

const initialSort = PaginationSort.DESC;

export default function AddressPage({ params: { address, chain } }: { params: { address: Address; chain: SupportedChains } }) {
  const [sortByTampStamp, setSortByTampStamp] = useState<PaginationSort | undefined>(initialSort);
  const [sortByValue, setSortByValue] = useState<PaginationSort | undefined>(undefined);

  const setSortingByTimeStamp = () => {
    if (sortByTampStamp === PaginationSort.DESC) {
      setSortByTampStamp(PaginationSort.ASC);
    } else {
      setSortByTampStamp(PaginationSort.DESC);
    }
    setSortByValue(undefined);
  };
  const setSortingByValue = () => {
    if (sortByValue === PaginationSort.DESC) {
      setSortByValue(PaginationSort.ASC);
    } else {
      setSortByValue(PaginationSort.DESC);
    }
    setSortByTampStamp(undefined);
  };

  const { data, isLoading, error } = useSWR<{ data: Transaction[] }>(getTransactionsFetchUrl({ address, chain, sort: sortByTampStamp }));

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
        <div className="flex w-full flex-col justify-center pb-6 pt-8 text-center font-bold lg:static lg:w-auto lg:flex-row lg:rounded-xl lg:p-4">
          <span className="mr-2 opacity-50">Address:</span>
          <br className="md:hidden" />
          <span className="font-mono text-xs lg:text-sm">{address}</span>
          <span className="mt-2 inline-block lg:mt-0">
            <CopyButton copy={address} />
          </span>
        </div>
        <div className="flex w-full justify-center pb-6 pt-8 font-bold lg:static lg:w-auto lg:rounded-xl lg:p-4">
          <AddressBalance address={address} chain={chain} />
        </div>
      </div>

      {isLoading && <LoaderTxList />}

      {!isLoading && (
        <div className="mt-10 w-full lg:max-w-4xl">
          <div className="w-full rounded-md border border-black/10 text-sm dark:border-white/10">
            <div className="flex flex-row border-b border-b-black/10 dark:border-b-white/10">
              <div className="hidden w-8/12 p-3 text-left opacity-40 md:block">Hash</div>
              <div className="p-3 text-left lg:w-2/12">
                <button className="opacity-40 hover:opacity-70 active:scale-95" onClick={setSortingByTimeStamp}>
                  Timestamp
                  {sortByTampStamp && <UilArrowDown className={`inline-block transition-transform ease-in duration-200 ${sortByTampStamp === PaginationSort.ASC && "rotate-180"}`} />}
                </button>
              </div>
              <div className="p-3 text-left lg:w-2/12">
                <button className="opacity-40 hover:opacity-70 active:scale-95" onClick={setSortingByValue}>
                  Amount
                  {sortByValue && <UilArrowDown className={`inline-block transition-transform ease-in duration-200 ${sortByValue === PaginationSort.ASC && "rotate-180"}`} />}
                </button>
              </div>
            </div>

            {transactions?.map((tx) => (
              <div key={tx.hash} className="flex flex-col border-b border-b-black/10 py-2 text-xs transition-colors hover:bg-black/5 dark:border-b-white/10 lg:flex-row lg:py-0">
                <div className="break-words px-3 py-1 text-left font-mono lg:w-8/12 lg:px-3 lg:py-3">
                  <span className="mr-2 opacity-40 lg:hidden">Hash:</span>
                  <Link className="text-primary" href={`./tx/${tx.hash}`}>
                    {tx.hash}
                  </Link>
                </div>
                <div className="px-3 py-1 text-left lg:w-2/12 lg:px-3 lg:py-3">
                  <span className="mr-2 opacity-40 lg:hidden">Timestamp:</span>
                  <TimeAgo timeStamp={tx.timeStamp} />
                </div>
                <div className="px-3 py-1 text-left font-mono lg:w-2/12 lg:px-3 lg:py-3">
                  <span className="mr-2 opacity-40 lg:hidden">Amount:</span>
                  {formatEther(tx.value)} {CHAINS[chain].nativeCurrency.symbol}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

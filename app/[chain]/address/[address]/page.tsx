"use client";

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
import { useTransitionsSort } from "@/hooks/useTransactionsSort";

export default function AddressPage({ params: { address, chain } }: { params: { address: Address; chain: SupportedChains } }) {
  const { sortingOptions, sortTransaction, sortByTimeStamp, sortByValue } = useTransitionsSort();

  const { data, isLoading, error } = useSWR<{ data: Transaction[] }>(getTransactionsFetchUrl({ address, chain, sort: sortingOptions.timeStamp }));

  if (error) {
    // TODO: Add error handler
  }

  // TODO: Something strange happened here with `data?.data`
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
                <button className="opacity-40 hover:opacity-70 active:scale-95" onClick={sortByTimeStamp}>
                  Timestamp
                  {sortingOptions.timeStamp && <UilArrowDown className={`inline-block transition-transform ease-in duration-200 ${sortingOptions.timeStamp === PaginationSort.ASC && "rotate-180"}`} />}
                </button>
              </div>
              <div className="p-3 text-left lg:w-2/12">
                <button className="opacity-40 hover:opacity-70 active:scale-95" onClick={sortByValue}>
                  Amount
                  {sortingOptions.value && <UilArrowDown className={`inline-block transition-transform ease-in duration-200 ${sortingOptions.value === PaginationSort.ASC && "rotate-180"}`} />}
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

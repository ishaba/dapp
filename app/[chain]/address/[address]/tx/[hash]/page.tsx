"use client";

import useSWR from "swr";
import CopyButton from "@/components/CopyButton";
import Link from "next/link";
import Logo from "@/components/Logo";
import Tooltip from "@/components/Tooltip";
import { CHAINS, type SupportedChains } from "@/config/constants";
import { type Transaction } from "@/config/types";
import LoaderTxDetails from "@/components/LoaderTxDetails";

import { Address, Hash } from "viem";
import TimeAgo from "@/components/TimeAgo";
import { formatEther, formatGasPrice, formatWeiToEth } from "@/utils/ether";
import { getTransactionsFetchUrl, getTxStatusFetchUrl } from "@/utils/api";
import { BxChevronLeft, LightningIcon, StatusFailIcon, StatusSuccessIcon } from "@/config/icons";
import { useTransitionsSort } from "@/hooks/useTransactionsSort";

type TxPageParams = { address: Address; hash: Hash; chain: SupportedChains };

export default function TxPage({ params: { address, hash, chain } }: { params: TxPageParams }) {
  const { sortingOptions } = useTransitionsSort();

  // Just realised that etherscan do not have endpoint to get info of tx by it's hash
  // I was counting on this :/ In order to save the time let's use this approuch as temporary solution
  // placing tx page under address page
  // possible bettter would be to make some client side store and get alredy loaded data from there
  // and we steel need to update this data somehow...
  // anyway! there is some other tasks which i find better to proceed with atm
  // OR! we just need to keep the key for swr cache across pages then it will do the job!
  const { data, isLoading, error } = useSWR<{ data: Transaction[] }>(getTransactionsFetchUrl({ address, chain, sort: sortingOptions.timeStamp }));

  const transactions = data?.data;
  const tx = transactions?.find((tx) => tx.hash === hash);

  if (error) {
    // TODO: Add error handler
  }

  const txStatus = useSWR(getTxStatusFetchUrl({ txhash: hash, chain }));

  // looks like we don't need this request since it's response is the same as transactions.txreceipt_status ?
  // check this
  console.log("txStatus", txStatus);

  const explorerName = CHAINS[chain].blockExplorers?.default.name;
  const explorerLink = CHAINS[chain].blockExplorers?.default.url;

  return (
    <main className="flex min-h-screen flex-col items-center p-6 lg:-mb-20 lg:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="flex w-full pb-6 pt-8 font-bold lg:static lg:w-auto lg:justify-center lg:rounded-xl lg:p-4">
          <Link href={`/${chain}`} className="group relative flex hover:text-primary">
            <BxChevronLeft className="absolute -left-5 top-0 translate-x-1 opacity-0 transition-all duration-100 ease-out group-hover:translate-x-0 group-hover:opacity-80 group-hover:duration-200" />
            <Logo chain={chain} />
          </Link>
        </div>
        <div className="flex w-full pb-6 pt-8 font-bold lg:static lg:w-auto lg:justify-center lg:rounded-xl lg:p-4">
          <div>Transaction Details</div>
        </div>
      </div>

      {isLoading && <LoaderTxDetails />}

      {!isLoading && (
        <div className="mt-10 w-full rounded-md border border-black/15 text-sm dark:border-white/15 lg:max-w-5xl lg:p-2">
          <div>
            <div className="flex flex-col p-3 lg:flex-row">
              <div className="pb-2 text-black/60 dark:text-white/60 lg:w-3/12 lg:pb-0">
                <Tooltip text="A TxHash or transaction hash is a unique 66-character identifier that is generated whenever a transaction is executed." />
                Transaction Hash:
              </div>
              <div className="break-words font-mono lg:w-6/12">
                {tx?.hash}
                {tx?.hash && <CopyButton copy={tx?.hash} />}
                <span className="mt-1 inline-block lg:ml-2 lg:mt-0">
                  <a className="whitespace-nowrap text-xs text-primary hover:underline" href={`${explorerLink}/tx/${tx?.hash}`} target="_blank" rel="noopener noreferrer">
                    View on {explorerName}
                  </a>
                </span>
              </div>
            </div>
            <div className="flex flex-col p-3 lg:flex-row">
              <div className="pb-2 text-black/60 dark:text-white/60 lg:w-3/12 lg:pb-0">
                <Tooltip text="The status of the transaction." />
                Status:
              </div>
              <div className="lg:w-6/12">
                {tx?.txreceipt_status === "1" ? (
                  <span className="rounded-md border border-green-300 bg-green-500/20 px-2 py-1 text-xs">
                    <StatusSuccessIcon className="relative -top-px inline-block" /> Success
                  </span>
                ) : (
                  <span className="rounded-md border border-red-300 bg-red-500/20 px-2 py-1 text-xs">
                    <StatusFailIcon className="relative -top-px inline-block" /> Error
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col p-3 lg:flex-row">
              <div className="pb-2 text-black/60 dark:text-white/60 lg:w-3/12 lg:pb-0">
                <Tooltip text="Number of the block in which the transaction is recorded. Block confirmations indicate how many blocks have been added since the transaction was produced." />
                Block:
              </div>
              <div className="lg:w-6/12">
                <span className="inline-block align-middle">{tx?.blockNumber}</span>
                {tx?.confirmations && <span className="ml-2 rounded-md border border-white/20 px-2 py-1 align-middle text-[10px]">{tx?.confirmations} Block Confirmations</span>}
              </div>
            </div>
            <div className="flex flex-col p-3 lg:flex-row">
              <div className="pb-2 text-black/60 dark:text-white/60 lg:w-3/12 lg:pb-0">
                <Tooltip text="The date and time at which a transaction is produced." />
                Timestamp:
              </div>
              <div className="lg:w-6/12">{tx?.timeStamp && <TimeAgo timeStamp={tx?.timeStamp} />}</div>
            </div>
            <div className="flex flex-col p-3 lg:flex-row">
              <div className="pb-2 text-black/60 dark:text-white/60 lg:w-3/12 lg:pb-0">
                <Tooltip text="Highlighted events of the transaction.">
                  <LightningIcon className="text-primary" />
                </Tooltip>
                Transaction Action:
              </div>
              <div className="break-words lg:w-6/12"></div>
            </div>
            <div className="flex flex-col p-3 lg:flex-row">
              <div className="pb-2 text-black/60 dark:text-white/60 lg:w-3/12 lg:pb-0">
                <Tooltip text="The sending party of the transaction." />
                From:
              </div>
              <div className="break-words font-mono lg:w-6/12">
                <Link className="text-primary hover:underline" href={`../../../../address/${tx?.from}`}>
                  {tx?.from}
                </Link>
                <CopyButton copy={tx?.from} />
              </div>
            </div>
            <div className="flex flex-col p-3 lg:flex-row">
              <div className="pb-2 text-black/60 dark:text-white/60 lg:w-3/12 lg:pb-0">
                <Tooltip text="The receiving party of the transaction (could be a contract address)." />
                To:
              </div>
              <div className="break-words font-mono lg:w-6/12">
                <Link className="text-primary hover:underline" href={`../../../../address/${tx?.to}`}>
                  {tx?.to}
                </Link>
                <CopyButton copy={tx?.to} />
              </div>
            </div>
            <div className="flex flex-col p-3 lg:flex-row">
              <div className="pb-2 text-black/60 dark:text-white/60 lg:w-3/12 lg:pb-0">
                <Tooltip text="The value being transacted in Ether and fiat value. Note: You can click the fiat value (if available) to see historical value at the time of transaction." />
                Value:
              </div>
              <div className="lg:w-6/12">
                {formatEther(tx?.value)} {CHAINS[chain].nativeCurrency.symbol}
              </div>
            </div>
            <div className="flex flex-col p-3 lg:flex-row">
              <div className="pb-2 text-black/60 dark:text-white/60 lg:w-3/12 lg:pb-0">
                <Tooltip text="Amount paid to process the transaction in Ether and fiat value." />
                Transaction Fee:
              </div>
              <div className="lg:w-6/12">
                {tx?.gasPrice && tx?.gasUsed ? formatWeiToEth(BigInt(tx?.gasPrice) * BigInt(tx?.gasUsed)) : "0"} {CHAINS[chain].nativeCurrency.symbol}
              </div>
            </div>
            <div className="flex flex-col p-3 lg:flex-row">
              <div className="pb-2 text-black/60 dark:text-white/60 lg:w-3/12 lg:pb-0">
                <Tooltip text="Cost per unit of gas spent for the transaction, in Ether and Gwei." />
                Gas Price:
              </div>
              <div className="lg:w-6/12">
                <span className="mr-2 whitespace-nowrap">{formatGasPrice(tx?.gasPrice)} Gwei</span>
                <br className="md:hidden" />
                <span className="whitespace-nowrap opacity-50">
                  ({tx?.gasPrice && tx?.gasUsed ? formatWeiToEth(BigInt(tx?.gasPrice)) : "0"} {CHAINS[chain].nativeCurrency.symbol})
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

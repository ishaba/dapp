"use client";

import useSWR from "swr";
import CopyButton from "@/components/CopyButton";
import Link from "next/link";
import Logo from "@/components/Logo";
import Tooltip from "@/components/Tooltip";
import { CHAINS, type SupportedChains } from "@/config/constants";
import { type Transaction } from "@/config/types";

import { Address, Hash } from "viem";
import TimeAgo from "@/components/TimeAgo";
import { formatEther, formatGasPrice, formatWeiToEth } from "@/utils/ether";
import { getTransactionsFetchUrl } from "@/utils/api";
import { BxChevronLeft, LightningIcon, StatusFailIcon, StatusSuccessIcon } from "@/config/icons";

type TxPageParams = { address: Address; hash: Hash; chain: SupportedChains };

export default function TxPage({ params: { address, hash, chain } }: { params: TxPageParams }) {
  // Just realised that etherscan do not have endpoint to get info of tx by it's hash
  // I was counting on this :/ In order to save the time let's use this approuch as temporary solution
  // placing tx page under address page
  // possible bettter would be to make some client side store and get alredy loaded data from there
  // and we steel need to update this data somehow...
  // anyway! there is some other tasks which i find better to proceed with atm
  const { data, isLoading, error } = useSWR<{ data: Transaction[] }>(getTransactionsFetchUrl({ address, chain }));

  const transactions = data?.data;
  const tx = transactions?.find((tx) => tx.hash === hash);

  if (isLoading) {
    // TODO: Add loader
  }

  if (error) {
    // TODO: Add error handler
  }

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

      {isLoading && (
        <div role="status">
          <svg aria-hidden="true" className="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}

      {!isLoading && (
        <div className="mt-10 w-full rounded-md border border-white/15 text-sm lg:max-w-5xl lg:p-2">
          <div>
            <div className="flex flex-col p-3 lg:flex-row">
              <div className="pb-2 text-white/60 lg:w-3/12 lg:pb-0">
                <Tooltip text="A TxHash or transaction hash is a unique 66-character identifier that is generated whenever a transaction is executed." />
                Transaction Hash:
              </div>
              <div className="break-words font-mono lg:w-6/12">
                {tx?.hash}
                {tx?.hash && <CopyButton copy={tx?.hash} />}
              </div>
            </div>
            <div className="flex flex-col p-3 lg:flex-row">
              <div className="pb-2 text-white/60 lg:w-3/12 lg:pb-0">
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
              <div className="pb-2 text-white/60 lg:w-3/12 lg:pb-0">
                <Tooltip text="Number of the block in which the transaction is recorded. Block confirmations indicate how many blocks have been added since the transaction was produced." />
                Block:
              </div>
              <div className="lg:w-6/12">
                <span className="inline-block align-middle">{tx?.blockNumber}</span>
                {tx?.confirmations && <span className="ml-2 rounded-md border border-white/20 px-2 py-1 align-middle text-[10px]">{tx?.confirmations} Block Confirmations</span>}
              </div>
            </div>
            <div className="flex flex-col p-3 lg:flex-row">
              <div className="pb-2 text-white/60 lg:w-3/12 lg:pb-0">
                <Tooltip text="The date and time at which a transaction is produced." />
                Timestamp:
              </div>
              <div className="lg:w-6/12">{tx?.timeStamp && <TimeAgo timeStamp={tx?.timeStamp} />}</div>
            </div>
            <div className="flex flex-col p-3 lg:flex-row">
              <div className="pb-2 text-white/60 lg:w-3/12 lg:pb-0">
                <Tooltip text="Highlighted events of the transaction.">
                  <LightningIcon className="text-primary" />
                </Tooltip>
                Transaction Action:
              </div>
              <div className="break-words lg:w-6/12"></div>
            </div>
            <div className="flex flex-col p-3 lg:flex-row">
              <div className="pb-2 text-white/60 lg:w-3/12 lg:pb-0">
                <Tooltip text="The sending party of the transaction." />
                From:
              </div>
              <div className="break-words font-mono lg:w-6/12">
                <Link className="text-primary" href={`../../../../address/${tx?.from}`}>
                  {tx?.from}
                </Link>
                <CopyButton copy={tx?.from} />
              </div>
            </div>
            <div className="flex flex-col p-3 lg:flex-row">
              <div className="pb-2 text-white/60 lg:w-3/12 lg:pb-0">
                <Tooltip text="The receiving party of the transaction (could be a contract address)." />
                To:
              </div>
              <div className="break-words font-mono lg:w-6/12">
                <Link className="text-primary" href={`../../../../address/${tx?.to}`}>
                  {tx?.to}
                </Link>
                <CopyButton copy={tx?.to} />
              </div>
            </div>
            <div className="flex flex-col p-3 lg:flex-row">
              <div className="pb-2 text-white/60 lg:w-3/12 lg:pb-0">
                <Tooltip text="The value being transacted in Ether and fiat value. Note: You can click the fiat value (if available) to see historical value at the time of transaction." />
                Value:
              </div>
              <div className="lg:w-6/12">
                {formatEther(tx?.value)} {CHAINS[chain].nativeCurrency.symbol}
              </div>
            </div>
            <div className="flex flex-col p-3 lg:flex-row">
              <div className="pb-2 text-white/60 lg:w-3/12 lg:pb-0">
                <Tooltip text="Amount paid to process the transaction in Ether and fiat value." />
                Transaction Fee:
              </div>
              <div className="lg:w-6/12">
                {tx?.gasPrice && tx?.gasUsed ? formatWeiToEth(BigInt(tx?.gasPrice) * BigInt(tx?.gasUsed)) : "0"} {CHAINS[chain].nativeCurrency.symbol}
              </div>
            </div>
            <div className="flex flex-col p-3 lg:flex-row">
              <div className="pb-2 text-white/60 lg:w-3/12 lg:pb-0">
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

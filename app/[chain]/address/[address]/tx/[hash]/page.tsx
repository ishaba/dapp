"use client";

import useSWR from "swr";
import CopyButton from "@/components/CopyButton";
import BxChevronLeft from "~icons/bx/chevron-left";
import Link from "next/link";
import Logo from "@/components/Logo";
import Tooltip from "@/components/Tooltip";
import fetcher from "@/utils/fetcher";
import { CHAINS, type SupportedChains } from "@/config/constants";
import { type Transaction } from "@/config/types";
import LightningIcon from "~icons/iconamoon/lightning-1";
import { Address, Hash } from "viem";
import TimeAgo from "@/components/TimeAgo";
import { format } from "@/utils/ether";
import StatusFailIcon from "~icons/clarity/times-circle-solid";
import StatusSuccessIcon from "~icons/clarity/check-circle-solid";

type TxPageParams = { address: Address; hash: Hash; chain: SupportedChains };

const formatGasPrice = (input?: string) => {
  if (!input) return;
  const wei = BigInt(input);
  const gwei = wei / BigInt(1e9);
  const decimals = wei % BigInt(1e9);
  return `${gwei}.${decimals.toString().padStart(9, "0")}`;
};

const formatWeiToEth = (input?: bigint) => {
  if (!input) return;
  const wei = BigInt(input.toString());
  const eth = wei / BigInt(1e18);
  const decimals = wei % BigInt(1e18);
  return eth.toString() + "." + decimals.toString().padStart(18, "0").slice(0, 18);
};

export default function TxPage({ params: { address, hash, chain } }: { params: TxPageParams }) {
  // Just realised that etherscan do not have endpoint to get info of tx by it's hash
  // I was counting on this :/ In order to save the time let's use this approuch as temporary solution
  // placing tx page under address page
  // possible bettter would be to make some client side store and get alredy loaded data from there
  // and we steel need to update this data somehow...
  // anyway! there is some other tasks which i find better to proceed with atm

  const { data, isLoading, error } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/transactions?address=${address}&chain=${chain}`, fetcher<{ data: Transaction[] }>, {
    refreshInterval: 3000,
  });

  const transactions = data?.data;

  const tx = transactions?.find((tx) => tx.hash === hash);

  if (isLoading) {
    // TODO: Add loader
  }

  if (error) {
    // TODO: Add error handler
  }

  // TODO:
  // REquests for addition d

  return (
    <main className="flex min-h-screen flex-col items-center p-6 lg:-mb-20 lg:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="flex w-full pb-6 pt-8 font-bold lg:static lg:w-auto lg:justify-center lg:rounded-xl lg:p-4">
          <Link href={`/${chain}`} className="group relative flex hover:text-primary">
            <BxChevronLeft className="absolute -left-5 top-0 translate-x-1 opacity-0 transition-all duration-100 ease-out group-hover:translate-x-0 group-hover:opacity-80 group-hover:duration-200" />
            <Logo chain={chain} />
          </Link>
        </div>
        <div className="flex w-full justify-center pb-6 pt-8 font-bold lg:static lg:w-auto lg:rounded-xl lg:p-4"></div>
        <div className="flex w-full pb-6 pt-8 font-bold lg:static lg:w-auto lg:justify-center lg:rounded-xl lg:p-4">
          <div>Transaction Details</div>
        </div>
      </div>

      <div className="mt-10 w-full rounded-md border border-white/15 text-sm lg:max-w-5xl lg:p-2">
        <div>
          <div className="flex flex-col p-3 lg:flex-row">
            <div className="w-3/12 text-white/60">
              <Tooltip text="A TxHash or transaction hash is a unique 66-character identifier that is generated whenever a transaction is executed." />
              Transaction Hash:
            </div>
            <div className="w-6/12 break-words font-mono">
              {tx?.hash}
              {tx?.hash && <CopyButton copy={tx?.hash} />}
            </div>
          </div>
          <div className="flex flex-col p-3 lg:flex-row">
            <div className="w-3/12 text-white/60">
              <Tooltip text="The status of the transaction." />
              Status:
            </div>
            <div className="w-6/12">
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
            <div className="w-3/12 text-white/60">
              <Tooltip text="Number of the block in which the transaction is recorded. Block confirmations indicate how many blocks have been added since the transaction was produced." />
              Block:
            </div>
            <div className="w-6/12">
              <span className="inline-block align-middle">{tx?.blockNumber}</span>
              {tx?.confirmations && <span className="ml-2 rounded-md border border-white/20 px-2 py-1 align-middle text-[10px]">{tx?.confirmations} Block Confirmations</span>}
            </div>
          </div>
          <div className="flex flex-col p-3 lg:flex-row">
            <div className="w-3/12 text-white/60">
              <Tooltip text="The date and time at which a transaction is produced." />
              Timestamp:
            </div>
            <div className="w-6/12">{tx?.timeStamp && <TimeAgo timeStamp={tx?.timeStamp} />}</div>
          </div>
          <div className="flex flex-col p-3 lg:flex-row">
            <div className="w-3/12 text-white/60">
              <Tooltip text="Highlighted events of the transaction.">
                <LightningIcon className="text-primary" />
              </Tooltip>
              Transaction Action:
            </div>
            <div className="w-6/12 break-words"></div>
          </div>
          <div className="flex flex-col p-3 lg:flex-row">
            <div className="w-3/12 text-white/60">
              <Tooltip text="The sending party of the transaction." />
              From:
            </div>
            <div className="w-6/12 break-words font-mono">
              <Link className="text-primary" href={`../../address/${tx?.from}`}>
                {tx?.from}
              </Link>
              <CopyButton copy={tx?.from} />
            </div>
          </div>
          <div className="flex flex-col p-3 lg:flex-row">
            <div className="w-3/12 text-white/60">
              <Tooltip text="The receiving party of the transaction (could be a contract address)." />
              To:
            </div>
            <div className="w-6/12 break-words font-mono">
              <Link className="text-primary" href={`../../address/${tx?.to}`}>
                {tx?.to}
              </Link>
              <CopyButton copy={tx?.to} />
            </div>
          </div>
          <div className="flex flex-col p-3 lg:flex-row">
            <div className="w-3/12 text-white/60">
              <Tooltip text="The value being transacted in Ether and fiat value. Note: You can click the fiat value (if available) to see historical value at the time of transaction." />
              Value:
            </div>
            <div className="w-6/12">
              {format(tx?.value)} {CHAINS[chain].nativeCurrency.symbol}
            </div>
          </div>
          <div className="flex flex-col p-3 lg:flex-row">
            <div className="w-3/12 text-white/60">
              <Tooltip text="Amount paid to process the transaction in Ether and fiat value." />
              Transaction Fee:
            </div>
            <div className="w-6/12">
              {tx?.gasPrice && tx?.gasUsed ? formatWeiToEth(BigInt(tx?.gasPrice) * BigInt(tx?.gasUsed)) : "0"} {CHAINS[chain].nativeCurrency.symbol}
            </div>
          </div>
          <div className="flex flex-col p-3 lg:flex-row">
            <div className="w-3/12 text-white/60">
              <Tooltip text="Cost per unit of gas spent for the transaction, in Ether and Gwei." />
              Gas Price:
            </div>
            <div className="w-6/12">
              {formatGasPrice(tx?.gasPrice)} Gwei
              <span className="ml-2 opacity-50">
                ({tx?.gasPrice && tx?.gasUsed ? formatWeiToEth(BigInt(tx?.gasPrice)) : "0"} {CHAINS[chain].nativeCurrency.symbol})
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

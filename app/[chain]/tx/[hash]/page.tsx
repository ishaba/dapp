import CopyButton from "@/components/CopyButton";
import BxChevronLeft from "~icons/bx/chevron-left";
import Link from "next/link";
import Logo from "@/components/Logo";
import Tooltip from "@/components/Tooltip";
import { type SupportedChains } from "@/config/constants";
import LightningIcon from "~icons/iconamoon/lightning-1";

const transaction = {
  hash: "0x610f2aee99ac008541ed9fe37ff1205a408074547c6eb7b7667f73d5ab8d987b",
  status: "Success",
  block: "20521821 189 Block Confirmations",
  timestamp: "38 mins ago (Aug-13-2024 07:34:11 PM UTC)|Confirmed within 7 secs",
  action: "Transfer 0.000037599999409933 ($0.10) ETH To 0x5358335dFC42f9b875D4C5bB18aDD866217dB542",
  from: "0x8195d57124952742815d636dba4c951d524ea74f",
  to: "0x5358335dFC42f9b875D4C5bB18aDD866217dB542",
  value: "0.000037599999409933 ETH ($0.10)",
  fee: "0.00003089502612 ETH ($0.08)",
  price: "1.47119172 Gwei (0.00000000147119172 ETH)",
};

export default async function TxPage({ params: { hash, chain } }: { params: { hash: string; chain: SupportedChains } }) {
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
            </div>{" "}
            <div className="w-6/12 break-words">
              {transaction.hash}
              <CopyButton copy={transaction.hash} />
            </div>
          </div>
          <div className="flex flex-col p-3 lg:flex-row">
            <div className="w-3/12 text-white/60">
              <Tooltip text="The status of the transaction." />
              Status:
            </div>
            <div className="w-6/12">{transaction.status}</div>
          </div>
          <div className="flex flex-col p-3 lg:flex-row">
            <div className="w-3/12 text-white/60">
              <Tooltip text="Number of the block in which the transaction is recorded. Block confirmations indicate how many blocks have been added since the transaction was produced." />
              Block:
            </div>
            <div className="w-6/12">{transaction.block}</div>
          </div>
          <div className="flex flex-col p-3 lg:flex-row">
            <div className="w-3/12 text-white/60">
              <Tooltip text="The date and time at which a transaction is produced." />
              Timestamp:
            </div>
            <div className="w-6/12">{transaction.timestamp}</div>
          </div>
          <div className="flex flex-col p-3 lg:flex-row">
            <div className="w-3/12 text-white/60">
              <Tooltip text="Highlighted events of the transaction.">
                <LightningIcon className="text-primary" />
              </Tooltip>
              Transaction Action:
            </div>
            <div className="w-6/12 break-words">{transaction.action}</div>
          </div>
          <div className="flex flex-col p-3 lg:flex-row">
            <div className="w-3/12 text-white/60">
              <Tooltip text="The sending party of the transaction." />
              From:
            </div>
            <div className="w-6/12 break-words font-mono">
              <Link className="text-primary" href={`../../address/${transaction.from}`}>
                {transaction.from}
              </Link>
              <CopyButton copy={transaction.from} />
            </div>
          </div>
          <div className="flex flex-col p-3 lg:flex-row">
            <div className="w-3/12 text-white/60">
              <Tooltip text="The receiving party of the transaction (could be a contract address)." />
              To:
            </div>
            <div className="w-6/12 break-words font-mono">
              <Link className="text-primary" href={`../../address/${transaction.to}`}>
                {transaction.to}
              </Link>
              <CopyButton copy={transaction.to} />
            </div>
          </div>
          <div className="flex flex-col p-3 lg:flex-row">
            <div className="w-3/12 text-white/60">
              <Tooltip text="The value being transacted in Ether and fiat value. Note: You can click the fiat value (if available) to see historical value at the time of transaction." />
              Value:
            </div>
            <div className="w-6/12">{transaction.value}</div>
          </div>
          <div className="flex flex-col p-3 lg:flex-row">
            <div className="w-3/12 text-white/60">
              <Tooltip text="Amount paid to process the transaction in Ether and fiat value." />
              Transaction Fee:
            </div>
            <div className="w-6/12">{transaction.fee}</div>
          </div>
          <div className="flex flex-col p-3 lg:flex-row">
            <div className="w-3/12 text-white/60">
              <Tooltip text="Cost per unit of gas spent for the transaction, in Ether and Gwei." />
              Gas Price:
            </div>
            <div className="w-6/12">{transaction.price}</div>
          </div>
        </div>
      </div>
    </main>
  );
}

import BxChevronLeft from "~icons/bx/chevron-left";
import Link from "next/link";
import UilTransaction from "~icons/uil/transaction";

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

export default async function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center p-6 lg:-mb-20 lg:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="flex w-full pb-6 pt-8 font-bold lg:static lg:w-auto lg:justify-center lg:rounded-xl lg:p-4">
          <Link href="/" className="group relative flex hover:text-sky-400">
            <BxChevronLeft className="absolute -left-5 top-0 translate-x-1 opacity-0 transition-all duration-100 ease-out group-hover:translate-x-0 group-hover:opacity-40 group-hover:duration-200" />
            <UilTransaction className="mr-2" />
            Transactions Explorer App
          </Link>
        </div>
        <div className="flex w-full pb-6 pt-8 font-bold lg:static lg:w-auto lg:justify-center lg:rounded-xl lg:p-4">
          <div>Transaction Details</div>
        </div>
      </div>

      <div className="mt-10 w-full lg:max-w-5xl lg:p-4">
        <div>
          <div className="flex flex-col lg:flex-row">
            <div className="w-3/12">Transaction Hash:</div> <div className="w-6/12 break-words">{transaction.hash}</div>
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="w-3/12">Status:</div> <div className="w-6/12">{transaction.status}</div>
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="w-3/12">Block:</div> <div className="w-6/12">{transaction.block}</div>
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="w-3/12">Timestamp:</div> <div className="w-6/12">{transaction.timestamp}</div>
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="w-3/12">Transaction Action:</div> <div className="w-6/12 break-words">{transaction.action}</div>
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="w-3/12">From:</div>
            <div className="w-6/12 break-words">
              <Link className="text-sky-400" href={`/address/${transaction.from}`}>
                {transaction.from}
              </Link>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="w-3/12">To:</div>
            <div className="w-6/12 break-words">
              <Link className="text-sky-400" href={`/address/${transaction.to}`}>
                {transaction.to}
              </Link>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="w-3/12">Value:</div> <div className="w-6/12">{transaction.value}</div>
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="w-3/12">Transaction Fee:</div> <div className="w-6/12">{transaction.fee}</div>
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="w-3/12">Gas Price:</div> <div className="w-6/12">{transaction.price}</div>
          </div>
        </div>
      </div>
    </main>
  );
}

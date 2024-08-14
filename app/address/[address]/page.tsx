import BxChevronLeft from "~icons/bx/chevron-left";
import Link from "next/link";
import UilCopy from "~icons/uil/copy";
import UilTransaction from "~icons/uil/transaction";

const transactions = [
  {
    hash: "0x0000000000000000000000000000000000000000",
    timeStamp: "1 min ago",
    amount: "0.0001",
  },
];

export default async function Page() {
  const address = "0x0000000000000000000000000000000000000000";
  const balance = 0;
  return (
    <main className="flex min-h-screen lg:-mb-20 flex-col items-center p-6 lg:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className=" flex w-full justify-center pb-6 pt-8 lg:static lg:w-auto lg:rounded-xl lg:p-4 font-bold">
          <Link href="/" className="flex hover:text-sky-400 relative group">
            <BxChevronLeft className="opacity-0 absolute top-0 -left-5 translate-x-1 group-hover:opacity-40 group-hover:translate-x-0 transition-all duration-100 ease-out group-hover:duration-200" />
            <UilTransaction className="mr-2" />
            Transactions Explorer App
          </Link>
        </div>
        <div className=" flex w-full justify-center pb-6 pt-8 lg:static lg:w-auto lg:rounded-xl lg:p-4 font-bold">
          <div>
            <span className="opacity-50">Address:</span> {address}
            <button className="inline-block align-top ml-2 opacity-50 transition-opacity duration-300 ease-out hover:opacity-100 active:scale-95" title="Copy to clipboard">
              <UilCopy />
            </button>
          </div>
        </div>
        <div className=" flex w-full justify-center pb-6 pt-8 lg:static lg:w-auto lg:rounded-xl lg:p-4 font-bold">
          <div>
            <span className="opacity-50">Balance:</span> {balance}
          </div>
        </div>
      </div>

      <div className="mt-10 w-full lg:max-w-3xl">
        <table className="w-full">
          <thead>
            <tr className="border-b border-b-white/10">
              <th className="text-left p-2 opacity-40">Hash</th>
              <th className="text-center p-2 opacity-40">Timestamp</th>
              <th className="text-right p-2 opacity-40">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(({ hash, timeStamp, amount }) => (
              <tr className="border-b border-b-white/10 transition-colors hover:bg-black/5 hover:dark:bg-white/5">
                <td className="text-left p-2">
                  <Link className="text-sky-400" href={`/tx/${hash}`}>
                    {hash}
                  </Link>
                </td>
                <td className="text-center p-2">{timeStamp}</td>
                <td className="text-right p-2">{amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

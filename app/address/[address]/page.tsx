"use client";

import AddressEntry from "@/utils/fetcher";
import BxChevronLeft from "~icons/bx/chevron-left";
import Link from "next/link";
import UilTransaction from "~icons/uil/transaction";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";

const transactions = [
  {
    hash: "0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5",
    timeStamp: "1 min ago",
    amount: "0.0001",
  },
];

export default function Page({ params: { address } }: { params: { address: string } }) {
  const balance = 0;

  const { data, isLoading, error } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/transactions?address=${address}`, fetcher);

  console.log(data, isLoading, error);

  return (
    <main className="flex min-h-screen flex-col items-center p-6 lg:-mb-20 lg:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="flex w-full justify-center pb-6 pt-8 font-bold lg:static lg:w-auto lg:rounded-xl lg:p-4">
          <Link href="/" className="group relative flex hover:text-sky-400">
            <BxChevronLeft className="absolute -left-5 top-0 translate-x-1 opacity-0 transition-all duration-100 ease-out group-hover:translate-x-0 group-hover:opacity-40 group-hover:duration-200" />
            <UilTransaction className="mr-2" />
            Transactions Explorer App
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

      <div className="mt-10 w-full lg:max-w-3xl">
        <table className="w-full">
          <thead>
            <tr className="border-b border-b-white/10">
              <th className="p-2 text-left opacity-40">Hash</th>
              <th className="p-2 text-center opacity-40">Timestamp</th>
              <th className="p-2 text-right opacity-40">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(({ hash, timeStamp, amount }) => (
              <tr key={hash} className="border-b border-b-white/10 transition-colors hover:bg-black/5 hover:dark:bg-white/5">
                <td className="p-2 text-left">
                  <Link className="text-sky-400" href={`/tx/${hash}`}>
                    {hash}
                  </Link>
                </td>
                <td className="p-2 text-center">{timeStamp}</td>
                <td className="p-2 text-right">{amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

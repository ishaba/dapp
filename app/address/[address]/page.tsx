export default async function Page() {
  const address = "0x00";
  const balance = 0;
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed left-0 top-0 flex w-full justify-center pb-6 pt-8 lg:static lg:w-auto lg:rounded-xl lg:p-4 font-bold">Transactions Explorer App</div>
        <div className="fixed left-0 top-10 flex w-full justify-center pb-6 pt-8 lg:static lg:w-auto lg:rounded-xl lg:p-4 font-bold">
          <div>Address {address}</div>
        </div>
        <div className="fixed left-0 top-20 flex w-full justify-center pb-6 pt-8 lg:static lg:w-auto lg:rounded-xl lg:p-4 font-bold">
          <div>Balance {balance}</div>
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
            <tr className="border-b border-b-white/10 transition-colors hover:bg-black/5 hover:dark:bg-white/5">
              <td className="text-left p-2">
                <a href="#">0x00</a>
              </td>
              <td className="text-center p-2">1 min ago</td>
              <td className="text-right p-2">0.0001</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}

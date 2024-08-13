import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed left-0 top-0 flex w-full justify-center pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:p-4 font-bold">Transactions Explorer App</div>
        <div className="fixed left-0 top-0 flex w-full justify-center pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:p-4 font-bold">
          <select name="" id="" className="bg-transparent">
            <option value="">Ethereum</option>
            <option value="">Polygon</option>
          </select>
        </div>
      </div>

      <div className="relative">
        <div className="absolute z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px] "></div>
        <form className="relative">
          <input className="py-2 px-3 rounded-lg mr-2 text-black" type="text" placeholder="0x000" />
          <button className="py-2 px-3 border-gray-300/20 border rounded-lg" type="submit">
            Get Transactions
          </button>
        </form>
      </div>

      <div className="mb-32 lg:w-full lg:max-w-5xl">
        <div className="lg:w-full text-xs lg:text-left mb-4 opacity-60">Recently viewed:</div>
        <div className="text-center lg:mb-0 lg:w-full lg:text-left">
          <a href="#" className="group border-b border-transparent transition-colors hover:border-gray-300 hover:dark:border-neutral-700">
            <span className="text-lg font-semibold">0x000</span>
          </a>
        </div>
      </div>
    </main>
  );
}

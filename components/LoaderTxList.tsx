export default function LoaderTxList() {
  return (
    <div className="mt-10 w-full lg:max-w-4xl">
      <div className="w-full animate-pulse rounded-md border border-white/10 text-sm" style={{ animationDelay: "400ms" }}>
        <div className="flex flex-row border-b border-b-white/10">
          <div className="hidden w-8/12 p-3 text-left opacity-40 md:block">
            <div className="my-1 h-3 w-12 rounded-full bg-gray-200 opacity-50 dark:bg-gray-700"></div>
          </div>
          <div className="p-3 text-left lg:w-2/12">
            <button className="opacity-40 hover:opacity-70 active:scale-95">
              <div className="my-1 h-3 w-20 rounded-full bg-gray-200 opacity-50 dark:bg-gray-700"></div>
            </button>
          </div>
          <div className="p-3 text-left lg:w-2/12">
            <button className="opacity-40 hover:opacity-70 active:scale-95">
              <div className="my-1 h-3 w-16 rounded-full bg-gray-200 opacity-50 dark:bg-gray-700"></div>
            </button>
          </div>
        </div>

        {Array.from(Array(30).keys()).map((_, index) => (
          <div key={index} className="flex animate-pulse flex-col border-b border-b-white/10 py-2 text-xs transition-colors hover:bg-white/5 lg:flex-row lg:py-0">
            <div className="break-words px-3 py-1 text-left font-mono lg:w-8/12 lg:px-3 lg:py-3">
              <span className="mr-2 opacity-40 md:hidden">
                <div className="my-1 h-3 w-12 rounded-full bg-gray-200 opacity-50 dark:bg-gray-700"></div>
              </span>
              <div className="my-1 h-3 w-[470px] max-w-full rounded-full bg-gray-200 opacity-50 dark:bg-gray-700"></div>
            </div>
            <div className="px-3 py-1 text-left lg:w-2/12 lg:px-3 lg:py-3">
              <span className="mr-2 opacity-40 md:hidden">
                <div className="my-1 h-3 w-20 rounded-full bg-gray-200 opacity-50 dark:bg-gray-700"></div>
              </span>
              <div className="my-1 h-3 w-24 max-w-full rounded-full bg-gray-200 opacity-50 dark:bg-gray-700"></div>
            </div>
            <div className="px-3 py-1 text-left font-mono lg:w-2/12 lg:px-3 lg:py-3">
              <span className="mr-2 opacity-40 md:hidden">
                <div className="my-1 h-3 w-16 rounded-full bg-gray-200 opacity-50 dark:bg-gray-700"></div>
              </span>
              <div className="my-1 h-3 w-60 max-w-full rounded-full bg-gray-200 opacity-50 dark:bg-gray-700"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

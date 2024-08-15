export default function LoaderTxDetails() {
  return (
    <div className="mt-10 w-full rounded-md border border-white/15 text-sm lg:max-w-5xl lg:p-2">
      <div>
        {[
          [170, 430],
          [100, 85],
          [80, 210],
          [140, 100],
          [160, 200],
          [60, 430],
          [40, 430],
          [80, 240],
          [160, 400],
          [120, 370],
        ].map((size, index) => (
          <div key={index} className="flex flex-col p-3 lg:flex-row">
            <div className="animate-pulse pb-2 text-white/60 lg:w-3/12 lg:pb-0" style={{ animationDelay: "400ms" }}>
              <div className="my-1 h-3 rounded-full bg-gray-200 opacity-50 dark:bg-gray-700" style={{ width: `${size[0]}px` }}></div>
            </div>
            <div className="animate-pulse break-words font-mono lg:w-6/12">
              <div className="my-1 h-3 max-w-full rounded-full bg-gray-200 dark:bg-gray-700" style={{ width: `${size[1]}px`, height: `${index === 0 ? "24px" : null}` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

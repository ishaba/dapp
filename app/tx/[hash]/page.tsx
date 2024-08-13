export default async function Page() {
  const hash = "0x00";
  const balance = 0;
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed left-0 top-0 flex w-full justify-center pb-6 pt-8 lg:static lg:w-auto lg:rounded-xl lg:p-4 font-bold">Transactions Explorer App</div>
        <div className="fixed left-0 top-10 flex w-full justify-center pb-6 pt-8 lg:static lg:w-auto lg:rounded-xl lg:p-4 font-bold">
          <div>Transaction Details</div>
        </div>
      </div>

      <div className="mt-10 w-full lg:max-w-3xl">
        <div>
          <div>
            <div>Transaction Hash:</div> <div>0x610f2aee99ac008541ed9fe37ff1205a408074547c6eb7b7667f73d5ab8d987b</div>
          </div>
          <div>
            <div>Status:</div> <div>Success</div>
          </div>
          <div>
            <div>Block:</div> <div>20521821 189 Block Confirmations</div>
          </div>
          <div>
            <div>Timestamp:</div> <div>38 mins ago (Aug-13-2024 07:34:11 PM UTC)|Confirmed within 7 secs</div>
          </div>
          <div>
            <div>Transaction Action:</div> <div>Transfer 0.000037599999409933 ($0.10) ETH To 0x5358335dFC42f9b875D4C5bB18aDD866217dB542</div>
          </div>
          <div>
            <div>From:</div> <div>0x8195d57124952742815d636dba4c951d524ea74f</div>
          </div>
          <div>
            <div>To:</div> <div>0x5358335dFC42f9b875D4C5bB18aDD866217dB542</div>
          </div>
          <div>
            <div>Value:</div> <div>0.000037599999409933 ETH ($0.10)</div>
          </div>
          <div>
            <div>Transaction Fee: 0.00003089502612 ETH ($0.08)</div>
          </div>
          <div>
            <div>Gas Price: 1.47119172 Gwei (0.00000000147119172 ETH)</div>
          </div>
        </div>
      </div>
    </main>
  );
}

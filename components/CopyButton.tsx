"use client";

import { UilCheck, UilCopy } from "@/config/icons";
import { useEffect, useState } from "react";

const copyInitial = "Copy Address";
const copySuccess = "Copied!";

export default function CopyButton({ copy }: { copy?: string }) {
  const [copyText, setCopyText] = useState(copyInitial);

  function copyAddress() {
    setCopyText(copySuccess);
    if (copy) navigator.clipboard.writeText(copy);
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCopyText(copyInitial);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [copyText]);

  return (
    <button className="group relative ml-2 inline-block align-top opacity-50 transition-opacity duration-300 ease-out hover:opacity-100 active:scale-95" title="Copy to clipboard" onClick={copyAddress}>
      {copyText === copyInitial ? <UilCopy /> : <UilCheck className="text-primary" />}
      <div className="absolute -left-2 -top-2 h-8 w-8"></div>
      <div className="absolute -right-10 top-7 hidden w-[102px] text-center group-hover:block">
        <div className="absolute -top-[11px] left-1/2 inline-block h-3 w-5 -translate-x-2 overflow-hidden">
          <div className="h-3 w-3 origin-bottom-left rotate-45 transform border border-white/20 bg-black"></div>
        </div>
        <div className="inline-block rounded-md border border-white/20 bg-black px-1.5 py-1 text-xs">{copyText}</div>
      </div>
    </button>
  );
}

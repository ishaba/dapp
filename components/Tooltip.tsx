import { UilQuestionCircle } from "@/config/icons";

export default function Tooltip({ text, children }: { text: string; children?: React.ReactNode }) {
  return (
    <div className="group relative -top-0.5 mr-1.5 inline-block cursor-help align-middle text-white">
      {children ? children : <UilQuestionCircle className="opacity-40" />}
      <div className="absolute -left-2 -top-2 h-8 w-8"></div>
      <div className="absolute -left-8 top-7 z-10 hidden w-[102px] text-center group-hover:block">
        <div className="absolute -top-[11px] left-10 inline-block h-3 w-5 -translate-x-2 overflow-hidden">
          <div className="h-3 w-3 origin-bottom-left rotate-45 transform border border-white/20 bg-black"></div>
        </div>
        <div className="inline-block min-w-60 rounded-md border border-white/20 bg-black px-2 py-2 text-xs">{text}</div>
      </div>
    </div>
  );
}

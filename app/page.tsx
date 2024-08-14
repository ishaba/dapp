import { DEFAULT_CHAIN } from "@/config/constants";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(`/${DEFAULT_CHAIN}`);
}

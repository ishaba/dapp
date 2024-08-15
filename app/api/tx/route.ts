import { type NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { type Transaction } from "@/config/types";
import { getApiKey, getApiUrl } from "@/utils/api";
import { CHAIN_IDS, type SupportedChains, type SupportedChainIDs } from "@/config/constants";
import { Hash } from "viem";

const getTxUrl = (hash: Hash, chainID: SupportedChainIDs) => `${getApiUrl(chainID)}?apikey=${getApiKey(chainID)}&module=account&txhash=${hash}&action=txlistinternal`;

type Response = {
  data?: Record<string, string>;
  error?: string;
};

type ResponseError = {
  error: string;
};

type ResponseData = {
  data: Transaction;
};

type ApiResponse = (Omit<Response, "error"> & ResponseError) | (Omit<Response, "data"> & ResponseData);

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextApiResponse<ApiResponse>) {
  const { searchParams } = new URL(req.nextUrl);
  const hash = searchParams.get("hash") as Hash;
  const chain = searchParams.get("chain") as SupportedChains;
  const chainID = CHAIN_IDS[chain];

  if (!hash) {
    return NextResponse.json({ error: "Mising hash for tx fetch", status: 500 });
  }

  const transactionsUrl = getTxUrl(hash, chainID);

  try {
    const data = await fetch(transactionsUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    return NextResponse.json({ data: data.result, status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to load tx data", status: 500 });
  }
}

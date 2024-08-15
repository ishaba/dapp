import { type NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { type Transaction } from "@/config/types";

// TODO: use SUPPORTED_CHAINS from config here and get apiUrls from viem
const API_URLS = {
  "1": "https://api.etherscan.io/api",
  "137": "https://api.polygonscan.io/api",
};

type SuportedChainIDs = keyof typeof API_URLS;

const API_KEYS = {
  "1": process.env.NEXT_PUBLIC_API_KEY_ETHERSCAN,
  "137": process.env.NEXT_PUBLIC_API_KEY_POLYGONSCAN,
};

const getApiKey = (chainID: SuportedChainIDs) => API_KEYS[chainID] || Object.values(API_KEYS)[0];
const getApiUrl = (chainID: SuportedChainIDs) => API_URLS[chainID] || Object.values(API_URLS)[0];

const ActiveChainID = "1";
const getActiveChainID = (): SuportedChainIDs => ActiveChainID;

const getTransactionsUrl = (address: string, chainID: SuportedChainIDs, page: number, offset: number) =>
  `${getApiUrl(chainID)}?apikey=${getApiKey(chainID)}&module=account&address=${address}&action=txlist&page=${page}&offset=${offset}&sort=desc`;

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
  const address = searchParams.get("address");
  const chainID = getActiveChainID();

  if (!address) {
    return NextResponse.json({ error: "mising address for transactions fetch", status: 500 });
  }

  const page = 1;
  const offset = 100;
  const transactionsUrl = getTransactionsUrl(address, chainID, page, offset);

  try {
    const data = await fetch(transactionsUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    console.log("data.result", data.result.length);
    return NextResponse.json({ data: data.result, status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "failed to load data", status: 500 });
  }
}

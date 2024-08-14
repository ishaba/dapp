import type { NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

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

const getTransactionsUrl = (address: string, chainID: SuportedChainIDs) => `${getApiUrl(chainID)}?apikey=${getApiKey(chainID)}&module=account&address=${address}&action=txlist`;

type Response = {
  data?: Record<string, string>;
  error?: string;
};

type ResponseError = {
  error: string;
};

type ResponseData = {
  data: Record<string, string>;
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

  const transactionsUrl = getTransactionsUrl(address, chainID);

  try {
    const data = await fetch(transactionsUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    return NextResponse.json({ data, status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "failed to load data", status: 500 });
  }
}

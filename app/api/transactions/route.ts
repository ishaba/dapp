import { type NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { PaginationSort, type Transaction, type Pagination } from "@/config/types";
import { type SupportedChains, CHAINS } from "@/config/constants";
import { type Chain } from "viem";

const API_KEYS = {
  "1": process.env.NEXT_PUBLIC_API_KEY_ETHERSCAN,
  "137": process.env.NEXT_PUBLIC_API_KEY_POLYGONSCAN,
};

type SuportedChainIDs = keyof typeof API_KEYS;

// @ts-ignore
const API_URLS = Object.values(CHAINS).reduce((acc: Record<SupportedChains, string | undefined>, chain: Chain) => {
  const id = String(chain.id) as SupportedChains;
  acc[id] = chain.blockExplorers?.default.apiUrl;
  return acc;
}, {}) as Record<SuportedChainIDs, string>;

const getApiKey = (chainID: SuportedChainIDs) => API_KEYS[chainID] || Object.values(API_KEYS)[0];
const getApiUrl = (chainID: SuportedChainIDs) => API_URLS[chainID] || Object.values(API_URLS)[0];

const ActiveChainID = "1";
const getActiveChainID = (): SuportedChainIDs => ActiveChainID;

const getTransactionsUrl = (address: string, chainID: SuportedChainIDs, pagination: Pagination) =>
  `${getApiUrl(chainID)}?apikey=${getApiKey(chainID)}&module=account&address=${address}&action=txlist&page=${pagination.page}&offset=${pagination.offset}&sort=${pagination.sort}`;

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

const defaultPage = 1;
const defaultOffset = 100;
const defaultSort = PaginationSort.DESC;

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextApiResponse<ApiResponse>) {
  const { searchParams } = new URL(req.nextUrl);
  const address = searchParams.get("address");
  const chainID = getActiveChainID();

  if (!address) {
    return NextResponse.json({ error: "Mising address for transactions fetch", status: 500 });
  }

  const page = searchParams.get("page") || defaultPage;
  const offset = searchParams.get("offset") || defaultOffset;
  const sort = searchParams.get("sort") || defaultSort;
  const pagination = {
    page,
    offset,
    sort,
  } as Pagination;

  const transactionsUrl = getTransactionsUrl(address, chainID, pagination);

  try {
    const data = await fetch(transactionsUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    return NextResponse.json({ data: data.result, status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to load data", status: 500 });
  }
}

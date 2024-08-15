import { type NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { PaginationSort, type Transaction, type Pagination } from "@/config/types";
import { getApiKey, getApiUrl } from "@/utils/api";
import { CHAIN_IDS, type SupportedChains, type SupportedChainIDs } from "@/config/constants";
import { Address } from "viem";

const getTransactionsUrl = (address: Address, chainID: SupportedChainIDs, pagination: Pagination) =>
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
  const address = searchParams.get("address") as Address;
  const chain = searchParams.get("chain") as SupportedChains;
  const chainID = CHAIN_IDS[chain];

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
    return NextResponse.json({ error: "Failed to load transactions data", status: 500 });
  }
}

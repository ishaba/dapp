import { type NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { PaginationSort, type Transaction } from "@/config/types";
import { getApiKey, getApiUrl, type TransactionsApiProps } from "@/utils/api";

const getTransactionsApiUrl = ({ address, chain, page, offset, sort }: TransactionsApiProps) =>
  `${getApiUrl(chain)}?apikey=${getApiKey(chain)}&module=account&address=${address}&action=txlist&page=${page}&offset=${offset}&sort=${sort}`;

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
  const { searchParams } = req.nextUrl;
  const props = {
    address: searchParams.get("address"),
    chain: searchParams.get("chain"),

    page: searchParams.get("page") || defaultPage,
    offset: searchParams.get("offset") || defaultOffset,
    sort: searchParams.get("sort") || defaultSort,
  } as TransactionsApiProps;

  if (!props.address) {
    return NextResponse.json({ error: "Mising address for transactions fetch", status: 500 });
  }

  const transactionsUrl = getTransactionsApiUrl(props);

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

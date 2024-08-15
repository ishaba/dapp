import { type NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getApiKey, getApiUrl, type BalanceApiProps } from "@/utils/api";

const getBalanceApiUrl = ({ address, chain }: BalanceApiProps) => `${getApiUrl(chain)}?apikey=${getApiKey(chain)}&module=account&address=${address}&action=balance`;

type Response = {
  data?: Record<string, string>;
  error?: string;
};

type ResponseError = {
  error: string;
};

type ResponseData = {
  data: string;
};

type ApiResponse = (Omit<Response, "error"> & ResponseError) | (Omit<Response, "data"> & ResponseData);

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextApiResponse<ApiResponse>) {
  const { searchParams } = req.nextUrl;
  const props = {
    address: searchParams.get("address"),
    chain: searchParams.get("chain"),
  } as BalanceApiProps;

  if (!props.address) {
    return NextResponse.json({ error: "Mising address for balance fetch", status: 500 });
  }

  const balanceUrl = getBalanceApiUrl(props);

  try {
    const data = await fetch(balanceUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    return NextResponse.json({ data: data.result, status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to load balance data", status: 500 });
  }
}

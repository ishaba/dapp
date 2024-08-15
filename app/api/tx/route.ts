import { type NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getApiKey, getApiUrl, type TxStatusApiProps } from "@/utils/api";

const getBalanceApiUrl = ({ txhash, chain }: TxStatusApiProps) => `${getApiUrl(chain)}?apikey=${getApiKey(chain)}&module=transaction&txhash=${txhash}&action=getstatus`;

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
    txhash: searchParams.get("txhash"),
    chain: searchParams.get("chain"),
  } as TxStatusApiProps;

  if (!props.txhash) {
    return NextResponse.json({ error: "Mising hash for balance fetch", status: 500 });
  }

  const balanceUrl = getBalanceApiUrl(props);

  try {
    const data = await fetch(balanceUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    return NextResponse.json({ data: data, status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to load balance data", status: 500 });
  }
}

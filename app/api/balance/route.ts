import { type NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getApiKey, getApiUrl } from "@/utils/api";
import { CHAIN_IDS, type SupportedChains, type SupportedChainIDs } from "@/config/constants";
import { Address } from "viem";

const getBalanceUrl = (address: Address, chainID: SupportedChainIDs) => `${getApiUrl(chainID)}?apikey=${getApiKey(chainID)}&module=account&address=${address}&action=balance`;

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
  const { searchParams } = new URL(req.nextUrl);
  const address = searchParams.get("address") as Address;
  const chain = searchParams.get("chain") as SupportedChains;
  const chainID = CHAIN_IDS[chain];

  if (!address) {
    return NextResponse.json({ error: "Mising address for balance fetch", status: 500 });
  }

  const transactionsUrl = getBalanceUrl(address, chainID);

  try {
    const data = await fetch(transactionsUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    return NextResponse.json({ data: data.result, status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to load balance data", status: 500 });
  }
}

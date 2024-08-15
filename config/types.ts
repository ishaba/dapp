import { Address, Hash } from "viem";

export enum PaginationSort {
  ASC = "asc",
  DESC = "desc",
}

export type Pagination = {
  page: number;
  offset: number;
  sort: PaginationSort;
};

export type Transaction = {
  blockHash: string;
  blockNumber: string;
  confirmations: string;
  contractAddress: Address;
  cumulativeGasUsed: string;
  from: Address;
  functionName: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  hash: Hash;
  input: string;
  isError: string;
  methodId: string;
  nonce: string;
  timeStamp: string;
  to: Address;
  transactionIndex: string;
  txreceipt_status: string;
  value: string;
};

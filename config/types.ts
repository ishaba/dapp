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
  contractAddress: string;
  cumulativeGasUsed: string;
  from: string;
  functionName: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  hash: string;
  input: string;
  isError: string;
  methodId: string;
  nonce: string;
  timeStamp: string;
  to: string;
  transactionIndex: string;
  txreceipt_status: string;
  value: string;
};

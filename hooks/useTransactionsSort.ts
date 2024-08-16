"use client";

import { PaginationSort, type Transaction } from "@/config/types";
import { useLocalStorage } from "usehooks-ts";

const initialSort = PaginationSort.DESC;

type TransactionsSortingOptions = {
  timeStamp: PaginationSort | undefined;
  value: PaginationSort | undefined;
};

export function useTransitionsSort() {
  const [sortingOptions, setSortingOptions] = useLocalStorage<TransactionsSortingOptions>("transactionsSortingOptions", {
    timeStamp: initialSort,
    value: undefined,
  });

  const sortByTimeStamp = () => {
    if (sortingOptions.timeStamp === PaginationSort.DESC) {
      setSortingOptions({
        timeStamp: PaginationSort.ASC,
        value: undefined,
      });
    } else {
      setSortingOptions({
        timeStamp: PaginationSort.DESC,
        value: undefined,
      });
    }
  };
  const sortByValue = () => {
    if (sortingOptions.value === PaginationSort.DESC) {
      setSortingOptions({
        timeStamp: undefined,
        value: PaginationSort.ASC,
      });
    } else {
      setSortingOptions({
        timeStamp: undefined,
        value: PaginationSort.ASC,
      });
    }
  };

  // NOTE: ehterscan api doesn't support sort by value
  // since we don't need to implement pagination
  // it is not a big problem we just can sort data array localy
  function sortTransaction(data: Transaction[] | undefined) {
    if (sortingOptions.value && data) {
      const sorter = sortingOptions.value === PaginationSort.DESC ? -1 : 1;
      return [...data].sort((a, b) => (a.value < b.value ? 1 * sorter : a.value > b.value ? -1 * sorter : 0));
    }
    return data;
  }

  return {
    sortTransaction,
    sortByTimeStamp,
    sortByValue,
    sortingOptions,
  };
}

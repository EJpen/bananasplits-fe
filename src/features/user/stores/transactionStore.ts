import { create } from "zustand";
import type { Transaction } from "../../../types";
import { MOCK_TRANSACTIONS } from "../../../constants/mock.constants";

type FilterType = "all" | "income" | "expense";

interface TransactionStore {
  transactions: Transaction[];
  filter: FilterType;

  // Actions
  setFilter: (filter: FilterType) => void;
  getFilteredTransactions: () => Transaction[];
  getTotalIncome: () => number;
  getTotalExpense: () => number;
  getTransactionCount: () => number;
}

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: MOCK_TRANSACTIONS,
  filter: "all",

  setFilter: (filter) => set({ filter }),

  getFilteredTransactions: () => {
    const { transactions, filter } = get();
    if (filter === "all") return transactions;
    return transactions.filter(
      (tx) => tx.type.toLowerCase() === filter.toLowerCase()
    );
  },

  getTotalIncome: () => {
    return get()
      .transactions.filter((tx) => tx.type === "INCOME")
      .reduce((sum, tx) => sum + tx.amount, 0);
  },

  getTotalExpense: () => {
    return get()
      .transactions.filter((tx) => tx.type === "EXPENSE")
      .reduce((sum, tx) => sum + tx.amount, 0);
  },

  getTransactionCount: () => {
    return get().transactions.length;
  },
}));

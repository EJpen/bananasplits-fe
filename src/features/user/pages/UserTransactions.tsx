import React from "react";
import { Layout } from "../../../components/common/Layout";
import { UserRole } from "../../../types";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { useTransactionStore } from "../stores/transactionStore";

export const UserTransactions: React.FC = () => {
  const { filter, setFilter, getFilteredTransactions } = useTransactionStore();

  const filteredTransactions = getFilteredTransactions();

  return (
    <Layout role={UserRole.CREATOR}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between md:flex-row md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Transactions</h1>
            <p className="text-slate-400">
              View and manage your income and expenses.
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === "all"
                ? "bg-slate-800 text-white"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("income")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === "income"
                ? "bg-slate-800 text-white"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            Income
          </button>
          <button
            onClick={() => setFilter("expense")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === "expense"
                ? "bg-slate-800 text-white"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            Expense
          </button>
        </div>

        {/* Transactions Table */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 flex flex-col max-h-[600px]">
          <div className="p-6 overflow-y-auto">
            {/* Table Header */}
            <div className="hidden sm:grid grid-cols-12 sm:items-center text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-2">
              <div className="col-span-5">Description</div>
              <div className="col-span-3">Date</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2 text-right">Amount</div>
            </div>

            {/* Table Rows */}
            <div className="space-y-3">
              {filteredTransactions.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-slate-400">No transactions found</p>
                </div>
              ) : (
                filteredTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="group flex flex-col sm:grid sm:grid-cols-12 items-start sm:items-center p-3 rounded-xl hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-800"
                  >
                    {/* Description & Icon */}
                    <div className="col-span-5 flex items-center gap-4 mb-2 sm:mb-0">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                          tx.type === "INCOME"
                            ? "bg-green-500/10 text-green-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {tx.type === "EXPENSE" ? (
                          <ArrowDownLeft size={20} />
                        ) : (
                          <ArrowUpRight size={20} />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">
                          {tx.desc}
                        </p>
                        {tx.sub && (
                          <p className="text-xs text-slate-500">{tx.sub}</p>
                        )}
                      </div>
                    </div>

                    {/* Date */}
                    <div className="col-span-3 text-sm text-slate-400 mb-2 sm:mb-0 w-full flex justify-between sm:block">
                      <span className="sm:hidden text-xs text-slate-600 uppercase font-bold mr-2">
                        Date:
                      </span>
                      {tx.date}
                    </div>

                    {/* Status */}
                    <div className="col-span-2 mb-2 sm:mb-0 w-full flex justify-between sm:block">
                      <span className="sm:hidden text-xs text-slate-600 uppercase font-bold mr-2">
                        Status:
                      </span>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${
                          tx.status === "COMPLETED"
                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                            : "bg-banana-400/10 text-banana-400 border-banana-400/20"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </div>

                    {/* Amount */}
                    <div className="col-span-2 text-right w-full flex justify-between sm:block">
                      <span className="sm:hidden text-xs text-slate-600 uppercase font-bold mr-2">
                        Amount:
                      </span>
                      <span
                        className={`font-bold text-sm ${
                          tx.type === "INCOME"
                            ? "text-green-400"
                            : "text-slate-200"
                        }`}
                      >
                        {tx.type === "INCOME" ? "+" : "-"}$
                        {tx.amount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

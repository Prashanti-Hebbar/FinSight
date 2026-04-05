import SummaryCards from "../components/cards/SummaryCards";
import RoleSwitcher from "../components/ui/RoleSwitcher";
import TransactionTable from "../components/transactions/TransactionTable";
import BalanceChart from "../components/charts/BalanceChart";
import Barchart from "../components/charts/Barchart";
import Insights from "../pages/Insights";
import AddTransactionModal from "../components/ui/AddTransactionModal";
import useFinanceStore from "../store/useFinanceStore";
import { useEffect, useState } from "react";
import { transactions as mockData } from "../data/mockData";
import { fetchTransactions } from "../services/api";


export default function Dashboard() {
  const role = useFinanceStore((s) => s.role);
  const transactions = useFinanceStore((s) => s.transactions);
  const setTransactions = useFinanceStore((s) => s.setTransactions);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const loadData = async () => {
    try {
      const data = await fetchTransactions();
      setTransactions(data.length ? data : mockData);
    } catch (err) {
      console.error("Failed to load data");
      setTransactions(mockData);
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, []);

  return (
    <div className="p-6 space-y-6 min-h-screen bg-[var(--card)] text-[var(--text)]">
      {/* 🔥 HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* LEFT */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back 👋
          </h1>
          <p className="text-sm text-[var(--muted)]">
            Here’s your financial overview
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 flex-wrap">
          <RoleSwitcher />
          {role === "admin" && <AddTransactionModal />}
        </div>
      </div>

      {/* 🔄 LOADING STATE */}
      {loading ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-24 bg-white/5 rounded-xl" />
          <div className="h-60 bg-white/5 rounded-xl" />
          <div className="h-60 bg-white/5 rounded-xl" />
        </div>
      ) : transactions.length === 0 ? (
        /* EMPTY STATE */
        <div className="flex flex-col items-center justify-center py-20 text-[var(--muted)]">
          <p className="text-lg">No transactions yet</p>
          <p className="text-sm mt-2">
            Add your first transaction to unlock insights
          </p>

          {role === "admin" && (
            <div className="mt-4">
              <AddTransactionModal />
            </div>
          )}
        </div>
      ) : (
        <>
          {/* 💰 SUMMARY */}
          <SummaryCards />

          {/* 📊 MAIN LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT (MAIN) */}
            <div className="lg:col-span-8 space-y-6">
              <BalanceChart />
              <TransactionTable />
            </div>

            {/* RIGHT (SIDEBAR) */}
            <div className="lg:col-span-4 space-y-6">
              <Barchart />
              <Insights />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

import { useState } from "react";
import useFinanceStore from "../store/useFinanceStore";
import {
  filterTransactions,
  sortTransactions,
  formatCurrency,
  formatDate,
  calculateTotals,
} from "../utils/helpers";
import { exportToCSV } from "../utils/export";

function FilterSelect({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative w-40">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-3 py-2 rounded-lg bg-[var(--card)] border border-[var(--border)] text-[var(--text)] text-sm shadow-sm hover:shadow-md"
      >
        {selected?.label}
        <span className="text-[var(--muted)]">▼</span>
      </button>

      {open && (
        <div className="absolute mt-2 w-full bg-[var(--dropdown)] border border-[var(--border)] rounded-xl shadow-xl z-50">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`px-3 py-2 cursor-pointer text-sm flex justify-between ${
                value === opt.value
                  ? "bg-blue-500/20 border-l-2 border-blue-500"
                  : "hover:bg-black/10 dark:hover:bg-white/20"
              }`}
            >
              {opt.label}
              {value === opt.value && "✓"}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Transactions() {
  const transactions = useFinanceStore((s) => s.transactions);

  const [filters, setFilters] = useState({
    search: "",
    type: "all",
  });

  const [sortBy, setSortBy] = useState("date-new");

  const filtered = filterTransactions(transactions, filters);
  const sorted = sortTransactions(filtered, sortBy);
  const totals = calculateTotals(sorted);

  return (
    <div className="p-6 space-y-6 min-h-screen bg-[var(--card)] text-[var(--text)]">
      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Transactions</h1>
          <p className="text-sm text-[var(--muted)]">
            Manage your financial activity
          </p>
        </div>

        <button
          onClick={() => exportToCSV(sorted)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm transition"
        >
          Export
        </button>
      </div>

      {/* 🔍 FILTER BAR */}
      <div className="flex flex-wrap items-center gap-3 p-4 bg-[var(--card)] border border-[var(--border)] rounded-xl">
        <input
          placeholder="Search..."
          className="px-3 py-2 rounded-lg bg-[var(--card)] border border-[var(--border)] text-[var(--text)] placeholder-[var(--muted)] text-sm w-48 focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />

        <FilterSelect
          value={filters.type}
          onChange={(val) => setFilters({ ...filters, type: val })}
          options={[
            { label: "All", value: "all" },
            { label: "Income", value: "income" },
            { label: "Expense", value: "expense" },
          ]}
        />

        <FilterSelect
          value={sortBy}
          onChange={setSortBy}
          options={[
            { label: "Newest", value: "date-new" },
            { label: "Oldest", value: "date-old" },
            { label: "High", value: "amount-high" },
            { label: "Low", value: "amount-low" },
          ]}
        />

        <span className="ml-auto text-xs text-[var(--muted)]">
          {sorted.length} results
        </span>
      </div>

      {/* 💰 SUMMARY */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--text)]">
          <p className="text-xs text-[var(--muted)]">Income</p>
          <h2 className="text-xl font-semibold text-green-400">
            {formatCurrency(totals.income)}
          </h2>
        </div>

        <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--text)]">
          <p className="text-xs text-[var(--muted)]">Expenses</p>
          <h2 className="text-xl font-semibold text-red-400">
            {formatCurrency(totals.expense)}
          </h2>
        </div>

        <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--text)]">
          <p className="text-xs text-[var(--muted)]">Balance</p>
          <h2 className="text-xl font-semibold">
            {formatCurrency(totals.balance)}
          </h2>
        </div>
      </div>

      {/* 📊 TABLE */}
      <div className="rounded-xl border border-white/10 overflow-hidden">
        {/* HEADER */}
        <div className="grid grid-cols-4 px-4 py-2 text-xs text-[var(--muted)] background: var(--card)">
          <span>Date</span>
          <span>Category</span>
          <span className="text-right">Amount</span>
          <span className="text-right">Type</span>
        </div>

        {/* BODY */}
        {sorted.length === 0 ? (
          <div className="text-center py-20 text-[var(--muted)]">
            No transactions found
          </div>
        ) : (
          sorted.map((t) => (
            <div
              key={t.id}
              className="grid grid-cols-4 px-4 py-3 text-sm border-t border-white/5 hover:background: var(--card) transition"
            >
              <span className="text-[var(--muted)]">{formatDate(t.date)}</span>

              <span className="font-medium">{t.category}</span>

              <span
                className={`text-right font-semibold ${
                  t.type === "income" ? "text-green-400" : "text-red-400"
                }`}
              >
                {formatCurrency(t.amount)}
              </span>

              <span className="text-right text-xs capitalize">{t.type}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

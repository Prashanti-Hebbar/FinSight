import useFinanceStore from "../../store/useFinanceStore";
import { useState } from "react";
import {
  filterTransactions,
  sortTransactions,
} from "../../utils/helpers";

function Dropdown({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative w-36">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-3 py-2 rounded-lg 
        bg-[var(--card)] border border-[var(--border)] text-sm shadow-sm hover:shadow-md"
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

export default function TransactionTable() {
  const transactions = useFinanceStore((s) => s.transactions);
  const role = useFinanceStore((s) => s.role);
  const deleteTransaction = useFinanceStore((s) => s.deleteTransaction);

  const [filters, setFilters] = useState({
    search: "",
    type: "all",
  });

  const [sortBy, setSortBy] = useState("date-new");

  const filtered = filterTransactions(transactions, filters);
  const sorted = sortTransactions(filtered, sortBy);

  const handleDelete = (id) => {
    if (!window.confirm("Delete this transaction?")) return;
    deleteTransaction(id);
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });

  return (
    <div className="glass p-5 rounded-2xl space-y-4">
      {/* 🔍 FILTER BAR */}
      <div className="flex flex-wrap gap-3 items-center">
        <input
          placeholder="Search category..."
          className="flex-1 min-w-[160px] p-2.5 rounded-lg bg-[var(--card)] text-[var(--text)] border border-[var(--border)] placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) =>
            setFilters({ ...filters, search: e.target.value })
          }
        />

        <Dropdown
          value={filters.type}
          onChange={(val) =>
            setFilters({ ...filters, type: val })
          }
          options={[
            { label: "All", value: "all" },
            { label: "Income", value: "income" },
            { label: "Expense", value: "expense" },
          ]}
        />

        <Dropdown
          value={sortBy}
          onChange={setSortBy}
          options={[
            { label: "Newest", value: "date-new" },
            { label: "Oldest", value: "date-old" },
            { label: "High", value: "amount-high" },
            { label: "Low", value: "amount-low" },
          ]}
        />
      </div>

      {/* 📱 MOBILE VIEW */}
      <div className="md:hidden space-y-3">
        {sorted.length === 0 ? (
          <p className="text-center text-[var(--muted)] py-10">
            No transactions found
          </p>
        ) : (
          sorted.map((t) => (
            <div
              key={t.id}
              className="p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] space-y-2"
            >
              <div className="flex justify-between text-xs text-[var(--muted)]">
                <span>{formatDate(t.date)}</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    t.type === "income"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {t.type}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium">{t.category}</span>
                <span className="font-semibold">₹ {t.amount}</span>
              </div>

              {role === "admin" && (
                <button
                  onClick={() => handleDelete(t.id)}
                  className="text-red-400 text-sm"
                >
                  Delete
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* 💻 DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm table-fixed">
          <thead>
            <tr className="text-left text-[var(--muted)] border-b border-[var(--border)]">
              <th className="py-2 w-[20%]">Date</th>
              <th className="w-[25%]">Category</th>
              <th className="w-[20%] text-right">Amount</th>
              <th className="w-[20%] text-center">Type</th>
              {role === "admin" && (
                <th className="w-[15%] text-right">Action</th>
              )}
            </tr>
          </thead>

          <tbody>
            {sorted.map((t) => (
              <tr
                key={t.id}
                className="border-b border-[var(--border)] hover:bg-black/5 transition"
              >
                <td className="py-3">{formatDate(t.date)}</td>
                <td className="font-medium">{t.category}</td>
                <td className="text-right font-semibold">
                  ₹ {t.amount}
                </td>
                <td className="text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      t.type === "income"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {t.type}
                  </span>
                </td>
                {role === "admin" && (
                  <td className="text-right">
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="text-red-400 hover:text-red-300 transition"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
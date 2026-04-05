import { useState } from "react";
import useFinanceStore from "../../store/useFinanceStore";

function TypeSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);

  const options = [
    {
      label: "Expense",
      value: "expense",
      color: "text-red-600 dark:text-red-400",
    },
    {
      label: "Income",
      value: "income",
      color: "text-green-600 dark:text-green-400",
    },
  ];

  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative w-full">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-2 rounded-lg bg-[var(--card)] border border-[var(--border)] text-[var(--text)] text-sm shadow-sm hover:shadow-md transition"
      >
        <span className={`capitalize font-medium ${selected?.color}`}>
          {selected?.label}
        </span>
        <span className="text-[var(--muted)]">▼</span>
      </button>

      {open && (
        <div className="absolute mt-2 w-full bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-xl backdrop-blur-md overflow-hidden z-50">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`px-4 py-2 text-sm cursor-pointer transition flex justify-between items-center ${
                value === opt.value
                  ? "bg-blue-500/20 border-l-2 border-blue-500"
                  : "hover:bg-black/10 dark:hover:bg-white/20"
              }`}
            >
              <span className={`font-medium ${opt.color}`}>{opt.label}</span>

              {value === opt.value && (
                <span className="text-blue-500 text-sm font-bold">✓</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AddTransactionModal() {
  const addTransaction = useFinanceStore((s) => s.addTransaction);

  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    amount: "",
    category: "",
    type: "expense",
    date: "",
  });

  const handleSubmit = () => {
    const amount = Number(form.amount);

    // 🔴 CATEGORY VALIDATION
    if (!form.category.trim()) {
      setError("Category is required");
      return;
    }

    // 🔴 DATE VALIDATION
    if (!form.date) {
      setError("Date is required");
      return;
    }

    // 🔴 AMOUNT VALIDATION
    if (isNaN(amount)) {
      setError("Amount must be a number");
      return;
    }

    if (amount <= 0) {
      setError("Amount must be greater than 0");
      return;
    }

    // ✅ SUCCESS
    addTransaction({
      ...form,
      id: Date.now(),
      amount,
    });

    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      setOpen(false);
    }, 800);

    setForm({
      amount: "",
      category: "",
      type: "expense",
      date: "",
    });

    setError("");
  };
  return (
    <>
      {/* BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-500 hover:bg-blue-600 active:scale-95 transition px-4 py-2 rounded-xl text-[var(--text)] shadow-lg"
      >
        + Add Transaction
      </button>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-full max-w-md bg-[var(--card)] border border-white/10 p-6 rounded-2xl shadow-2xl relative">
            {/* CLOSE */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-[var(--muted)] hover:text-[var(--text)]"
            >
              ✕
            </button>

            {/* TITLE */}
            <h2 className="text-xl font-semibold text-[var(--text)] mb-5">
              Add Transaction
            </h2>

            {/* ERROR */}
            {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

            {/* SUCCESS */}
            {success && (
              <p className="text-green-400 text-sm mb-3">
                Transaction added successfully
              </p>
            )}

            {/* FORM */}
            <div className="space-y-4">
              {/* AMOUNT */}
              <div>
                <label className="text-xs text-[var(--muted)]">Amount</label>
                <input
                  type="number"
                  min="1"
                  placeholder="₹ 0"
                  value={form.amount}
                  className="mt-1 w-full bg-[var(--card)] border border-[var(--border)] shadow-sm hover:shadow-md text-[var(--text)] px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={(e) => {
                    setForm({ ...form, amount: e.target.value });
                    setError("");
                  }}
                />
              </div>

              {/* CATEGORY */}
              <div>
                <label className="text-xs text-[var(--muted)]">Category</label>
                <input
                  placeholder="Food, Rent..."
                  value={form.category}
                  className="mt-1 w-full bg-[var(--card)] border border-[var(--border)] shadow-sm hover:shadow-md text-[var(--text)] px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={(e) =>{
                    setForm({ ...form, category: e.target.value })
                    setError("");
                  }}
                />
              </div>

              {/* DATE */}
              <div>
                <label className="text-xs text-[var(--muted)]">Date</label>
                <input
                  type="date"
                  value={form.date}
                  className="mt-1 w-full bg-[var(--card)] border border-[var(--border)] shadow-sm hover:shadow-md text-[var(--text)] px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={(e) => {
                    setForm({ ...form, date: e.target.value });
                    setError("");
                  }}
                />
              </div>

              {/* TYPE (CUSTOM) */}
              <div>
                <label className="text-xs text-[var(--muted)]">Type</label>
                <div className="mt-1">
                  <TypeSelect
                    value={form.type}
                    onChange={(val) => setForm({ ...form, type: val })}
                  />
                </div>
              </div>
            </div>

            {/* ACTION */}
            <button
              onClick={handleSubmit}
              className="mt-6 w-full bg-blue-500 hover:bg-blue-600 active:scale-95 transition py-2.5 rounded-lg font-medium text-[var(--text)]"
            >
              Save Transaction
            </button>
          </div>
        </div>
      )}
    </>
  );
}

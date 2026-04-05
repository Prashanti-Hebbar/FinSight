import useFinanceStore from "../store/useFinanceStore";
import { groupByMonth, getMonthlyComparison } from "../utils/helpers";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

export default function Insights() {
  const transactions = useFinanceStore((s) => s.transactions);

  const comparison = getMonthlyComparison(transactions);
  const monthlyData = groupByMonth(transactions);

  const months = Object.keys(monthlyData)
    .sort((a, b) => new Date(a) - new Date(b))
    .slice(-5);

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] text-[var(--text)] space-y-5">

      {/* HEADER */}
      <h2 className="font-semibold text-lg">Insights</h2>

      {/* 🔥 MAIN INSIGHT */}
      {!comparison ? (
        <p className="text-[var(--muted)] text-sm">
          Not enough data yet
        </p>
      ) : (
        <div className="flex items-start gap-3 p-4 rounded-xl background: var(--card)">

          {comparison.change > 0 ? (
            <TrendingUp className="text-red-400" size={20} />
          ) : (
            <TrendingDown className="text-green-400" size={20} />
          )}

          <div>
            <p className="text-sm text-[var(--muted)]">
              {comparison.change > 0
                ? "You are spending more than last month"
                : "You reduced your spending"}
            </p>

            <p className="text-lg font-semibold">
              {Math.abs(comparison.change).toFixed(1)}%
            </p>
          </div>
        </div>
      )}

      {/* ALERT LEVEL */}
      {comparison && (
        <div
          className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg ${
            comparison.change > 20
              ? "bg-red-500/10 text-red-400"
              : comparison.change < -10
              ? "bg-green-500/10 text-green-400"
              : "bg-yellow-500/10 text-yellow-400"
          }`}
        >
          <AlertTriangle size={14} />
          {comparison.change > 20 && "High spending detected"}
          {comparison.change < -10 && "Spending improving"}
          {comparison.change >= -10 &&
            comparison.change <= 20 &&
            "Spending stable"}
        </div>
      )}

      {/* 📊 MONTHLY TREND */}
      <div className="space-y-2">
        {months.map((key) => {
          const data = monthlyData[key];

          const total = data.income + data.expense;
          const expensePercent =
            total === 0 ? 0 : (data.expense / total) * 100;

          return (
            <div key={key} className="space-y-1">
              
              {/* HEADER */}
              <div className="flex justify-between text-xs text-[var(--muted)]">
                <span>{key}</span>
                <span>
                  {formatCurrency(data.income)} /{" "}
                  {formatCurrency(data.expense)}
                </span>
              </div>

              {/* PROGRESS BAR */}
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-400"
                  style={{ width: `${expensePercent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* RESET */}
      <button
        onClick={() => {
          if (!window.confirm("Reset all data?")) return;
          localStorage.removeItem("finance-data");
          window.location.reload();
        }}
        className="text-xs text-red-400 hover:text-red-300"
      >
        Reset Data
      </button>
    </div>
  );
}
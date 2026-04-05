import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import useFinanceStore from "../../store/useFinanceStore";

export default function Barchart() {
  const transactions = useFinanceStore((s) => s.transactions);

  // Group expenses
  const categoryMap = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    }
  });

  let data = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  if (!data.length) {
    return (
      <div className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] text-[var(--text)] text-center text-[var(--muted)]">
        No spending data yet
      </div>
    );
  }

  // Sort descending
  data = data.sort((a, b) => b.value - a.value);

  const total = data.reduce((sum, d) => sum + d.value, 0);
  const top = data[0];

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.length) {
      const d = payload[0];
      return (
        <div className="bg-black/80 px-3 py-2 rounded-lg text-xs border border-white/10">
          <p>{d.payload.name}</p>
          <p className="text-[var(--text)] font-semibold">{formatCurrency(d.value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] text-[var(--text)] space-y-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Spending Analysis</h2>
        <span className="text-xs text-[var(--muted)]">
          Total: {formatCurrency(total)}
        </span>
      </div>

      {/* 🔥 TOP INSIGHT */}
      <div className="text-sm text-[var(--muted)]">
        Highest spending:{" "}
        <span className="text-[var(--text)] font-medium">{top.name}</span> (
        {((top.value / total) * 100).toFixed(1)}%)
      </div>

      {/* 📊 BAR CHART (BETTER THAN PIE) */}
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.slice(0, 5)}>
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#9ca3af" }} />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
            />

            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {data.map((_, i) => (
                <Cell
                  key={i}
                  fill={
                    i === 0
                      ? "#ef4444" // highlight biggest spender
                      : "#3b82f6"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 📋 CATEGORY LIST */}
      <div className="space-y-2">
        {data.map((item, i) => {
          const percent = ((item.value / total) * 100).toFixed(1);

          return (
            <div
              key={item.name}
              className="flex justify-between items-center text-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    i === 0 ? "bg-red-400" : "bg-blue-400"
                  }`}
                />
                <span className="text-[var(--muted)]">{item.name}</span>
              </div>

              <div className="text-right">
                <p className="text-[var(--text)]">{formatCurrency(item.value)}</p>
                <p className="text-xs text-[var(--muted)]">{percent}%</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

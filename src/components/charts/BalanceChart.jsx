import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import useFinanceStore from "../../store/useFinanceStore";

export default function BalanceChart() {
  const transactions = useFinanceStore((s) => s.transactions);

  if (!transactions.length) {
    return (
      <div className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] text-[var(--text)] text-center text-[var(--muted)]">
        No data to display
      </div>
    );
  }

  const sortedTx = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  let balance = 0;

  const data = sortedTx.map((t) => {
    balance += t.type === "income" ? t.amount : -t.amount;

    return {
      date: new Date(t.date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      }),
      balance,
    };
  });

  const latest = data[data.length - 1]?.balance;
  const first = data[0]?.balance;

  const trend = latest - first;

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.length) {
      return (
        <div className="bg-black/80 backdrop-blur px-3 py-2 rounded-lg text-xs border border-white/10">
          <p>{payload[0].payload.date}</p>
          <p className="text-green-400 font-semibold">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] text-[var(--text)] hover:shadow-xl transition-all">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-lg">Balance Trend</h2>

        <span
          className={`text-xs px-2 py-1 rounded-full ${
            trend >= 0
              ? "bg-green-500/10 text-green-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {trend >= 0 ? "Uptrend" : "Downtrend"}
        </span>
      </div>

      {/* SUBTEXT */}
      <p className="text-xs text-[var(--muted)] mb-4">
        {trend >= 0
          ? "Your finances are improving steadily"
          : "Spending is outweighing income"}
      </p>

      {/* CHART */}
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <CartesianGrid strokeOpacity={0.1} vertical={false} />

          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: "#9ca3af" }}
          />

          <YAxis hide />

          <Tooltip content={<CustomTooltip />} />

          <Line
            type="monotone"
            dataKey="balance"
            stroke="#22c55e"
            strokeWidth={2.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* FOOTER METRIC */}
      <p className="text-sm mt-3 text-[var(--muted)]">
        Current Balance:{" "}
        <span className="font-semibold text-[var(--text)]">
          {formatCurrency(latest)}
        </span>
      </p>
    </div>
  );
}
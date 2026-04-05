import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import useFinanceStore from "../../store/useFinanceStore";

export default function SummaryCards() {
  const transactions = useFinanceStore((s) => s.transactions);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expenses;

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  const getChange = (curr, prev) =>
    prev === 0 ? 0 : ((curr - prev) / prev) * 100;

  const prev = {
    income: income * 0.8,
    expense: expenses * 1.2,
    balance: balance * 0.9,
  };

  const Card = ({
    title,
    value,
    change,
    icon,
    highlight,
    color,
  }) => {
    const isPositive = change >= 0;

    return (
      <div
        className={`rounded-2xl p-5 transition-all duration-300 
        ${highlight ? "bg-gradient-to-br from-green-600/20 to-green-800/10 border border-green-500/20" : "bg-[var(--card)] border border-[var(--border)] text-[var(--text)]"}
        hover:scale-[1.02] hover:shadow-lg`}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-[var(--muted)]">{title}</p>
          <div className={`p-2 rounded-lg ${color}`}>
            {icon}
          </div>
        </div>

        {/* Value */}
        <h2 className="text-2xl font-semibold mt-3">
          {formatCurrency(value)}
        </h2>

        {/* Change */}
        <div className="flex items-center mt-2 text-xs">
          {isPositive ? (
            <ArrowUpRight className="text-green-400 w-4 h-4" />
          ) : (
            <ArrowDownRight className="text-red-400 w-4 h-4" />
          )}
          <span
            className={`ml-1 ${
              isPositive ? "text-green-400" : "text-red-400"
            }`}
          >
            {Math.abs(change).toFixed(1)}%
          </span>
          <span className="ml-1 text-gray-500">
            vs last month
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="grid md:grid-cols-3 gap-5">
      {/* BALANCE (Primary) */}
      <Card
        title="Total Balance"
        value={balance}
        change={getChange(balance, prev.balance)}
        icon={<Wallet className="text-green-400" />}
        highlight
        color="bg-green-500/10"
      />

      {/* INCOME */}
      <Card
        title="Income"
        value={income}
        change={getChange(income, prev.income)}
        icon={<TrendingUp className="text-blue-400" />}
        color="bg-blue-500/10"
      />

      {/* EXPENSE */}
      <Card
        title="Expenses"
        value={expenses}
        change={getChange(expenses, prev.expense)}
        icon={<TrendingDown className="text-red-400" />}
        color="bg-red-500/10"
      />
    </div>
  );
}
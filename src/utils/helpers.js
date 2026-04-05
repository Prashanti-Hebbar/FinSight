// Format currency (₹)
export const formatCurrency = (amount) => {
  return `₹ ${amount.toLocaleString("en-IN")}`;
};

// Format date (simple readable)
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// Filter transactions
export const filterTransactions = (transactions, filters) => {
  const { search, type } = filters;

  return transactions.filter((t) => {
    const matchSearch = t.category.toLowerCase().includes(search.toLowerCase());

    const matchType = type === "all" || t.type === type;

    return matchSearch && matchType;
  });
};

// Sort transactions
export const sortTransactions = (transactions, sortBy) => {
  const sorted = [...transactions];

  switch (sortBy) {
    case "amount-high":
      return sorted.sort((a, b) => b.amount - a.amount);

    case "amount-low":
      return sorted.sort((a, b) => a.amount - b.amount);

    case "date-new":
      return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));

    case "date-old":
      return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));

    default:
      return sorted;
  }
};

// Get totals (useful everywhere)
export const calculateTotals = (transactions) => {
  let income = 0;
  let expense = 0;

  transactions.forEach((t) => {
    if (t.type === "income") income += t.amount;
    else expense += t.amount;
  });

  return {
    income,
    expense,
    balance: income - expense,
  };
};

// Group transactions by month
export const groupByMonth = (transactions) => {
  const map = {};

  transactions.forEach((t) => {
    const date = new Date(t.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0",
    )}`;

    if (!map[key]) {
      map[key] = { income: 0, expense: 0 };
    }

    if (t.type === "income") {
      map[key].income += t.amount;
    } else {
      map[key].expense += t.amount;
    }
  });

  return map;
};

// Get last 2 months comparison
export const getMonthlyComparison = (transactions) => {
  const grouped = groupByMonth(transactions);
  const keys = Object.keys(grouped).sort((a, b) => new Date(a) - new Date(b));

  if (keys.length < 2) return null;

  const last = grouped[keys[keys.length - 1]];
  const prev = grouped[keys[keys.length - 2]];

  const change = ((last.expense - prev.expense) / prev.expense) * 100;

  return {
    last,
    prev,
    change,
  };
};

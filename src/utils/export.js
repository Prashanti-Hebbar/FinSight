export const exportToCSV = (transactions) => {
  const headers = ["Date", "Category", "Amount", "Type"];
    const formatDateForCSV = (date) => {
  const d = new Date(date);

  const formatted = d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return `="${formatted}"`; // 🔥 KEY FIX
};

  const rows = transactions.map((t) => [
    formatDateForCSV(t.date),
    t.category,
    t.amount,
    t.type,
  ]);

  const csvContent =
    [headers, ...rows].map((e) => e.join(",")).join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "transactions.csv";
  link.click();
};
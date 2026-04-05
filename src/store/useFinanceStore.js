import { create } from "zustand";

const loadTheme = () => {
  return localStorage.getItem("theme") || "dark";
};

// Load from localStorage
const loadData = () => {
  try {
    const data = localStorage.getItem("finance-data");

    if (!data) return [];

    const parsed = JSON.parse(data);

    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("LocalStorage parse error:", err);
    return [];
  }
};

const useFinanceStore = create((set, get) => ({
  theme: loadTheme(),

setTheme: (theme) => {
  localStorage.setItem("theme", theme);
  set({ theme });
},
  role: "viewer",
  transactions: loadData(),

  setRole: (role) => set({ role }),

  addTransaction: (tx) => {
    const updated = [tx, ...get().transactions];

    set({ transactions: updated });
    localStorage.setItem("finance-data", JSON.stringify(updated));
  },

  deleteTransaction: (id) => {
    const updated = get().transactions.filter((t) => t.id !== id);

    set({ transactions: updated });
    localStorage.setItem("finance-data", JSON.stringify(updated));
  },

  setTransactions: (data) => {
    set({ transactions: data });
    localStorage.setItem("finance-data", JSON.stringify(data));
  },
}));

export default useFinanceStore;
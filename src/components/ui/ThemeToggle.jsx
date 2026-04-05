import useFinanceStore from "../../store/useFinanceStore";

export default function ThemeToggle() {
  const theme = useFinanceStore((s) => s.theme);
  const setTheme = useFinanceStore((s) => s.setTheme);

  return (
    <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-1 rounded-xl">
      <button
        onClick={() => setTheme("dark")}
        className={`px-3 py-1 rounded-lg text-sm ${
          theme === "dark"
            ? "bg-indigo-500 text-[var(--text)]"
            : "text-muted"
        }`}
      >
        🌙
      </button>

      <button
        onClick={() => setTheme("light")}
        className={`px-3 py-1 rounded-lg text-sm ${
          theme === "light"
            ? "bg-yellow-400 text-black"
            : "text-muted"
        }`}
      >
        ☀️
      </button>
    </div>
  );
}
import useFinanceStore from "../../store/useFinanceStore";
import { Eye, Shield } from "lucide-react";

export default function RoleSwitcher() {
  const role = useFinanceStore((s) => s.role);
  const setRole = useFinanceStore((s) => s.setRole);

  return (
    <div className="flex items-center gap-3">

      {/* LABEL */}
      <span className="text-xs text-[var(--muted)] uppercase tracking-wide">
        Access
      </span>

      {/* SWITCH */}
      <div className="relative flex items-center bg-white/5 border border-white/10 rounded-xl p-1 backdrop-blur">

        {/* SLIDER */}
        <div
          className={`absolute top-1 bottom-1 w-1/2 rounded-lg bg-blue-500/90 shadow-lg transition-all duration-300 ${
            role === "admin" ? "translate-x-full" : "translate-x-0"
          }`}
        />

        {/* VIEWER */}
        <button
          onClick={() => setRole("viewer")}
          className={`relative z-10 flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg transition ${
            role === "viewer"
              ? "text-[var(--text)]"
              : "text-[var(--muted)] hover:text-[var(--text)]"
          }`}
        >
          <Eye size={14} />
          Viewer
        </button>

        {/* ADMIN */}
        <button
          onClick={() => setRole("admin")}
          className={`relative z-10 flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg transition ${
            role === "admin"
              ? "text-[var(--text)]"
              : "text-[var(--muted)] hover:text-[var(--text)]"
          }`}
        >
          <Shield size={14} />
          Admin
        </button>
      </div>
    </div>
  );
}
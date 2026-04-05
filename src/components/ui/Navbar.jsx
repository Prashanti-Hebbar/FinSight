import { useState } from "react";
import Dashboard from "../../pages/Dashboard";
import Transactions from "../../pages/Transactions";
import ThemeToggle from "./ThemeToggle";
import logo from "../../assets/FinSight-logo.png";
import { LayoutDashboard, Receipt, Menu, X, User, LogOut } from "lucide-react";

export default function Navbar() {
  const [page, setPage] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const NavItem = ({ label, value, icon }) => {
    const active = page === value;

    return (
      <button
        onClick={() => {
          setPage(value);
          setMobileOpen(false);
        }}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition
        ${
          active
            ? "bg-blue-500/10 text-blue-400"
            : "text-[var(--muted)] hover:bg-white/5 hover:text-[var(--text)]"
        }`}
      >
        {icon}
        {label}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* 🔝 NAVBAR */}
      <div className="flex justify-between items-center px-6 h-14 border-b border-white/5 backdrop-blur sticky top-0 z-50">
        {/* LEFT */}
        <div className="flex items-center gap-6">
          {/* LOGO */}
          <div className="flex items-center gap-2">
            <img
              src={logo}
              className="h-60 w-44 object-contain cursor-pointer"
              onClick={() => {
                setPage("dashboard");
                setMobileOpen(false);
              }}
            />
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex gap-4">
            <NavItem
              label="Dashboard"
              value="dashboard"
              icon={<LayoutDashboard size={16} />}
            />
            <NavItem
              label="Transactions"
              value="transactions"
              icon={<Receipt size={16} />}
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* PROFILE */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
            >
              <User size={16} />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-[var(--card)] border border-white/10 rounded-lg shadow-lg overflow-hidden">
                <div className="px-3 py-2 text-sm text-[var(--muted)]">
                  My Profile
                </div>
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* 📱 MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden px-4 py-4 space-y-2 border-b border-[var(--border)] bg-[var(--card)]">
          <NavItem
            label="Dashboard"
            value="dashboard"
            icon={<LayoutDashboard size={16} />}
          />
          <NavItem
            label="Transactions"
            value="transactions"
            icon={<Receipt size={16} />}
          />
        </div>
      )}

      {/* 🔥 PAGE TRANSITION */}
      <div className="p-6">
        <div key={page} className="animate-fadeSlide">
          {page === "dashboard" ? <Dashboard /> : <Transactions />}
        </div>
      </div>
    </div>
  );
}

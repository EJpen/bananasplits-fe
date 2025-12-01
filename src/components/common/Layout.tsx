import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  LogOut,
  Menu,
  X,
  Wallet,
  Settings,
  Split,
  WalletCards,
} from "lucide-react";
import { useLayoutStore } from "../stores/layoutStore";
import { UserRole } from "../../types";

interface LayoutProps {
  children: React.ReactNode;
  role?: UserRole;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  role = UserRole.MEMBER,
}) => {
  const { isMobileMenuOpen, setMobileMenuOpen } = useLayoutStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/");
  };

  const navItems =
    role === UserRole.ADMIN
      ? [
          {
            name: "Analytics",
            icon: <LayoutDashboard size={20} />,
            path: "/admin",
          },
          {
            name: "Users",
            icon: <Users size={20} />,
            path: "/admin/users",
          },
          {
            name: "Settings",
            icon: <Settings size={20} />,
            path: "/admin/settings",
          },
        ]
      : [
          {
            name: "Dashboard",
            icon: <LayoutDashboard size={20} />,
            path: "/dashboard",
          },
          {
            name: "Splits",
            icon: <Split size={20} />,
            path: "/dashboard/splits",
          },
          {
            name: "My Team",
            icon: <Users size={20} />,
            path: "/dashboard/team",
          },
          {
            name: "Transactions",
            icon: <Wallet size={20} />,
            path: "/dashboard/transactions",
          },
          {
            name: "Wallet",
            icon: <WalletCards size={20} />,
            path: "/dashboard/wallet",
          },
          {
            name: "Settings",
            icon: <Settings size={20} />,
            path: "/dashboard/settings",
          },
        ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-banana-400 flex items-center justify-center text-slate-900 font-bold text-xl">
          B
        </div>
        <span className="text-xl font-bold tracking-tight text-white">
          Banana<span className="text-banana-400">Splits</span>
        </span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                isActive
                  ? "bg-banana-400/10 text-banana-400"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {item.icon}
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-8 h-8 rounded-full bg-linear-to-tr from-slate-700 to-slate-600 flex items-center justify-center text-xs font-bold text-white border border-slate-500">
            J
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs text-zinc-500 truncate capitalize">user</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/5 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 fixed h-full z-10">
        <SidebarContent />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full z-60 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 p-4 flex justify-end items-center">
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="text-slate-300"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 md:hidden pt-16 bg-slate-900"
          >
            <SidebarContent />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 pt-20 md:p-8 overflow-y-auto h-screen">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
};

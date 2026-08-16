import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  UserCheck,
  Dog,
  BarChart2,
  Bell,
  User,
  Stethoscope,
  LogOut,
} from "lucide-react";

const adminNavItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Manage Users", path: "/admin/users", icon: Users },
  {
    name: "Manage Veterinarians",
    path: "/admin/veterinarians",
    icon: UserCheck,
  },
  { name: "Manage Pets", path: "/admin/pets", icon: Dog },
  { name: "System Analytics", path: "/admin/analytics", icon: BarChart2 },
  { name: "Notifications", path: "/admin/notifications", icon: Bell },
  { name: "Profile", path: "/admin/profile", icon: User },
];

export default function MobileDashboardLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const goTo = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Mobile Header */}
      <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 sticky top-0 z-40">

        <div className="text-lg font-bold text-blue-600">
          🐾 PawSync
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-slate-100"
        >
          {menuOpen ? (
            <X className="w-6 h-6 text-slate-700" />
          ) : (
            <Menu className="w-6 h-6 text-slate-700" />
          )}
        </button>

      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <>

          {/* Overlay */}
          <div
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-black/30 z-40"
          />

          {/* Menu */}
          <aside className="fixed top-0 left-0 bottom-0 w-[280px] max-w-[85%] bg-white z-50 shadow-xl">

            {/* Menu Header */}
            <div className="h-16 px-5 flex items-center justify-between border-b border-slate-100">

              <div className="text-lg font-bold text-blue-600">
                🐾 PawSync
              </div>

              <button
                onClick={() => setMenuOpen(false)}
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-1">

              {adminNavItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => goTo(item.path)}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600 text-left"
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </button>
              ))}

            </nav>

            {/* Dashboard Switching */}
            <div className="border-t border-slate-100 p-4">

              <p className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase">
                Switch Dashboard
              </p>

              <button
                onClick={() => goTo("/admin")}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-slate-600 hover:bg-slate-50 text-left"
              >
                👑
                Admin Dashboard
              </button>

              <button
                onClick={() => goTo("/veterinarian")}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-slate-600 hover:bg-slate-50 text-left"
              >
                <Stethoscope className="w-5 h-5 text-blue-600" />
                Veterinarian Dashboard
              </button>

              <button
                onClick={() => goTo("/dashboard")}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-slate-600 hover:bg-slate-50 text-left"
              >
                🐾
                Pet Owner Dashboard
              </button>

              <button
                onClick={() => goTo("/")}
                className="w-full mt-3 flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-red-600 hover:bg-red-50 text-left"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>

            </div>

          </aside>
        </>
      )}

      {/* Mobile Page Content */}
      <main className="p-4">
        {children}
      </main>

    </div>
  );
}
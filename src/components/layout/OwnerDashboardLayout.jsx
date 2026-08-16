import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  ChevronDown,
  LayoutDashboard,
  Stethoscope,
  LogOut,
  User,
} from "lucide-react";

import ownerMenu from "../../config/menus/ownerMenu";

function OwnerDashboardLayout({ children }) {
  const [showProfile, setShowProfile] = useState(false);
  const [showDashboards, setShowDashboards] = useState(false);

  const navigate = useNavigate();

  const switchDashboard = (path) => {
    setShowProfile(false);
    setShowDashboards(false);
    navigate(path);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-white border-r border-slate-100 flex flex-col fixed inset-y-0 left-0 z-20">

        {/* Logo */}
        <div className="p-6">
          <div className="text-xl font-bold text-blue-600 flex items-center gap-2">
            <span>🐾 PawSync</span>
          </div>
        </div>

        {/* Owner Menu */}
        <nav className="flex-1 px-4 space-y-1">
          {ownerMenu.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                {item.title}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* ================= MAIN AREA ================= */}
      <div className="flex-1 ml-64">

        {/* ================= TOP HEADER ================= */}
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-end px-8 sticky top-0 z-10">

          <div className="relative">

            {/* Profile Button */}
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>

              <div className="text-left hidden sm:block">
                <p className="text-sm font-semibold text-slate-800">
                  Pet Owner
                </p>

                <p className="text-xs text-slate-500">
                  PawSync Member
                </p>
              </div>

              <ChevronDown className="w-4 h-4 text-slate-500" />
            </button>

            {/* ================= PROFILE DROPDOWN ================= */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-100 py-2">

                {/* Profile Info */}
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="font-semibold text-slate-800">
                    Pet Owner
                  </p>

                  <p className="text-xs text-slate-500">
                    PawSync Member
                  </p>
                </div>

                {/* Switch Dashboard */}
                <button
                  onClick={() => setShowDashboards(!showDashboards)}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <span className="flex items-center gap-3">
                    <LayoutDashboard className="w-4 h-4" />
                    Switch Dashboard
                  </span>

                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      showDashboards ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dashboard Options */}
                {showDashboards && (
                  <div className="mx-3 mb-2 rounded-lg bg-slate-50 p-1">

                    {/* Admin */}
                    <button
                      onClick={() => switchDashboard("/admin")}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-white"
                    >
                      👑
                      <span>Admin Dashboard</span>
                    </button>

                    {/* Veterinarian */}
                    <button
                      onClick={() => switchDashboard("/veterinarian")}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-white"
                    >
                      <Stethoscope className="w-4 h-4 text-blue-600" />
                      <span>Veterinarian Dashboard</span>
                    </button>

                    {/* Pet Owner */}
                    <button
                      onClick={() => switchDashboard("/dashboard")}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-white"
                    >
                      🐾
                      <span>Pet Owner Dashboard</span>
                    </button>

                  </div>
                )}

                {/* Profile */}
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <User className="w-4 h-4" />
                  Profile
                </button>

                {/* Logout */}
                <button
                  onClick={() => navigate("/")}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>

              </div>
            )}
          </div>
        </header>

        {/* ================= PAGE CONTENT ================= */}
        <main className="p-8">
          {children}
        </main>

      </div>
    </div>
  );
}

export default OwnerDashboardLayout;
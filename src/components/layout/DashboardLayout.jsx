import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Dog,
  BarChart2,
  Bell,
  User,
  ChevronDown,
  Stethoscope,
  LogOut,
} from "lucide-react";

const adminNavItems = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Manage Users",
    path: "/admin/users",
    icon: Users,
  },
  {
    name: "Manage Veterinarians",
    path: "/admin/veterinarians",
    icon: UserCheck,
  },
  {
    name: "Manage Pets",
    path: "/admin/pets",
    icon: Dog,
  },
  {
    name: "System Analytics",
    path: "/admin/analytics",
    icon: BarChart2,
  },
  {
    name: "Notifications",
    path: "/admin/notifications",
    icon: Bell,
  },
  {
    name: "Profile",
    path: "/admin/profile",
    icon: User,
  },
];

export default function DashboardLayout({ children }) {
  const [showProfile, setShowProfile] = useState(false);
  const [showDashboards, setShowDashboards] = useState(false);

  const navigate = useNavigate();

  // ==============================
  // SWITCH DASHBOARD
  // ==============================
  const switchDashboard = (path) => {
    setShowProfile(false);
    setShowDashboards(false);
    navigate(path);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* ========================================= */}
      {/* SIDEBAR */}
      {/* ========================================= */}

      <aside className="hidden md:flex w-64 bg-white border-r border-slate-100 flex-col fixed inset-y-0 left-0 z-20">

        {/* LOGO */}
        <div className="p-6">
          <div className="text-xl font-bold text-blue-600 flex items-center gap-2">
            <span>🐾 PawSync</span>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-4 space-y-1">

          {adminNavItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
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

                <span>{item.name}</span>
              </NavLink>
            );
          })}

        </nav>
      </aside>


      {/* ========================================= */}
      {/* MAIN AREA */}
      {/* ========================================= */}

      <div className="flex-1 md:pl-64">

        {/* ========================================= */}
        {/* TOP HEADER */}
        {/* ========================================= */}

        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-end px-4 sm:px-8 sticky top-0 z-50">

          {/* PROFILE AREA */}

          <div className="relative">

            {/* PROFILE BUTTON */}

            <button
              onClick={() => {
                setShowProfile(!showProfile);
                setShowDashboards(false);
              }}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
            >

              {/* PROFILE ICON */}

              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>

              {/* PROFILE NAME */}

              <div className="text-left hidden sm:block">

                <p className="text-sm font-semibold text-slate-800">
                  Admin
                </p>

                <p className="text-xs text-slate-500">
                  Administrator
                </p>

              </div>

              {/* ARROW */}

              <ChevronDown
                className={`w-4 h-4 text-slate-500 transition-transform ${
                  showProfile ? "rotate-180" : ""
                }`}
              />

            </button>


            {/* ========================================= */}
            {/* PROFILE DROPDOWN */}
            {/* ========================================= */}

            {showProfile && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-[100]">

                {/* USER INFO */}

                <div className="px-4 py-3 border-b border-slate-100">

                  <p className="font-semibold text-slate-800">
                    Admin
                  </p>

                  <p className="text-xs text-slate-500">
                    Administrator
                  </p>

                </div>


                {/* ========================================= */}
                {/* SWITCH DASHBOARD */}
                {/* ========================================= */}

                <button
                  onClick={() =>
                    setShowDashboards(!showDashboards)
                  }
                  className="w-full flex items-center justify-between px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                >

                  <span className="flex items-center gap-3">

                    <LayoutDashboard className="w-4 h-4" />

                    Switch Dashboard

                  </span>

                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      showDashboards
                        ? "rotate-180"
                        : ""
                    }`}
                  />

                </button>


                {/* ========================================= */}
                {/* DASHBOARD OPTIONS */}
                {/* ========================================= */}

                {showDashboards && (
                  <div className="mx-3 mb-2 rounded-lg bg-slate-50 p-1">

                    {/* ADMIN */}

                    <button
                      onClick={() =>
                        switchDashboard("/admin")
                      }
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-md text-sm text-slate-700 hover:bg-white"
                    >

                      <span className="text-base">
                        👑
                      </span>

                      <span>
                        Admin Dashboard
                      </span>

                    </button>


                    {/* VETERINARIAN */}

                    <button
                      onClick={() =>
                        switchDashboard("/veterinarian")
                      }
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-md text-sm text-slate-700 hover:bg-white"
                    >

                      <Stethoscope className="w-4 h-4 text-blue-600" />

                      <span>
                        Veterinarian Dashboard
                      </span>

                    </button>


                    {/* PET OWNER */}

                    <button
                      onClick={() =>
                        switchDashboard("/dashboard")
                      }
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-md text-sm text-slate-700 hover:bg-white"
                    >

                      <span className="text-base">
                        🐾
                      </span>

                      <span>
                        Pet Owner Dashboard
                      </span>

                    </button>

                  </div>
                )}


                {/* ========================================= */}
                {/* PROFILE */}
                {/* ========================================= */}

                <button
                  onClick={() =>
                    navigate("/admin/profile")
                  }
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                >

                  <User className="w-4 h-4" />

                  <span>
                    Profile
                  </span>

                </button>


                {/* ========================================= */}
                {/* LOGOUT */}
                {/* ========================================= */}

                <button
                  onClick={() => navigate("/")}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                >

                  <LogOut className="w-4 h-4" />

                  <span>
                    Logout
                  </span>

                </button>

              </div>
            )}

          </div>

        </header>


        {/* ========================================= */}
        {/* PAGE CONTENT */}
        {/* ========================================= */}

        <main className="p-4 sm:p-6 md:p-8">
          {children}
        </main>

      </div>

    </div>
  );
}
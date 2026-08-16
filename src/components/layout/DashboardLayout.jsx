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
  Menu,
  X,
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
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navigate = useNavigate();

  // ==============================
  // SWITCH DASHBOARD
  // ==============================
  const switchDashboard = (path) => {
    setShowProfile(false);
    setShowDashboards(false);
    setShowMobileMenu(false);

    navigate(path);
  };

  // ==============================
  // NAVIGATION
  // ==============================
  const handleNavigation = () => {
    setShowMobileMenu(false);
    setShowProfile(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================================================= */}
      {/* DESKTOP SIDEBAR */}
      {/* ================================================= */}

      <aside className="hidden md:flex w-64 bg-white border-r border-slate-100 flex-col fixed inset-y-0 left-0 z-30">

        {/* Logo */}
        <div className="p-6">
          <div className="text-xl font-bold text-blue-600 flex items-center gap-2">
            <span>🐾 PawSync</span>
          </div>
        </div>

        {/* Navigation */}
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

      {/* ================================================= */}
      {/* MOBILE SIDEBAR */}
      {/* ================================================= */}

      {showMobileMenu && (
        <>

          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/30 z-40 md:hidden"
            onClick={() => setShowMobileMenu(false)}
          />

          {/* Mobile Menu */}
          <aside className="fixed top-0 left-0 bottom-0 w-72 bg-white z-50 shadow-xl md:hidden">

            {/* Mobile Logo */}
            <div className="p-6 flex items-center justify-between border-b border-slate-100">

              <div className="text-xl font-bold text-blue-600">
                🐾 PawSync
              </div>

              <button
                onClick={() => setShowMobileMenu(false)}
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>

            </div>

            {/* Mobile Navigation */}
            <nav className="p-4 space-y-1">

              {adminNavItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={handleNavigation}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
                        isActive
                          ? "bg-blue-50 text-blue-600 font-semibold"
                          : "text-slate-600 hover:bg-slate-50"
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
        </>
      )}

      {/* ================================================= */}
      {/* MAIN AREA */}
      {/* ================================================= */}

      <div className="md:pl-64 min-h-screen">

        {/* ================================================= */}
        {/* TOP HEADER */}
        {/* ================================================= */}

        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 sm:px-6 md:px-8 sticky top-0 z-30">

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(true)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100"
          >
            <Menu className="w-6 h-6 text-slate-700" />
          </button>

          {/* Empty space desktop */}
          <div className="hidden md:block" />

          {/* ================================================= */}
          {/* PROFILE */}
          {/* ================================================= */}

          <div className="relative">

            {/* Profile Button */}
            <button
              onClick={() => {
                setShowProfile(!showProfile);
                setShowDashboards(false);
              }}
              className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
            >

              {/* Profile Icon */}
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>

              {/* Profile Details */}
              <div className="text-left hidden sm:block">

                <p className="text-sm font-semibold text-slate-800">
                  Admin
                </p>

                <p className="text-xs text-slate-500">
                  Administrator
                </p>

              </div>

              {/* Arrow */}
              <ChevronDown
                className={`w-4 h-4 text-slate-500 transition-transform ${
                  showProfile ? "rotate-180" : ""
                }`}
              />

            </button>

            {/* ================================================= */}
            {/* PROFILE DROPDOWN */}
            {/* ================================================= */}

            {showProfile && (
              <div
                className="
                  absolute
                  right-0
                  mt-2
                  w-72
                  max-w-[calc(100vw-2rem)]
                  bg-white
                  rounded-xl
                  shadow-2xl
                  border
                  border-slate-200
                  py-2
                  z-[100]
                "
              >

                {/* User Info */}
                <div className="px-4 py-3 border-b border-slate-100">

                  <p className="font-semibold text-slate-800">
                    Admin
                  </p>

                  <p className="text-xs text-slate-500">
                    Administrator
                  </p>

                </div>

                {/* ================================================= */}
                {/* SWITCH DASHBOARD */}
                {/* ================================================= */}

                <button
                  onClick={() =>
                    setShowDashboards(!showDashboards)
                  }
                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    px-4
                    py-3
                    text-sm
                    text-slate-700
                    hover:bg-slate-50
                  "
                >

                  <span className="flex items-center gap-3">

                    <LayoutDashboard className="w-4 h-4" />

                    <span>
                      Switch Dashboard
                    </span>

                  </span>

                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      showDashboards
                        ? "rotate-180"
                        : ""
                    }`}
                  />

                </button>

                {/* ================================================= */}
                {/* DASHBOARD OPTIONS */}
                {/* ================================================= */}

                {showDashboards && (
                  <div className="mx-3 mb-2 rounded-lg bg-slate-50 p-1">

                    {/* Admin */}
                    <button
                      onClick={() =>
                        switchDashboard("/admin")
                      }
                      className="
                        w-full
                        flex
                        items-center
                        gap-3
                        px-3
                        py-3
                        rounded-md
                        text-sm
                        text-slate-700
                        hover:bg-white
                      "
                    >
                      <span>👑</span>

                      <span>
                        Admin Dashboard
                      </span>
                    </button>

                    {/* Veterinarian */}
                    <button
                      onClick={() =>
                        switchDashboard("/veterinarian")
                      }
                      className="
                        w-full
                        flex
                        items-center
                        gap-3
                        px-3
                        py-3
                        rounded-md
                        text-sm
                        text-slate-700
                        hover:bg-white
                      "
                    >

                      <Stethoscope className="w-4 h-4 text-blue-600" />

                      <span>
                        Veterinarian Dashboard
                      </span>

                    </button>

                    {/* Pet Owner */}
                    <button
                      onClick={() =>
                        switchDashboard("/dashboard")
                      }
                      className="
                        w-full
                        flex
                        items-center
                        gap-3
                        px-3
                        py-3
                        rounded-md
                        text-sm
                        text-slate-700
                        hover:bg-white
                      "
                    >

                      <span>🐾</span>

                      <span>
                        Pet Owner Dashboard
                      </span>

                    </button>

                  </div>
                )}

                {/* ================================================= */}
                {/* PROFILE */}
                {/* ================================================= */}

                <button
                  onClick={() => {
                    setShowProfile(false);
                    setShowDashboards(false);
                    navigate("/admin/profile");
                  }}
                  className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    text-sm
                    text-slate-700
                    hover:bg-slate-50
                  "
                >

                  <User className="w-4 h-4" />

                  <span>
                    Profile
                  </span>

                </button>

                {/* ================================================= */}
                {/* LOGOUT */}
                {/* ================================================= */}

                <button
                  onClick={() => navigate("/")}
                  className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    text-sm
                    text-red-600
                    hover:bg-red-50
                  "
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

        {/* ================================================= */}
        {/* PAGE CONTENT */}
        {/* ================================================= */}

        <main className="p-4 sm:p-6 md:p-8">
          {children}
        </main>

      </div>

    </div>
  );
}
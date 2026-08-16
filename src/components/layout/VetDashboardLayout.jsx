import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  FileText,
  ClipboardList,
  Pill,
  Clock,
  Syringe,
  User,
  ChevronDown,
  Stethoscope,
  LogOut,
} from "lucide-react";

const vetNavItems = [
  {
    name: "Dashboard",
    path: "/veterinarian",
    icon: LayoutDashboard,
  },
  {
    name: "Appointments",
    path: "/veterinarian/appointments",
    icon: CalendarDays,
  },
  {
    name: "Medical Reports",
    path: "/veterinarian/medical-reports",
    icon: FileText,
  },
  {
    name: "Patient Records",
    path: "/veterinarian/patient-records",
    icon: ClipboardList,
  },
  {
    name: "Prescriptions",
    path: "/veterinarian/prescriptions",
    icon: Pill,
  },
  {
    name: "Today's Appointments",
    path: "/veterinarian/todays-appointments",
    icon: Clock,
  },
  {
    name: "Vaccinations",
    path: "/veterinarian/vaccinations",
    icon: Syringe,
  },
  {
    name: "Profile",
    path: "/veterinarian/profile",
    icon: User,
  },
];

export default function VetDashboardLayout({ children }) {
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

  // ==============================
  // PROFILE TOGGLE
  // ==============================
  const toggleProfile = () => {
    setShowProfile((prev) => !prev);
    setShowDashboards(false);
  };

  // ==============================
  // DASHBOARD TOGGLE
  // ==============================
  const toggleDashboards = () => {
    setShowDashboards((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================================================= */}
      {/* DESKTOP SIDEBAR */}
      {/* ================================================= */}

      <aside className="hidden md:flex w-64 bg-white border-r border-slate-100 flex-col fixed inset-y-0 left-0 z-20">

        {/* LOGO */}
        <div className="p-6">
          <div className="text-xl font-bold text-blue-600 flex items-center gap-2">
            <span>🐾 PawSync</span>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">

          {vetNavItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/veterinarian"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                <Icon className="w-5 h-5 flex-shrink-0" />

                <span>{item.name}</span>
              </NavLink>
            );
          })}

        </nav>
      </aside>

      {/* ================================================= */}
      {/* MAIN AREA */}
      {/* ================================================= */}

      <div className="md:ml-64 min-h-screen">

        {/* ================================================= */}
        {/* TOP HEADER */}
        {/* ================================================= */}

        <header
          className="
            h-16
            bg-white
            border-b
            border-slate-100
            flex
            items-center
            justify-end
            px-4
            sm:px-8
            sticky
            top-0
            z-[999]
          "
        >

          {/* PROFILE CONTAINER */}

          <div className="relative z-[9999]">

            {/* ================================================= */}
            {/* PROFILE BUTTON */}
            {/* ================================================= */}

            <button
              type="button"
              onClick={toggleProfile}
              className="
                flex
                items-center
                gap-3
                px-3
                py-2
                rounded-lg
                hover:bg-slate-50
                transition-colors
              "
            >

              {/* PROFILE ICON */}

              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-blue-600" />
              </div>

              {/* PROFILE TEXT */}

              <div className="text-left hidden sm:block">

                <p className="text-sm font-semibold text-slate-800">
                  Dr. Sarah Johnson
                </p>

                <p className="text-xs text-slate-500">
                  Veterinarian
                </p>

              </div>

              {/* ARROW */}

              <ChevronDown
                className={`
                  w-4
                  h-4
                  text-slate-500
                  transition-transform
                  duration-200
                  ${showProfile ? "rotate-180" : ""}
                `}
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
                  top-full
                  mt-2
                  w-64
                  bg-white
                  rounded-xl
                  shadow-2xl
                  border
                  border-slate-200
                  py-2
                  z-[99999]
                "
              >

                {/* USER INFORMATION */}

                <div className="px-4 py-3 border-b border-slate-100">

                  <p className="font-semibold text-slate-800">
                    Dr. Sarah Johnson
                  </p>

                  <p className="text-xs text-slate-500 mt-0.5">
                    Veterinarian
                  </p>

                </div>

                {/* ================================================= */}
                {/* SWITCH DASHBOARD */}
                {/* ================================================= */}

                <button
                  type="button"
                  onClick={toggleDashboards}
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
                    transition-colors
                  "
                >

                  <span className="flex items-center gap-3">

                    <LayoutDashboard className="w-4 h-4 text-slate-600" />

                    <span>
                      Switch Dashboard
                    </span>

                  </span>

                  <ChevronDown
                    className={`
                      w-4
                      h-4
                      text-slate-500
                      transition-transform
                      duration-200
                      ${
                        showDashboards
                          ? "rotate-180"
                          : ""
                      }
                    `}
                  />

                </button>

                {/* ================================================= */}
                {/* DASHBOARD OPTIONS */}
                {/* ================================================= */}

                {showDashboards && (
                  <div
                    className="
                      mx-3
                      mb-2
                      rounded-lg
                      bg-slate-50
                      border
                      border-slate-100
                      p-1
                    "
                  >

                    {/* ADMIN */}

                    <button
                      type="button"
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
                        hover:text-blue-600
                        transition-colors
                      "
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
                      type="button"
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
                        hover:text-blue-600
                        transition-colors
                      "
                    >

                      <Stethoscope className="w-4 h-4 text-blue-600" />

                      <span>
                        Veterinarian Dashboard
                      </span>

                    </button>

                    {/* PET OWNER */}

                    <button
                      type="button"
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
                        hover:text-blue-600
                        transition-colors
                      "
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

                {/* ================================================= */}
                {/* PROFILE */}
                {/* ================================================= */}

                <button
                  type="button"
                  onClick={() => {
                    setShowProfile(false);
                    setShowDashboards(false);
                    navigate("/veterinarian/profile");
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
                    transition-colors
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
                  type="button"
                  onClick={() => {
                    setShowProfile(false);
                    setShowDashboards(false);
                    navigate("/");
                  }}
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
                    transition-colors
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
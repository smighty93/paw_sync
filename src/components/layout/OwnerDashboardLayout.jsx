import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  ChevronDown,
  LayoutDashboard,
  Stethoscope,
  LogOut,
} from "lucide-react";

import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import StatsGrid from "../../components/dashboard/StatsGrid";
import QuickActions from "../../components/dashboard/QuickActions";
import MyPets from "../../components/dashboard/MyPets";
import UpcomingAppointments from "../../components/dashboard/UpcomingAppointments.jsx";
import VaccinationReminder from "../../components/dashboard/VaccinationReminder";
import RecentActivity from "../../components/dashboard/RecentActivity";

function OwnerMobileDashboard() {
  const [showProfile, setShowProfile] = useState(false);
  const [showDashboards, setShowDashboards] = useState(false);

  const navigate = useNavigate();

  const switchDashboard = (path) => {
    setShowProfile(false);
    setShowDashboards(false);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* MOBILE HEADER */}
      <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 sticky top-0 z-50">

        {/* Logo */}
        <div className="text-lg font-bold text-blue-600">
          🐾 PawSync
        </div>

        {/* Profile */}
        <div className="relative">

          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>

            <ChevronDown
              className={`w-4 h-4 text-slate-500 transition-transform ${
                showProfile ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* PROFILE DROPDOWN */}
          {showProfile && (
            <div className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-[100]">

              {/* User */}
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

              {/* DASHBOARD OPTIONS */}
              {showDashboards && (
                <div className="mx-3 mb-2 rounded-lg bg-slate-50 p-1">

                  <button
                    onClick={() => switchDashboard("/admin")}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-md text-sm hover:bg-white"
                  >
                    👑
                    <span>Admin Dashboard</span>
                  </button>

                  <button
                    onClick={() => switchDashboard("/veterinarian")}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-md text-sm hover:bg-white"
                  >
                    <Stethoscope className="w-4 h-4 text-blue-600" />
                    <span>Veterinarian Dashboard</span>
                  </button>

                  <button
                    onClick={() => switchDashboard("/dashboard")}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-md text-sm hover:bg-white"
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

      {/* CONTENT */}
      <main className="p-4">
        <div className="space-y-6">

          <WelcomeBanner />

          <StatsGrid />

          <QuickActions />

          <MyPets />

          <UpcomingAppointments />

          <VaccinationReminder />

          <RecentActivity />

        </div>
      </main>

    </div>
  );
}

export default OwnerMobileDashboard;
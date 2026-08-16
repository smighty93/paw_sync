import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Stethoscope,
  Heart,
  User,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Activity,
} from "lucide-react";

const mobileUsers = [
  {
    id: 1,
    name: "Dr. Sarah Jenkins",
    role: "Veterinarian",
    status: "Active",
  },
  {
    id: 2,
    name: "Alex Rivera",
    role: "Pet Owner",
    status: "Active",
  },
  {
    id: 3,
    name: "Emily Zhang",
    role: "Pet Owner",
    status: "Active",
  },
];

function AdminMobileDashboard() {
  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);
  const [showDashboards, setShowDashboards] = useState(false);

  const switchDashboard = (path) => {
    setShowProfile(false);
    setShowDashboards(false);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-6">

      {/* ================= HEADER ================= */}
      <div className="bg-white px-4 py-4 border-b border-slate-100 flex items-center justify-between sticky top-0 z-50">

        <div>
          <p className="text-xs text-slate-500">
            Admin Dashboard
          </p>

          <h1 className="text-xl font-bold text-slate-800">
            Welcome back 👋
          </h1>
        </div>

        {/* PROFILE */}
        <div className="relative">

          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowDashboards(false);
            }}
            className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"
          >
            <User className="w-5 h-5 text-blue-600" />
          </button>

          {/* ================= PROFILE MENU ================= */}
          {showProfile && (
            <div className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-[100]">

              {/* USER INFO */}
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="font-semibold text-slate-800">
                  Admin
                </p>

                <p className="text-xs text-slate-500">
                  Administrator
                </p>
              </div>

              {/* SWITCH DASHBOARD */}
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
                    showDashboards ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* DASHBOARD OPTIONS */}
              {showDashboards && (
                <div className="mx-3 mb-2 rounded-lg bg-slate-50 p-1">

                  {/* ADMIN */}
                  <button
                    onClick={() =>
                      switchDashboard("/admin")
                    }
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-md text-sm text-slate-700 hover:bg-white"
                  >
                    <span>👑</span>
                    <span>Admin Dashboard</span>
                  </button>

                  {/* VETERINARIAN */}
                  <button
                    onClick={() =>
                      switchDashboard("/veterinarian")
                    }
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-md text-sm text-slate-700 hover:bg-white"
                  >
                    <Stethoscope className="w-4 h-4 text-blue-600" />
                    <span>Veterinarian Dashboard</span>
                  </button>

                  {/* PET OWNER */}
                  <button
                    onClick={() =>
                      switchDashboard("/dashboard")
                    }
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-md text-sm text-slate-700 hover:bg-white"
                  >
                    <span>🐾</span>
                    <span>Pet Owner Dashboard</span>
                  </button>

                </div>
              )}

              {/* PROFILE */}
              <button
                onClick={() => {
                  setShowProfile(false);
                  navigate("/admin/profile");
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
              >
                <User className="w-4 h-4" />
                Profile
              </button>

              {/* LOGOUT */}
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
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-4 space-y-5">

        {/* WELCOME CARD */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-600 rounded-2xl p-5 text-white shadow-md">
          <p className="text-blue-100 text-sm">
            PawSync Healthcare Network
          </p>

          <h2 className="text-xl font-bold mt-1">
            Everything looks good!
          </h2>

          <p className="text-blue-100 text-sm mt-2 leading-relaxed">
            Monitor users, pets, veterinarians and system activity from here.
          </p>
        </div>

        {/* STATISTICS */}
        <div className="grid grid-cols-2 gap-3">

          <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>

            <p className="text-xs text-slate-500 mt-3">
              Total Users
            </p>

            <p className="text-xl font-bold text-slate-800">
              1,248
            </p>

            <p className="text-xs text-emerald-600 mt-1">
              +12%
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-pink-50 flex items-center justify-center">
              <Heart className="w-5 h-5 text-pink-500" />
            </div>

            <p className="text-xs text-slate-500 mt-3">
              Total Pets
            </p>

            <p className="text-xl font-bold text-slate-800">
              2,105
            </p>

            <p className="text-xs text-emerald-600 mt-1">
              +18%
            </p>
          </div>

        </div>

        {/* REGISTERED USERS */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm">

          <div className="p-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">
              Recent Users
            </h2>
          </div>

          <div className="divide-y divide-slate-100">

            {mobileUsers.map((user) => (
              <div
                key={user.id}
                className="px-4 py-4 flex items-center gap-3"
              >

                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  {user.role === "Veterinarian" ? (
                    <Stethoscope className="w-5 h-5 text-blue-600" />
                  ) : (
                    <User className="w-5 h-5 text-blue-600" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">
                    {user.name}
                  </p>

                  <p className="text-xs text-slate-500">
                    {user.role}
                  </p>
                </div>

                <span className="text-xs font-medium text-emerald-600">
                  {user.status}
                </span>

              </div>
            ))}

          </div>
        </div>

        {/* SYSTEM STATUS */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">

          <div className="flex items-center justify-between mb-4">

            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />

              <h2 className="font-semibold text-slate-800">
                System Status
              </h2>
            </div>

            <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Operational
            </span>

          </div>

          <div className="space-y-3">

            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-sm text-slate-500">
                Medical Records DB
              </span>

              <span className="text-xs font-medium text-emerald-600">
                Operational
              </span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-sm text-slate-500">
                Sync Engine
              </span>

              <span className="text-xs font-medium text-emerald-600">
                Operational
              </span>
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-slate-500">
                Telehealth API
              </span>

              <span className="text-xs font-medium text-emerald-600">
                Operational
              </span>
            </div>

          </div>
        </div>

        {/* QUICK MANAGEMENT */}
        <div className="space-y-4">

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Quick Management
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Quickly access and manage PawSync resources.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">

            <button
              onClick={() => navigate("/admin/users")}
              className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-left"
            >
              <div className="text-2xl mb-2">👥</div>

              <h3 className="font-semibold text-slate-800 text-sm">
                Manage Users
              </h3>

              <p className="text-xs text-slate-500 mt-1">
                View pet owners
              </p>
            </button>

            <button
              onClick={() => navigate("/admin/veterinarians")}
              className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-left"
            >
              <div className="text-2xl mb-2">🩺</div>

              <h3 className="font-semibold text-slate-800 text-sm">
                Veterinarians
              </h3>

              <p className="text-xs text-slate-500 mt-1">
                Manage medical staff
              </p>
            </button>

            <button
              onClick={() => navigate("/admin/pets")}
              className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-left"
            >
              <div className="text-2xl mb-2">🐾</div>

              <h3 className="font-semibold text-slate-800 text-sm">
                Manage Pets
              </h3>

              <p className="text-xs text-slate-500 mt-1">
                View registered pets
              </p>
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminMobileDashboard;
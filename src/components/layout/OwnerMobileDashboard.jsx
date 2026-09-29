import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PawPrint,
  CalendarDays,
  Syringe,
  HeartPulse,
  Plus,
  FileText,
  ChevronRight,
  User,
  ChevronDown,
  LayoutDashboard,
  Stethoscope,
  LogOut,
} from "lucide-react";

import MyPets from "../../components/dashboard/MyPets";
import UpcomingAppointments from "../../components/dashboard/UpcomingAppointments.jsx";
import VaccinationReminder from "../../components/dashboard/VaccinationReminder";
import RecentActivity from "../../components/dashboard/RecentActivity";
import { useAuth } from "../../context/AuthContext";

function OwnerMobileDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [showProfile, setShowProfile] =
    useState(false);

  const [showDashboards, setShowDashboards] =
    useState(false);

  const switchDashboard = (path) => {
    setShowProfile(false);
    setShowDashboards(false);
    navigate(path);
  };

  const handleLogout = async () => {
    setShowProfile(false);
    setShowDashboards(false);

    try {
      await logout();
    } finally {
      navigate("/", { replace: true });
    }
  };

  const displayName =
    user?.user_metadata?.full_name ||
    "Pet Owner";

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      <div className="w-full max-w-md mx-auto px-4 py-5 pb-10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Welcome back 👋
            </p>

            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              {displayName}
            </h1>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowProfile(
                  (value) => !value
                );
                setShowDashboards(false);
              }}
              className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center"
            >
              <User className="w-5 h-5 text-blue-600" />
            </button>

            {showProfile && (
              <div className="absolute right-0 top-14 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 z-[100] overflow-hidden">
                <div className="px-4 py-4 border-b border-slate-100">
                  <p className="font-semibold text-slate-800">
                    {displayName}
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    {user?.email ||
                      "PawSync Member"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowDashboards(
                      (value) => !value
                    )
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

                {showDashboards && (
                  <div className="mx-3 mb-2 rounded-xl bg-slate-50 p-1">
                    <button
                      type="button"
                      onClick={() =>
                        switchDashboard(
                          "/admin"
                        )
                      }
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-slate-700 hover:bg-white"
                    >
                      👑
                      <span>
                        Admin Dashboard
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        switchDashboard(
                          "/veterinarian"
                        )
                      }
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-slate-700 hover:bg-white"
                    >
                      <Stethoscope className="w-4 h-4 text-blue-600" />
                      <span>
                        Veterinarian Dashboard
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        switchDashboard(
                          "/dashboard"
                        )
                      }
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-slate-700 hover:bg-white"
                    >
                      🐾
                      <span>
                        Pet Owner Dashboard
                      </span>
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() =>
                    switchDashboard("/profile")
                  }
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <User className="w-4 h-4" />
                  Profile
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        <section className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-3xl p-6 text-white shadow-lg mb-6">
          <p className="text-blue-100 text-sm font-medium">
            PawSync Pet Care
          </p>

          <h2 className="text-3xl font-bold leading-tight mt-2">
            Good Evening 👋
          </h2>

          <p className="text-blue-100 text-sm leading-6 mt-3">
            Manage your pets, appointments and medical
            records from one place.
          </p>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <button
              type="button"
              onClick={() =>
                navigate("/pets")
              }
              className="bg-white text-blue-600 rounded-xl py-3 px-3 font-semibold text-sm flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Pet
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/appointments")
              }
              className="bg-blue-700 text-white rounded-xl py-3 px-3 font-semibold text-sm flex items-center justify-center gap-2"
            >
              <CalendarDays className="w-4 h-4" />
              Book Appointment
            </button>
          </div>
        </section>

        <section className="mb-7">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Overview
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
                <PawPrint className="w-5 h-5 text-blue-600" />
              </div>

              <p className="text-sm text-slate-500">
                My Pets
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                3
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center mb-3">
                <CalendarDays className="w-5 h-5 text-indigo-600" />
              </div>

              <p className="text-sm text-slate-500">
                Appointments
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                2
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mb-3">
                <Syringe className="w-5 h-5 text-amber-600" />
              </div>

              <p className="text-sm text-slate-500">
                Vaccinations Due
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                1
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-3">
                <HeartPulse className="w-5 h-5 text-emerald-600" />
              </div>

              <p className="text-sm text-slate-500">
                Health Status
              </p>

              <p className="text-2xl font-bold text-emerald-600 mt-1">
                Good
              </p>
            </div>
          </div>
        </section>

        <section className="mb-7">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Quick Actions
          </h2>

          <div className="space-y-3">
            <button
              type="button"
              onClick={() =>
                navigate("/pets")
              }
              className="w-full bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <PawPrint className="w-6 h-6 text-blue-600" />
                </div>

                <div className="text-left">
                  <p className="font-semibold text-slate-900">
                    Add Pet
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    Register a new pet
                  </p>
                </div>
              </div>

              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/appointments")
              }
              className="w-full bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <CalendarDays className="w-6 h-6 text-indigo-600" />
                </div>

                <div className="text-left">
                  <p className="font-semibold text-slate-900">
                    Book Appointment
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    Schedule a vet visit
                  </p>
                </div>
              </div>

              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/medical-records")
              }
              className="w-full bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-emerald-600" />
                </div>

                <div className="text-left">
                  <p className="font-semibold text-slate-900">
                    Medical Records
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    View your pet's records
                  </p>
                </div>
              </div>

              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </section>

        <section className="mb-7">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900">
              My Pets
            </h2>

            <button
              type="button"
              onClick={() =>
                navigate("/pets")
              }
              className="text-sm font-semibold text-blue-600"
            >
              View All
            </button>
          </div>

          <div className="overflow-hidden rounded-2xl">
            <MyPets />
          </div>
        </section>

        <section className="mb-7">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900">
              Upcoming Appointments
            </h2>

            <CalendarDays className="w-5 h-5 text-blue-600" />
          </div>

          <div className="overflow-hidden rounded-2xl">
            <UpcomingAppointments />
          </div>
        </section>

        <section className="mb-7">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900">
              Vaccination Reminder
            </h2>

            <Syringe className="w-5 h-5 text-amber-500" />
          </div>

          <div className="overflow-hidden rounded-2xl">
            <VaccinationReminder />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Recent Activity
          </h2>

          <div className="overflow-hidden rounded-2xl">
            <RecentActivity />
          </div>
        </section>
      </div>
    </div>
  );
}

export default OwnerMobileDashboard;
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  PawPrint,
  CalendarDays,
  Syringe,
  HeartPulse,
  Plus,
  FileText,
  ChevronRight,
} from "lucide-react";

import MyPets from "../../components/dashboard/MyPets";
import UpcomingAppointments from "../../components/dashboard/UpcomingAppointments.jsx";
import VaccinationReminder from "../../components/dashboard/VaccinationReminder";
import RecentActivity from "../../components/dashboard/RecentActivity";

function OwnerMobileDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      <div className="w-full max-w-md mx-auto px-4 py-5 pb-10">

        {/* ================= HEADER ================= */}
        <div className="mb-5">
          <p className="text-sm font-medium text-slate-500">
            Welcome back 👋
          </p>

          <h1 className="text-2xl font-bold text-slate-900 mt-1">
            Pet Owner Dashboard
          </h1>
        </div>

        {/* ================= WELCOME BANNER ================= */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-3xl p-6 text-white shadow-lg mb-6">

          <p className="text-blue-100 text-sm font-medium">
            PawSync Pet Care
          </p>

          <h2 className="text-3xl font-bold leading-tight mt-2">
            Good Evening 👋
          </h2>

          <p className="text-blue-100 text-sm leading-6 mt-3 max-w-xs">
            Manage your pets, appointments and medical records
            from one place.
          </p>

          {/* Banner Actions */}
          <div className="grid grid-cols-2 gap-3 mt-6">

            <button
              type="button"
              onClick={() => navigate("/pets")}
              className="bg-white text-blue-600 rounded-xl py-3 px-3 font-semibold text-sm flex items-center justify-center gap-2 shadow-sm active:scale-95 transition"
            >
              <Plus className="w-4 h-4" />
              Add Pet
            </button>

            <button
              type="button"
              onClick={() => navigate("/appointments")}
              className="bg-blue-700 text-white rounded-xl py-3 px-3 font-semibold text-sm flex items-center justify-center gap-2 shadow-sm active:scale-95 transition"
            >
              <CalendarDays className="w-4 h-4" />
              Book Appointment
            </button>

          </div>
        </section>

        {/* ================= STATISTICS ================= */}
        <section className="mb-7">

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900">
              Overview
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3">

            {/* My Pets */}
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

            {/* Appointments */}
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

            {/* Vaccinations */}
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

            {/* Health */}
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

        {/* ================= QUICK ACTIONS ================= */}
        <section className="mb-7">

          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Quick Actions
          </h2>

          <div className="space-y-3">

            {/* Add Pet */}
            <button
              type="button"
              onClick={() => navigate("/pets")}
              className="w-full bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between active:bg-slate-50 transition"
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

            {/* Appointment */}
            <button
              type="button"
              onClick={() => navigate("/appointments")}
              className="w-full bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between active:bg-slate-50 transition"
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

            {/* Medical Record */}
            <button
              type="button"
              onClick={() => navigate("/medical-records")}
              className="w-full bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between active:bg-slate-50 transition"
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

        {/* ================= MY PETS ================= */}
        <section className="mb-7">

          <div className="flex items-center justify-between mb-4">

            <h2 className="text-xl font-bold text-slate-900">
              My Pets
            </h2>

            <button
              type="button"
              onClick={() => navigate("/pets")}
              className="text-sm font-semibold text-blue-600"
            >
              View All
            </button>

          </div>

          <div className="overflow-hidden rounded-2xl">
            <MyPets />
          </div>

        </section>

        {/* ================= UPCOMING APPOINTMENTS ================= */}
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

        {/* ================= VACCINATION ================= */}
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

        {/* ================= RECENT ACTIVITY ================= */}
        <section>

          <div className="flex items-center justify-between mb-4">

            <h2 className="text-xl font-bold text-slate-900">
              Recent Activity
            </h2>

          </div>

          <div className="overflow-hidden rounded-2xl">
            <RecentActivity />
          </div>

        </section>

      </div>
    </div>
  );
}

export default OwnerMobileDashboard;
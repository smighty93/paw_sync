import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Users,
  PawPrint,
  FileText,
  Bell,
  User,
  Clock,
  ChevronRight,
} from "lucide-react";

function VetMobileDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 pb-6">

      {/* Header */}
      <header className="bg-white border-b border-slate-100 px-4 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500">
            Veterinarian Dashboard
          </p>

          <h1 className="text-xl font-bold text-slate-800">
            Good morning, Doctor 👋
          </h1>
        </div>

        <button
          onClick={() => navigate("/veterinarian/profile")}
          className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"
        >
          <User className="w-5 h-5 text-blue-600" />
        </button>
      </header>

      <main className="p-4 space-y-5">

        {/* Welcome */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-600 rounded-2xl p-5 text-white shadow-md">
          <p className="text-blue-100 text-sm">
            PawSync Veterinary Care
          </p>

          <h2 className="text-xl font-bold mt-1">
            Your schedule for today
          </h2>

          <p className="text-blue-100 text-sm mt-2">
            Manage appointments, pets and medical records.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">

          <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>

            <p className="text-xs text-slate-500 mt-3">
              Today's Appointments
            </p>

            <p className="text-xl font-bold text-slate-800">
              8
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
              <PawPrint className="w-5 h-5 text-emerald-600" />
            </div>

            <p className="text-xs text-slate-500 mt-3">
              Total Pets
            </p>

            <p className="text-xl font-bold text-slate-800">
              126
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>

            <p className="text-xs text-slate-500 mt-3">
              Pet Owners
            </p>

            <p className="text-xl font-bold text-slate-800">
              98
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">
              <FileText className="w-5 h-5 text-orange-600" />
            </div>

            <p className="text-xs text-slate-500 mt-3">
              Medical Records
            </p>

            <p className="text-xl font-bold text-slate-800">
              342
            </p>
          </div>

        </div>

        {/* Today's Appointments */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm">

          <div className="px-4 py-4 flex items-center justify-between border-b border-slate-100">
            <div>
              <h2 className="font-semibold text-slate-800">
                Today's Appointments
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                Upcoming consultations
              </p>
            </div>

            <button
              onClick={() => navigate("/veterinarian/appointments")}
              className="text-sm text-blue-600 font-semibold"
            >
              View All
            </button>
          </div>

          <div className="divide-y divide-slate-100">

            <div className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <PawPrint className="w-5 h-5 text-blue-600" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800">
                  Bruno
                </p>

                <p className="text-xs text-slate-500">
                  Golden Retriever • Alex Rivera
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs font-semibold text-blue-600">
                  10:00 AM
                </p>

                <p className="text-[11px] text-slate-400">
                  Check-up
                </p>
              </div>
            </div>

            <div className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                <PawPrint className="w-5 h-5 text-purple-600" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800">
                  Luna
                </p>

                <p className="text-xs text-slate-500">
                  Persian Cat • Emily Zhang
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs font-semibold text-blue-600">
                  11:30 AM
                </p>

                <p className="text-[11px] text-slate-400">
                  Vaccination
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm">

          <div className="px-4 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">
              Quick Actions
            </h2>
          </div>

          <div className="divide-y divide-slate-100">

            <button
              onClick={() => navigate("/veterinarian/appointments")}
              className="w-full px-4 py-4 flex items-center justify-between text-left"
            >
              <span className="flex items-center gap-3 text-sm text-slate-700">
                <Calendar className="w-5 h-5 text-blue-600" />
                Manage Appointments
              </span>

              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => navigate("/veterinarian/pets")}
              className="w-full px-4 py-4 flex items-center justify-between text-left"
            >
              <span className="flex items-center gap-3 text-sm text-slate-700">
                <PawPrint className="w-5 h-5 text-blue-600" />
                View Pets
              </span>

              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => navigate("/veterinarian/medical-records")}
              className="w-full px-4 py-4 flex items-center justify-between text-left"
            >
              <span className="flex items-center gap-3 text-sm text-slate-700">
                <FileText className="w-5 h-5 text-blue-600" />
                Medical Records
              </span>

              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => navigate("/veterinarian/notifications")}
              className="w-full px-4 py-4 flex items-center justify-between text-left"
            >
              <span className="flex items-center gap-3 text-sm text-slate-700">
                <Bell className="w-5 h-5 text-blue-600" />
                Notifications
              </span>

              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

          </div>
        </div>

        {/* Availability */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
              <Clock className="w-5 h-5 text-emerald-600" />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Today's Availability
              </p>

              <p className="text-xs text-slate-500 mt-1">
                9:00 AM – 5:00 PM
              </p>
            </div>

            <span className="ml-auto text-xs font-semibold text-emerald-600">
              Available
            </span>

          </div>

        </div>

      </main>
    </div>
  );
}

export default VetMobileDashboard;
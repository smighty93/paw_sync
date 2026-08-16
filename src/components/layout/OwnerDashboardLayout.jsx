import React from "react";
import { useNavigate } from "react-router-dom";
import {
  PawPrint,
  CalendarDays,
  Syringe,
  HeartPulse,
  FileText,
  Plus,
  ChevronRight,
  Clock,
} from "lucide-react";

function OwnerMobileDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================= HEADER ================= */}
      <header className="bg-white px-5 py-4 border-b border-slate-100 sticky top-0 z-30">
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">
            <span className="text-2xl">🐾</span>
            <span className="text-xl font-bold text-blue-600">
              PawSync
            </span>
          </div>

          <button
            onClick={() => navigate("/profile")}
            className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center"
          >
            <span className="text-xl">👤</span>
          </button>

        </div>
      </header>


      {/* ================= CONTENT ================= */}
      <main className="px-5 py-6 space-y-7">

        {/* ================= WELCOME ================= */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-3xl p-6 text-white shadow-lg">

          <p className="text-blue-100 text-sm mb-2">
            Welcome back 👋
          </p>

          <h1 className="text-3xl font-bold leading-tight">
            Good Evening!
          </h1>

          <p className="text-blue-100 mt-3 leading-relaxed">
            Manage your pets, appointments and
            medical records from one place.
          </p>

          <div className="grid grid-cols-2 gap-3 mt-6">

            <button
              onClick={() => navigate("/pets")}
              className="bg-white text-blue-600 rounded-2xl py-4 px-3 font-semibold flex flex-col items-center justify-center gap-1 shadow-sm"
            >
              <Plus className="w-6 h-6" />
              <span>Add Pet</span>
            </button>

            <button
              onClick={() => navigate("/appointments")}
              className="bg-blue-700 text-white rounded-2xl py-4 px-3 font-semibold flex flex-col items-center justify-center gap-1"
            >
              <CalendarDays className="w-6 h-6" />
              <span>Book Appointment</span>
            </button>

          </div>
        </section>


        {/* ================= STATISTICS ================= */}
        <section>

          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Overview
          </h2>

          <div className="grid grid-cols-2 gap-4">

            <StatCard
              icon={<PawPrint />}
              label="My Pets"
              value="3"
            />

            <StatCard
              icon={<CalendarDays />}
              label="Appointments"
              value="2"
            />

            <StatCard
              icon={<Syringe />}
              label="Vaccinations Due"
              value="1"
            />

            <StatCard
              icon={<HeartPulse />}
              label="Health Status"
              value="Good"
            />

          </div>
        </section>


        {/* ================= QUICK ACTIONS ================= */}
        <section>

          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Quick Actions
          </h2>

          <div className="grid grid-cols-3 gap-3">

            <ActionCard
              icon={<PawPrint />}
              title="Add Pet"
              onClick={() => navigate("/pets")}
            />

            <ActionCard
              icon={<CalendarDays />}
              title="Book"
              subtitle="Appointment"
              onClick={() => navigate("/appointments")}
            />

            <ActionCard
              icon={<FileText />}
              title="Medical"
              subtitle="Records"
              onClick={() => navigate("/medical-records")}
            />

          </div>
        </section>


        {/* ================= MY PETS ================= */}
        <section>

          <div className="flex items-center justify-between mb-4">

            <h2 className="text-2xl font-bold text-slate-900">
              My Pets
            </h2>

            <button
              onClick={() => navigate("/pets")}
              className="text-blue-600 font-semibold flex items-center gap-1"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </button>

          </div>


          {/* PET CARD */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">

            <img
              src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=80"
              alt="Bruno"
              className="w-full h-52 object-cover"
            />

            <div className="p-5">

              <div className="flex items-start justify-between">

                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Bruno
                  </h3>

                  <p className="text-slate-500 mt-1">
                    Golden Retriever
                  </p>

                  <p className="text-sm text-slate-400 mt-1">
                    3 Years
                  </p>
                </div>

                <span className="text-green-500 text-2xl">
                  ♥
                </span>

              </div>

              <button
                onClick={() => navigate("/pets")}
                className="mt-5 text-blue-600 font-semibold flex items-center gap-1"
              >
                View Details
                <ChevronRight className="w-4 h-4" />
              </button>

            </div>
          </div>

        </section>


        {/* ================= UPCOMING APPOINTMENT ================= */}
        <section>

          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Upcoming Appointment
          </h2>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                <CalendarDays className="text-blue-600" />
              </div>

              <div className="flex-1">

                <h3 className="font-semibold text-slate-900">
                  Veterinary Checkup
                </h3>

                <p className="text-sm text-slate-500">
                  Dr. Sarah Johnson
                </p>

              </div>

              <ChevronRight className="text-slate-400" />

            </div>

            <div className="flex items-center gap-2 mt-4 text-sm text-slate-500">
              <Clock className="w-4 h-4" />
              18 Aug 2026 • 10:30 AM
            </div>

          </div>

        </section>


        {/* ================= VACCINATION ================= */}
        <section>

          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Vaccination Reminder
          </h2>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                <Syringe className="text-orange-500" />
              </div>

              <div>

                <h3 className="font-semibold text-slate-900">
                  Rabies Vaccine
                </h3>

                <p className="text-sm text-slate-500">
                  Bruno • Due 20 Aug 2026
                </p>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}


/* ================= STAT CARD ================= */

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">

      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
        {React.cloneElement(icon, {
          className: "w-5 h-5",
        })}
      </div>

      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="text-2xl font-bold text-slate-900 mt-1">
        {value}
      </p>

    </div>
  );
}


/* ================= ACTION CARD ================= */

function ActionCard({ icon, title, subtitle, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-left active:scale-95 transition"
    >

      <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">

        {React.cloneElement(icon, {
          className: "w-5 h-5",
        })}

      </div>

      <p className="font-semibold text-slate-800 text-sm">
        {title}
      </p>

      {subtitle && (
        <p className="font-semibold text-slate-800 text-sm">
          {subtitle}
        </p>
      )}

    </button>
  );
}

export default OwnerMobileDashboard;
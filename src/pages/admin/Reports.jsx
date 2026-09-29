import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  FileText,
  Download,
  Calendar,
  Loader2,
} from "lucide-react";
import { supabase } from "../../lib/supabase";

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    try {
      setLoading(true);

      const [
        appointmentsResult,
        usersResult,
        petsResult,
        vaccinationsResult,
      ] = await Promise.all([
        supabase
          .from("appointments")
          .select("id, status, appointment_date"),

        supabase
          .from("profiles")
          .select("id, role, created_at"),

        supabase
          .from("pets")
          .select("id, owner_id"),

        supabase
          .from("vaccinations")
          .select("id, pet_id, vaccination_date"),
      ]);

      if (appointmentsResult.error) {
        throw appointmentsResult.error;
      }

      if (usersResult.error) {
        throw usersResult.error;
      }

      if (petsResult.error) {
        throw petsResult.error;
      }

      if (vaccinationsResult.error) {
        throw vaccinationsResult.error;
      }

      const appointments =
        appointmentsResult.data || [];

      const users =
        usersResult.data || [];

      const pets =
        petsResult.data || [];

      const vaccinations =
        vaccinationsResult.data || [];

      const completedAppointments =
        appointments.filter(
          (appointment) =>
            appointment.status === "completed"
        ).length;

      const cancelledAppointments =
        appointments.filter(
          (appointment) =>
            appointment.status === "cancelled"
        ).length;

      const veterinarianCount =
        users.filter(
          (user) =>
            user.role === "veterinarian"
        ).length;

      const petOwnerCount =
        users.filter(
          (user) =>
            user.role === "pet_owner"
        ).length;

      const reportsData = [
        {
          id: "vaccination",
          title: "Vaccination Compliance Report",
          description:
            "Overview of registered pets and recorded vaccinations.",
          type: "Health Audit",
          data: [
            ["Metric", "Value"],
            ["Total Pets", pets.length],
            [
              "Vaccination Records",
              vaccinations.length,
            ],
          ],
        },

        {
          id: "appointments",
          title:
            "Veterinarian Activity & Consultation Report",
          description:
            "Summary of appointments and consultation activity.",
          type: "Operations",
          data: [
            ["Metric", "Value"],
            [
              "Total Appointments",
              appointments.length,
            ],
            [
              "Completed Consultations",
              completedAppointments,
            ],
            [
              "Cancelled Appointments",
              cancelledAppointments,
            ],
            [
              "Veterinarians",
              veterinarianCount,
            ],
          ],
        },

        {
          id: "users",
          title:
            "System User Registration Report",
          description:
            "Summary of registered PawSync users.",
          type: "Analytics",
          data: [
            ["Metric", "Value"],
            [
              "Total Users",
              users.length,
            ],
            [
              "Pet Owners",
              petOwnerCount,
            ],
            [
              "Veterinarians",
              veterinarianCount,
            ],
          ],
        },
      ];

      setReports(reportsData);
    } catch (error) {
      console.error(
        "Error loading reports:",
        error
      );

      setReports([]);
    } finally {
      setLoading(false);
    }
  }

  function downloadReport(report) {
    const csvContent = report.data
      .map((row) =>
        row
          .map((value) =>
            `"${String(value).replace(
              /"/g,
              '""'
            )}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      `${report.id}-report.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            System Reports
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Exportable healthcare operational
            reports generated from PawSync data.
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm py-12 flex justify-center">
            <div className="flex items-center gap-2 text-slate-500">
              <Loader2 className="w-5 h-5 animate-spin" />
              Loading reports...
            </div>
          </div>
        ) : reports.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-10 text-center">
            <FileText className="w-10 h-10 mx-auto text-slate-300" />

            <h2 className="mt-3 font-semibold text-slate-800">
              No report data available
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              There is currently no data available
              to generate reports.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {reports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between"
              >

                <div>

                  <div className="p-3 bg-blue-50 text-blue-600 rounded-lg w-fit mb-4">
                    <FileText className="w-6 h-6" />
                  </div>

                  <h3 className="font-semibold text-slate-800 text-base">
                    {report.title}
                  </h3>

                  <p className="text-sm text-slate-500 mt-2">
                    {report.description}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-4">

                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Generated Today
                    </span>

                    <span>•</span>

                    <span>
                      {report.type}
                    </span>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    downloadReport(report)
                  }
                  className="mt-6 flex items-center justify-center gap-2 w-full py-2 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 font-medium text-sm rounded-lg transition-colors border border-slate-200"
                >
                  <Download className="w-4 h-4" />
                  Download Report
                </button>

              </div>
            ))}

          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
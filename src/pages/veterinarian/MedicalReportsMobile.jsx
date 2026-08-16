import React from "react";

const reports = [
  {
    id: 1,
    petName: "Max",
    ownerName: "John Smith",
    reportType: "General Checkup",
    date: "2026-08-10",
    status: "Completed",
  },
  {
    id: 2,
    petName: "Bella",
    ownerName: "Emily Davis",
    reportType: "Vaccination Report",
    date: "2026-08-09",
    status: "Completed",
  },
  {
    id: 3,
    petName: "Charlie",
    ownerName: "Michael Brown",
    reportType: "Blood Test",
    date: "2026-08-08",
    status: "Pending",
  },
  {
    id: 4,
    petName: "Luna",
    ownerName: "Sophia Wilson",
    reportType: "Medical Examination",
    date: "2026-08-07",
    status: "Completed",
  },
];

function MedicalReportsMobile() {
  const completedReports = reports.filter(
    (report) => report.status === "Completed"
  ).length;

  const pendingReports = reports.filter(
    (report) => report.status === "Pending"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="space-y-5">

        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            Medical Reports
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            View and manage medical reports for your patients.
          </p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-3">

          <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
            <p className="text-xs text-slate-500">
              Total
            </p>

            <p className="text-2xl font-bold text-slate-800 mt-1">
              {reports.length}
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
            <p className="text-xs text-slate-500">
              Completed
            </p>

            <p className="text-2xl font-bold text-emerald-600 mt-1">
              {completedReports}
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
            <p className="text-xs text-slate-500">
              Pending
            </p>

            <p className="text-2xl font-bold text-amber-500 mt-1">
              {pendingReports}
            </p>
          </div>

        </div>

        {/* Reports */}
        <div>
          <h2 className="text-base font-semibold text-slate-800 mb-3">
            Recent Medical Reports
          </h2>

          <div className="space-y-3">
            {reports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm"
              >

                {/* Pet + Status */}
                <div className="flex items-start justify-between gap-3">

                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {report.petName}
                    </h3>

                    <p className="text-xs text-slate-500 mt-1">
                      Owner: {report.ownerName}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium ${
                      report.status === "Completed"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {report.status}
                  </span>

                </div>

                {/* Report Details */}
                <div className="mt-4 pt-3 border-t border-slate-100">

                  <p className="text-sm font-medium text-slate-700">
                    {report.reportType}
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    {report.date}
                  </p>

                </div>

                {/* Action */}
                <button className="mt-4 w-full py-2.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 text-sm font-medium transition-colors">
                  View Report
                </button>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default MedicalReportsMobile;
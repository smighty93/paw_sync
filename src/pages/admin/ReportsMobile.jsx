import React from "react";
import { FileText, Download, Calendar } from "lucide-react";

const reportsList = [
  {
    id: 1,
    title: "Monthly Vaccination Compliance Report",
    date: "Feb 2026",
    type: "Health Audit",
    size: "2.4 MB",
  },
  {
    id: 2,
    title: "Veterinarian Activity & Consultation Log",
    date: "Jan 2026",
    type: "Operations",
    size: "4.1 MB",
  },
  {
    id: 3,
    title: "System User Registration & Retention Report",
    date: "Jan 2026",
    type: "Analytics",
    size: "1.8 MB",
  },
];

export default function ReportsMobile() {
  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="space-y-5">

        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            System Reports
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Exportable healthcare operational logs and compliance summaries.
          </p>
        </div>

        {/* Reports */}
        <div className="space-y-4">
          {reportsList.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-xl p-5 shadow-sm border border-slate-100"
            >

              {/* Icon */}
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg w-fit mb-4">
                <FileText className="w-6 h-6" />
              </div>

              {/* Title */}
              <h3 className="font-semibold text-slate-800 text-base leading-snug">
                {report.title}
              </h3>

              {/* Details */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-3">

                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {report.date}
                </span>

                <span>•</span>

                <span>{report.type}</span>

                <span>•</span>

                <span>{report.size}</span>

              </div>

              {/* Download */}
              <button
                className="
                  mt-5
                  flex
                  items-center
                  justify-center
                  gap-2
                  w-full
                  py-2.5
                  bg-slate-50
                  hover:bg-blue-50
                  text-slate-700
                  hover:text-blue-600
                  font-medium
                  text-sm
                  rounded-lg
                  transition-colors
                  border
                  border-slate-200
                "
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
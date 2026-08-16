import React from "react";

const vaccinations = [
  {
    pet: "Bella",
    vaccine: "Rabies",
    dueDate: "10 Aug 2026",
    status: "Due",
  },
  {
    pet: "Max",
    vaccine: "DHPP",
    dueDate: "15 Aug 2026",
    status: "Scheduled",
  },
  {
    pet: "Charlie",
    vaccine: "Leptospirosis",
    dueDate: "20 Aug 2026",
    status: "Completed",
  },
];

function VaccinationsMobile() {
  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="space-y-5">

        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            Vaccinations
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Track patient vaccination schedules and status.
          </p>
        </div>

        {/* Vaccination Cards */}
        <div className="space-y-3">
          {vaccinations.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-slate-100 shadow-sm p-4"
            >
              {/* Pet + Status */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-slate-800">
                    {item.pet}
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    {item.vaccine}
                  </p>
                </div>

                <span
                  className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium ${
                    item.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : item.status === "Scheduled"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              {/* Due Date */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <p className="text-xs text-slate-400">
                  Due Date
                </p>

                <p className="text-sm font-medium text-slate-700 mt-1">
                  {item.dueDate}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default VaccinationsMobile;
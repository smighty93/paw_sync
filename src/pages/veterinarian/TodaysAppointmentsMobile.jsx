import React from "react";

const appointments = [
  {
    pet: "Bella",
    owner: "Emily Carter",
    time: "09:00 AM",
    status: "Completed",
  },
  {
    pet: "Max",
    owner: "John Smith",
    time: "10:30 AM",
    status: "In Progress",
  },
  {
    pet: "Charlie",
    owner: "Sophia Brown",
    time: "12:00 PM",
    status: "Upcoming",
  },
  {
    pet: "Luna",
    owner: "Michael Lee",
    time: "02:15 PM",
    status: "Upcoming",
  },
];

function TodaysAppointmentsMobile() {
  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="space-y-5">

        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            Today's Appointments
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage today's consultations and patient visits.
          </p>
        </div>

        {/* Appointment Cards */}
        <div className="space-y-3">
          {appointments.map((appointment, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-slate-100 shadow-sm p-4"
            >
              <div className="flex items-start justify-between gap-3">

                <div>
                  <h2 className="font-semibold text-slate-800">
                    {appointment.pet}
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Owner: {appointment.owner}
                  </p>
                </div>

                <span
                  className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium ${
                    appointment.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : appointment.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {appointment.status}
                </span>

              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <p className="text-xs text-gray-400">
                  Appointment Time
                </p>

                <p className="text-sm font-medium text-slate-700 mt-1">
                  {appointment.time}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default TodaysAppointmentsMobile;
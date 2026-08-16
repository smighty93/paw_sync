import React from "react";

const appointments = [
  {
    pet: "Bella",
    owner: "Emily Carter",
    date: "06 Aug 2026",
    time: "09:00 AM",
    status: "Completed",
  },
  {
    pet: "Max",
    owner: "John Smith",
    date: "06 Aug 2026",
    time: "10:30 AM",
    status: "In Progress",
  },
  {
    pet: "Charlie",
    owner: "Sophia Brown",
    date: "06 Aug 2026",
    time: "12:00 PM",
    status: "Upcoming",
  },
  {
    pet: "Luna",
    owner: "Michael Lee",
    date: "06 Aug 2026",
    time: "02:15 PM",
    status: "Upcoming",
  },
];

function AppointmentsMobile() {
  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="space-y-5">

        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            Appointments
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage all veterinary appointments.
          </p>
        </div>

        {/* Appointment Cards */}
        <div className="space-y-4">
          {appointments.map((appointment, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-slate-100 p-4"
            >
              {/* Pet + Status */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-gray-800">
                    {appointment.pet}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
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

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-100">
                <div>
                  <p className="text-xs text-gray-400">Date</p>
                  <p className="text-sm font-medium text-gray-700 mt-1">
                    {appointment.date}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Time</p>
                  <p className="text-sm font-medium text-gray-700 mt-1">
                    {appointment.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default AppointmentsMobile;
import React from "react";

const patients = [
  {
    pet: "Bella",
    owner: "Emily Carter",
    species: "Dog",
    age: "4 Years",
    status: "Healthy",
  },
  {
    pet: "Max",
    owner: "John Smith",
    species: "Cat",
    age: "2 Years",
    status: "Treatment",
  },
  {
    pet: "Charlie",
    owner: "Sophia Brown",
    species: "Dog",
    age: "6 Years",
    status: "Recovered",
  },
  {
    pet: "Luna",
    owner: "Michael Lee",
    species: "Rabbit",
    age: "1 Year",
    status: "Healthy",
  },
];

function PatientRecordsMobile() {
  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="space-y-5">

        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            Patient Records
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            View and manage patient medical records.
          </p>
        </div>

        {/* Patient Cards */}
        <div className="space-y-3">
          {patients.map((patient, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-slate-100 shadow-sm p-4"
            >
              {/* Pet + Status */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-gray-800">
                    {patient.pet}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Owner: {patient.owner}
                  </p>
                </div>

                <span
                  className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium ${
                    patient.status === "Healthy"
                      ? "bg-green-100 text-green-700"
                      : patient.status === "Treatment"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {patient.status}
                </span>
              </div>

              {/* Patient Details */}
              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-100">
                <div>
                  <p className="text-xs text-gray-400">
                    Species
                  </p>

                  <p className="text-sm font-medium text-gray-700 mt-1">
                    {patient.species}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Age
                  </p>

                  <p className="text-sm font-medium text-gray-700 mt-1">
                    {patient.age}
                  </p>
                </div>
              </div>

              {/* Action */}
              <button className="mt-4 w-full py-2.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 text-sm font-medium transition-colors">
                View Patient Record
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default PatientRecordsMobile;
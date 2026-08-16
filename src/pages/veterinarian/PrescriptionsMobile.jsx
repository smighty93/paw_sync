import React from "react";

const prescriptions = [
  {
    pet: "Bella",
    owner: "Emily Carter",
    medicine: "Amoxicillin",
    dosage: "250mg - Twice Daily",
    duration: "7 Days",
  },
  {
    pet: "Max",
    owner: "John Smith",
    medicine: "Vitamin Supplement",
    dosage: "1 Tablet Daily",
    duration: "30 Days",
  },
  {
    pet: "Charlie",
    owner: "Sophia Brown",
    medicine: "Pain Relief",
    dosage: "50mg - Once Daily",
    duration: "5 Days",
  },
  {
    pet: "Luna",
    owner: "Michael Lee",
    medicine: "Deworming Syrup",
    dosage: "10ml - Once",
    duration: "1 Day",
  },
];

function PrescriptionsMobile() {
  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="space-y-5">

        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            Prescriptions
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            View and manage patient prescriptions.
          </p>
        </div>

        {/* Prescription Cards */}
        <div className="space-y-3">
          {prescriptions.map((prescription, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-slate-100 shadow-sm p-4"
            >
              {/* Pet + Owner */}
              <div>
                <h2 className="font-semibold text-gray-800">
                  {prescription.pet}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Owner: {prescription.owner}
                </p>
              </div>

              {/* Medicine */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-xs text-gray-400">
                  Medicine
                </p>

                <p className="text-sm font-semibold text-blue-600 mt-1">
                  {prescription.medicine}
                </p>
              </div>

              {/* Dosage + Duration */}
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <p className="text-xs text-gray-400">
                    Dosage
                  </p>

                  <p className="text-sm font-medium text-gray-700 mt-1">
                    {prescription.dosage}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Duration
                  </p>

                  <p className="text-sm font-medium text-gray-700 mt-1">
                    {prescription.duration}
                  </p>
                </div>
              </div>

              {/* Action */}
              <button className="mt-4 w-full py-2.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 text-sm font-medium transition-colors">
                View Prescription
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default PrescriptionsMobile;
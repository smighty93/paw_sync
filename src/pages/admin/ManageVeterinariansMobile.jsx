import React, { useState } from "react";
import { Search, MoreVertical, UserCheck } from "lucide-react";

const vetList = [
  {
    id: 1,
    name: "Dr. Sarah Jenkins",
    email: "sarah.j@pawsync.com",
    specialty: "Canine & Feline Specialist",
    status: "Active",
    joinedDate: "2025-08-14",
  },
  {
    id: 2,
    name: "Dr. Robert Miller",
    email: "rmiller@vetmed.org",
    specialty: "Veterinary Surgery",
    status: "Active",
    joinedDate: "2025-09-20",
  },
  {
    id: 3,
    name: "Dr. Anita Roy",
    email: "anita.roy@pawsync.com",
    specialty: "Dermatology & Allergy",
    status: "Active",
    joinedDate: "2026-01-08",
  },
];

export default function ManageVeterinariansMobile() {
  const [search, setSearch] = useState("");

  const filteredVets = vetList.filter((vet) =>
    `${vet.name} ${vet.email} ${vet.specialty}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="space-y-5">

        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Manage Veterinarians
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Overview of onboarded medical staff and clinic partners.
          </p>
        </div>

        {/* Veterinarian Directory */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">

          <div className="p-4 border-b border-slate-100">

            <h2 className="text-base font-semibold text-slate-800 mb-3">
              Licensed Veterinarians ({filteredVets.length})
            </h2>

            {/* Search */}
            <div className="relative">
              <Search
                className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search veterinarians..."
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

          </div>

          {/* Veterinarian Cards */}
          <div className="divide-y divide-slate-100">

            {filteredVets.map((vet) => (
              <div key={vet.id} className="p-4">

                <div className="flex items-start justify-between gap-3">

                  <div className="min-w-0">
                    <h3 className="font-semibold text-slate-900">
                      {vet.name}
                    </h3>

                    <p className="text-sm text-slate-500 mt-0.5 break-all">
                      {vet.email}
                    </p>
                  </div>

                  <button className="p-1 text-slate-400 hover:text-slate-600 shrink-0">
                    <MoreVertical className="w-5 h-5" />
                  </button>

                </div>

                {/* Specialty */}
                <div className="mt-4">
                  <p className="text-xs text-slate-400">
                    Specialty
                  </p>

                  <p className="text-sm font-medium text-slate-700 mt-0.5">
                    {vet.specialty}
                  </p>
                </div>

                {/* Status + Joined */}
                <div className="mt-4 grid grid-cols-2 gap-3">

                  <div>
                    <p className="text-xs text-slate-400 mb-1">
                      Status
                    </p>

                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                      <UserCheck className="w-3 h-3" />
                      {vet.status}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400 mb-1">
                      Joined
                    </p>

                    <p className="text-sm text-slate-600">
                      {vet.joinedDate}
                    </p>
                  </div>

                </div>

              </div>
            ))}

            {filteredVets.length === 0 && (
              <div className="p-6 text-center text-sm text-slate-500">
                No veterinarians found.
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
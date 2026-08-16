import React, { useState } from "react";
import { Search, MoreVertical, ShieldAlert, CheckCircle } from "lucide-react";

const petList = [
  {
    id: 1,
    name: "Luna",
    species: "Dog",
    breed: "Golden Retriever",
    owner: "Alex Rivera",
    status: "Vaccinated",
    lastCheckup: "2026-01-20",
  },
  {
    id: 2,
    name: "Milo",
    species: "Cat",
    breed: "Siamese",
    owner: "Emily Zhang",
    status: "Pending Booster",
    lastCheckup: "2025-12-15",
  },
  {
    id: 3,
    name: "Rocky",
    species: "Dog",
    breed: "German Shepherd",
    owner: "Marcus Vance",
    status: "Vaccinated",
    lastCheckup: "2026-02-02",
  },
];

export default function ManagePetsMobile() {
  const [search, setSearch] = useState("");

  const filteredPets = petList.filter((pet) =>
    `${pet.name} ${pet.species} ${pet.breed} ${pet.owner}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="space-y-5">

        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Manage Pets
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Overview of registered pets and health records.
          </p>
        </div>

        {/* Pet Directory */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">

          <div className="p-4 border-b border-slate-100">

            <h2 className="text-base font-semibold text-slate-800 mb-3">
              Pet Directory ({filteredPets.length})
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
                placeholder="Search pets..."
                className="
                  w-full
                  pl-9
                  pr-4
                  py-2.5
                  text-sm
                  rounded-lg
                  border
                  border-slate-200
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />
            </div>

          </div>

          {/* Mobile Cards */}
          <div className="divide-y divide-slate-100">

            {filteredPets.map((pet) => (
              <div
                key={pet.id}
                className="p-4"
              >

                <div className="flex items-start justify-between gap-3">

                  <div className="min-w-0">

                    <h3 className="font-semibold text-slate-900">
                      {pet.name}
                    </h3>

                    <p className="text-sm text-slate-500 mt-0.5">
                      {pet.species} • {pet.breed}
                    </p>

                  </div>

                  <button className="p-1 text-slate-400 hover:text-slate-600 shrink-0">
                    <MoreVertical className="w-5 h-5" />
                  </button>

                </div>

                {/* Owner */}
                <div className="mt-4">
                  <p className="text-xs text-slate-400">
                    Owner
                  </p>

                  <p className="text-sm font-medium text-slate-700 mt-0.5">
                    {pet.owner}
                  </p>
                </div>

                {/* Status + Checkup */}
                <div className="mt-4 grid grid-cols-2 gap-3">

                  <div>
                    <p className="text-xs text-slate-400 mb-1">
                      Vaccination
                    </p>

                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        pet.status === "Vaccinated"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {pet.status === "Vaccinated" ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <ShieldAlert className="w-3 h-3" />
                      )}

                      {pet.status}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400 mb-1">
                      Last Checkup
                    </p>

                    <p className="text-sm text-slate-600">
                      {pet.lastCheckup}
                    </p>
                  </div>

                </div>

              </div>
            ))}

            {filteredPets.length === 0 && (
              <div className="p-6 text-center text-sm text-slate-500">
                No pets found.
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
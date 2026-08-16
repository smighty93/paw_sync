import React, { useState } from "react";
import { Search, MoreVertical, UserCheck, UserX } from "lucide-react";

const userList = [
  {
    id: 1,
    name: "Alex Rivera",
    email: "alex.r@gmail.com",
    role: "Pet Owner",
    status: "Active",
    joinedDate: "2026-01-10",
  },
  {
    id: 2,
    name: "Emily Zhang",
    email: "ezhang@outlook.com",
    role: "Pet Owner",
    status: "Active",
    joinedDate: "2026-01-12",
  },
  {
    id: 3,
    name: "Marcus Vance",
    email: "marcus.vance@tech.io",
    role: "Pet Owner",
    status: "Inactive",
    joinedDate: "2025-11-05",
  },
  {
    id: 4,
    name: "Sophia Chen",
    email: "sophia.c@gmail.com",
    role: "Pet Owner",
    status: "Active",
    joinedDate: "2026-02-01",
  },
];

export default function ManageUsersMobile() {
  const [search, setSearch] = useState("");

  const filteredUsers = userList.filter((user) =>
    `${user.name} ${user.email} ${user.role}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="space-y-5">

        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Manage Users
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            View and manage registered pet owners on PawSync.
          </p>
        </div>

        {/* Users */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">

          {/* Search */}
          <div className="p-4 border-b border-slate-100">

            <h2 className="text-base font-semibold text-slate-800 mb-3">
              All Users ({filteredUsers.length})
            </h2>

            <div className="relative">
              <Search
                className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users..."
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

          </div>

          {/* User Cards */}
          <div className="divide-y divide-slate-100">

            {filteredUsers.map((user) => (
              <div key={user.id} className="p-4">

                <div className="flex items-start justify-between gap-3">

                  <div className="min-w-0">
                    <h3 className="font-semibold text-slate-900">
                      {user.name}
                    </h3>

                    <p className="text-sm text-slate-500 mt-0.5 break-all">
                      {user.email}
                    </p>
                  </div>

                  <button className="p-1 text-slate-400 hover:text-slate-600 shrink-0">
                    <MoreVertical className="w-5 h-5" />
                  </button>

                </div>

                {/* Role */}
                <div className="mt-4">
                  <p className="text-xs text-slate-400">
                    Role
                  </p>

                  <p className="text-sm font-medium text-slate-700 mt-0.5">
                    {user.role}
                  </p>
                </div>

                {/* Status + Joined */}
                <div className="mt-4 grid grid-cols-2 gap-3">

                  <div>
                    <p className="text-xs text-slate-400 mb-1">
                      Status
                    </p>

                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {user.status === "Active" ? (
                        <UserCheck className="w-3 h-3" />
                      ) : (
                        <UserX className="w-3 h-3" />
                      )}

                      {user.status}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400 mb-1">
                      Joined
                    </p>

                    <p className="text-sm text-slate-600">
                      {user.joinedDate}
                    </p>
                  </div>

                </div>

              </div>
            ))}

            {filteredUsers.length === 0 && (
              <div className="p-6 text-center text-sm text-slate-500">
                No users found.
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
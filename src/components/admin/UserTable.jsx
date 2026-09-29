import React, { useEffect, useState } from "react";
import {
  Search,
  MoreVertical,
  CheckCircle,
  Loader2,
} from "lucide-react";

import { supabase } from "../../lib/supabase";

export default function UserTable({
  title = "Users",
  roleFilter = null,
  limit = null,
}) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadUsers();
  }, [roleFilter, limit]);

  async function loadUsers() {
    try {
      setLoading(true);
      setError("");

      let query = supabase
        .from("profiles")
        .select(
          "id, full_name, email, role, created_at, phone, specialization, experience"
        )
        .order("created_at", {
          ascending: false,
        });

      if (roleFilter) {
        query = query.eq("role", roleFilter);
      }

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error: fetchError } = await query;

      // DEBUG: See exactly what Supabase is returning
      console.log("UserTable result:", {
        data,
        error: fetchError,
      });

      if (fetchError) {
        throw fetchError;
      }

      setUsers(data || []);
    } catch (fetchError) {
      console.error("Error loading users:", fetchError);

      setError(
        fetchError?.message ||
          "Unable to load users."
      );
    } finally {
      setLoading(false);
    }
  }

  const filteredUsers = users.filter((user) => {
    const name = user.full_name || "";
    const email = user.email || "";
    const role = user.role || "";

    const search = searchTerm.toLowerCase();

    return (
      name.toLowerCase().includes(search) ||
      email.toLowerCase().includes(search) ||
      role.toLowerCase().includes(search)
    );
  });

  function formatRole(role) {
    if (!role) return "User";

    if (role === "pet_owner") {
      return "Pet Owner";
    }

    if (role === "veterinarian") {
      return "Veterinarian";
    }

    if (role === "admin") {
      return "Administrator";
    }

    return role;
  }

  function formatDate(date) {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">

      {/* Header */}
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">

        <h2 className="text-lg font-semibold text-slate-800">
          {title} ({filteredUsers.length})
        </h2>

        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search records..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            className="pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
          />
        </div>

      </div>

      {/* Error */}
      {error && (
        <div className="m-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-12 text-slate-500">
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
          Loading users...
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="py-12 text-center text-slate-400">
          No users found.
        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full text-left text-sm text-slate-600">

            <thead className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">

              <tr>
                <th className="px-6 py-3">
                  Name
                </th>

                <th className="px-6 py-3">
                  Role / Specialty
                </th>

                <th className="px-6 py-3">
                  Status
                </th>

                <th className="px-6 py-3">
                  Joined Date
                </th>

                <th className="px-6 py-3 text-right">
                  Actions
                </th>
              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredUsers.map((user) => {
                const name =
                  user.full_name || "Unnamed User";

                const initials = name
                  .split(" ")
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((part) =>
                    part.charAt(0)
                  )
                  .join("")
                  .toUpperCase();

                return (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >

                    {/* Name */}
                    <td className="px-6 py-4 font-medium text-slate-900">

                      <div className="flex items-center gap-3">

                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-semibold flex items-center justify-center text-xs">
                          {initials || "U"}
                        </div>

                        <div>
                          <p className="font-semibold">
                            {name}
                          </p>

                          <p className="text-xs text-slate-400">
                            {user.email || "No email"}
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">

                      <div>
                        <p>
                          {formatRole(user.role)}
                        </p>

                        {user.role ===
                          "veterinarian" &&
                          user.specialization && (
                            <p className="text-xs text-slate-400 mt-1">
                              {user.specialization}
                            </p>
                          )}
                      </div>

                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">

                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">

                        <CheckCircle className="w-3 h-3" />

                        Active

                      </span>

                    </td>

                    {/* Joined Date */}
                    <td className="px-6 py-4 text-slate-400">
                      {formatDate(user.created_at)}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">

                      <button
                        type="button"
                        className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}
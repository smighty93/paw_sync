import React, { useEffect, useState } from "react";
import {
  Search,
  MoreVertical,
  CheckCircle,
  XCircle,
  Loader2,
  User,
  Mail,
  Phone,
  BriefcaseMedical,
  CalendarDays,
  AlertTriangle,
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

  // Action menu
  const [openMenu, setOpenMenu] = useState(null);

  // View details modal
  const [selectedUser, setSelectedUser] = useState(null);

  // Termination modal
  const [userToTerminate, setUserToTerminate] = useState(null);
  const [terminating, setTerminating] = useState(false);

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
          `
          id,
          full_name,
          email,
          role,
          created_at,
          phone,
          specialization,
          experience,
          status
        `
        )
        .order("created_at", {
          ascending: false,
        });

      if (roleFilter) {
        query = query.eq("role", roleFilter);
      }

      // Only show active users in the normal table
      query = query.or(
        "status.eq.active,status.is.null"
      );

      if (limit) {
        query = query.limit(limit);
      }

      const {
        data,
        error: fetchError,
      } = await query;

      console.log("UserTable result:", {
        data,
        error: fetchError,
      });

      if (fetchError) {
        throw fetchError;
      }

      setUsers(data || []);
    } catch (fetchError) {
      console.error(
        "Error loading users:",
        fetchError
      );

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
    const specialization =
      user.specialization || "";

    const search =
      searchTerm.toLowerCase();

    return (
      name.toLowerCase().includes(search) ||
      email.toLowerCase().includes(search) ||
      role.toLowerCase().includes(search) ||
      specialization
        .toLowerCase()
        .includes(search)
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

  function handleViewDetails(user) {
    setOpenMenu(null);
    setSelectedUser(user);
  }

  function handleTerminateClick(user) {
    setOpenMenu(null);
    setUserToTerminate(user);
  }

  async function terminateVeterinarian() {
    if (!userToTerminate) return;

    try {
      setTerminating(true);
      setError("");

      const {
        error: updateError,
      } = await supabase
        .from("profiles")
        .update({
          status: "terminated",
          updated_at: new Date().toISOString(),
        })
        .eq("id", userToTerminate.id);

      if (updateError) {
        throw updateError;
      }

      // Remove from current active list immediately
      setUsers((currentUsers) =>
        currentUsers.filter(
          (user) =>
            user.id !== userToTerminate.id
        )
      );

      setUserToTerminate(null);
    } catch (updateError) {
      console.error(
        "Error terminating veterinarian:",
        updateError
      );

      setError(
        updateError?.message ||
          "Unable to terminate veterinarian."
      );
    } finally {
      setTerminating(false);
    }
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
                  user.full_name ||
                  "Unnamed User";

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
                            {user.email ||
                              "No email"}
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">

                      <div>
                        <p>
                          {formatRole(
                            user.role
                          )}
                        </p>

                        {user.role ===
                          "veterinarian" &&
                          user.specialization && (
                            <p className="text-xs text-slate-400 mt-1">
                              {
                                user.specialization
                              }
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
                      {formatDate(
                        user.created_at
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right relative">

                      <button
                        type="button"
                        onClick={() =>
                          setOpenMenu(
                            openMenu === user.id
                              ? null
                              : user.id
                          )
                        }
                        className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all duration-200"
                        aria-label="Open actions"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {/* Dropdown */}
                      {openMenu === user.id && (
                        <div className="absolute right-6 top-12 z-30 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1 text-left">

                          {/* View Details */}
                          <button
                            type="button"
                            onClick={() =>
                              handleViewDetails(
                                user
                              )
                            }
                            className="w-full px-4 py-2.5 flex items-center gap-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                          >
                            <User className="w-4 h-4 text-slate-400" />

                            <span>
                              View Details
                            </span>
                          </button>

                          {/* Terminate */}
                          {roleFilter ===
                            "veterinarian" && (
                            <button
                              type="button"
                              onClick={() =>
                                handleTerminateClick(
                                  user
                                )
                              }
                              className="w-full px-4 py-2.5 flex items-center gap-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <XCircle className="w-4 h-4" />

                              <span>
                                Terminate from Job
                              </span>
                            </button>
                          )}

                        </div>
                      )}

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>
      )}

      {/* =====================================================
          VIEW DETAILS MODAL
      ====================================================== */}

      {selectedUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4"
          onClick={() =>
            setSelectedUser(null)
          }
        >

          <div
            className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">

              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Veterinarian Details
                </h3>

                <p className="text-sm text-slate-400 mt-1">
                  Professional information
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedUser(null)
                }
                className="text-slate-400 hover:text-slate-700 text-xl"
              >
                ×
              </button>

            </div>

            {/* Details */}
            <div className="p-6 space-y-5">

              {/* Name */}
              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 font-semibold flex items-center justify-center">
                  {(
                    selectedUser.full_name ||
                    "U"
                  )
                    .split(" ")
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((part) =>
                      part.charAt(0)
                    )
                    .join("")
                    .toUpperCase()}
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900">
                    {selectedUser.full_name ||
                      "Unnamed User"}
                  </h4>

                  <p className="text-sm text-slate-400">
                    {formatRole(
                      selectedUser.role
                    )}
                  </p>
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Email */}
                <div className="rounded-lg bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <Mail className="w-4 h-4" />
                    <span className="text-xs">
                      Email
                    </span>
                  </div>

                  <p className="text-sm font-medium text-slate-800 break-all">
                    {selectedUser.email ||
                      "-"}
                  </p>
                </div>

                {/* Phone */}
                <div className="rounded-lg bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <Phone className="w-4 h-4" />
                    <span className="text-xs">
                      Phone
                    </span>
                  </div>

                  <p className="text-sm font-medium text-slate-800">
                    {selectedUser.phone ||
                      "-"}
                  </p>
                </div>

                {/* Specialization */}
                <div className="rounded-lg bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <BriefcaseMedical className="w-4 h-4" />
                    <span className="text-xs">
                      Specialization
                    </span>
                  </div>

                  <p className="text-sm font-medium text-slate-800">
                    {selectedUser.specialization ||
                      "Not specified"}
                  </p>
                </div>

                {/* Experience */}
                <div className="rounded-lg bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <BriefcaseMedical className="w-4 h-4" />
                    <span className="text-xs">
                      Experience
                    </span>
                  </div>

                  <p className="text-sm font-medium text-slate-800">
                    {selectedUser.experience !==
                      null &&
                    selectedUser.experience !==
                      undefined &&
                    selectedUser.experience !==
                      ""
                      ? `${selectedUser.experience} years`
                      : "Not specified"}
                  </p>
                </div>

                {/* Joined */}
                <div className="rounded-lg bg-slate-50 p-4 sm:col-span-2">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <CalendarDays className="w-4 h-4" />
                    <span className="text-xs">
                      Joined
                    </span>
                  </div>

                  <p className="text-sm font-medium text-slate-800">
                    {formatDate(
                      selectedUser.created_at
                    )}
                  </p>
                </div>

              </div>

            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-100 flex justify-end">

              <button
                type="button"
                onClick={() =>
                  setSelectedUser(null)
                }
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          TERMINATE CONFIRMATION MODAL
      ====================================================== */}

      {userToTerminate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4"
          onClick={() =>
            !terminating &&
            setUserToTerminate(null)
          }
        >

          <div
            className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="p-6">

              {/* Warning Icon */}
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-semibold text-slate-900">
                Terminate Veterinarian?
              </h3>

              <p className="text-sm text-slate-500 mt-2 leading-6">
                You are about to terminate{" "}
                <span className="font-semibold text-slate-800">
                  {userToTerminate.full_name}
                </span>{" "}
                from the veterinary team.
              </p>

              <p className="text-sm text-slate-500 mt-2 leading-6">
                Their account and historical records
                will remain in the system, but they
                will no longer appear as an active
                veterinarian.
              </p>

            </div>

            {/* Buttons */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">

              <button
                type="button"
                disabled={terminating}
                onClick={() =>
                  setUserToTerminate(null)
                }
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={terminating}
                onClick={
                  terminateVeterinarian
                }
                className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >

                {terminating && (
                  <Loader2 className="w-4 h-4 animate-spin" />
                )}

                {terminating
                  ? "Terminating..."
                  : "Terminate"}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
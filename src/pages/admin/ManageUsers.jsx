import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import UserTable from "../../components/admin/UserTable";

export default function ManageUsers() {
  return (
    <DashboardLayout>
      <div className="space-y-6">

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Manage Users
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              View and manage registered pet owners on PawSync.
            </p>
          </div>
        </div>

        <UserTable
          title="All Users"
          roleFilter="pet_owner"
        />

      </div>
    </DashboardLayout>
  );
}
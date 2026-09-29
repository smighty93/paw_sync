import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import UserTable from "../../components/admin/UserTable";

export default function ManageVeterinarians() {
  return (
    <DashboardLayout>
      <div className="space-y-6">

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Manage Veterinarians
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Overview of onboarded medical staff and clinic partners.
          </p>
        </div>

        <UserTable
          title="Licensed Veterinarians"
          roleFilter="veterinarian"
        />

      </div>
    </DashboardLayout>
  );
}
import React from "react";
import { Mail, Shield } from "lucide-react";

export default function ProfileMobile() {
  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="space-y-5">

        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Admin Profile
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Manage your administrator account parameters.
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">

          <div className="flex flex-col items-center text-center">

            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-2xl">
              AD
            </div>

            {/* Details */}
            <h2 className="text-lg font-bold text-slate-800 mt-4">
              System Administrator
            </h2>

            <p className="text-sm text-slate-500 flex items-center justify-center gap-1.5 mt-2 break-all">
              <Mail className="w-4 h-4 shrink-0" />
              admin@pawsync.com
            </p>

            {/* Access */}
            <span className="mt-3 inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">
              <Shield className="w-3 h-3" />
              Super Admin Access
            </span>

          </div>

        </div>

      </div>
    </div>
  );
}
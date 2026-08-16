import React from "react";

export default function SettingsMobile() {
  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="space-y-5">

        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Platform Settings
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Configure PawSync network controls and preferences.
          </p>
        </div>

        {/* Settings Card */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">

          {/* General Configuration */}
          <div>
            <h2 className="text-base font-semibold text-slate-800 border-b border-slate-100 pb-3">
              General Configuration
            </h2>

            <div className="mt-4 space-y-4">

              {/* Platform Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Platform Name
                </label>

                <input
                  type="text"
                  defaultValue="PawSync Medical Network"
                  className="mt-1 w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Support Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Support Contact Email
                </label>

                <input
                  type="email"
                  defaultValue="admin@pawsync.com"
                  className="mt-1 w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

            </div>
          </div>

          {/* Save */}
          <div className="pt-5 mt-5 border-t border-slate-100">
            <button className="w-full px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors">
              Save Configuration
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
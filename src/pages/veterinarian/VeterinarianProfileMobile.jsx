import React from "react";

function VeterinarianProfileMobile() {
  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="space-y-5">

        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            👤 My Profile
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage your veterinarian profile.
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">

          {/* Avatar */}
          <div className="flex flex-col items-center pb-5 border-b border-slate-100">
            <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
              SJ
            </div>

            <h2 className="text-lg font-bold text-gray-800 mt-3">
              Dr. Sarah Johnson
            </h2>

            <p className="text-sm text-gray-500">
              Veterinary Surgeon
            </p>
          </div>

          {/* Details */}
          <div className="space-y-4 mt-5">

            <div>
              <p className="text-xs text-gray-400">
                Email
              </p>
              <p className="text-sm font-medium text-gray-700 mt-1">
                sarah@example.com
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Phone
              </p>
              <p className="text-sm font-medium text-gray-700 mt-1">
                +91 9876543210
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Specialization
              </p>
              <p className="text-sm font-medium text-gray-700 mt-1">
                Veterinary Surgeon
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Experience
              </p>
              <p className="text-sm font-medium text-gray-700 mt-1">
                8 Years
              </p>
            </div>

          </div>

          {/* Edit Button */}
          <button className="w-full mt-6 bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Edit Profile
          </button>

        </div>

      </div>
    </div>
  );
}

export default VeterinarianProfileMobile;
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  User,
  Mail,
  Phone,
  Shield,
  Loader2,
} from "lucide-react";
import { supabase } from "../../lib/supabase";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);
      setError("");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        throw new Error("You are not logged in.");
      }

      const {
        data,
        error: profileError,
      } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) {
        throw profileError;
      }

      if (!data) {
        throw new Error(
          "Admin profile was not found."
        );
      }

      setProfile(data);
    } catch (err) {
      console.error(
        "Error loading admin profile:",
        err
      );

      setError(
        err.message ||
          "Unable to load your profile."
      );
    } finally {
      setLoading(false);
    }
  }

  function getInitials(name) {
    if (!name) {
      return "AD";
    }

    return name
      .trim()
      .split(" ")
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-20">
          <div className="flex items-center gap-2 text-slate-500">
            <Loader2 className="w-5 h-5 animate-spin" />
            Loading profile...
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="max-w-3xl">
          <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-3xl">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Admin Profile
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            View your administrator account details.
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">

          <div className="flex items-center gap-6">

            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-2xl">
              {getInitials(profile?.full_name)}
            </div>

            {/* Basic Details */}
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                {profile?.full_name || "Administrator"}
              </h2>

              <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-1">
                <Mail className="w-4 h-4" />
                {profile?.email || "No email available"}
              </p>

              {profile?.phone && (
                <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-1">
                  <Phone className="w-4 h-4" />
                  {profile.phone}
                </p>
              )}

              <span className="mt-2 inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">
                <Shield className="w-3 h-3" />
                {profile?.role === "admin"
                  ? "Super Admin Access"
                  : profile?.role || "Administrator"}
              </span>
            </div>
          </div>

          {/* Account Details */}
          <div className="mt-8 border-t border-slate-100 pt-6 space-y-4">

            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-slate-400" />

              <div>
                <p className="text-xs text-slate-400">
                  Full Name
                </p>

                <p className="text-sm font-medium text-slate-800">
                  {profile?.full_name || "Not provided"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-slate-400" />

              <div>
                <p className="text-xs text-slate-400">
                  Email
                </p>

                <p className="text-sm font-medium text-slate-800">
                  {profile?.email || "Not provided"}
                </p>
              </div>
            </div>

            {profile?.phone && (
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-slate-400" />

                <div>
                  <p className="text-xs text-slate-400">
                    Phone
                  </p>

                  <p className="text-sm font-medium text-slate-800">
                    {profile.phone}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-slate-400" />

              <div>
                <p className="text-xs text-slate-400">
                  Account Role
                </p>

                <p className="text-sm font-medium text-slate-800 capitalize">
                  {profile?.role || "Admin"}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
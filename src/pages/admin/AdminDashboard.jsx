import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatsCard from '../../components/admin/StatsCard';
import UserTable from '../../components/admin/UserTable';
import { Users, Stethoscope, Heart, Calendar, ArrowUpRight } from 'lucide-react';

const dummyUsers = [
  { id: 1, name: 'Dr. Sarah Jenkins', email: 'sarah.j@pawsync.com', role: 'Veterinarian', status: 'Active', joinedDate: '2026-02-01' },
  { id: 2, name: 'Alex Rivera', email: 'alex.r@gmail.com', role: 'Pet Owner', status: 'Active', joinedDate: '2026-02-03' },
  { id: 3, name: 'Emily Zhang', email: 'ezhang@outlook.com', role: 'Pet Owner', status: 'Active', joinedDate: '2026-02-04' },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-600 rounded-2xl p-4 sm:p-6 text-white shadow-md">
          <h1 className="text-2xl font-bold">Welcome back, Admin! 👋</h1>
          <p className="text-blue-100 mt-1 text-sm">
            Here is what's happening across the PawSync healthcare network today.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatsCard title="Total Users" value="1,248" change="12%" icon={Users} />
          <StatsCard title="Total Pets" value="2,105" change="18%" icon={Heart} />
          <StatsCard title="Veterinarians" value="84" change="4%" icon={Stethoscope} />
          <StatsCard title="Today's Appointments" value="42" change="8%" icon={Calendar} />
        </div>

        {/* Recent Registrations & System Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <UserTable users={dummyUsers} title="Recent Registrations" />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-slate-800">System Status</h2>
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex flex-col min-[400px]:flex-row min-[400px]:justify-between gap-1 py-2 border-b border-slate-100">
                  <span className="text-slate-500">Medical Records DB</span>
                  <span className="text-emerald-600 font-medium">Operational</span>
                </div>
                <div className="flex flex-col min-[400px]:flex-row min-[400px]:justify-between gap-1 py-2 border-b border-slate-100">
                  <span className="text-slate-500">Sync Engine</span>
                  <span className="text-emerald-600 font-medium">Operational</span>
                </div>
                <div className="flex flex-col min-[400px]:flex-row min-[400px]:justify-between gap-1 py-2 border-b border-slate-100">
                  <span className="text-slate-500">Telehealth API</span>
                  <span className="text-emerald-600 font-medium">Operational</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>Uptime: 99.98%</span>
              <button className="text-blue-600 hover:underline flex items-center gap-1 font-medium">
                View Logs <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
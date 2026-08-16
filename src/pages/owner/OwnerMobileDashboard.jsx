import React from "react";
import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import StatsGrid from "../../components/dashboard/StatsGrid";
import QuickActions from "../../components/dashboard/QuickActions";
import MyPets from "../../components/dashboard/MyPets";
import UpcomingAppointments from "../../components/dashboard/UpcomingAppointments.jsx";
import VaccinationReminder from "../../components/dashboard/VaccinationReminder";
import RecentActivity from "../../components/dashboard/RecentActivity";

function OwnerMobileDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="space-y-6">

        {/* Welcome */}
        <WelcomeBanner />

        {/* Statistics */}
        <StatsGrid />

        {/* Quick Actions */}
        <QuickActions />

        {/* My Pets */}
        <MyPets />

        {/* Upcoming Appointments */}
        <UpcomingAppointments />

        {/* Vaccination Reminder */}
        <VaccinationReminder />

        {/* Recent Activity */}
        <RecentActivity />

      </div>
    </div>
  );
}

export default OwnerMobileDashboard;
import React from "react";
import OwnerDashboardLayout from "../../components/layout/OwnerDashboardLayout";
import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import StatsGrid from "../../components/dashboard/StatsGrid";
import QuickActions from "../../components/dashboard/QuickActions";
import MyPets from "../../components/dashboard/MyPets";
import UpcomingAppointments from "../../components/dashboard/UpcomingAppointments.jsx";
import VaccinationReminder from "../../components/dashboard/VaccinationReminder";
import RecentActivity from "../../components/dashboard/RecentActivity";

function OwnerMobileDashboard() {
  return (
    <OwnerDashboardLayout>
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
    </OwnerDashboardLayout>
  );
}

export default OwnerMobileDashboard;
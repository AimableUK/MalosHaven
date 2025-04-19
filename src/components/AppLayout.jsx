import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import DescriptionIcon from "@mui/icons-material/Description";
import DashboardIcon from "@mui/icons-material/Dashboard"
import HomeIcon from "@mui/icons-material/Home"
import ApartmentIcon from "@mui/icons-material/Apartment"
import BuildIcon from "@mui/icons-material/Build"
import EventIcon from "@mui/icons-material/Event"
import PeopleIcon from "@mui/icons-material/People"
import PaymentIcon from "@mui/icons-material/payment"
import BarChartIcon from "@mui/icons-material/BarChart"
import InsertChartIcon from "@mui/icons-material/InsertChart"
import SettingsIcon from "@mui/icons-material/Settings"
import SecurityIcon from "@mui/icons-material/Security"

import React from "react";
import { customTheme } from "../Theme";

const AppLayout = () => {

  window.addEventListener('beforeunload', function (e) {
    return "data will get lost"
});
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <AppProvider
      theme={customTheme}
      branding={{
        title: "MALOS HAVEN",
        logo: <img src="/logo.png" alt="logo" className="w-8 h-8" />,
      }}
      navigation={[
        {
          kind: 'header',
          title: 'Overview',
        },
        {
          title: "Dashboard",
          icon: <DashboardIcon />,
          segment: "",
        },
        {
          kind: 'divider',
        },
        {
          kind: 'header',
          title: 'Property Management',
        },
        {
          title: "Properties",
          icon: <HomeIcon />,
          segment: "properties",
        },
        {
          title: "Rooms",
          icon: <ApartmentIcon />,
          segment: "rooms",
        },
        {
          title: "Maintenance Requests",
          icon: <BuildIcon />,
          segment: "maintenance",
        },
        {
          kind: 'divider',
        },
        {
          kind: 'header',
          title: 'Booking & Tenant Management',
        },
        {
          title: "Bookings/Reservations",
          icon: <EventIcon />,
          segment: "bookings",
        },
        {
          title: "Tenants",
          icon: <PeopleIcon />,
          segment: "tenants",
        },
        {
          title: "Invoices & Payments",
          icon: <PaymentIcon />,
          segment: "payments",
        },
        {
          kind: 'divider',
        },
        {
          kind: 'header',
          title: 'Analytics & Reports',
        },
        {
          title: "Analytics",
          icon: <BarChartIcon />,
          segment: "analytics",
        },
        {
          title: "Reports",
          icon: <InsertChartIcon />,
          segment: "reports",
        },
        {
          kind: 'divider',
        },
        {
          kind: 'header',
          title: 'Settings & Permissions',
        },
        {
          title: "Settings",
          icon: <SettingsIcon />,
          segment: "settings",
        },
        {
          title: "User Permissions",
          icon: <SecurityIcon />,
          segment: "permissions",
        },
      ]}
      
      currentPathname={location.pathname}
      onNavigate={(pathname) => {
        if (location.pathname !== pathname) {
          navigate(pathname);
        }
      }}      
    >
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </AppProvider>
  );
};

export default AppLayout;

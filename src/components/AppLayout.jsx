import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard"
import HomeIcon from "@mui/icons-material/Home"
import BuildIcon from "@mui/icons-material/Build"
import EventIcon from "@mui/icons-material/Event"
import PeopleIcon from "@mui/icons-material/People"
import PaymentIcon from "@mui/icons-material/payment"
import BarChartIcon from "@mui/icons-material/BarChart"
import InsertChartIcon from "@mui/icons-material/InsertChart"
import SettingsIcon from "@mui/icons-material/Settings"
import SecurityIcon from "@mui/icons-material/Security"
import PageTitleUpdater from "./TitleUpdater";
import { createToolpadRouter } from "./toolpadRouter";
import React from "react";
import { customTheme } from "../Theme";
import ToolbarActionsMenu from "./ToolbarActionsMenu"
import { useMediaQuery } from "@mui/material";

const AppLayout = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const router = createToolpadRouter(navigate, location);

  const isSmallScreen = useMediaQuery("(max-width:320px)");

  return (
    <AppProvider
      theme={customTheme}
      router={router}
      branding={{
        title: !isSmallScreen && "MALOS HAVEN",
        logo: <img src="/MalosHavenLogo.png" alt="logo" className="w-8 h-8" />,
      }}
      navigation={[
        {
          title: 'Dashboard',
          icon: <DashboardIcon />,
          segment: '',
        },
        {
          title: 'Property Management',
          icon: <HomeIcon />,
          children: [
            {
              title: 'Properties',
              icon: <HomeIcon />,
              segment: 'properties',
            },
            {
              title: 'Maintenance Requests',
              icon: <BuildIcon />,
              segment: 'maintenance',
            },
          ],
        },
        {
          title: 'Booking & Tenant',
          icon: <PeopleIcon />,
          children: [
            {
              title: 'Bookings/Reservations',
              icon: <EventIcon />,
              segment: 'bookings',
            },
            {
              title: 'Tenants',
              icon: <PeopleIcon />,
              segment: 'tenants',
            },
            {
              title: 'Invoices & Payments',
              icon: <PaymentIcon />,
              segment: 'payments',
            },
          ],
        },
        {
          title: 'Analytics & Reports',
          icon: <BarChartIcon />,
          children: [
            {
              title: 'Analytics',
              icon: <BarChartIcon />,
              segment: 'analytics',
            },
            {
              title: 'Reports',
              icon: <InsertChartIcon />,
              segment: 'reports',
            },
          ],
        },
        {
          title: 'Settings & Permissions',
          icon: <SettingsIcon />,
          children: [
            {
              title: 'Settings',
              icon: <SettingsIcon />,
              segment: 'settings',
            },
            {
              title: 'User Permissions',
              icon: <SecurityIcon />,
              segment: 'permissions',
            },
          ],
        },
      ]}
      
      
      currentPathname={location.pathname}
      onNavigate={(pathname) => {
        if (location.pathname !== pathname) {
          navigate(pathname);
        }
      }}  
    >
      <DashboardLayout
        slots={{
          toolbarActions: ToolbarActionsMenu,
        }}
        >
        <PageTitleUpdater />
        <Outlet />
      </DashboardLayout>
    </AppProvider>
  );
};

export default AppLayout;

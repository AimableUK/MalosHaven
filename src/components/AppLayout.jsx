import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import BuildIcon from "@mui/icons-material/Build";
import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from "@mui/icons-material/People";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import BarChartIcon from "@mui/icons-material/BarChart";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsIcon from "@mui/icons-material/Settings";
import SecurityIcon from "@mui/icons-material/Security";
import PageTitleUpdater from "./TitleUpdater";
import { createToolpadRouter } from "./toolpadRouter";
import React from "react";
import { customTheme } from "../Theme";
import ToolbarActionsMenu from "./ToolbarActionsMenu";
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
          title: "Dashboard",
          icon: (
            <DashboardIcon
              sx={{
                color: "#E2E2E2 !important",
                "& path": {
                  fill: "#E2E2E2 !important",
                },
              }}
            />
          ),
          segment: "",
        },
        {
          title: "Property Management",
          icon: (
            <HomeIcon
              sx={{
                color: "#E2E2E2 !important",
                "& path": {
                  fill: "#E2E2E2 !important",
                },
              }}
            />
          ),
          children: [
            {
              title: "Properties",
              icon: (
                <HomeIcon
                  sx={{
                    color: "#E2E2E2 !important",
                    "& path": {
                      fill: "#E2E2E2 !important",
                    },
                  }}
                />
              ),
              segment: "properties",
            },
            {
              title: "Maintenance Requests",
              icon: (
                <BuildIcon
                  sx={{
                    color: "#E2E2E2 !important",
                    "& path": {
                      fill: "#E2E2E2 !important",
                    },
                  }}
                />
              ),
              segment: "maintenance",
            },
          ],
        },
        {
          title: "Booking & Tenant",
          icon: (
            <PeopleIcon
              sx={{
                color: "#E2E2E2 !important",
                "& path": {
                  fill: "#E2E2E2 !important",
                },
              }}
            />
          ),
          children: [
            {
              title: "Bookings/Reservations",
              icon: (
                <EventIcon
                  sx={{
                    color: "#E2E2E2 !important",
                    "& path": {
                      fill: "#E2E2E2 !important",
                    },
                  }}
                />
              ),
              segment: "bookings",
            },
            {
              title: "Tenants",
              icon: (
                <PeopleIcon
                  sx={{
                    color: "#E2E2E2 !important",
                    "& path": {
                      fill: "#E2E2E2 !important",
                    },
                  }}
                />
              ),
              segment: "tenants",
            },
            {
              title: "Invoices & Payments",
              icon: (
                <PaymentOutlinedIcon
                  sx={{
                    color: "#E2E2E2 !important",
                    "& path": {
                      fill: "#E2E2E2 !important",
                    },
                  }}
                />
              ),
              segment: "payments",
            },
          ],
        },
        {
          title: "Analytics & Reports",
          icon: (
            <BarChartIcon
              sx={{
                color: "#E2E2E2 !important",
                "& path": {
                  fill: "#E2E2E2 !important",
                },
              }}
            />
          ),
          children: [
            {
              title: "Analytics",
              icon: (
                <BarChartIcon
                  sx={{
                    color: "#E2E2E2 !important",
                    "& path": {
                      fill: "#E2E2E2 !important",
                    },
                  }}
                />
              ),
              segment: "analytics",
            },
            {
              title: "Reports",
              icon: (
                <InsertChartIcon
                  sx={{
                    color: "#E2E2E2 !important",
                    "& path": {
                      fill: "#E2E2E2 !important",
                    },
                  }}
                />
              ),
              segment: "reports",
            },
          ],
        },
        {
          title: "Settings",
          icon: (
            <SettingsIcon
              sx={{
                color: "#E2E2E2 !important",
                "& path": {
                  fill: "#E2E2E2 !important",
                },
              }}
            />
          ),
          segment: "settings"
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

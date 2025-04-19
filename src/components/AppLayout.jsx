import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import DescriptionIcon from "@mui/icons-material/Description";
import React from "react";

const AppLayout = () => {

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <AppProvider
      branding={{
        title: "MALOS HAVEN",
        logo: <img src="/logo.png" alt="logo" className="w-8 h-8" />,
      }}
      navigation={[
        {
          title: "Dashboard",
          icon: <DescriptionIcon />,
          segment: "",
        },
        {
          title: "Team",
          icon: <DescriptionIcon />,
          segment: "team",
        },
        {
          title: "Invoices",
          icon: <DescriptionIcon />,
          segment: "invoices",
        },
      ]}
      currentPathname={location.pathname}
      onNavigate={(pathname) => navigate(pathname)}
    >
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </AppProvider>
  );
};

export default AppLayout;

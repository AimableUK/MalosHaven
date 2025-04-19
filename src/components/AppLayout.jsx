import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../Theme";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import DescriptionIcon from "@mui/icons-material/Description";
import React from "react";
import IconButton from "@mui/material/IconButton";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

const AppLayout = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <AppProvider
      colorMode={{
        mode: theme.palette.mode,
        toggleColorMode: colorMode.toggleColorMode,
      }}
      branding={{
        title: "MALOS HAVEN",
        logo: <img src="/logo.png" alt="logo" className="w-8 h-8" />,
      }}
      slots={{
        headerButtons: (
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
        ),
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

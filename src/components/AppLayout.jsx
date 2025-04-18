import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../Theme";
import { useContext } from "react";
import { ColorModeContext } from "../Theme";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import DescriptionIcon from "@mui/icons-material/Description";

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

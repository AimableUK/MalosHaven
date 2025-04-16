import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { tokens } from "../Theme";
import { useTheme } from "@mui/material/styles";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import DescriptionIcon from "@mui/icons-material/Description";
import { Typography } from "@mui/material";

const AppLayout = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); // <- now properly applied if needed later

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <AppProvider
      branding={{
        title: (
          <Typography variant="h6" className="!font-bold font-sans">
            MALOS HAVEN
          </Typography>
        ),
        logo: <img src="/logo.png" alt="logo" />,
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

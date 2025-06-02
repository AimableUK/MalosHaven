import {
  Alert,
  Avatar,
  Box,
  Button,
  Snackbar,
  Typography,
} from "@mui/material";
import profileCover from "../../assets/profileCover.jpg";
import userAvatar from "../../assets/userAvatar.jpg";
import EditIcon from "@mui/icons-material/Edit";
import BarChartIcon from "@mui/icons-material/BarChart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FooterPage from "../Footer/FooterPage";
import { useMediaQuery } from "@mui/material";
import PropertiesComponent from "../PropertyManagement/PropertiesComponent";
import { useEffect, useState } from "react";

const Profile = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const isSmallScreen = useMediaQuery("(max-width:768px)");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.snackbar) {
      showSnackbar(location.state.snackbar, "success");
      navigate(location.pathname, { replace: true });
    }
  }, [location.state?.snackbar, location.pathname, navigate]);

  const showSnackbar = (message, severity = "success") => {
    setSnackbar((prev) => ({ ...prev, open: false }));
    setTimeout(() => {
      setSnackbar({
        open: true,
        message,
        severity,
      });
    }, 100);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(null);
    setSnackbar({ open: false, message: "", severity: "" });
  };

  return (
    <Box className={`${isSmallScreen ? "m-[10px]" : "m-5"} `}>
      <Box zIndex="0">
        <img
          src={profileCover}
          alt="profile cover"
          style={{ width: "100%", height: "250px", borderRadius: "8px" }}
        />
      </Box>

      {/* all content */}
      <Box
        sx={{
          background: "#2D454D",
          p: 2,
          borderRadius: "5px",
          mt: "-60px",
          position: "relative",
          zIndex: 1,
        }}
        className={`${isSmallScreen ? "m-[2px]" : "m-3"}`}
      >
        {/* prof-top */}
        <Box className="flex flex-col md:flex-row items-center justify-between">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="10px"
          >
            <Avatar
              src={userAvatar}
              alt="profile picture avatar"
              sx={{ borderRadius: "14px", width: "140px", height: "140px" }}
            />
            <Box display="flex" flexDirection="column" textAlign="center">
              <Typography fontWeight="bold">John Doe</Typography>
              <Typography>Property Owner</Typography>
            </Box>
          </Box>
          <Box className="flex gap-1 flex-col lg:flex-row mt-2">
            <Link to="/analytics">
              <Button startIcon={<BarChartIcon />} variant="outlined">
                Analytics
              </Button>
            </Link>

            <Link to="/editprofile">
              <Button
                startIcon={<EditIcon />}
                variant="outlined"
                sx={{ whiteSpace: "nowrap" }}
              >
                Edit Profile
              </Button>
            </Link>

            <Link to="/notifications">
              <Button startIcon={<NotificationsIcon />} variant="outlined">
                Notifications
              </Button>
            </Link>
          </Box>
        </Box>

        {/* prof-content */}
        <Box my="20px">
          <Box>
            <Typography fontWeight="bold">Profile Information</Typography>
            <Typography component="p">
              Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer
              is no. If two equally difficult paths, choose the one more painful
              in the short term (pain avoidance is creating an illusion of
              equality).
            </Typography>
            <Box mt="20px">
              <Typography>
                <span style={{ fontWeight: "bold" }}>Full Name:</span>&nbsp;John
                Doe
              </Typography>
              <Typography>
                <span style={{ fontWeight: "bold" }}>Mobile:</span>&nbsp;+250
                783 309 468
              </Typography>
              <Typography
                sx={{
                  whiteSpace: "normal",
                  overflowWrap: "break-word",
                  hyphens: "auto",
                }}
              >
                <span style={{ fontWeight: "bold" }}>Email:</span>
                &nbsp;johnDoe@exam&shy;ple.com
              </Typography>
              <Typography>
                <span style={{ fontWeight: "bold" }}>Location:</span>
                &nbsp;karuruma, Gatsata, Gasabo, Kigali
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <PropertiesComponent />
      <FooterPage />
    </Box>
  );
};

export default Profile;

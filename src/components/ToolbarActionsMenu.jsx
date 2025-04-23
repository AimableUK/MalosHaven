import React, { useState } from "react";
import {
  Stack,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Avatar,
  Badge,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
  Button,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Settings from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import userAvatar from "../assets/userAvatar.jpg";
import PeopleIcon from "@mui/icons-material/People";
import { Link } from "react-router-dom";

const ToolbarActionsMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [logOutDialog, setLogOutDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () =>
    setSnackbar({ open: false, message: "", severity: "" });

  const handleLogOutClick = () => {
    setAnchorEl(null);
    setLogOutDialog(true);
  };

  const handleLogOut = () => {
    setLogOutDialog(false);
    setSnackbar({
      open: true,
      message: "Signed out successfully",
      severity: "success",
    });
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleCloseNotification = () => {
    setNotificationAnchorEl(null);
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {/* Notifications button */}
      <Tooltip title="Notifications">
        <IconButton onClick={handleNotificationClick}>
          <Badge badgeContent={12} max={9} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      {/* Profile button */}
      <Tooltip title="My Account">
        <IconButton onClick={handleProfileClick}>
          <Avatar src={userAvatar} alt="Profile" />
        </IconButton>
      </Tooltip>

      {/* Account menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <Box display="flex" flexDirection="row" px="15px" gap="8px">
          <Avatar src={userAvatar} alt="profile picture avatar" />
          <Box display="flex" flexDirection="column" textAlign="start">
            <Typography fontWeight="bold">John Doe</Typography>
            <Typography fontSize="12px" color="grey">
              Property Owner
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            height: "1px",
            width: "100%",
            background: "linear-gradient(to right, #2d454d, white, #2d454d)",
            my: 1,
            borderRadius: "999px",
          }}
        />
        <Link to="/profile">
          <MenuItem onClick={handleCloseMenu}>
            <PersonIcon sx={{ mr: 1 }} />
            Profile & Account
          </MenuItem>
        </Link>
        <Link to="/settings">
          <MenuItem onClick={handleCloseMenu}>
            <Settings sx={{ mr: 1 }} />
            Settings
          </MenuItem>
        </Link>
        <Link to="/tenants">
          <MenuItem onClick={handleCloseMenu}>
            <PeopleIcon sx={{ mr: 1 }} />
            Manage Tenants
          </MenuItem>
        </Link>
        <Box
          sx={{
            height: "1px",
            width: "100%",
            background: "linear-gradient(to right, #2d454d, white, #2d454d)",
            my: 1,
            borderRadius: "999px",
          }}
        />
        <MenuItem onClick={handleLogOutClick}>
          <LogoutIcon sx={{ mr: 1 }} />
          Sign Out
        </MenuItem>
      </Menu>

      {/* Notifications menu */}
      <Menu
        anchorEl={notificationAnchorEl}
        open={Boolean(notificationAnchorEl)}
        onClose={handleCloseNotification}
        slotProps={{
          paper: {
            sx: {
              maxHeight: 300,
              width: "300px",
            },
          },
        }}
      >
        <MenuItem disabled>Notifications</MenuItem>

        {[
          "New tenant applied for Unit #304 fgrucyttfdaewt",
          "Maintenance requested for Room 210",
          "Payment received from John Doe",
        ].map((notification, index) => (
          <MenuItem key={index} onClick={handleCloseNotification}>
            <Box display="flex" alignItems="flex-start" width="100%" gap={1}>
              <Avatar
                src={userAvatar}
                alt="profile"
                sx={{ width: 40, height: 40 }}
              />

              <Box
                sx={{
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography fontWeight="bold" fontSize={14} noWrap>
                    George Fred
                  </Typography>
                  <Typography color="grey" fontSize={12} noWrap>
                    12:23 AM
                  </Typography>
                </Box>

                <Typography
                  fontSize={12}
                  color="grey"
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "block",
                    width: "100%",
                  }}
                >
                  {notification}
                </Typography>
              </Box>
            </Box>
          </MenuItem>
        ))}

        <MenuItem
          onClick={handleCloseNotification}
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          View All
        </MenuItem>
      </Menu>

      {/* Logout confirmation dialog */}
      <Dialog open={logOutDialog} onClose={() => setLogOutDialog(false)}>
        <DialogTitle>Log Out</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to Sign out of your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogOutDialog(false)} color="error">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleLogOut}>
            Sign Out
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default ToolbarActionsMenu;

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
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Settings from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import userAvatar from "../assets/userAvatar.jpg";
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
      message: "Logged out successfully",
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
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <Link to="/profile">
          <MenuItem onClick={handleCloseMenu}>
            <PersonIcon sx={{ mr: 1 }} />
            Profile
          </MenuItem>
        </Link>
        <Link to="/settings">
          <MenuItem onClick={handleCloseMenu}>
            <Settings sx={{ mr: 1 }} />
            Settings
          </MenuItem>
        </Link>
        <MenuItem onClick={handleLogOutClick}>
          <LogoutIcon sx={{ mr: 1 }} />
          Logout
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
          "🔔 New tenant applied for Unit #304",
          "🧹 Maintenance requested for Room 210",
          "💰 Payment received from John Doe",
        ].map((notification, index) => (
          <MenuItem key={index} onClick={handleCloseNotification}>
            <Box
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "240px",
              }}
            >
              {notification}
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
            Are you sure you want to log out of your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogOutDialog(false)} color="error">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleLogOut}>
            Log Out
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

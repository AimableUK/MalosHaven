import React, { useState } from "react";
import {
  Stack,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Avatar,
  Button,
  Badge,
  Box,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Settings from "@mui/icons-material/Settings";
import userAvatar from "../assets/userAvatar.jpg";
import { Link } from "react-router-dom";


const ToolbarActionsMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);

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
      {/* notifications button */}
      <Tooltip title="Notifications">
        <IconButton onClick={handleNotificationClick}>
          <Badge badgeContent={12} max={9} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      {/* settings button */}
      <Tooltip title="Settings">
        <Link to="/settings">
          <IconButton>
            <Settings />
          </IconButton>
        </Link>
      </Tooltip>

      {/* profile picture button */}
      <Tooltip title="My Account">
        <IconButton onClick={handleProfileClick}>
          <Avatar src={userAvatar} alt="profile picture avatar" />
        </IconButton>
      </Tooltip>

      {/* account menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <Link to="/profile"><MenuItem onClick={handleCloseMenu}>Profile</MenuItem></Link>
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
      </Menu>

      {/* notifications menu */}
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

        <MenuItem onClick={handleCloseNotification}>
          <Box
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "240px",
            }}
          >
            🔔 New tenant applied for Unit #304
          </Box>
        </MenuItem>

        <MenuItem onClick={handleCloseNotification}>
          <Box
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "240px",
            }}
          >
            🧹 Maintenance requested for Room 210
          </Box>
        </MenuItem>

        <MenuItem onClick={handleCloseNotification}>
          <Box
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "240px",
            }}
          >
            💰 Payment received from John Doe
          </Box>
        </MenuItem>

        <MenuItem
          onClick={handleCloseNotification}
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          View All
        </MenuItem>
      </Menu>
    </Stack>
  );
};

export default ToolbarActionsMenu;

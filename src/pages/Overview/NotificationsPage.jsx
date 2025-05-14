import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import notifications from "../../Data/SiteDataComponent/Notifications";
import FooterPage from "../Footer/FooterPage";
import userAvatar from "../../assets/userAvatar.jpg";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import getRelativeTime from "../../components/utils/getRelativeTime";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DataDeleteConfirm from "../../components/DeleteConfirmComponent/DataDeleteConfirm";

const NotificationsPage = () => {
  const [notificationsData, setNotificationsData] = useState(notifications);
  const [notificationsList, setNotificationsList] = useState(notifications);
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);
  const [deleteType, setDeleteType] = useState("notification");
  const [filterView, setFilterView] = useState("all");

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const deleteNotification =
    "Are you sure you want to Delete this Notification? If you do so, it will be undone";

  const handleDeleteNotification = () => {
    const updatedList = notificationsList.filter(
      (n) => n.id !== selectedNotificationId
    );
    setNotificationsList(updatedList);

    switch (filterView) {
      case "unread":
        setNotificationsList(updatedList.filter((n) => !n.isRead));
        break;
      case "maintenance":
        setNotificationsList(
          updatedList.filter((n) => n.type === "maintenance")
        );
        break;
      case "payment":
        setNotificationsList(updatedList.filter((n) => n.type === "payment"));
        break;
      default:
        setNotificationsList(updatedList);
    }

    setDeleteDialogOpen(false);
  };

  const handleActionsClick = (event, notificationId) => {
    setAnchorEl(event.currentTarget);
    setSelectedNotificationId(notificationId);
  };

  const handleMarkAsRead = () => {
    setAnchorEl(null);

    const updated = notificationsData.map((n) =>
      n.id === selectedNotificationId ? { ...n, isRead: true } : n
    );

    setNotificationsData(updated); // main source of truth

    // Apply filter again based on updated data
    switch (filterView) {
      case "unread":
        setNotificationsList(updated.filter((n) => !n.isRead));
        break;
      case "maintenance":
        setNotificationsList(updated.filter((n) => n.type === "maintenance"));
        break;
      case "payment":
        setNotificationsList(updated.filter((n) => n.type === "payment"));
        break;
      default:
        setNotificationsList(updated);
    }
  };

  const filterAllNotifications = () => {
    setNotificationsList(notificationsData);
    setFilterView("all");
  };

  const filterUnreadNotifications = () => {
    const filtered = notificationsData.filter((n) => !n.isRead);
    setNotificationsList(filtered);
    setFilterView("unread");
  };

  const filterMaintenanceNotifications = () => {
    const filtered = notificationsData.filter((n) => n.type === "maintenance");
    setNotificationsList(filtered);
    setFilterView("maintenance");
  };

  const filterPaymentNotifications = () => {
    const filtered = notificationsData.filter((n) => n.type === "payment");
    setNotificationsList(filtered);
    setFilterView("payment");
  };

  return (
    <Box className="m-5 gap-3">
      <Box className="flex flex-col md:flex-row gap-1 bg-[#22363d] border-t-2 border-t-slate-300 rounded-t-md p-2 mb-2">
        <Button
          sx={{ borderRadius: "30px" }}
          variant="outlined"
          onClick={filterAllNotifications}
        >
          All
        </Button>
        <Button
          sx={{ borderRadius: "30px" }}
          variant="outlined"
          onClick={filterUnreadNotifications}
        >
          UnRead
        </Button>
        <Button
          sx={{ borderRadius: "30px" }}
          variant="outlined"
          onClick={filterMaintenanceNotifications}
        >
          Maintenence
        </Button>
        <Button
          sx={{ borderRadius: "30px" }}
          variant="outlined"
          onClick={filterPaymentNotifications}
        >
          Payment
        </Button>
      </Box>
      <Box className="flex flex-col gap-2 bg-[#22363d] border-t-2 border-t-slate-300 p-3">
        {/* bg-[#2a444d] */}
        {notificationsList.map((notification) => (
          <Box
            key={notification.id}
            className={`flex items-start w-full gap-2 ${notification.isRead === true ? "bg-[#1C292D]" : "bg-[#2a444d]"}  p-3 border-l-2 border-t-slate-300 rounded-r-md`}
          >
            <Avatar
              src={notification.tenant.image || userAvatar}
              alt="profile"
              sx={{ width: 40, height: 40 }}
            />
            <Box
              sx={{
                flex: 1,
                minWidth: "150px",
              }}
              className="flex flex-row justify-between"
            >
              <Box className="mr-2">
                <Typography fontWeight="bold" fontSize={14} noWrap>
                  {notification.tenant.name}
                </Typography>

                <Typography fontSize={12} color="#BDBDBD">
                  {notification.tenant.maintenanceRequests[0]?.message}
                </Typography>
              </Box>
              <Box className="flex flex-col">
                <Typography color="#BDBDBD" fontSize={12} noWrap>
                  {getRelativeTime(notification.timeStamp)}
                </Typography>
                <IconButton
                  onClick={(event) => {
                    handleActionsClick(event, notification.id);
                  }}
                >
                  <MoreHorizIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem
          onClick={() => {
            setDeleteDialogOpen(true);
            setAnchorEl(null);
          }}
          className="hover:text-red-500 group"
        >
          <DeleteIcon className="group-hover:text-red-500" />
          &nbsp; Delete
        </MenuItem>
        <MenuItem
          onClick={handleMarkAsRead}
          className="hover:text-green-500 group"
        >
          <DoneAllIcon className="group-hover:text-green-500" />
          &nbsp; Mark As Read
        </MenuItem>
      </Menu>

      <DataDeleteConfirm
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        selectedNotificationId={selectedNotificationId}
        setSelectedNotificationId={setSelectedNotificationId}
        handleDeleteNotification={handleDeleteNotification}
        deleteNotification={deleteNotification}
        deleteType="notification"
      />
      <FooterPage />
    </Box>
  );
};

export default NotificationsPage;

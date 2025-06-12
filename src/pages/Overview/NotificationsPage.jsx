import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import FooterPage from "../Footer/FooterPage";
import userAvatar from "../../assets/userAvatar.jpg";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import getRelativeTime from "../../components/utils/getRelativeTime";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DataDeleteConfirm from "../../components/DeleteConfirmComponent/DataDeleteConfirm";
import usenotificationStore from "../../Store/NotificationsStore/useNotificationStore";

const NotificationsPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);
  const [deleteType, setDeleteType] = useState("notification");
  const [filterView, setFilterView] = useState("all");
  const [readState, setReadState] = useState();

  const notifications = usenotificationStore((state) => state.notifications);
  const deleteNotification = usenotificationStore(
    (state) => state.deleteNotification
  );
  const markAsRead = usenotificationStore((state) => state.markAsRead);

  const filteredNotifications = useMemo(() => {
    switch (filterView) {
      case "unread":
        return notifications.filter((n) => !n.isRead);
      case "maintenance":
        return notifications.filter((n) => n.type === "maintenance");
      case "payment":
        return notifications.filter((n) => n.type === "payment");
      default:
        return notifications;
    }
  }, [notifications, filterView]);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const deleteANotification =
    "Are you sure you want to Delete this Notification? If you do so, it will be undone";

  const handleDeleteNotification = () => {
    deleteNotification(selectedNotificationId);
    setDeleteDialogOpen(false);
  };

  const handleActionsClick = (event, notification) => {
    setReadState(!notification.isRead);
    setAnchorEl(event.currentTarget);
    setSelectedNotificationId(notification.id);
  };

  const handleMarkAsRead = () => {
    markAsRead(selectedNotificationId);
    setAnchorEl(null);
  };

  return (
    <Box className="m-5 gap-3">
      <Box className="flex flex-col md:flex-row gap-1 bg-[#22363d] border-t-2 border-t-slate-300 rounded-t-md p-2 mb-2">
        <Button
          sx={{ borderRadius: "30px" }}
          variant="outlined"
          onClick={() => setFilterView("all")}
        >
          All
        </Button>
        <Button
          sx={{ borderRadius: "30px" }}
          variant="outlined"
          onClick={() => setFilterView("unread")}
        >
          UnRead
        </Button>
        <Button
          sx={{ borderRadius: "30px" }}
          variant="outlined"
          onClick={() => setFilterView("maintenance")}
        >
          Maintenence
        </Button>
        <Button
          sx={{ borderRadius: "30px" }}
          variant="outlined"
          onClick={() => setFilterView("payment")}
        >
          Payment
        </Button>
      </Box>
      <Box className="flex flex-col gap-2 bg-[#22363d] border-t-2 border-t-slate-300 p-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <Box
              key={notification.id}
              className={`flex items-start w-full gap-2 ${
                notification.isRead === true ? "bg-[#1C292D]" : "bg-[#2a444d]"
              }  p-3 border-l-2 border-t-slate-300 rounded-r-md`}
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
                      handleActionsClick(event, notification);
                    }}
                  >
                    <MoreHorizIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          ))
        ) : filterView === "all" ? (
          <Typography alignSelf="center">
            No Notifications Available yet.
          </Typography>
        ) : filterView === "maintenance" ? (
          <Typography alignSelf="center">
            No Maintainance Notifications Available.
          </Typography>
        ) : filterView === "payment" ? (
          <Typography alignSelf="center">
            No Payments Notifications Available.
          </Typography>
        ) : (
          <Typography alignSelf="center">
            No Unread Notifications Available.
          </Typography>
        )}
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
        {readState && (
          <MenuItem
            onClick={handleMarkAsRead}
            className="hover:text-green-500 group"
          >
            <DoneAllIcon className="group-hover:text-green-500" />
            &nbsp; Mark As Read
          </MenuItem>
        )}
      </Menu>

      <DataDeleteConfirm
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        selectedNotificationId={selectedNotificationId}
        setSelectedNotificationId={setSelectedNotificationId}
        handleDeleteNotification={handleDeleteNotification}
        deleteANotification={deleteANotification}
        deleteType="notification"
      />
      <FooterPage />
    </Box>
  );
};

export default NotificationsPage;

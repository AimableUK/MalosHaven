import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import notifications from "../../Data/SiteDataComponent/Notifications";
import FooterPage from "../Footer/FooterPage";
import userAvatar from "../../assets/userAvatar.jpg";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const NotificationsPage = () => {
  const [notificationsList, setNotificationsList] = useState(notifications);

  return (
    <Box className="m-5 gap-3">
      <Box className="flex flex-col md:flex-row gap-1 bg-[#22363d] border-t-2 border-t-slate-300 rounded-t-md p-2 mb-2">
        <Button sx={{ borderRadius: "30px" }} variant="outlined">
          All
        </Button>
        <Button sx={{ borderRadius: "30px" }} variant="outlined">
          UnRead
        </Button>
        <Button sx={{ borderRadius: "30px" }} variant="outlined">
          Maintenence
        </Button>
        <Button sx={{ borderRadius: "30px" }} variant="outlined">
          Payment
        </Button>
      </Box>
      <Box className="flex flex-col gap-2 bg-[#22363d] border-t-2 border-t-slate-300 p-3">
        {/* bg-[#2a444d] */}
        {notificationsList.map((notification) => (
          <Box
            key={notification.id}
            className="flex items-start w-full gap-2 bg-[#1C292D] p-3 border-l-2 border-t-slate-300 rounded-r-md"
          >
            <Avatar
              src={notification.tenantImage}
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
                  {notification.timeStamp}
                </Typography>
                <IconButton>
                  <MoreHorizIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      <FooterPage />
    </Box>
  );
};

export default NotificationsPage;

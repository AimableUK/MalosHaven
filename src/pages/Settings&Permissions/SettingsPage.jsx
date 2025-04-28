import { Box, Typography } from "@mui/material";
import React from "react";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LogoutIcon from "@mui/icons-material/Logout";


const SettingsPage = () => {
  return (
    <>
      <Box m="20px">
        {/* breadCrumb */}
        <Box sx={{background: "#24383E", p: 2}} className="border-t-2 rounded-b-md">
          <Typography>Settings/</Typography>
        </Box>
        {/* settings body */}
        <Box className="flex flex-col md:grid grid-cols-12 gap-x-[10px] p-[10px]">
          {/* boxes */}
          <Box className="flex flex-row p-3 bg-[#24383E] mt-3 rounded-md border-t-2 col-span-6 items-center">
            <Person2OutlinedIcon sx={{fontSize: "45px", marginRight: "8px", borderRadius: "4px"}}/>
            <Box className="flex flex-col">
              <Typography fontWeight="bold">Profile Info</Typography>
              <Typography color="#B9BCBD">
                Password, Security, and Personal information
              </Typography>
            </Box>
          </Box>

          <Box className="flex flex-row p-3 bg-[#24383E] mt-3 rounded-md border-t-2 col-span-6 items-center">
            <HealthAndSafetyOutlinedIcon sx={{fontSize: "45px",marginRight: "8px"}}/>
            <Box className="flex flex-col">
              <Typography fontWeight="bold">Privacy Settings</Typography>
              <Typography color="#B9BCBD">
              Control your privacy preferences and sharing options.
              </Typography>
            </Box>
          </Box>

          <Box className="flex flex-row p-3 bg-[#24383E] mt-3 rounded-md border-t-2 col-span-6 items-center">
            <NotificationsOutlinedIcon sx={{fontSize: "45px",marginRight: "8px"}}/>
            <Box className="flex flex-col">
              <Typography fontWeight="bold">Notification Settings</Typography>
              <Typography color="#B9BCBD">
              Set preferences for email, SMS, and app notifications.
              </Typography>
            </Box>
          </Box>

          <Box className="flex flex-row p-3 bg-[#24383E] mt-3 rounded-md border-t-2 col-span-6 items-center">
            <PaymentsOutlinedIcon sx={{fontSize: "45px",marginRight: "8px"}}/>
            <Box className="flex flex-col">
              <Typography fontWeight="bold">Billing & Payments</Typography>
              <Typography color="#B9BCBD">
              View and manage payment methods, invoices, and subscription plans.
              </Typography>
            </Box>
          </Box>

          <Box className="flex flex-row p-3 bg-[#24383E] mt-3 rounded-md border-t-2 col-span-6 items-center">
            <LockOutlinedIcon sx={{fontSize: "45px",marginRight: "8px"}}/>
            <Box className="flex flex-col">
              <Typography fontWeight="bold">Security</Typography>
              <Typography color="#B9BCBD">
              Enable two-factor authentication, monitor login activity, and review security settings.
              </Typography>
            </Box>
          </Box>

          <Box className="flex flex-row p-3 bg-[#24383E] mt-3 rounded-md border-t-2 col-span-6 items-center">
            <PsychologyOutlinedIcon sx={{fontSize: "45px",marginRight: "8px"}}/>
            <Box className="flex flex-col">
              <Typography fontWeight="bold">Preferences</Typography>
              <Typography color="#B9BCBD">
              Customize theme, language, and other app settings.
              </Typography>
            </Box>
          </Box>

          <Box className="flex flex-row p-3 bg-[#24383E] mt-3 rounded-md border-t-2 col-span-6 items-center">
            <HelpOutlineOutlinedIcon sx={{fontSize: "45px",marginRight: "8px"}}/>
            <Box className="flex flex-col">
              <Typography fontWeight="bold">Help & Support</Typography>
              <Typography color="#B9BCBD">
              Access FAQs, contact support, and report issues.
              </Typography>
            </Box>
          </Box>

          <Box className="flex flex-row p-3 bg-[#24383E] mt-3 rounded-md border-t-2 col-span-6 items-center">
            <LogoutIcon sx={{fontSize: "45px",marginRight: "8px"}}/>
            <Box className="flex flex-col">
              <Typography fontWeight="bold">Log Out</Typography>
              <Typography color="#B9BCBD">
              Sign out of your account.
              </Typography>
            </Box>
          </Box>

        </Box>
      </Box>
    </>
  );
};

export default SettingsPage;

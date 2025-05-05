import { Box, Breadcrumbs, Typography } from "@mui/material";
import React, { useState } from "react";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavigateNext } from "@mui/icons-material";
import { Link } from "react-router-dom";

const ProfileInfoContent = () => (
  <Typography>
    Here you can update your password, security preferences, and personal
    information.
  </Typography>
);

const PrivacySettingsContent = () => (
  <Typography>
    Control your privacy preferences and manage your sharing options.
  </Typography>
);

const NotificationSettingsContent = () => (
  <Typography>
    Set preferences for email, SMS, and app notifications.
  </Typography>
);

const PaymentMethodsContent = () => (
  <Typography>
    Manage your saved payment methods and view your transaction history.
  </Typography>
);

const SecuritySettingsContent = () => (
  <Typography>
    Update your password, enable two-factor authentication, and review account
    activity.
  </Typography>
);

const PreferencesContent = () => (
  <Typography>
    Customize your user experience, theme, language, and regional settings.
  </Typography>
);

const HelpSupportContent = () => (
  <Typography>
    Get help, access support resources, and contact our support team.
  </Typography>
);

const LogoutContent = () => (
  <Typography>Log out of your account securely. Come back soon!</Typography>
);

const SettingsPage = () => {
  const [activeSetting, setActiveSetting] = useState("");

  const handleSettingClick = (setting) => {
    setActiveSetting(setting);
  };

  const getSettingContent = () => {
    switch (activeSetting) {
      case "Profile Info":
        return <ProfileInfoContent />;
      case "Privacy Settings":
        return <PrivacySettingsContent />;
      case "Notification Settings":
        return <NotificationSettingsContent />;
      case "Payment Methods":
        return <PaymentMethodsContent />;
      case "Billing & Payments":
        return <ProfileInfoContent />;
      case "Security":
        return <SecuritySettingsContent />;
      case "Preferences":
        return <PreferencesContent />;
      case "Help & Support":
        return <HelpSupportContent />;
      case "Sign Out":
        return <LogoutContent />;
      default:
        return null;
    }
  };

  return (
    <>
      <Box m="20px">
        <Box
          sx={{ background: "#24383E", px: 2 }}
          className="border-t-2 rounded-b-md"
        >
          <Box
            sx={{
              py: 2,
              borderRadius: "0 99px 9999px 0",
            }}
            className="w-fit bg-gradient-to-l from-[#2D454D] to-[#24383E] pl-2 pr-16 h-fit"
          >
            <Breadcrumbs
              separator={<NavigateNext fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link
                color="inherit"
                href="/settings"
                onClick={() => setActiveSetting("")}
                className="hover:text-slate-200"
              >
                Settings
              </Link>
              <Typography color="textPrimary">{activeSetting}</Typography>
            </Breadcrumbs>
          </Box>
        </Box>

        {!activeSetting ? (
          <Box className="flex flex-col md:grid grid-cols-12 gap-x-[10px] p-[10px]">
            {/* boxes */}
            <Box
              onClick={() => handleSettingClick("Profile Info")}
              className="flex flex-row p-3 bg-[#24383E] mt-3 rounded-md border-t-2 col-span-6 items-center cursor-pointer hover:translate-y-1 transition-transform duration-100 ease-in-out active:translate-y-2"
            >
              <Person2OutlinedIcon
                sx={{
                  fontSize: "45px",
                  marginRight: "8px",
                  borderRadius: "4px",
                }}
              />
              <Box className="flex flex-col">
                <Typography fontWeight="bold">Profile Info</Typography>
                <Typography color="#B9BCBD">
                  Password, Security, and Personal information
                </Typography>
              </Box>
            </Box>

            <Box
              onClick={() => handleSettingClick("Privacy Settings")}
              className="flex flex-row p-3 bg-[#24383E] mt-3 rounded-md border-t-2 col-span-6 items-center cursor-pointer hover:translate-y-1 transition-transform duration-100 ease-in-out active:translate-y-2"
            >
              <HealthAndSafetyOutlinedIcon
                sx={{ fontSize: "45px", marginRight: "8px" }}
              />
              <Box className="flex flex-col">
                <Typography fontWeight="bold">Privacy Settings</Typography>
                <Typography color="#B9BCBD">
                  Control your privacy preferences and sharing options.
                </Typography>
              </Box>
            </Box>

            <Box
              onClick={() => handleSettingClick("Notification Settings")}
              className="flex flex-row p-3 bg-[#24383E] mt-3 rounded-md border-t-2 col-span-6 items-center cursor-pointer hover:translate-y-1 transition-transform duration-100 ease-in-out active:translate-y-2"
            >
              <NotificationsOutlinedIcon
                sx={{ fontSize: "45px", marginRight: "8px" }}
              />
              <Box className="flex flex-col">
                <Typography fontWeight="bold">Notification Settings</Typography>
                <Typography color="#B9BCBD">
                  Set preferences for email, SMS, and app notifications.
                </Typography>
              </Box>
            </Box>

            <Box
              onClick={() => handleSettingClick("Billing & Payments")}
              className="flex flex-row p-3 bg-[#24383E] mt-3 rounded-md border-t-2 col-span-6 items-center cursor-pointer hover:translate-y-1 transition-transform duration-100 ease-in-out active:translate-y-2"
            >
              <PaymentsOutlinedIcon
                sx={{ fontSize: "45px", marginRight: "8px" }}
              />
              <Box className="flex flex-col">
                <Typography fontWeight="bold">Billing & Payments</Typography>
                <Typography color="#B9BCBD">
                  View and manage payment methods, invoices, and subscription
                  plans.
                </Typography>
              </Box>
            </Box>

            <Box
              onClick={() => handleSettingClick("Security")}
              className="flex flex-row p-3 bg-[#24383E] mt-3 rounded-md border-t-2 col-span-6 items-center cursor-pointer hover:translate-y-1 transition-transform duration-100 ease-in-out active:translate-y-2"
            >
              <LockOutlinedIcon sx={{ fontSize: "45px", marginRight: "8px" }} />
              <Box className="flex flex-col">
                <Typography fontWeight="bold">Security</Typography>
                <Typography color="#B9BCBD">
                  Enable two-factor authentication, monitor login activity, and
                  review security settings.
                </Typography>
              </Box>
            </Box>

            <Box
              onClick={() => handleSettingClick("Preferences")}
              className="flex flex-row p-3 bg-[#24383E] mt-3 rounded-md border-t-2 col-span-6 items-center cursor-pointer hover:translate-y-1 transition-transform duration-100 ease-in-out active:translate-y-2"
            >
              <PsychologyOutlinedIcon
                sx={{ fontSize: "45px", marginRight: "8px" }}
              />
              <Box className="flex flex-col">
                <Typography fontWeight="bold">Preferences</Typography>
                <Typography color="#B9BCBD">
                  Customize theme, language, and other app settings.
                </Typography>
              </Box>
            </Box>

            <Box
              onClick={() => handleSettingClick("Help & Support")}
              className="flex flex-row p-3 bg-[#24383E] mt-3 rounded-md border-t-2 col-span-6 items-center cursor-pointer hover:translate-y-1 transition-transform duration-100 ease-in-out active:translate-y-2"
            >
              <HelpOutlineOutlinedIcon
                sx={{ fontSize: "45px", marginRight: "8px" }}
              />
              <Box className="flex flex-col">
                <Typography fontWeight="bold">Help & Support</Typography>
                <Typography color="#B9BCBD">
                  Access FAQs, contact support, and report issues.
                </Typography>
              </Box>
            </Box>

            <Box
              onClick={() => handleSettingClick("Sign Out")}
              className="flex flex-row p-3 bg-[#24383E] mt-3 rounded-md border-t-2 col-span-6 items-center cursor-pointer hover:translate-y-1 transition-transform duration-100 ease-in-out active:translate-y-2"
            >
              <LogoutIcon sx={{ fontSize: "45px", marginRight: "8px" }} />
              <Box className="flex flex-col">
                <Typography fontWeight="bold">Sign Out</Typography>
                <Typography color="#B9BCBD">
                  Sign out of your account.
                </Typography>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box className="mt-1 p-4">
            <Box className="p-3 bg-[#24383E] rounded-md">
              <Typography variant="h6" fontWeight="bold" m="2px">
                {activeSetting}
              </Typography>
            </Box>

            <Box className="mt-4 p-4 bg-[#24383E] rounded-md">
              {getSettingContent()}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default SettingsPage;

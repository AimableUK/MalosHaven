import { Box, Typography } from "@mui/material";
import React from "react";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";

const SettingsPage = () => {
  return (
    <>
      <Box m="20px" borderRadius="4px">
        {/* breadCrumb */}
        <Box sx={{background: "#24383E", p: 2}}>
          <Typography>Settings/</Typography>
        </Box>
        {/* settings body */}
        <Box className="bg-[#24383E] mt-3">
          {/* boxes */}
          <Box className="flex flex-row p-3">
            <Person2OutlinedIcon sx={{fontSize: "50px"}}/>
            <Box className="flex flex-col max-w-64">
              <Typography fontWeight="bold">Profile Info</Typography>
              <Typography color="#B9BCBD">
                Password, Security, and Personal information
              </Typography>
            </Box>
          </Box>

        </Box>
      </Box>
    </>
  );
};

export default SettingsPage;

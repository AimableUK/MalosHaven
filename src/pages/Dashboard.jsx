import { Box, Typography } from "@mui/material";
import React from "react";

const Dashboard = () => {

  return (
    <Box>
      {/* top Grid - 3 */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="10px"
        className="font-roboto"
        padding="10px"
      >
        {[1, 2, 3].map((_, index) => (
          <Box
            key={index}
            className={'flex flex-row justify-between w-fit shadow-md shadow-slate-900'}
            sx={{
              gridColumn: "span 4",
              display: "flex",
              borderRadius: "8px",
              p: "10px",
              mr: "3px",
              width: "100%",
            }}
          >
            <Box className="flex flex-col">
              <Typography sx={{ fontWeight: "bold",}}>
                Properties
              </Typography>
              <Typography
                sx={{ fontWeight: "bold", fontSize: "25px" }}
              >
                14
              </Typography>
              <Typography sx={{ color: 'black' }}>
                <span className="text-[#4caf50]">+55%</span> since last month
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ color: 'red' }}>Real Time</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;

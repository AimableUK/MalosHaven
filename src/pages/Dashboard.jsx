import { Box, Card, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";

const Dashboard = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  console.log(isDark)

  return (
    <Box>
      {/* top Grid - 3 */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12,1fr)"
        gridAutoRows="140px"
        gap="10px"
        className="font-roboto"
        padding="10px"
      >
        <Box
          className={`flex flex-row justify-between w-fit shadow-md ${isDark ? 'shadow-slate-400' : 'shadow-slate-900' }`}
          sx={{
            gridColumn: 'span 4',
            display: 'flex',
            borderRadius: '8px',
            p: '10px',
            mr: '3px',
            width: '100%',
            backgroundColor: isDark ? '#4C83BA' : '#f0f2f5',
          }}
        >
          <Box className="flex flex-col">
            <Typography sx={{ fontWeight: "bold", color: "grey" }}>
              Properties
            </Typography>
            <Typography
              sx={{ fontWeight: "bold", color: "#344767", fontSize: "25px" }}
            >
              14
            </Typography>
            <Typography sx={{ color: "grey" }}>
              <span className="text-[#4caf50]">+55%</span> since last month
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ color: "grey" }}>Real Time</Typography>
          </Box>
        </Box>

        <Box
          className={`flex flex-row justify-between w-fit shadow-md ${isDark ? 'shadow-slate-400' : 'shadow-slate-900' }`}
          sx={{
            gridColumn: 'span 4',
            display: 'flex',
            borderRadius: '8px',
            p: '10px',
            mr: '3px',
            width: '100%',
            backgroundColor: isDark ? '#4C83BA' : '#f0f2f5',
          }}
        >
          <Box className="flex flex-col">
            <Typography sx={{ fontWeight: "bold", color: "grey" }}>
              Properties
            </Typography>
            <Typography
              sx={{ fontWeight: "bold", color: "#344767", fontSize: "25px" }}
            >
              14
            </Typography>
            <Typography sx={{ color: "grey" }}>
              <span className="text-[#4caf50]">+55%</span> since last month
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ color: "grey" }}>Real Time</Typography>
          </Box>
        </Box>

        <Box
          className={`flex flex-row justify-between w-fit shadow-md ${isDark ? 'shadow-slate-400' : 'shadow-slate-900' }`}
          sx={{
            gridColumn: 'span 4',
            display: 'flex',
            borderRadius: '8px',
            p: '10px',
            mr: '3px',
            width: '100%',
            backgroundColor: isDark ? '#4C83BA' : '#f0f2f5',
          }}
        >
          <Box className="flex flex-col">
            <Typography sx={{ fontWeight: "bold", color: "grey" }}>
              Properties
            </Typography>
            <Typography
              sx={{ fontWeight: "bold", color: "#344767", fontSize: "25px" }}
            >
              14
            </Typography>
            <Typography sx={{ color: "grey" }}>
              <span className="text-[#4caf50]">+55%</span> since last month
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ color: "grey" }}>Real Time</Typography>
          </Box>
        </Box>

        
      </Box>
    </Box>
  );
};

export default Dashboard;

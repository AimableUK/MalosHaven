import { Box, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../Theme"; // Adjust path if needed

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isDark = theme.palette.mode === "dark";

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
            className={`flex flex-row justify-between w-fit shadow-md ${
              isDark ? "shadow-slate-400" : "shadow-slate-900"
            }`}
            sx={{
              gridColumn: "span 4",
              display: "flex",
              borderRadius: "8px",
              p: "10px",
              mr: "3px",
              width: "100%",
              backgroundColor: colors.primary[400], // Use theme token
              color: colors.grey[100], // Text color
            }}
          >
            <Box className="flex flex-col">
              <Typography sx={{ fontWeight: "bold", color: colors.grey[300] }}>
                Properties
              </Typography>
              <Typography
                sx={{ fontWeight: "bold", color: colors.grey[100], fontSize: "25px" }}
              >
                14
              </Typography>
              <Typography sx={{ color: colors.grey[300] }}>
                <span className="text-[#4caf50]">+55%</span> since last month
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ color: colors.grey[300] }}>Real Time</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;

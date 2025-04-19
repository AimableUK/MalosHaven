import { Box, Typography } from "@mui/material";
import React from "react";
import PieChart from "../components/PieChart";
import LineChart from "../components/LineChart.jsx";

const Dashboard = () => {
  return (
    <Box display="flex" flexDirection="column">
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
            variant="card"
            key={index}
            className={
              "flex flex-row justify-between w-fit shadow-md shadow-slate-600"
            }
            sx={{
              gridColumn: "span 4",
              display: "flex",
              borderRadius: "8px",
              p: "10px",
              mr: "3px",
              width: "100%",
              background: "#2D454D",
            }}
          >
            <Box className="flex flex-col">
              <Typography sx={{ fontWeight: "bold" }}>Properties</Typography>
              <Typography sx={{ fontWeight: "bold", fontSize: "25px" }}>
                14
              </Typography>
              <Typography sx={{ color: "#B3B3B3" }}>
                <span className="text-[#4caf50]">+55%</span> since last month
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ color: "#B3B3B3" }}>Real Time</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="10px"
        className="font-roboto"
        padding="10px"
      >
        <Box
          sx={{
            gridColumn: "span 5",
            display: "flex",
            flexDirection: "column",
            borderRadius: "8px",
            p: 2,
            background: "#2D454D",
            overflow: "hidden", // prevent overflow
            height: "fit"
          }}
          className="shadow-md shadow-slate-600 h-fit"
        >
          <Typography sx={{ color: "#fff", mb: 1 }}>Channels</Typography>

          <Box sx={{ height: "100%", minHeight: 240, width: "100%" }}>
            <PieChart />
          </Box>
        </Box>

        <Box
          sx={{
            gridColumn: "span 5",
            display: "flex",
            flexDirection: "column",
            borderRadius: "8px",
            p: 2,
            background: "#2D454D",
            overflow: "hidden", // prevent overflow
            height: "fit"
          }}
          className="shadow-md shadow-slate-600 h-fit"
        >
          <Typography sx={{ color: "#fff", mb: 1 }}>Revenue</Typography>

          <Box sx={{ height: "100%", minHeight: 240, width: "100%" }}>
            <LineChart />
          </Box>
        </Box>

        
        
      </Box>
    </Box>
  );
};

export default Dashboard;

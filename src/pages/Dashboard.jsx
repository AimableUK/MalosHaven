import { Box, Typography } from "@mui/material";
import React from "react";
import PieChart from "../components/PieChart";
import LineChart from "../components/LineChart.jsx";

const Dashboard = () => {
  return (
    <Box display="flex" flexDirection="column">
      {/* Top Grid - 3 Cards */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap="10px"
        className="font-roboto"
        padding="10px"
      >
        {[1, 2, 3].map((_, index) => (
          <Box
            key={index}
            className="flex flex-row justify-between shadow-md shadow-slate-600"
            sx={{
              gridColumn: "span 4",
              display: "flex",
              borderRadius: "8px",
              p: "10px",
              background: "#2D454D",
            }}
          >
            <Box className="flex flex-col">
              <Typography sx={{ fontWeight: "bold", color: "#fff" }}>
                Properties
              </Typography>
              <Typography sx={{ fontWeight: "bold", fontSize: "25px", color: "#fff" }}>
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

      {/* Second Grid - Pie + Line Chart */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
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
            overflow: "hidden",
            height: "fit-content",
          }}
          className="shadow-md shadow-slate-600"
        >
          <Typography sx={{ color: "#fff", mb: 1 }}>Channels</Typography>
          <Box sx={{ minHeight: 240, width: "100%" }}>
            <PieChart />
          </Box>
        </Box>

        <Box
          sx={{
            gridColumn: "span 7",
            display: "flex",
            flexDirection: "column",
            borderRadius: "8px",
            p: 2,
            background: "#2D454D",
            overflow: "hidden",
            height: "fit-content",
          }}
          className="shadow-md shadow-slate-600"
        >
          <Typography sx={{ color: "#fff", mb: 1 }}>Revenue</Typography>
          <Box sx={{ minHeight: 240, width: "100%" }}>
            <LineChart />
          </Box>
        </Box>
      </Box>

      {/* Third Grid - Bookings */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap="10px"
        className="font-roboto"
        padding="10px"
      >
        <Box
          sx={{
            gridColumn: "span 4",
            display: "flex",
            flexDirection: "column",
            background: "#2D454D",
            borderRadius: "8px",
            p: 2,
          }}
          className="shadow-md shadow-slate-600"
        >
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <Box>
              <Typography sx={{ color: "#fff" }}>Bookings</Typography>
              <Typography sx={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}>
                281
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography sx={{ color: "#B3B3B3" }}>
              <span className="text-[#4caf50]">+55%</span> since last month
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;

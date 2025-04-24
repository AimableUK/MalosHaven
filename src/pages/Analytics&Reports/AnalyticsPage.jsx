import React from "react";
import { Box, Button, Typography } from "@mui/material";
import MovingTwoToneIcon from "@mui/icons-material/MovingTwoTone";
import PieChart from "../../components/PieChart";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
// import Select from '@mui/joy/Select';
// import Option from '@mui/joy/Option';
import Select from "@mui/material";

const AnalyticsPage = () => {
  return (
    <Box>
      {/* first and second row */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap="10px"
        className="font-roboto"
        padding="10px"
      >
        {/* boxes */}
        <Box sx={{ gridColumn: "span 6" }}>
          {/* first 2 boxes */}
          <Box
            sx={{ gridColumn: "span 3", mb: 1 }}
            display="flex"
            flexDirection="row"
          >
            <Box
              className="flex flex-col shadow-md shadow-slate-600 gap-y-1"
              sx={{
                width: "100%",
                display: "flex",
                borderRadius: "8px",
                p: 2,
                background: "#2D454D",
                margin: 1,
              }}
            >
              <Typography fontSize="14px" color="#BDBDBD">
                Renevue
              </Typography>
              <Typography fontSize="30px" fontWeight="bold">
                $35,800
              </Typography>
              <Typography color="#11b886">
                <MovingTwoToneIcon />
                &nbsp;+10.23%
              </Typography>
            </Box>
            <Box
              className="flex flex-col shadow-md shadow-slate-600"
              sx={{
                display: "flex",
                borderRadius: "8px",
                p: 2,
                background: "#2D454D",
                width: "100%",
                margin: 1,
              }}
            >
              <Typography fontSize="14px" color="#BDBDBD">
                Repeat Purchase
              </Typography>
              <Typography fontSize="30px" fontWeight="bold">
                $12,900
              </Typography>
              <Typography color="#11b886">
                <MovingTwoToneIcon />
                &nbsp;+20.4%
              </Typography>
            </Box>
          </Box>

          {/* second 2 boxes */}
          <Box sx={{ gridColumn: "span 3" }} display="flex" flexDirection="row">
            <Box
              className="flex flex-col shadow-md shadow-slate-600"
              sx={{
                width: "100%",
                display: "flex",
                borderRadius: "8px",
                p: 2,
                background: "#2D454D",
                margin: 1,
              }}
            >
              <Typography fontSize="14px" color="#BDBDBD">
                Average Order value
              </Typography>
              <Typography fontSize="30px" fontWeight="bold">
                $1,000
              </Typography>
              <Typography color="#ef4770">
                <TrendingDownRoundedIcon />
                &nbsp;-10.23%
              </Typography>
            </Box>
            <Box
              className="flex flex-col shadow-md shadow-slate-600"
              sx={{
                display: "flex",
                borderRadius: "8px",
                p: 2,
                background: "#2D454D",
                width: "100%",
                margin: 1,
              }}
            >
              <Typography fontSize="14px" color="#BDBDBD">
                New Customers
              </Typography>
              <Typography fontSize="30px" fontWeight="bold">
                $143
              </Typography>
              <Typography color="#ef4770">
                <TrendingDownRoundedIcon />
                &nbsp;-10.23%
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* chart */}
        <Box
          sx={{
            gridColumn: "span 6",
            display: "flex",
            flexDirection: "column",
            borderRadius: "8px",
            p: 2,
            background: "#2D454D",
            overflow: "hidden",
            height: "fit-content",
            m: 1,
          }}
          className="shadow-md shadow-slate-600"
        >
          <Box>
            <Typography sx={{ color: "#fff", mb: 1, fontWeight: "bold" }}>
              Earnings Report
            </Typography>
            <Select defaultValue="dog" variant="soft">
              <Option value="dog">Dog</Option>
              <Option value="cat">Cat</Option>
              <Option value="fish">Fish</Option>
              <Option value="bird">Bird</Option>
            </Select>
          </Box>
          <Box sx={{ minHeight: 240, width: "100%" }}>
            <PieChart />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AnalyticsPage;

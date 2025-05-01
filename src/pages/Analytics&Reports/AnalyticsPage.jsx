import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import MovingTwoToneIcon from "@mui/icons-material/MovingTwoTone";
import PieChart from "../../components/DataCharts/PieChart";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LineChart from "../../components/DataCharts/LineChart";
import SMPieChart from "../../components/DataCharts/SMPieChart";
import FooterPage from "../Footer/FooterPage";
import { useMediaQuery } from "@mui/material";

const AnalyticsPage = () => {
  const [value, setValue] = useState("monthly");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const isTablet = useMediaQuery("(max-width:768px)");

  return (
    <Box>
      {/* first extended row */}
      <Box className="flex flex-col md:grid grid-cols-12 gap-[10px] p-[10px] font-roboto">
        {/* boxes */}
        <Box
          sx={{ gridColumn: "span 6" }}
          className="flex flex-col md:grid h-full"
        >
          {/* first 2 boxes */}
          <Box sx={{ gridColumn: "span 3" }} display="flex" flexDirection="row">
            <Box
              className="flex flex-col shadow-md shadow-slate-600 gap-y-1"
              sx={{
                width: "100%",
                display: "flex",
                borderRadius: "8px",
                p: "16px",
                background: "#2D454D",
                margin: "8px",
                overflow: "hidden",
              }}
            >
              <Typography className="text-[#BDBDBD]">Renevue</Typography>
              <Typography
                fontWeight="bold"
                sx={{
                  fontSize: { xs: "1.4rem", md: "2.1rem", lg: "2.1rem" },
                }}
              >
                $35,800
              </Typography>
              <Typography color="#11b886">
                <MovingTwoToneIcon />
                &nbsp;+10.23%
              </Typography>
            </Box>
            <Box
              className="flex flex-col shadow-md shadow-slate-600 gap-y-1"
              sx={{
                width: "100%",
                display: "flex",
                borderRadius: "8px",
                p: "16px",
                background: "#2D454D",
                margin: "8px",
                overflow: "hidden",
              }}
            >
              <Typography fontSize="14px" color="#BDBDBD">
                Repeat Purchase
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "1.4rem", md: "2.1rem", lg: "2.1rem" },
                }}
                fontWeight="bold"
              >
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
                p: "16px",
                background: "#2D454D",
                margin: "8px",
              }}
            >
              <Typography fontSize="14px" color="#BDBDBD">
                Average Order value
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "1.4rem", md: "2.1rem", lg: "2.1rem" },
                }}
                fontWeight="bold"
              >
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
                p: "16px",
                background: "#2D454D",
                width: "100%",
                margin: "8px",
              }}
            >
              <Typography fontSize="14px" color="#BDBDBD">
                New Customers
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "1.4rem", md: "2.1rem", lg: "2.1rem" },
                }}
                fontWeight="bold"
              >
                $143
              </Typography>
              <Typography color="#ef4770">
                <TrendingDownRoundedIcon />
                &nbsp;-10.23%
              </Typography>
            </Box>
          </Box>

          {/* third 1 box */}
          <Box sx={{ gridColumn: "span 3" }} display="flex" flexDirection="row">
            <Box
              className="flex flex-col shadow-md shadow-slate-600 h-full"
              sx={{
                width: "100%",
                display: "flex",
                borderRadius: "8px",
                p: "16px",
                background: "#2D454D",
                mx: "8px",
                mt: "5px",
              }}
            >
              <Typography fontSize="14px" color="#BDBDBD">
                Average Order value
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "1.4rem", md: "2.1rem", lg: "2.1rem" },
                }}
                fontWeight="bold"
              >
                $1,000
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
            my: "7px",
          }}
          className="shadow-md shadow-slate-600 h-full"
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography sx={{ color: "#fff", mb: 1, fontWeight: "bold" }}>
              Earnings Report
            </Typography>
            <FormControl>
              <InputLabel id="custom-select-label">Date Range</InputLabel>
              <Select
                labelId="custom-select-label"
                value={value}
                label="Date Range"
                onChange={handleChange}
                IconComponent={ArrowDropDownIcon}
                sx={{
                  "& .MuiSelect-icon": {
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "white",
                  },
                  width: "fit-content",
                }}
              >
                <MenuItem value="weekly" defaultChecked>
                  Weekly
                </MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="annually">Annually</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minHeight: "340px", width: "100%" }}>
            <PieChart />
          </Box>
        </Box>
      </Box>

      {/* second extended row */}
      <Box className={!isTablet && "flex flex-col md:grid grid-cols-12 gap-[20px] p-[10px] font-roboto mx-2"}>
        {/* line chart */}
        <Box
          sx={{
            gridColumn: "span 8",
            display: "flex",
            flexDirection: "column",
            borderRadius: "8px",
            p: 2,
            background: "#2D454D",
            overflow: "hidden",
            m:1,
            mx:2
          }}
          className="shadow-md shadow-slate-600 h-full"
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography sx={{ color: "#fff", mb: 1 }}>Revenue</Typography>
            <FormControl>
              <InputLabel id="custom-select-label">Date Range</InputLabel>
              <Select
                labelId="custom-select-label"
                value={value}
                label="Date Range"
                onChange={handleChange}
                IconComponent={ArrowDropDownIcon}
                sx={{
                  "& .MuiSelect-icon": {
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "white",
                  },
                  width: "fit-content",
                }}
              >
                <MenuItem value="weekly" defaultChecked>
                  Weekly
                </MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="annually">Annually</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ minHeight: 240, width: "100%" }}>
            <LineChart />
          </Box>
        </Box>

        {/* small pie chart */}
        <Box
          sx={{
            gridColumn: "span 4",
            display: "flex",
            flexDirection: "column",
            borderRadius: "8px",
            p: 2,
            background: "#2D454D",
            overflow: "hidden",
            m:1,
            mx: 2
          }}
          className="shadow-md shadow-slate-600 h-full"
        >
          <Typography sx={{ color: "#fff", mb: 1, textAlign: "center" }}>
            Project Status
          </Typography>
          <Box sx={{ minHeight: 240, width: "100%" }}>
            <SMPieChart />
          </Box>
        </Box>
      </Box>
      <FooterPage />
    </Box>
  );
};

export default AnalyticsPage;

import { Box, Button, Icon, Typography } from "@mui/material";
import React from "react";
import salesEarning from "../../assets/salesEarning.svg";
import DownloadIcon from "@mui/icons-material/Download";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import PaidIcon from "@mui/icons-material/Paid";
import MovingIcon from "@mui/icons-material/Moving";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import FlareIcon from "@mui/icons-material/Flare";
import PreviewIcon from '@mui/icons-material/Preview';
import FooterPage from "../Footer/FooterPage";

const ReportsPage = () => {
  return (
    <Box>
      <Box className="flex flex-col md:grid grid-cols-12 gap-7 p-2 font-roboto m-2">
        {/* right One */}
        <Box className="col-span-12 md:col-span-4 bg-[#2D454D] rounded shadow-md shadow-slate-600 p-4 py-10 flex flex-col justify-between items-center">
          <Typography fontWeight="bold">Total Payments</Typography>
          <FlareIcon
            sx={{
              color: "#6950e8",
              background: "#272d49",
              p: "5px",
              borderRadius: "6px",
              fontSize: "45px",
            }}
          />
          <Typography
            fontWeight="bold"
            sx={{
              fontSize: { xs: "1.4rem", md: "2.1rem", lg: "2.1rem" },
            }}
          >
            $35,800
          </Typography>
          <Typography color="#11b886" fontWeight="bold">
            <ArrowUpwardIcon
              sx={{
                color: "#11b786",
                background: "#185E49",
                p: "5px",
                borderRadius: "100%",
                fontSize: "35px",
              }}
            />
            &nbsp;+10.23%
          </Typography>
          <Typography className="text-[#BDBDBD]">
            Calculated in the last 7 days
          </Typography>
          <Button startIcon={<PreviewIcon />} variant="contained" color="info">
            View Full Report
          </Button>
        </Box>

        {/* second row Box */}
        <Box className="col-span-12 md:col-span-8 flex flex-col gap-7">
          {/* Revenue Box */}
          <Box className="flex flex-row justify-between items-center shadow-md shadow-slate-600 bg-[#2D454D] rounded p-4 col-span-8">
            <Box className="flex flex-col">
              <Typography className="text-[#BDBDBD]">Revenue</Typography>
              <Typography
                fontWeight="bold"
                sx={{
                  fontSize: { xs: "1.4rem", md: "2.1rem", lg: "2.1rem" },
                }}
              >
                $35,800
              </Typography>
              <Button
                startIcon={<DownloadIcon />}
                variant="contained"
                color="info"
              >
                Download
              </Button>
            </Box>

            <Box>
              <img src={salesEarning} alt="sales Earnings" />
            </Box>
          </Box>

          {/* Placeholder for more components */}
          <Box className="flex flex-row gap-7">
            {/* 1 */}
            <Box className="flex-1 shadow-md shadow-slate-600 bg-[#2D454D] rounded flex-col flex items-center justify-center py-5">
              <LocalGroceryStoreIcon
                sx={{
                  color: "#6950e8",
                  background: "#2e315a",
                  p: "5px",
                  borderRadius: "6px",
                  fontSize: "45px",
                }}
              />
              <Typography mt="12px">Total Payments</Typography>
              <Typography color="#8F7CED">$785K</Typography>
            </Box>

            {/* 2 */}
            <Box className="flex-1 shadow-md shadow-slate-600 bg-[#2D454D] rounded flex-col flex items-center justify-center py-5">
              <PaidIcon
                sx={{
                  color: "#11b786",
                  background: "#1c4647",
                  p: "5px",
                  borderRadius: "6px",
                  fontSize: "45px",
                }}
              />
              <Typography mt="12px">Payments Completed</Typography>
              <Typography color="#11b786">$33K</Typography>
            </Box>

            {/* 3 */}
            <Box className="flex-1 shadow-md shadow-slate-600 bg-[#2D454D] rounded flex-col flex items-center justify-center py-5">
              <MovingIcon
                sx={{
                  color: "#ef4770",
                  background: "#492f42",
                  p: "5px",
                  borderRadius: "6px",
                  fontSize: "45px",
                }}
              />
              <Typography mt="12px">Remaining Payments</Typography>
              <Typography color="#ef4770">$1.2K</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <FooterPage />
    </Box>
  );
};

export default ReportsPage;

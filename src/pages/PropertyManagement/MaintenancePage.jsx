import { Avatar, Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import React from "react";
import SMLineChart from "../../components/DataCharts/SMLineChart";
import SMPieChart from "../../components/DataCharts/SMPieChart";
import PeopleIcon from "@mui/icons-material/People";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import userAvatar from "../../assets/userAvatar.jpg";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import ArticleIcon from "@mui/icons-material/Article";

const MaintenancePage = () => {
  return (
    <Box>
      <Box classname="">
        <Box className="">
          {/* charts */}
          <Box className="bg-[#6950e8] p-3">
            <Typography fontWeight="bold">
              Last 2 Months Maintainence Requests
            </Typography>
            <Box sx={{ minHeight: 240, width: "100%" }}>
              <SMLineChart />
            </Box>
          </Box>
          {/* Down One */}
          <Box className="mx-4 mb-4 flex flex-col md:grid grid-cols-12 col-span-12 gap-5 -mt-10">
            {/* Boxes */}
            <Box className="col-span-7">
              {/* 1 row 2 box */}
              <Box className="flex flex-col md:flex-row gap-5 mb-5">
                <Box className="w-full flex flex-row justify-between bg-[#2D454D] rounded shadow-md p-5 border-t-2">
                  <Box className="flex flex-row items-center gap-2">
                    <PeopleIcon sx={{ fontSize: "50px", color: "#705add" }} />
                    <Box className="flex flex-col font-bold">
                      <Typography fontWeight="bold">New Leads</Typography>
                      <Typography fontWeight="bold" color="#8979d8">
                        3050
                      </Typography>
                    </Box>
                  </Box>
                  <ArrowRightAltIcon sx={{ color: "#9c8de6" }} />
                </Box>

                <Box className="w-full flex flex-row justify-between bg-[#2D454D] rounded shadow-md p-5 border-t-2">
                  <Box className="flex flex-row items-center gap-2">
                    <PeopleIcon sx={{ fontSize: "50px", color: "#705add" }} />
                    <Box className="flex flex-col font-bold">
                      <Typography fontWeight="bold">New Leads</Typography>
                      <Typography fontWeight="bold" color="#8979d8">
                        3050
                      </Typography>
                    </Box>
                  </Box>
                  <ArrowRightAltIcon sx={{ color: "#9c8de6" }} />
                </Box>
              </Box>

              {/* 2 row 2 box */}
              <Box className="flex flex-col md:flex-row gap-5 mb-5">
                <Box className="w-full flex flex-row justify-between bg-[#2D454D] rounded shadow-md p-5 border-t-2">
                  <Box className="flex flex-row items-center gap-2">
                    <PeopleIcon sx={{ fontSize: "50px", color: "#705add" }} />
                    <Box className="flex flex-col font-bold">
                      <Typography fontWeight="bold">New Leads</Typography>
                      <Typography fontWeight="bold" color="#8979d8">
                        3050
                      </Typography>
                    </Box>
                  </Box>
                  <ArrowRightAltIcon sx={{ color: "#9c8de6" }} />
                </Box>

                <Box className="w-full flex flex-row justify-between bg-[#2D454D] rounded shadow-md p-5 border-t-2">
                  <Box className="flex flex-row items-center gap-2">
                    <PeopleIcon sx={{ fontSize: "50px", color: "#705add" }} />
                    <Box className="flex flex-col font-bold">
                      <Typography fontWeight="bold">New Leads</Typography>
                      <Typography fontWeight="bold" color="#8979d8">
                        3050
                      </Typography>
                    </Box>
                  </Box>
                  <ArrowRightAltIcon sx={{ color: "#9c8de6" }} />
                </Box>
              </Box>

              <Box className="flex flex-col gap-5 mb-5 w-full bg-[#2D454D] rounded shadow-md p-5 border-t-2">
                <Box className="flex flex-col md:flex-row justify-between">
                  <Typography fontWeight="bold">
                    Mainteinance Requests
                  </Typography>
                  <Box className="flex flex-row gap-2">
                    <Button variant="contained" color="success">
                      <DoneAllIcon />
                      Done
                    </Button>
                    <Button variant="contained" sx={{ background: "#E0E94A" }}>
                      <HourglassBottomIcon />
                      Pending
                    </Button>
                  </Box>
                </Box>
                {/* maintenainces */}
                <Box>
                  {/* 1 */}
                  <Box className="flex flex-col bg-[#22363d] p-3 rounded border-l-2">
                    <Box className="flex flex-row justify-between">
                      <Box className="flex flex-row items-center gap-1">
                        <Avatar src={userAvatar} alt="user profile pic" />
                        <Typography fontWeight="bold">John Fred</Typography>
                        <Tooltip title="See Tenant Details">
                          <IconButton
                          sx={{
                            "& .MuiSvgIcon-root": {
                              color: "#FFFFFF",
                            },
                          }}
                        >
                          <ArticleIcon />
                        </IconButton>
                        </Tooltip>
                        
                      </Box>
                      <Typography
                        color="#BDBDBD"
                        fontSize="14px"
                        fontWeight="bold"
                      >
                        12:13 PM
                      </Typography>
                    </Box>
                    <Box className="bg-[#2D454D] border-l-2 p-1 my-2 rounded-r">
                      <Typography><span className="font-bold">Phone:</span>&nbsp;+250 783309468</Typography>
                      <Typography><span className="font-bold">Property:</span>&nbsp;Luxury 43</Typography>
                      <Typography><span className="font-bold">Unit:</span>&nbsp;R483</Typography>
                    </Box>
                    <Box mt="5px">
                      I have an issue related to the bulb be'se its
                      malfunctioning hf vdfbj hfg sfgsegf sefg esfh sfh sfh
                      sfuky
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box className="bg-[#2D454D] col-span-5 rounded p-3 border-t-2">
              <Typography>Traffic Sources</Typography>
              <Box sx={{ minHeight: 240, width: "100%" }}>
                <SMPieChart />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MaintenancePage;

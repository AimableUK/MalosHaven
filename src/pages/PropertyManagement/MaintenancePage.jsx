import {
  Avatar,
  Box,
  Button,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SMLineChart from "../../components/DataCharts/SMLineChart";
import SMPieChart from "../../components/DataCharts/SMPieChart";
import PeopleIcon from "@mui/icons-material/People";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import userAvatar from "../../assets/userAvatar.jpg";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import ArticleIcon from "@mui/icons-material/Article";
import properties from "../../components/Properties";

const MaintenancePage = () => {
  const [expandedRequestId, setExpandedRequestId] = useState(null);
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [filterView, setFilterView] = useState("all"); // "all", "pending", or "done"

  const toggleTenantDetails = (requestId) => {
    setExpandedRequestId((prevId) => (prevId === requestId ? null : requestId));
  };

  useEffect(() => {
    const allRequests = [];

    properties.forEach((property) => {
      property.units.forEach((unit) => {
        const tenant = unit.tenant;
        if (tenant && tenant.maintenanceRequests) {
          tenant.maintenanceRequests.forEach((request) => {
            allRequests.push({
              ...request,
              tenantName: tenant.name,
              tenantPhone: tenant.phone,
              tenantImage: tenant.image,
              propertyTitle: property.title,
              unit: unit.Unit,
            });
          });
        }
      });
    });

    setMaintenanceRequests(allRequests);
  }, []);

  const AllMaintenanceStatus = () => {
    const allRequests = [];

    properties.forEach((property) => {
      property.units.forEach((unit) => {
        const tenant = unit.tenant;
        if (tenant && tenant.maintenanceRequests) {
          tenant.maintenanceRequests.forEach((request) => {
            allRequests.push({
              ...request,
              tenantName: tenant.name,
              tenantPhone: tenant.phone,
              tenantImage: tenant.image,
              propertyTitle: property.title,
              unit: unit.Unit,
            });
          });
        }
      });
    });

    setMaintenanceRequests(allRequests);
    setFilterView("all");
  };

  const doneMaintenanceStatus = () => {
    const doneRequests = [];

    properties.forEach((property) => {
      property.units.forEach((unit) => {
        const tenant = unit.tenant;
        if (tenant && tenant.maintenanceRequests) {
          tenant.maintenanceRequests
            .filter((request) => request.status === "done")
            .forEach((request) => {
              doneRequests.push({
                ...request,
                tenantName: tenant.name,
                tenantPhone: tenant.phone,
                tenantImage: tenant.image,
                propertyTitle: property.title,
                unit: unit.Unit,
              });
            });
        }
      });
    });

    setMaintenanceRequests(doneRequests);
    setFilterView("done");
  };

  const pendingMaintenanceStatus = () => {
    const pendingRequests = [];

    properties.forEach((property) => {
      property.units.forEach((unit) => {
        const tenant = unit.tenant;
        if (tenant && tenant.maintenanceRequests) {
          tenant.maintenanceRequests
            .filter((request) => request.status === "pending")
            .forEach((request) => {
              pendingRequests.push({
                ...request,
                tenantName: tenant.name,
                tenantPhone: tenant.phone,
                tenantImage: tenant.image,
                propertyTitle: property.title,
                unit: unit.Unit,
              });
            });
        }
      });
    });

    setMaintenanceRequests(pendingRequests);
    setFilterView("pending");
  };

  const markAsDone = (request) => {
    properties.forEach((property) => {
      property.units.forEach((unit) => {
        const tenant = unit.tenant;
        if (tenant && tenant.maintenanceRequests) {
          tenant.maintenanceRequests.forEach((req) => {
            if (req.requestId === request.requestId) {
              req.status = req.status === "done" ? "pending" : "done";
            }
          });
        }
      });
    });

    switch (filterView) {
      case "done":
        doneMaintenanceStatus();
        break;
      case "pending":
        pendingMaintenanceStatus();
        break;
      default:
        AllMaintenanceStatus();
    }
  };

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
          <Box className="mx-4 mb-4 flex flex-col lg:grid grid-cols-12 col-span-12 gap-5 -mt-10">
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
                <Box className="flex flex-col">
                  <Typography fontWeight="bold">
                    Mainteinance Requests
                  </Typography>
                  <Box className="flex flex-col md:flex-row gap-2">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={AllMaintenanceStatus}
                    >
                      All
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={doneMaintenanceStatus}
                    >
                      <HourglassBottomIcon />
                      &nbsp;Pending
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={pendingMaintenanceStatus}
                    >
                      <DoneAllIcon />
                      &nbsp;Done
                    </Button>
                  </Box>
                </Box>
                {/* maintenainces */}
                <Box className="flex flex-col">
                  {maintenanceRequests.length > 0
                    ? maintenanceRequests.map((request) => (
                        <Box
                          key={request.requestId}
                          className="flex flex-col bg-[#22363d] p-3 rounded border-l-2 mb-3"
                        >
                          <Box className="flex flex-col md:flex-row md:items-center justify-between">
                            <Box className="flex flex-row items-center gap-1">
                              <Avatar
                                src={request.tenantImage}
                                alt="user profile pic"
                              />
                              <Typography fontWeight="bold">
                                {request.tenantName}
                              </Typography>
                              <Tooltip
                                title="See Tenant Details"
                                onClick={() =>
                                  toggleTenantDetails(request.requestId)
                                }
                              >
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
                              <Tooltip
                                title={
                                  request.status === "done"
                                    ? "Mark As Done"
                                    : "Request Done"
                                }
                              >
                                <IconButton
                                  sx={{
                                    background:
                                      request.status === "done"
                                        ? "purple"
                                        : "green",
                                    "& .MuiSvgIcon-root": {
                                      color: "#FFFFFF",
                                    },
                                  }}
                                  onClick={() => markAsDone(request)}
                                >
                                  <DoneAllIcon />
                                </IconButton>
                              </Tooltip>
                            </Box>
                            <Typography
                              color="#BDBDBD"
                              fontSize="14px"
                              fontWeight="bold"
                              className="pt-2 md:pt-0"
                            >
                              {new Date(
                                request.dateSubmitted
                              ).toLocaleDateString()}
                            </Typography>
                          </Box>
                          {expandedRequestId === request.requestId && (
                            <Box className="bg-[#2D454D] border-l-2 p-1 my-2 rounded-r">
                              <Typography>
                                <span className="font-bold">Phone:</span>&nbsp;
                                {request.tenantPhone}
                              </Typography>
                              <Typography>
                                <span className="font-bold">Property:</span>
                                &nbsp;{request.propertyTitle}
                              </Typography>
                              <Typography>
                                <span className="font-bold">Unit:</span>&nbsp;
                                {request.unit}
                              </Typography>
                            </Box>
                          )}
                          <Box mt="5px">
                            {request?.message && (
                              <Typography component="p">
                                {request.message}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      ))
                    : (filterView === "all" && (
                        <Typography alignSelf="center">
                          No Maintainance Request Available
                        </Typography>
                      )) ||
                      (filterView === "pending" && (
                        <Typography alignSelf="center">
                          No Maintainance Request Done Yet
                        </Typography>
                      )) ||
                      (filterView === "done" && (
                        <Typography alignSelf="center">
                          No Pending Maintainance Request Available
                        </Typography>
                      ))}
                </Box>
              </Box>
            </Box>

            <Box className="bg-[#2D454D] -mt-4 lg:mt-0 col-span-5 rounded p-3 border-t-2 h-fit">
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

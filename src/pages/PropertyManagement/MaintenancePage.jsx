import {
  Alert,
  Avatar,
  Box,
  Button,
  IconButton,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SMLineChart from "../../components/DataCharts/SMLineChart";
import SMPieChart from "../../components/DataCharts/SMPieChart";
import PeopleIcon from "@mui/icons-material/People";
import userAvatar from "../../assets/userAvatar.jpg";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import ArticleIcon from "@mui/icons-material/Article";
import propertiesList from "../../Data/SiteDataComponent/Properties";
import FooterPage from "../Footer/FooterPage";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import ChecklistIcon from "@mui/icons-material/Checklist";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Collapse from "@mui/material/Collapse";

const MaintenancePage = () => {
  const [expandedRequestId, setExpandedRequestId] = useState(null);
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [filterView, setFilterView] = useState("all");
  const [snackbarQueue, setSnackbarQueue] = useState([]);
  const [activeSnackbar, setActiveSnackbar] = useState(null);
  const [properties, setProperties] = useState(propertiesList);

  const [requests, setRequests] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [solvedRequests, setSolvedRequests] = useState([]);

  const displayedRequests =
    filterView === "all"
      ? requests
      : filterView === "pending"
        ? pendingRequests
        : solvedRequests;

  const enqueueSnackbar = (message, severity) => {
    setSnackbarQueue((prevQueue) => [...prevQueue, { message, severity }]);
  };

  useEffect(() => {
    if (!activeSnackbar && snackbarQueue.length > 0) {
      setActiveSnackbar(snackbarQueue[0]);
      setSnackbarQueue((prevQueue) => prevQueue.slice(1));
    }
  }, [snackbarQueue, activeSnackbar]);

  const handleCloseSnackbar = () => {
    setActiveSnackbar(null);
  };

  const toggleTenantDetails = (requestId) => {
    setExpandedRequestId((prevId) => (prevId === requestId ? null : requestId));
  };

  useEffect(() => {
    const allRequests = [];

    properties.forEach((property) => {
      property.units.forEach((unit) => {
        const tenant = unit.tenant;
        if (tenant?.maintenanceRequests?.length > 0) {
          tenant.maintenanceRequests.forEach((request) => {
            allRequests.push({
              ...request,
              tenantName: tenant.name,
              tenantPhone: tenant.phone,
              tenantImage: tenant.image,
              propertyTitle: property.title,
              unit: unit.UnitNumber,
            });
          });
        }
      });
    });

    setRequests(allRequests);
    setPendingRequests(allRequests.filter((r) => r.status === "pending"));
    setSolvedRequests(allRequests.filter((r) => r.status === "done"));
  }, [properties]);

  // Filter handlers
  const AllMaintenanceStatus = () => {
    setFilterView("all");
  };

  const doneMaintenanceStatus = () => {
    setFilterView("done");
  };

  const pendingMaintenanceStatus = () => {
    setFilterView("pending");
  };

  // Mark request as done/pending
  const markAsDone = (request) => {
    const updatedProperties = properties.map((property) => ({
      ...property,
      units: property.units.map((unit) => {
        if (!unit.tenant?.maintenanceRequests) return unit;

        const updatedRequests = unit.tenant.maintenanceRequests.map((req) => {
          if (req.requestId === request.requestId) {
            const newStatus = req.status === "done" ? "pending" : "done";
            enqueueSnackbar(
              `${unit.tenant.name}'s Request marked as ${newStatus}`,
              newStatus === "done" ? "success" : "warning"
            );
            return { ...req, status: newStatus };
          }
          return req;
        });

        return {
          ...unit,
          tenant: {
            ...unit.tenant,
            maintenanceRequests: updatedRequests,
          },
        };
      }),
    }));

    setProperties(updatedProperties);
  };

  const data = [
    {
      id: "All",
      label: "All",
      value: requests?.length,
      color: "hsl(53, 70%, 50%)",
    },
    {
      id: "Pending",
      label: "Pending",
      value: pendingRequests?.length,
      color: "hsl(285, 70%, 50%)",
    },
    {
      id: "Solved",
      label: "Solved",
      value: solvedRequests?.length,
      color: "hsl(75, 70%, 50%)",
    },
  ];

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
                  <Box className="flex flex-row items-center gap-3">
                    <ClearAllIcon sx={{ fontSize: "40px", color: "#705add" }} />
                    <Box className="flex flex-col font-bold">
                      <Typography fontWeight="bold">
                        All Maintenances
                      </Typography>
                      <Typography
                        fontWeight="bold"
                        color="#8979d8"
                        fontSize="23px"
                      >
                        {requests?.length}
                      </Typography>
                    </Box>
                  </Box>
                  <ArrowCircleRightIcon sx={{ color: "#9c8de6" }} />
                </Box>

                <Box className="w-full flex flex-row justify-between bg-[#2D454D] rounded shadow-md p-5 border-t-2">
                  <Box className="flex flex-row items-center gap-3">
                    <ChecklistIcon
                      sx={{ fontSize: "40px", color: "#705add" }}
                    />
                    <Box className="flex flex-col font-bold">
                      <Typography fontWeight="bold">
                        Solved Maintenances
                      </Typography>
                      <Typography
                        fontWeight="bold"
                        color="#8979d8"
                        fontSize="23px"
                      >
                        {pendingRequests?.length}
                      </Typography>
                    </Box>
                  </Box>
                  <ArrowCircleRightIcon sx={{ color: "#9c8de6" }} />
                </Box>
              </Box>

              {/* 2 row 2 box */}
              <Box className="flex flex-col md:flex-row gap-5 mb-5">
                <Box className="w-full flex flex-row justify-between bg-[#2D454D] rounded shadow-md p-5 border-t-2">
                  <Box className="flex flex-row items-center gap-3">
                    <HourglassBottomIcon
                      sx={{ fontSize: "40px", color: "#705add" }}
                    />
                    <Box className="flex flex-col font-bold">
                      <Typography fontWeight="bold">
                        Pending Maintenances
                      </Typography>
                      <Typography
                        fontWeight="bold"
                        color="#8979d8"
                        fontSize="23px"
                      >
                        {solvedRequests?.length}
                      </Typography>
                    </Box>
                  </Box>
                  <ArrowCircleRightIcon sx={{ color: "#9c8de6" }} />
                </Box>

                <Box className="w-full flex flex-row justify-between bg-[#2D454D] rounded shadow-md p-5 border-t-2">
                  <Box className="flex flex-row items-center gap-3">
                    <PeopleIcon sx={{ fontSize: "50px", color: "#705add" }} />
                    <Box className="flex flex-col font-bold">
                      <Typography fontWeight="bold">Properties</Typography>
                      <Typography
                        fontWeight="bold"
                        color="#8979d8"
                        fontSize="23px"
                      >
                        {properties?.length}
                      </Typography>
                    </Box>
                  </Box>
                  <ArrowCircleRightIcon sx={{ color: "#9c8de6" }} />
                </Box>
              </Box>

              <Box className="flex flex-col gap-5 mb-5 w-full bg-[#2D454D] rounded shadow-md p-5 border-t-2">
                <Box className="flex flex-col">
                  <Typography fontWeight="bold">
                    Maintenance Requests
                  </Typography>
                  <Box className="flex flex-col md:flex-row gap-2 mt-2">
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
                  {displayedRequests.length > 0
                    ? displayedRequests.map((request) => (
                        <Box
                          key={request.requestId}
                          className="flex flex-col bg-[#22363d] p-3 rounded border-l-2 mb-3"
                        >
                          <Box className="flex flex-col md:flex-row md:items-center justify-between">
                            <Box className="flex flex-row items-center gap-1">
                              <Avatar
                                src={request.tenantImage || userAvatar}
                                alt="user profile pic"
                              />
                              <Typography fontWeight="bold">
                                {request.tenantName}
                              </Typography>
                              <Tooltip
                                title={`See ${request.tenantName} Details`}
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
                          <Collapse
                            in={expandedRequestId === request.requestId}
                          >
                            <Box className="bg-[#2D454D] border-l-2 p-1 my-2 rounded-r">
                              <Typography>
                                <span className="font-bold">Phone:</span>&nbsp;
                                {request.tenantPhone}
                              </Typography>
                              <Typography>
                                <span className="font-bold">Property:</span>
                                &nbsp;
                                {request.propertyTitle}
                              </Typography>
                              <Typography>
                                <span className="font-bold">Unit:</span>&nbsp;
                                {request.unit}
                              </Typography>
                            </Box>
                          </Collapse>
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

            <Box className="col-span-5 flex flex-col gap-3">
              {/* smpie chart */}
              <Box className="bg-[#2D454D] -mt-4 lg:mt-0 rounded p-3 border-t-2 h-fit">
                <Typography fontWeight="bold">Maintenance Overview</Typography>
                <Box sx={{ minHeight: 240, width: "100%" }}>
                  <SMPieChart data={data} />
                </Box>
              </Box>
              {/* Companies and employees */}
              <Box className="bg-[#2D454D] lg:mt-0 rounded p-3 border-t-2 h-fit mt-2">
                <Box className="flex flex-col md:flex-row items-center justify-start md:justify-between mb-3">
                  <Typography fontWeight="bold" mb="5px">
                    Assistants
                  </Typography>
                  <Button color="info" variant="contained">
                    Add assistant
                  </Button>
                </Box>
                <Box className="flex flex-col gap-3">
                  <Box className="bg-[#22363d] p-3 rounded border-l-2 flex flex-col lg:flex-row justify-between">
                    <Box>
                      <Typography fontWeight="bold">
                        Munyabugingo Isaac
                      </Typography>
                      <Typography fontSize="15px">+250 7830298923</Typography>
                      <Typography color="#BDBDBD">Electricity</Typography>
                    </Box>
                    <Box className="flex flex-row gap-2 justify-end">
                      <Tooltip title="Edit Assistant">
                        <IconButton>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Assistant">
                        <IconButton>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                  <Box className="bg-[#22363d] p-3 rounded border-l-2 flex flex-col lg:flex-row justify-between">
                    <Box>
                      <Typography fontWeight="bold">
                        Munyabugingo Isaac
                      </Typography>
                      <Typography fontSize="15px">+250 7830298923</Typography>
                      <Typography color="#BDBDBD">Electricity</Typography>
                    </Box>
                    <Box className="flex flex-row gap-2 justify-end">
                      <Tooltip title="Edit Assistant">
                        <IconButton>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Assistant">
                        <IconButton>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                  <Box className="bg-[#22363d] p-3 rounded border-l-2 flex flex-col lg:flex-row justify-between">
                    <Box>
                      <Typography fontWeight="bold">
                        Munyabugingo Isaac
                      </Typography>
                      <Typography fontSize="15px">+250 7830298923</Typography>
                      <Typography color="#BDBDBD">Electricity</Typography>
                    </Box>
                    <Box className="flex flex-row gap-2 justify-end">
                      <Tooltip title="Edit Assistant">
                        <IconButton>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Assistant">
                        <IconButton>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                  <Box className="bg-[#22363d] p-3 rounded border-l-2 flex flex-col lg:flex-row justify-between">
                    <Box>
                      <Typography fontWeight="bold">
                        Munyabugingo Isaac
                      </Typography>
                      <Typography fontSize="15px">+250 7830298923</Typography>
                      <Typography color="#BDBDBD">Electricity</Typography>
                    </Box>
                    <Box className="flex flex-row gap-2 justify-end">
                      <Tooltip title="Edit Assistant">
                        <IconButton>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Assistant">
                        <IconButton>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                  <Box className="bg-[#22363d] p-3 rounded border-l-2 flex flex-col lg:flex-row justify-between">
                    <Box>
                      <Typography fontWeight="bold">
                        Munyabugingo Isaac
                      </Typography>
                      <Typography fontSize="15px">+250 7830298923</Typography>
                      <Typography color="#BDBDBD">Electricity</Typography>
                    </Box>
                    <Box className="flex flex-row gap-2 justify-end">
                      <Tooltip title="Edit Assistant">
                        <IconButton>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Assistant">
                        <IconButton>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Snackbar
          open={!!activeSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          {activeSnackbar && (
            <Alert
              severity={activeSnackbar.severity}
              onClose={handleCloseSnackbar}
            >
              {activeSnackbar.message}
            </Alert>
          )}
        </Snackbar>
      </Box>
      <FooterPage />
    </Box>
  );
};

export default MaintenancePage;

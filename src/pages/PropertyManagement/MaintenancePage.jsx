import {
  Avatar,
  Box,
  Button,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import SMPieChart from "../../components/DataCharts/SMPieChart";
import PeopleIcon from "@mui/icons-material/People";
import userAvatar from "../../assets/userAvatar.jpg";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import ArticleIcon from "@mui/icons-material/Article";
import FooterPage from "../Footer/FooterPage";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import ChecklistIcon from "@mui/icons-material/Checklist";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Collapse from "@mui/material/Collapse";
import DataDeleteConfirm from "../../components/DeleteConfirmComponent/DataDeleteConfirm";
import WaterRepair from "../../assets/WaterRepair.gif";
import ACInstallation from "../../assets/ACInstallation.gif";
import Painting from "../../assets/Painting.gif";
import ElectricianWorking from "../../assets/ElectricianWorking.gif";
import AddAssistantForm from "../../components/AssistantComponent/AddAssistantForm";
import EditAssistantForm from "../../components/AssistantComponent/EditAssistantForm";
import AppSnackbar from "../../components/utils/MySnackbar/AppSnackbar";
import useAssistantStore from "../../Store/AssistantStore/useAssistantStore";
import usePropertiesStore from "../../Store/PropertiesStore/usePropertiesStore";
import useMaintenanceStore from "../../Store/MaintenanceStore/useMaintenanceStore";

const MaintenancePage = () => {
  const [expandedRequestId, setExpandedRequestId] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAssistant, setSelectedAssistant] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const [addOpenModal, setAddOpenModal] = useState(false);
  const [editOpenModal, setEditOpenModal] = useState(false);

  const properties = usePropertiesStore((state) => state.properties);

  const assistants = useAssistantStore((state) => state.assistants);
  const addAssistant = useAssistantStore((state) => state.addAssistant);
  const editAssistant = useAssistantStore((state) => state.editAssistant);
  const deleteAssistant = useAssistantStore((state) => state.deleteAssistant);

  const {
    requests,
    pendingRequests,
    solvedRequests,
    setRequestsFromProperties,
    markAsDone,
    filterView,
    setFilterView,
    getDisplayedRequests,
  } = useMaintenanceStore();

  useEffect(() => {
    setRequestsFromProperties(properties);
  }, [setRequestsFromProperties, properties]);

  const displayedRequests = getDisplayedRequests();

  const showSnackbar = (message, severity = "success") => {
    setSnackbar((prev) => ({ ...prev, open: false }));
    setTimeout(() => {
      setSnackbar({
        open: true,
        message,
        severity,
      });
    }, 100);
  };

  const handleMarkRequest = (request, tenantName) => {
    markAsDone(request.requestId);

    if (!request) showSnackbar(`Request is Unavailable`, "info");

    request.status === "done"
      ? showSnackbar(`${tenantName}'s Request marked As Done`, "success")
      : showSnackbar(`${tenantName}'s Request marked As Pending`, "warning");
  };

  const deleteAnAssistant =
    "Are you sure you want to Delete this Assistant? If you do so, it will be undone";

  const is1230 = useMediaQuery("(min-width: 1230px)");

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const toggleTenantDetails = (requestId) => {
    setExpandedRequestId((prevId) => (prevId === requestId ? null : requestId));
  };

  const AllMaintenanceStatus = () => {
    setFilterView("all");
  };

  const doneMaintenanceStatus = () => {
    setFilterView("done");
  };

  const pendingMaintenanceStatus = () => {
    setFilterView("pending");
  };

  const MaintenancesChart = [
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

  const MaintainSVG = [
    {
      src: WaterRepair,
      alt: "Water Repair",
    },
    {
      src: ACInstallation,
      alt: "AC Installation",
    },
    {
      src: Painting,
      alt: "Painting Works",
    },
    {
      src: ElectricianWorking,
      alt: "Electician Working",
    },
  ];

  useEffect(() => {
    const Interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % MaintainSVG.length);
        setFade(true);
      }, 800);
    }, 5000);

    return () => clearInterval(Interval);
  });

  const currentImage = MaintainSVG[currentIndex];

  const handleAddAssistant = (newAssistant) => {
    addAssistant(newAssistant);
    setAddOpenModal(false);
    showSnackbar(`${newAssistant.assistantName} added Successfully`, "success");
  };

  const handleEditDialogOpen = (assistant) => {
    setEditOpenModal(true);
    setSelectedAssistant(assistant);
  };

  const handleEditAssistant = (updatedAssistant) => {
    editAssistant(updatedAssistant);
    setAddOpenModal(false);
    showSnackbar(
      `${updatedAssistant.assistantName} Updated Successfully`,
      "success"
    );
  };

  const handleDeleteDialogOpen = (assistant) => {
    setDeleteDialogOpen(true);
    setSelectedAssistant(assistant);
  };

  const handleDeleteAssistant = () => {
    deleteAssistant(selectedAssistant.id);
    setDeleteDialogOpen(false);
    showSnackbar(
      `${selectedAssistant.assistantName} deleted successfully`,
      "success"
    );
  };

  return (
    <Box>
      <Box>
        <Box>
          {/* charts */}
          <Box
            style={{
              backgroundImage:
                "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
            }}
            className="p-3 px-16 pb-7 flex justify-center md:justify-between items-center"
          >
            <Typography
              fontWeight="bold"
              sx={{
                fontSize: { sm: "18px", md: "20px", lg: "28px" },
                whiteSpace: "nowrap",
              }}
            >
              Maintenance Issues Panel
            </Typography>
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className={`w-[200px] hidden md:block transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}
            />
          </Box>
          {/* Down One */}
          <Box className="mx-4 mb-4 flex flex-col lg:grid grid-cols-12 col-span-12 gap-5 -mt-7">
            {/* Boxes */}
            <Box className="col-span-7">
              {/* 1 row 2 box */}
              <Box
                className={`flex ${is1230 ? "flex-row" : "flex-col"} gap-5 mb-5`}
              >
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
              <Box
                className={`flex ${is1230 ? "flex-row" : "flex-col"} gap-5 mb-5`}
              >
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
                                  onClick={() =>
                                    handleMarkRequest(
                                      request,
                                      request.tenantName
                                    )
                                  }
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
                        <Typography alignSelf="center" fontWeight="bold">
                          No Maintainance Request Available
                        </Typography>
                      )) ||
                      (filterView === "pending" && (
                        <Typography alignSelf="center" fontWeight="bold">
                          No Maintainance Request Done Yet
                        </Typography>
                      )) ||
                      (filterView === "done" && (
                        <Typography alignSelf="center" fontWeight="bold">
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
                  <SMPieChart data={MaintenancesChart} />
                </Box>
              </Box>
              {/* Companies and employees */}
              <Box className="bg-[#2D454D] lg:mt-0 rounded p-3 border-t-2 h-fit mt-2">
                <Box className="flex flex-col md:flex-row items-center justify-start md:justify-between mb-3">
                  <Typography fontWeight="bold" mb="5px">
                    Assistants
                  </Typography>
                  <Button
                    color="info"
                    variant="contained"
                    onClick={() => setAddOpenModal(true)}
                  >
                    Add assistant
                  </Button>
                </Box>
                <Box className="flex flex-col gap-3">
                  {assistants.length > 0 ? (
                    assistants.map((assistant) => (
                      <Box
                        key={assistant.id}
                        className="bg-[#22363d] p-3 rounded border-l-2 flex flex-col lg:flex-row justify-between"
                      >
                        <Box>
                          <Typography fontWeight="bold">
                            {assistant.assistantName}
                          </Typography>
                          <Typography fontSize="15px">
                            {assistant.phoneNumber}
                          </Typography>
                          <Typography color="#BDBDBD">
                            {assistant.workType}
                          </Typography>
                        </Box>
                        <Box className="flex flex-row gap-2 justify-end">
                          <Tooltip title="Edit Assistant">
                            <IconButton
                              onClick={() => handleEditDialogOpen(assistant)}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Assistant">
                            <IconButton
                              onClick={() => handleDeleteDialogOpen(assistant)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Typography>No Assistant Available</Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <DataDeleteConfirm
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        handleDeleteAssistant={handleDeleteAssistant}
        deleteAnAssistant={deleteAnAssistant}
        deleteType="assistant"
      />

      <AddAssistantForm
        open={addOpenModal}
        onClose={() => setAddOpenModal(false)}
        onAddAssistant={handleAddAssistant}
        setSnackbar={setSnackbar}
        showSnackbar={showSnackbar}
      />

      <EditAssistantForm
        open={editOpenModal}
        onClose={() => setEditOpenModal(false)}
        onEditAssistant={handleEditAssistant}
        setSnackbar={setSnackbar}
        showSnackbar={showSnackbar}
        selectedAssistant={selectedAssistant}
      />

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />

      <FooterPage />
    </Box>
  );
};

export default MaintenancePage;

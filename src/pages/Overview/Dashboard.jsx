import { Box, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import PieChart from "../../components/DataCharts/PieChart.jsx";
import LineChart from "../../components/DataCharts/LineChart.jsx";
import FooterPage from "../Footer/FooterPage.jsx";
import ApartmentIcon from "@mui/icons-material/Apartment";
import HomeIcon from "@mui/icons-material/Home";
import Groups2Icon from "@mui/icons-material/Groups2";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import ChecklistIcon from "@mui/icons-material/Checklist";
import PeopleIcon from "@mui/icons-material/People";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import PropertiesComponent from "../PropertyManagement/PropertiesComponent.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import AppSnackbar from "../../components/utils/MySnackbar/AppSnackbar.jsx";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import ChairIcon from "@mui/icons-material/Chair";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import lodgelisting from "../../assets/lodgelisting.svg";
import LayersClearIcon from "@mui/icons-material/LayersClear";
import checklist from "../../assets/checklist.png";
import usePropertiesStore from "../../Store/PropertiesStore/usePropertiesStore.js";
import useAssistantStore from "../../Store/AssistantStore/useAssistantStore.js";
import useLodgeStore from "../../Store/LodgesStore/useLodgesStore.js";
import useMaintenanceStore from "../../Store/MaintenanceStore/useMaintenanceStore.js";

const Dashboard = () => {
  const properties = usePropertiesStore((state) => state.properties);
  const assistants = useAssistantStore((state) => state.assistants);
  const lodges = useLodgeStore((state) => state.lodges);
  const setRequestsFromProperties = useMaintenanceStore(
    (state) => state.setRequestsFromProperties
  );

  const requests = useMaintenanceStore((state) => state.requests);
  const pendingRequests = useMaintenanceStore((state) => state.pendingRequests);
  const solvedRequests = useMaintenanceStore((state) => state.solvedRequests);

  const [totalUnits, setTotalUnits] = useState(0);
  const [totalTenants, setTotalTenants] = useState(0);

  const [totalRooms, setTotalRooms] = useState(0);
  const [RoomsAvailable, setRoomsAvailable] = useState(0);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  useEffect(() => {
    const allRequests = [];
    let unitCount = 0;
    let tenantCount = 0;

    let roomCount = 0;
    let availableRoomCount = 0;

    properties.forEach((property) => {
      property.units.forEach((unit) => {
        unitCount++;
        const tenant = unit.tenant;
        if (tenant) {
          tenantCount++;
          if (tenant.maintenanceRequests?.length > 0) {
            tenant.maintenanceRequests.forEach((request) => {
              allRequests.push({
                ...request,
              });
            });
          }
        }
      });
    });

    lodges.forEach((lodge) => {
      lodge.rooms.forEach((room) => {
        roomCount++;
        if (room.isAvailable) {
          availableRoomCount++;
        }
      });
    });

    setRequestsFromProperties(properties);

    setTotalUnits(unitCount);
    setTotalTenants(tenantCount);
    setTotalRooms(roomCount);
    setRoomsAvailable(availableRoomCount);
  }, [setRequestsFromProperties, properties, lodges]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.snackbar) {
      showSnackbar(location.state.snackbar, "success");
      navigate(location.pathname, { replace: true });
    }
  }, [location.state?.snackbar, location.pathname, navigate]);

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

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const todos = [];

  return (
    <Box display="flex" flexDirection="column">

    {/* 1. Return to this Project for setting up the convex as the backend */}
    {/* 2. Setted Up the arrangement of the flow of code aside */}
    {/* 3. Aside Convex setup for later use */}
      {/* Top Grid - 4 Cards */}
      <Box className="flex flex-col lg:flex-row gap-[10px] p-[10px] font-roboto">
        <Box className="flex flex-col md:flex-row gap-3 w-full">
          {/* total owners */}
          <Box
            className="flex flex-row justify-between w-full border-t-2 border-t-slate-300"
            sx={{
              gridColumn: "span 3",
              display: "flex",
              borderRadius: "8px",
              p: "10px",
              background: "#2D454D",
            }}
          >
            <Box className="flex flex-row items-center gap-3">
              <HolidayVillageIcon
                sx={{ fontSize: "40px" }}
                className="rounded-md bg-[#22363d] p-1"
              />
              <Box className="flex flex-col">
                <Typography
                  sx={{ fontWeight: "bold", fontSize: "30px", color: "#fff" }}
                >
                  {lodges?.length || ""}
                </Typography>
                <Typography sx={{ fontWeight: "bold", color: "#fff" }}>
                  {lodges?.length > 0 ? "Total Lodges" : "No Lodges yet"}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Total properties */}
          <Box
            className="flex flex-row justify-between w-full border-t-2 border-t-slate-300"
            sx={{
              gridColumn: "span 3",
              display: "flex",
              borderRadius: "8px",
              p: "10px",
              background: "#2D454D",
            }}
          >
            <Box className="flex flex-row items-center gap-3">
              <ApartmentIcon
                sx={{ fontSize: "40px" }}
                className="rounded-md bg-[#22363d] p-1"
              />
              <Box className="flex flex-col">
                <Typography
                  sx={{ fontWeight: "bold", fontSize: "30px", color: "#fff" }}
                >
                  {properties?.length}
                </Typography>
                <Typography sx={{ fontWeight: "bold", color: "#fff" }}>
                  Total Properties
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className="flex flex-col md:flex-row gap-3 w-full">
          {/* total units */}
          <Box
            className="flex flex-row justify-between w-full border-t-2 border-t-slate-300"
            sx={{
              gridColumn: "span 3",
              display: "flex",
              borderRadius: "8px",
              p: "10px",
              background: "#2D454D",
            }}
          >
            <Box className="flex flex-row items-center gap-3">
              <HomeIcon
                sx={{ fontSize: "40px" }}
                className="rounded-md bg-[#22363d] p-1"
              />
              <Box className="flex flex-col">
                <Typography
                  sx={{ fontWeight: "bold", fontSize: "30px", color: "#fff" }}
                >
                  {totalUnits}
                </Typography>
                <Typography sx={{ fontWeight: "bold", color: "#fff" }}>
                  Total Units
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* total tenants */}
          <Box
            className="flex flex-row justify-between w-full border-t-2 border-t-slate-300"
            sx={{
              gridColumn: "span 3",
              display: "flex",
              borderRadius: "8px",
              p: "10px",
              background: "#2D454D",
            }}
          >
            <Box className="flex flex-row items-center gap-3">
              <Groups2Icon
                sx={{ fontSize: "40px" }}
                className="rounded-md bg-[#22363d] p-1"
              />
              <Box className="flex flex-col">
                <Typography
                  sx={{ fontWeight: "bold", fontSize: "30px", color: "#fff" }}
                >
                  {totalTenants}
                </Typography>
                <Typography sx={{ fontWeight: "bold", color: "#fff" }}>
                  Total Tenants
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Second Grid - Pie + Line Chart */}
      <Box className="flex flex-col lg:grid grid-cols-12 gap-[10px] px-[10px] pb-[10px]">
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
          className="border-t-2 border-t-slate-300"
        >
          <Typography sx={{ color: "#fff", mb: 1 }} fontWeight="bold">
            Channels
          </Typography>
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
          className="mt-2 lg:mt-0 border-t-2 border-t-slate-300"
        >
          <Typography sx={{ color: "#fff", mb: 1 }} fontWeight="bold">
            Revenue
          </Typography>
          <Box sx={{ minHeight: 240, width: "100%" }}>
            <LineChart />
          </Box>
        </Box>
      </Box>

      {/* Third Grid - Bookings */}
      <Box className="flex flex-col lg:flex-row gap-[10px] px-[10px] font-roboto">
        <Box className="flex flex-col md:flex-row gap-3 w-full">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              background: "#2D454D",
              borderRadius: "8px",
              p: 2,
            }}
            className="w-full my-1 border-t-2 border-t-slate-300"
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Box
                sx={{
                  background: "linear-gradient(to right, #232526, #414345)",
                  height: "fit-content",
                  padding: "10px",
                  borderRadius: "5px",
                  marginTop: "-28px",
                  width: "fit-content",
                }}
              >
                <ClearAllIcon fontSize="large" />
              </Box>
              <Box className="flex flex-col items-end -mt-8">
                <Typography
                  sx={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}
                >
                  {requests?.length}
                </Typography>
                <Typography sx={{ color: "#fff" }}>All Maintenances</Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              background: "#2D454D",
              borderRadius: "8px",
              p: 2,
            }}
            className="w-full my-1 border-t-2 border-t-slate-300"
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Box
                sx={{
                  background: "linear-gradient(to right, #2c3e50, #3498db)",
                  height: "fit-content",
                  padding: "10px",
                  borderRadius: "5px",
                  marginTop: "-28px",
                  width: "fit-content",
                }}
              >
                <HourglassBottomIcon fontSize="large" />
              </Box>
              <Box className="flex flex-col items-end -mt-8">
                <Typography
                  sx={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}
                >
                  {solvedRequests?.length}
                </Typography>
                <Typography sx={{ color: "#fff" }}>
                  Pending Maintenances
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className="flex flex-col md:flex-row gap-3 w-full">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              background: "#2D454D",
              borderRadius: "8px",
              p: 2,
            }}
            className="w-full my-1 border-t-2 border-t-slate-300"
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Box
                sx={{
                  background: "linear-gradient(to right, #34e89e, #0f3443)",
                  height: "fit-content",
                  padding: "10px",
                  borderRadius: "5px",
                  marginTop: "-28px",
                  width: "fit-content",
                }}
              >
                <ChecklistIcon fontSize="large" />
              </Box>
            </Box>
            <Box className="flex flex-col items-end -mt-8">
              <Typography
                sx={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}
              >
                {pendingRequests?.length}
              </Typography>
              <Typography sx={{ color: "#fff" }}>
                Solved Maintenances
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              background: "#2D454D",
              borderRadius: "8px",
              p: 2,
            }}
            className="w-full my-1 border-t-2 border-t-slate-300"
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Box
                sx={{
                  background: "linear-gradient(to right, #ad5389, #3c1053)",
                  height: "fit-content",
                  padding: "10px",
                  borderRadius: "5px",
                  marginTop: "-28px",
                  width: "fit-content",
                }}
              >
                <PeopleIcon fontSize="large" />
              </Box>
              <Box className="flex flex-col items-end -mt-8">
                <Typography
                  sx={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}
                >
                  {assistants?.length}
                </Typography>
                <Typography sx={{ color: "#fff" }}>Assistants</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Fourth grid - lodges */}
      <Box className="flex flex-col lg:flex-row gap-[10px] px-[10px] font-roboto">
        {/* todos */}
        <Box className="flex flex-col lg:flex-row gap-3 w-full">
          {todos.length > 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                background: "#2D454D",
                borderRadius: "8px",
                p: 2,
              }}
              className="w-full md:w-2/3 my-1 border-t-2 border-t-slate-300"
            ></Box>
          ) : (
            <Box className="flex flex-col md:flex-row md:items-center justify-between bg-[#2D454D] rounded-md p-5 w-full my-1 border-t-2 border-t-slate-300">
              <Box className="flex flex-col mt-2 md:mt-0">
                <Box className="flex flex-row gap-1 items-center">
                  <Box
                    sx={{
                      background: "#3b4371",
                      height: "fit-content",
                      padding: "5px",
                      borderRadius: "5px",
                      width: "fit-content",
                    }}
                  >
                    <LayersClearIcon />
                  </Box>
                  <Box className="flex flex-col">
                    <Typography fontWeight="bold">
                      Add Todos to Enable this Feature
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <img
                src={checklist}
                alt="Lodge Listing"
                className="w-[70px] hidden md:block"
              />
            </Box>
          )}

          {/* lodges */}
          {lodges?.length > 0 ? (
            <Box className="flex flex-col md:flex-row md:items-center justify-between bg-[#2D454D] my-1 rounded-md p-5 w-full border-t-2 border-t-slate-300">
              <Box className="flex flex-row gap-2">
                <Box
                  sx={{
                    background: "#3b4371",
                    height: "fit-content",
                    padding: "5px",
                    borderRadius: "5px",
                    width: "fit-content",
                  }}
                >
                  <HolidayVillageIcon fontSize="large" />
                </Box>
                <Box className="flex flex-col">
                  <Typography fontWeight="bold">Lodges</Typography>
                  <Typography fontWeight="bold">{lodges?.length}</Typography>
                </Box>
              </Box>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ background: "grey" }}
              />
              <Box className="flex flex-row gap-2">
                <Box
                  sx={{
                    background: "#3b4371",
                    height: "fit-content",
                    padding: "5px",
                    borderRadius: "5px",
                    width: "fit-content",
                  }}
                >
                  <ConfirmationNumberIcon fontSize="large" />
                </Box>
                <Box className="flex flex-col">
                  <Typography fontWeight="bold">Rooms</Typography>
                  <Typography fontWeight="bold">{totalRooms}</Typography>
                </Box>
              </Box>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ background: "grey" }}
              />
              <Box className="flex flex-row gap-2">
                <Box
                  sx={{
                    background: "#3b4371",
                    height: "fit-content",
                    padding: "5px",
                    borderRadius: "5px",
                    width: "fit-content",
                  }}
                >
                  <ChairIcon fontSize="large" />
                </Box>
                <Box className="flex flex-col">
                  <Typography fontWeight="bold">Available</Typography>
                  <Typography fontWeight="bold">{RoomsAvailable}</Typography>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box className="flex flex-col md:flex-row md:items-center justify-between bg-[#2D454D] my-1 rounded-md p-5 w-full border-t-2 border-t-slate-300">
              <Box className="flex flex-col mt-2 md:mt-0">
                <Box className="flex flex-row gap-1 items-center">
                  <Box
                    sx={{
                      background: "#3b4371",
                      height: "fit-content",
                      padding: "5px",
                      borderRadius: "5px",
                      width: "fit-content",
                    }}
                  >
                    <LayersClearIcon />
                  </Box>
                  <Typography fontWeight="bold">
                    Add Lodges to Enable this Feature
                  </Typography>
                </Box>
              </Box>
              <img
                src={lodgelisting}
                alt="Lodge Listing"
                className="w-[150px] hidden md:block"
              />
            </Box>
          )}
        </Box>
      </Box>

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />

      {/* Fouth Grid */}
      <Box className="flex flex-col grid-cols-12 gap-[10px] p-[10px] font-roboto">
        <PropertiesComponent />
      </Box>

      {/* footer */}
      <FooterPage />
    </Box>
  );
};

export default Dashboard;

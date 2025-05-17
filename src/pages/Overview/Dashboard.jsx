import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PieChart from "../../components/DataCharts/PieChart.jsx";
import LineChart from "../../components/DataCharts/LineChart.jsx";
import PlaceIcon from "@mui/icons-material/Place";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import propertiesList from "../../Data/SiteDataComponent/Properties.js";
import FooterPage from "../Footer/FooterPage.jsx";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import HomeIcon from "@mui/icons-material/Home";
import Groups2Icon from "@mui/icons-material/Groups2";
import PersonIcon from "@mui/icons-material/Person";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import ChecklistIcon from "@mui/icons-material/Checklist";
import PeopleIcon from "@mui/icons-material/People";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import assistantsList from "../../Data/SiteDataComponent/Assistants.js";
import DataDeleteConfirm from "../../components/DeleteConfirmComponent/DataDeleteConfirm.jsx";

const Dashboard = () => {
  const [properties, setProperties] = useState(propertiesList);
  const [assistants, setAssistants] = useState(assistantsList);

  const [requests, setRequests] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [solvedRequests, setSolvedRequests] = useState([]);

  const [totalUnits, setTotalUnits] = useState(0);
  const [totalTenants, setTotalTenants] = useState(0);

  const isSmallScreen = useMediaQuery("(max-width:1024px)");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const deleteProperty =
    "Are you sure you want to Delete this Property? If you do so, it will be undone";

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

  const handleDeleteDialogOpen = (property) => {
    setDeleteDialogOpen(true);
    setSelectedProperty(property);
  };

  const handleDeleteProperty = () => {
    setProperties((prevProperty) =>
      prevProperty.filter((property) => property.id !== selectedProperty.id)
    );
    setDeleteDialogOpen(false);
    showSnackbar(`${selectedProperty.title} deleted successfully`, "success");
  };

  const handleCloseSnackbar = () => {
    setSnackbar(null);
    setSnackbar({ open: false, message: "", severity: "" });
  };

  useEffect(() => {
    const allRequests = [];
    let unitCount = 0;
    let tenantCount = 0;

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
                tenantName: tenant.name,
                tenantPhone: tenant.phone,
                tenantImage: tenant.image,
                propertyTitle: property.title,
                unit: unit.UnitNumber,
              });
            });
          }
        }
      });
    });

    setRequests(allRequests);
    setPendingRequests(allRequests.filter((r) => r.status === "pending"));
    setSolvedRequests(allRequests.filter((r) => r.status === "done"));
    setTotalUnits(unitCount);
    setTotalTenants(tenantCount);
  }, [properties]);

  return (
    <Box display="flex" flexDirection="column">
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
              <PersonIcon
                sx={{ fontSize: "40px" }}
                className="rounded-md bg-[#22363d] p-1"
              />
              <Box className="flex flex-col">
                <Typography
                  sx={{ fontWeight: "bold", fontSize: "30px", color: "#fff" }}
                >
                  1
                </Typography>
                <Typography sx={{ fontWeight: "bold", color: "#fff" }}>
                  Total Owners
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
              gridColumn: "span 3",
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
              gridColumn: "span 3",
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
                  {pendingRequests?.length}
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
              gridColumn: "span 3",
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
                {solvedRequests?.length}
              </Typography>
              <Typography sx={{ color: "#fff" }}>
                Solved Maintenances
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              gridColumn: "span 3",
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

      {/* Fouth Grid */}
      <Box className="flex flex-col grid-cols-12 gap-[10px] p-[10px] font-roboto">
        <Box className="flex flex-col md:flex-row items-center justify-center md:justify-between bg-[#2D454D] p-2 px-2 rounded-md border-t-2 border-t-slate-300">
          <Typography fontWeight="bold">Properties</Typography>
          <Link to="/properties">
            <Button color="info" variant="contained">
              View More
            </Button>
          </Link>
        </Box>
        {properties.length > 0 ? (
          properties.map((property) => (
            <Box
              key={property.id}
              sx={{
                background: "#2D454D",
                borderRadius: "8px",
                justifyContent: "space-between",
                p: 2,
                mb: 1,
              }}
              className="group gap-4 lg:max-w-full flex flex-col lg:flex-row border-l-2 border-t-slate-300"
            >
              <Box>
                <img
                  src={property.image}
                  alt="house"
                  className="md:w-[300px] rounded-md transition-transform duration-300 ease-in-out group-hover:-translate-y-12 cursor-pointer z-10 relative"
                />

                <Box
                  display="flex"
                  flexDirection="row"
                  zIndex="0"
                  mt="-40px"
                  gap="5px"
                  className="justify-start lg:justify-center"
                >
                  <Link
                    to={`/propertydetails/${property.id}`}
                    key={property.id}
                  >
                    <Button
                      variant={isSmallScreen ? "text" : "contained"}
                      color="info"
                      startIcon={<VisibilityIcon />}
                    >
                      {!isSmallScreen && "View"}
                    </Button>
                  </Link>

                  <Button
                    variant={isSmallScreen ? "text" : "contained"}
                    startIcon={<EditIcon />}
                    color="success"
                  >
                    {!isSmallScreen && "Edit"}
                  </Button>
                  <Button
                    variant={isSmallScreen ? "text" : "contained"}
                    startIcon={<DeleteIcon />}
                    color="error"
                    onClick={() => handleDeleteDialogOpen(property)}
                  >
                    {!isSmallScreen && "Delete"}
                  </Button>
                </Box>
              </Box>
              <Box className="flex flex-col justify-between w-full">
                <Box>
                  <Link
                    to={`/propertydetails/${property.id}`}
                    key={property.id}
                  >
                    <Typography fontWeight="bold" m="5px">
                      {property.title}
                    </Typography>
                  </Link>
                  <Typography variant="body1" component="p">
                    {property.description}
                  </Typography>
                </Box>
                <Box>
                  <Box
                    sx={{
                      height: "2px",
                      width: "100%",
                      background:
                        "linear-gradient(to right, #2d454d, white, #2d454d)",
                      my: 1,
                      borderRadius: "999px",
                    }}
                  />
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    mx="10px"
                  >
                    <Typography fontWeight="bold">
                      {
                        property.units.filter((unit) => unit.tenant == null)
                          .length
                      }
                      &nbsp;Units
                    </Typography>
                    <Typography textAlign="center">
                      <PlaceIcon />
                      {property.location}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))
        ) : (
          <Box className="flex justify-center p-2 bg-[#2D454D] rounded-md border-t-2 border-t-slate-300">
            <Typography>
              No Properties Available
            </Typography>
          </Box>
        )}
      </Box>

      <DataDeleteConfirm
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        handleDeleteProperty={handleDeleteProperty}
        deleteProperty={deleteProperty}
        deleteType="property"
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* footer */}
      <FooterPage />
    </Box>
  );
};

export default Dashboard;

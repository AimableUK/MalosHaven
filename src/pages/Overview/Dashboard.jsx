import { Box, Button, Typography } from "@mui/material";
import React from "react";
import PieChart from "../../components/DataCharts/PieChart.jsx";
import LineChart from "../../components/DataCharts/LineChart.jsx";
import WeekendIcon from "@mui/icons-material/Weekend";
import BarChartIcon from "@mui/icons-material/BarChart";
import StoreIcon from "@mui/icons-material/Store";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PlaceIcon from "@mui/icons-material/Place";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MyProperties from "../../components/Properties.js";
import FooterPage from "../Footer/FooterPage.jsx";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import HomeIcon from "@mui/icons-material/Home";
import Groups2Icon from "@mui/icons-material/Groups2";
import PersonIcon from "@mui/icons-material/Person";

const Dashboard = () => {
  const isSmallScreen = useMediaQuery("(max-width:1024px)");

  return (
    <Box display="flex" flexDirection="column">
      {/* Top Grid - 4 Cards */}
      <Box className="flex flex-col lg:flex-row gap-[10px] p-[10px] font-roboto">
        <Box className="flex flex-col md:flex-row gap-3 w-full">
          {/* total owners */}
          <Box
            className="flex flex-row justify-between shadow-md shadow-slate-600 w-full"
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

                <Typography sx={{ color: "#B3B3B3" }}>
                  <span className="text-[#4caf50]">+55%</span> since last month
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Total properties */}
          <Box
            className="flex flex-row justify-between shadow-md shadow-slate-600 w-full"
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
                  8
                </Typography>
                <Typography sx={{ fontWeight: "bold", color: "#fff" }}>
                  Properties
                </Typography>

                <Typography sx={{ color: "#B3B3B3" }}>
                  <span className="text-[#4caf50]">+55%</span> since last month
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className="flex flex-col md:flex-row gap-3 w-full">
          {/* total units */}
          <Box
            className="flex flex-row justify-between shadow-md shadow-slate-600 w-full"
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
                  49
                </Typography>
                <Typography sx={{ fontWeight: "bold", color: "#fff" }}>
                  Units
                </Typography>

                <Typography sx={{ color: "#B3B3B3" }}>
                  <span className="text-[#4caf50]">+55%</span> since last month
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* total tenants */}
          <Box
            className="flex flex-row justify-between shadow-md shadow-slate-600 w-full"
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
                  42
                </Typography>
                <Typography sx={{ fontWeight: "bold", color: "#fff" }}>
                  Tenants
                </Typography>

                <Typography sx={{ color: "#B3B3B3" }}>
                  <span className="text-[#4caf50]">+55%</span> since last month
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Second Grid - Pie + Line Chart */}
      <Box className="flex flex-col lg:grid grid-cols-12 gap-[10px] p-[10px] font-roboto">
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
          className="shadow-md shadow-slate-600 mt-2 lg:mt-0"
        >
          <Typography sx={{ color: "#fff", mb: 1 }}>Revenue</Typography>
          <Box sx={{ minHeight: 240, width: "100%" }}>
            <LineChart />
          </Box>
        </Box>
      </Box>

      {/* Third Grid - Bookings */}
      <Box className="flex flex-col grid-cols-12 gap-[10px] p-[10px] font-roboto my-2">
        <Box className="flex flex-col md:flex-row gap-3 mb-2 lg:mb-3">
          <Box
            sx={{
              gridColumn: "span 3",
              display: "flex",
              flexDirection: "column",
              background: "#2D454D",
              borderRadius: "8px",
              p: 2,
            }}
            className="shadow-md shadow-slate-600 w-full"
          >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Box
                sx={{
                  background: "linear-gradient(to right, #232526, #414345)",
                  height: "fit-content",
                  padding: "10px",
                  borderRadius: "5px",
                  marginTop: "-28px",
                }}
              >
                <WeekendIcon fontSize="large" />
              </Box>
              <Box>
                <Typography sx={{ color: "#fff" }}>Bookings</Typography>
                <Typography
                  sx={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}
                >
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

          <Box
            sx={{
              gridColumn: "span 3",
              display: "flex",
              flexDirection: "column",
              background: "#2D454D",
              borderRadius: "8px",
              p: 2,
            }}
            className="shadow-md shadow-slate-600 w-full"
          >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Box
                sx={{
                  background: "linear-gradient(to right, #2c3e50, #3498db)",
                  height: "fit-content",
                  padding: "10px",
                  borderRadius: "5px",
                  marginTop: "-28px",
                }}
              >
                <BarChartIcon fontSize="large" />
              </Box>
              <Box>
                <Typography sx={{ color: "#fff" }}>Bookings</Typography>
                <Typography
                  sx={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}
                >
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

        <Box className="flex flex-col md:flex-row gap-3">
          <Box
            sx={{
              gridColumn: "span 3",
              display: "flex",
              flexDirection: "column",
              background: "#2D454D",
              borderRadius: "8px",
              p: 2,
            }}
            className="shadow-md shadow-slate-600 w-full"
          >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Box
                sx={{
                  background: "linear-gradient(to right, #34e89e, #0f3443)",
                  height: "fit-content",
                  padding: "10px",
                  borderRadius: "5px",
                  marginTop: "-28px",
                }}
              >
                <StoreIcon fontSize="large" />
              </Box>
              <Box>
                <Typography sx={{ color: "#fff" }}>Bookings</Typography>
                <Typography
                  sx={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}
                >
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

          <Box
            sx={{
              gridColumn: "span 3",
              display: "flex",
              flexDirection: "column",
              background: "#2D454D",
              borderRadius: "8px",
              p: 2,
            }}
            className="shadow-md shadow-slate-600 w-full"
          >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Box
                sx={{
                  background: "linear-gradient(to right, #ad5389, #3c1053)",
                  height: "fit-content",
                  padding: "10px",
                  borderRadius: "5px",
                  marginTop: "-28px",
                }}
              >
                <PersonAddIcon fontSize="large" />
              </Box>
              <Box>
                <Typography sx={{ color: "#fff" }}>Bookings</Typography>
                <Typography
                  sx={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}
                >
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

      {/* Fouth Grid */}
      <Box className="flex flex-col lg:grid grid-cols-12 gap-[10px] p-[10px] font-roboto">
        {MyProperties.slice(0, 3).map((property) => (
          <Box
            key={property.id}
            sx={{
              gridColumn: "span 4",
              display: "flex",
              flexDirection: "column",
              background: "#2D454D",
              borderRadius: "8px",
              justifyContent: "space-between",
              p: 2,
              mb: 1,
            }}
            className="group shadow-md shadow-slate-600"
          >
            <Box>
              <img
                src={property.image}
                alt="house-image"
                className="shadow-md shadow-slate-500 rounded-md transition-transform duration-300 ease-in-out group-hover:-translate-y-12 cursor-pointer z-10 relative"
              />

              <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                gap="10px"
                zIndex="0"
                mt="-40px"
              >
                <Link to={`/propertydetails/${property.id}`} key={property.id}>
                  <Button
                    variant={isSmallScreen ? "text" : "contained"}
                    color="info"
                    startIcon={<VisibilityIcon />}
                  >
                    {!isSmallScreen && "Edit"}
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
                >
                  {!isSmallScreen && "Delete"}
                </Button>
              </Box>
            </Box>
            <Box>
              <Link to={`/propertydetails/${property.id}`} key={property.id}>
                <Typography fontWeight="bold" textAlign="center" m="15px">
                  {property.title}
                </Typography>
              </Link>
              <Typography variant="body1" component="p">
                {property.description}
              </Typography>
            </Box>
            <Box
              sx={{
                height: "2px",
                width: "100%",
                background:
                  "linear-gradient(to right, #2d454d, white, #2d454d)",
                my: 3,
                borderRadius: "999px",
              }}
            />
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Typography fontWeight="bold">
                {property.units.filter((unit) => unit.tenant == null).length}{" "}
                Units
              </Typography>
              <Typography textAlign="center">
                <PlaceIcon />
                {property.location}
              </Typography>
            </Box>
          </Box>
        ))}
        <Link to="/properties">
          <Button
            variant="contained"
            sx={{ whiteSpace: "nowrap" }}
            color="success"
          >
            VIEW MORE
          </Button>
        </Link>
      </Box>

      {/* footer */}
      <FooterPage />
    </Box>
  );
};

export default Dashboard;

import { Box, Button, Typography } from "@mui/material";
import React from "react";
import PieChart from "../../components/PieChart.jsx";
import LineChart from "../../components/LineChart.jsx";
import WeekendIcon from "@mui/icons-material/Weekend";
import BarChartIcon from "@mui/icons-material/BarChart";
import StoreIcon from "@mui/icons-material/Store";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PlaceIcon from "@mui/icons-material/Place";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import houseImg from "../../assets/house.jpg";
import houseImg1 from "../../assets/house1.jpg";
import houseImg2 from "../../assets/house2.jpg";


const Dashboard = () => {
  return (
    <Box display="flex" flexDirection="column">
      {/* Top Grid - 3 Cards */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap="10px"
        className="font-roboto"
        padding="10px"
      >
        {[1, 2, 3].map((_, index) => (
          <Box
            key={index}
            className="flex flex-row justify-between shadow-md shadow-slate-600"
            sx={{
              gridColumn: "span 4",
              display: "flex",
              borderRadius: "8px",
              p: "10px",
              background: "#2D454D",
            }}
          >
            <Box className="flex flex-col">
              <Typography sx={{ fontWeight: "bold", color: "#fff" }}>
                Properties
              </Typography>
              <Typography
                sx={{ fontWeight: "bold", fontSize: "25px", color: "#fff" }}
              >
                14
              </Typography>
              <Typography sx={{ color: "#B3B3B3" }}>
                <span className="text-[#4caf50]">+55%</span> since last month
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ color: "#B3B3B3" }}>Real Time</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Second Grid - Pie + Line Chart */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap="10px"
        className="font-roboto"
        padding="10px"
      >
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
          className="shadow-md shadow-slate-600"
        >
          <Typography sx={{ color: "#fff", mb: 1 }}>Revenue</Typography>
          <Box sx={{ minHeight: 240, width: "100%" }}>
            <LineChart />
          </Box>
        </Box>
      </Box>

      {/* Third Grid - Bookings */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap="10px"
        className="font-roboto"
        padding="10px"
        marginY="10px"
      >
        <Box
          sx={{
            gridColumn: "span 3",
            display: "flex",
            flexDirection: "column",
            background: "#2D454D",
            borderRadius: "8px",
            p: 2,
          }}
          className="shadow-md shadow-slate-600"
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
          className="shadow-md shadow-slate-600"
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

        <Box
          sx={{
            gridColumn: "span 3",
            display: "flex",
            flexDirection: "column",
            background: "#2D454D",
            borderRadius: "8px",
            p: 2,
          }}
          className="shadow-md shadow-slate-600"
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
          className="shadow-md shadow-slate-600"
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

      {/* Fouth Grid */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap="10px"
        className="font-roboto"
        padding="10px"
      >
        <Box
          sx={{
            gridColumn: "span 4",
            display: "flex",
            flexDirection: "column",
            background: "#2D454D",
            borderRadius: "8px",
            justifyContent: "space-between",
            p: 2,
          }}
          className="group shadow-md shadow-slate-600"
        >
          <Box>
            <img
              src={houseImg}
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
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                color="success"
              >
                Edit
              </Button>
              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                color="error"
              >
                Delete
              </Button>
            </Box>
          </Box>
          <Box>
            <Typography fontWeight="bold" textAlign="center" m="15px">
              Cozy 5 Stars Apartment
            </Typography>
            <Typography variant="body1" component="p">
              The place is close to Barceloneta Beach and bus stop just 2 min by
              walk and near to "Naviglio" where you can enjoy the main night
              life in Barcelona.
            </Typography>
          </Box>
          <Box
            sx={{
              height: "2px",
              width: "100%",
              background: "linear-gradient(to right, #2d454d, white, #2d454d)",
              my: 3,
              borderRadius: "999px",
            }}
          />{" "}
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography fontWeight="bold">$899/night</Typography>
            <Typography textAlign="center">
              <PlaceIcon />
              Barcelona, Spain
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            gridColumn: "span 4",
            display: "flex",
            flexDirection: "column",
            background: "#2D454D",
            borderRadius: "8px",
            justifyContent: "space-between",
            p: 2,
          }}
          className="group shadow-md shadow-slate-600"
        >
          <Box>
            <img
              src={houseImg1}
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
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                color="success"
              >
                Edit
              </Button>
              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                color="error"
              >
                Delete
              </Button>
            </Box>
          </Box>
          <Box>
            <Typography fontWeight="bold" textAlign="center" m="15px">
              Office Studio
            </Typography>
            <Typography variant="body1" component="p">
              The place is close to Metro Station and bus stop just 2 min by
              walk and near to "Naviglio" where you can enjoy the night life in
              London, UK.
            </Typography>
          </Box>
          <Box
            sx={{
              height: "2px",
              width: "100%",
              background: "linear-gradient(to right, #2d454d, white, #2d454d)",
              my: 3,
              borderRadius: "999px",
            }}
          />{" "}
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography fontWeight="bold">$1.119/night</Typography>
            <Typography textAlign="center">
              <PlaceIcon />
              London, UK
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            gridColumn: "span 4",
            display: "flex",
            flexDirection: "column",
            background: "#2D454D",
            borderRadius: "8px",
            justifyContent: "space-between",
            p: 2,
          }}
          className="group shadow-md shadow-slate-600"
        >
          <Box>
            <img
              src={houseImg2}
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
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                color="success"
              >
                Edit
              </Button>
              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                color="error"
              >
                Delete
              </Button>
            </Box>
          </Box>
          <Box>
            <Typography fontWeight="bold" textAlign="center" m="15px">
              Beautiful Castle
            </Typography>
            <Typography variant="body1" component="p">
              The place is close to Metro Station and bus stop just 2 min by
              walk and near to "Naviglio" where you can enjoy the main night
              life in Milan.
            </Typography>
          </Box>
          <Box
            sx={{
              height: "2px",
              width: "100%",
              background: "linear-gradient(to right, #2d454d, white, #2d454d)",
              my: 3,
              borderRadius: "999px",
            }}
          />{" "}
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography fontWeight="bold">$459/night</Typography>
            <Typography textAlign="center">
              <PlaceIcon />
              Milan, Italy
            </Typography>
          </Box>
        </Box>
      </Box>
      <Typography variant="body2" align="center" m="10px" sx={{ color: "#aaa" }}>
        &copy; 2025, made with{" "}
        <FavoriteIcon sx={{ color: "red", fontSize: "large" }}/> by{" "}
        <a href="#"><strong>Malos Technologies</strong></a>
      </Typography>
    </Box>
  );
};

export default Dashboard;

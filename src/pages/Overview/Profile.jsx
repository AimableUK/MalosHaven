import { Avatar, Box, Button, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import profileCover from "../../assets/profileCover.jpg";
import userAvatar from "../../assets/userAvatar.jpg";
import EditIcon from "@mui/icons-material/Edit";
import BarChartIcon from "@mui/icons-material/BarChart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DataPropertyFormModal from "../../components/DataPropertyForm";
import MyProperties from "../../components/Properties";
import PlaceIcon from "@mui/icons-material/Place";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FooterPage from "../Footer/FooterPage";
import { useMediaQuery } from "@mui/material";

const Profile = () => {
  const [openModal, setOpenModal] = useState(false);
  const [properties, setProperties] = useState(MyProperties);

  const handleAddProp = (newProp) => {
    setProperties((prev) => [...prev, newProp]);
    setOpenModal(false);
  };
  const isSmallScreen = useMediaQuery("(max-width:768px)");

  return (
    <Box className={`${isSmallScreen ? "m-[10px]" : "m-5"}`}>
      <Box zIndex="0">
        <img
          src={profileCover}
          alt="profile cover"
          style={{ width: "100%", height: "250px", borderRadius: "8px" }}
        />
      </Box>

      {/* all content */}
      <Box
        // mx= {isSmallScreen ?"15px" : "5px" }
        sx={{
          background: "#2D454D",
          p: 2,
          borderRadius: "5px",
          mt: "-60px",
          position: "relative",
          zIndex: 1,
        }}
        className={`${isSmallScreen ? "m-[2px]" :"m-3"}`}
      >
        {/* prof-top */}
        <Box className="flex flex-col md:flex-row items-center justify-between">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="10px"
          >
            <Avatar
              src={userAvatar}
              alt="profile picture avatar"
              sx={{ borderRadius: "14px", width: "140px", height: "140px" }}
            />
            <Box display="flex" flexDirection="column" textAlign="center">
              <Typography fontWeight="bold">John Doe</Typography>
              <Typography>Property Owner</Typography>
            </Box>
          </Box>
          <Box className="flex gap-1 flex-col md:flex-row mt-2">
            <Link to="/analytics">
              <Button startIcon={<BarChartIcon />} variant="outlined">
                Analytics
              </Button>
            </Link>

            <Link to="/editprofile">
              <Button
                startIcon={<EditIcon />}
                variant="outlined"
                sx={{ whiteSpace: "nowrap" }}
              >
                Edit Profile
              </Button>
            </Link>

            <Link to="/notifications">
              <Button startIcon={<NotificationsIcon />} variant="outlined">
                Notifications
              </Button>
            </Link>
          </Box>
        </Box>

        {/* prof-content */}
        <Box my="20px">
          <Box>
            <Typography fontWeight="bold">Profile Information</Typography>
            <Typography component="p">
              Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer
              is no. If two equally difficult paths, choose the one more painful
              in the short term (pain avoidance is creating an illusion of
              equality).
            </Typography>
            <Box mt="20px">
              <Typography>
                <span style={{ fontWeight: "bold" }}>Full Name:</span>&nbsp;John
                Doe
              </Typography>
              <Typography>
                <span style={{ fontWeight: "bold" }}>Mobile:</span>&nbsp;+250
                783 309 468
              </Typography>
              <Typography>
                <span style={{ fontWeight: "bold" }}>Email:</span>
                &nbsp;johnDoe@example.com
              </Typography>
              <Typography>
                <span style={{ fontWeight: "bold" }}>Location:</span>
                &nbsp;karuruma, Gatsata, Gasabo, Kigali
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box className="font-roboto" padding="10px">
          <Box className="flex flex-col md:flex-row justify-between my-1 items-center">
            <Typography fontWeight="bold">PROPERTIES</Typography>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              color="info"
              onClick={() => setOpenModal(true)}
            >
              ADD PROPERTY
            </Button>
          </Box>

          <DataPropertyFormModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            onAddProperty={handleAddProp}
          />

          <Box className="flex flex-col md:grid grid-cols-12 gap-2">
            {properties.slice(0, 3).map((property) => (
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
                    alt="house"
                    className="shadow-md shadow-slate-500 rounded-md transition-transform duration-300 ease-in-out group-hover:-translate-y-12 cursor-pointer z-10 relative"
                  />

                  <Box
                    display="flex"
                    flexDirection="row"
                    gap= {isSmallScreen ? "": "10px"}
                    zIndex="0"
                    mt="-40px"
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
                  <Link
                    to={`/propertydetails/${property.id}`}
                    key={property.id}
                  >
                    <Typography
                      fontWeight="bold"
                      textAlign="center"
                      my="15px"
                      mt="25px"
                    >
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
                    {property.units.length} Units
                  </Typography>
                  <Typography textAlign="center">
                    <PlaceIcon />
                    {property.location}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
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
      </Box>
      <FooterPage />
    </Box>
  );
};

export default Profile;

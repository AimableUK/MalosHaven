import {
  Alert,
  Box,
  useMediaQuery,
  Button,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MyProperties from "../../Data/SiteDataComponent/Properties";
import { Link } from "react-router-dom";
import PlaceIcon from "@mui/icons-material/Place";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DataDeleteConfirm from "../../components/DeleteConfirmComponent/DataDeleteConfirm";

const PropertiesComponent = () => {
  const [properties, setProperties] = useState(MyProperties);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const deleteProperty =
    "Are you sure you want to Delete this Property? If you do so, it will be undone";

  const isSmallScreen = useMediaQuery("(max-width:768px)");

  const handleDeleteDialogOpen = (property) => {
    setDeleteDialogOpen(true);
    setSelectedProperty(property);
  };

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

  return (
    <Box>
      <Box className="flex flex-col md:flex-row items-center justify-center md:justify-between bg-[#2D454D] p-2 px-2 rounded-md border-t-2 border-t-slate-300">
        <Typography fontWeight="bold">Properties</Typography>
        <Link to="/properties">
          <Button color="info" variant="contained">
            View More
          </Button>
        </Link>
      </Box>
      <Box className="flex flex-col grid-cols-12 gap-[10px] py-[10px] font-roboto bg-[#1c292d]">
        {properties.length > 0 ? (
          properties.slice(0, 3).map((property) => (
            <Box
              key={property.id}
              sx={{
                background: "#2D454D",
                borderRadius: "8px",
                justifyContent: "space-between",
                p: 2,
                mb: 1,
              }}
              className="group lg:max-w-full gap-4 flex flex-col lg:flex-row border-l-2 border-t-slate-300"
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
            <Typography>No Properties Available</Typography>
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
    </Box>
  );
};

export default PropertiesComponent;

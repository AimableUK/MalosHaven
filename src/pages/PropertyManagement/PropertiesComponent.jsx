import { Box, useMediaQuery, Button, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PlaceIcon from "@mui/icons-material/Place";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DataDeleteConfirm from "../../components/DeleteConfirmComponent/DataDeleteConfirm";
import EditPropertyFormModal from "../../components/PropertyFormComponent/EditPropertyForm";
import AppSnackbar from "../../components/utils/MySnackbar/AppSnackbar";
import usePropertiesStore from "../../Store/PropertiesStore/usePropertiesStore";

const PropertiesComponent = () => {
  const [editPropertyFormModal, setEditPropertyFormModal] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const properties = usePropertiesStore((state) => state.properties);
  const editProperty = usePropertiesStore((state) => state.editProperty);
  const deleteProperty = usePropertiesStore((state) => state.deleteProperty);

  const location = useLocation();

  const deleteAProperty =
    "Are you sure you want to Delete this Property? If you do so, it will be undone";

  const isSmallScreen = useMediaQuery("(max-width:768px)");

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
    deleteProperty(selectedProperty.id);
    setDeleteDialogOpen(false);
    showSnackbar(`${selectedProperty.title} deleted successfully`, "success");
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleEditPropertyDialogOpen = (property) => {
    setEditPropertyFormModal(true);
    setSelectedProperty(property);
  };

  const handleEditProp = (updatedProperty) => {
    editProperty(updatedProperty);
    setEditPropertyFormModal(false);
    showSnackbar(`${updatedProperty.title} Updated Successfully`, "success");
  };

  return (
    <Box>
      <Box className="flex flex-col md:flex-row items-center justify-center md:justify-between bg-[#2D454D] mt-2 md:mt-0 p-2 px-2 rounded-md border-t-2 border-t-slate-300">
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
                    state={{ from: location.pathname }}
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
                    onClick={() => handleEditPropertyDialogOpen(property)}
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
                    state={{ from: location.pathname }}
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
        deleteAProperty={deleteAProperty}
        deleteType="property"
      />

      <EditPropertyFormModal
        open={editPropertyFormModal}
        onClose={() => setEditPropertyFormModal(false)}
        onEditProperty={handleEditProp}
        selectedProperty={selectedProperty}
      />

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
};

export default PropertiesComponent;

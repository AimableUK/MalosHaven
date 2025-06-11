import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DataPropertyFormModal from "../../components/PropertyFormComponent/DataPropertyForm";
import MyProperties from "../../Data/SiteDataComponent/Properties";
import FooterPage from "../Footer/FooterPage";
import { useMediaQuery } from "@mui/material";
import DataDeleteConfirm from "../../components/DeleteConfirmComponent/DataDeleteConfirm";
import EditPropertyFormModal from "../../components/PropertyFormComponent/EditPropertyForm";
import AppSnackbar from "../../components/utils/MySnackbar/AppSnackbar";

const PropertiesPage = () => {
  const [addPropertyOpenModal, setAddPropertyOpenModal] = useState(false);
  const [properties, setProperties] = useState(MyProperties);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editPropertyFormModal, setEditPropertyFormModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const deleteProperty =
    "Are you sure you want to Delete this Property? If you do so, it will be undone";

  const isSmallScreen = useMediaQuery("(max-width:380px)");

  const navigate = useNavigate();
  const location = useLocation();

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

  const handleAddProp = (newProp) => {
    setProperties((prev) => [...prev, newProp]);
    setAddPropertyOpenModal(false);
    showSnackbar("Property added successfully!", "success");
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

  const handleEditPropertyDialogOpen = (property) => {
    setEditPropertyFormModal(true);
    setSelectedProperty(property);
  };

  const handleEditProp = (updatedProperty) => {
    setProperties((prevProperties) =>
      prevProperties.map((property) =>
        property.id === updatedProperty.id ? updatedProperty : property
      )
    );
    setEditPropertyFormModal(false);
    showSnackbar(`${updatedProperty.title} Updated Successfully`, "success");
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box className={`${isSmallScreen ? "" : "m-[10px]"}`} padding="10px">
      <Box className="flex flex-col md:flex-row justify-between items-center my-1">
        <Typography fontWeight="bold">PROPERTIES</Typography>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          color="info"
          onClick={() => setAddPropertyOpenModal(true)}
          sx={{ whiteSpace: "nowrap" }}
        >
          ADD PROPERTY
        </Button>
      </Box>

      <DataPropertyFormModal
        open={addPropertyOpenModal}
        onClose={() => setAddPropertyOpenModal(false)}
        onAddProperty={handleAddProp}
      />

      <EditPropertyFormModal
        open={editPropertyFormModal}
        onClose={() => setEditPropertyFormModal(false)}
        onEditProperty={handleEditProp}
        selectedProperty={selectedProperty}
      />

      <Box className="flex flex-col grid-cols-12 gap-[10px] py-[10px] font-roboto">
        {(properties?.length ?? 0) > 0 ? (
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
                      {Array.isArray(property.units)
                        ? property.units.filter((unit) => unit.tenant == null)
                            .length
                        : 0}
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
            <Typography fontWeight="bold">No Properties Available</Typography>
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

export default PropertiesPage;

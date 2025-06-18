import { useEffect, useState } from "react";
import { Box, Typography, Button, Tooltip, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from "@mui/x-data-grid";
import DataUnitFormModal from "../../components/UnitFormComponent/DataUnitForm";
import DataDeleteConfirm from "../../components/DeleteConfirmComponent/DataDeleteConfirm";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import EditUnitFormModal from "../../components/UnitFormComponent/EditUnitForm";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import FooterPage from "../Footer/FooterPage";
import AddIcon from "@mui/icons-material/Add";
import PlaceIcon from "@mui/icons-material/Place";
import EditPropertyFormModal from "../../components/PropertyFormComponent/EditPropertyForm";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import ChairIcon from "@mui/icons-material/Chair";
import AppSnackbar from "../../components/utils/MySnackbar/AppSnackbar";
import usePropertiesStore from "../../Store/PropertiesStore/usePropertiesStore";

const PropertyDetails = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUnitId, setSelectedUnitId] = useState(null);
  const [deleteType, setDeleteType] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const [editPropertyFormModal, setEditPropertyFormModal] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const properties = usePropertiesStore((state) => state.properties);
  const editProperty = usePropertiesStore((state) => state.editProperty);
  const deleteProperty = usePropertiesStore((state) => state.deleteProperty);

  const addUnitToProperty = usePropertiesStore(
    (state) => state.addUnitToProperty
  );
  const editUnitInProperty = usePropertiesStore(
    (state) => state.editUnitInProperty
  );
  const deleteUnitFromProperty = usePropertiesStore(
    (state) => state.deleteUnitFromProperty
  );

  const columns = [
    {
      field: "UnitNumber",
      headerName: "Unit Number",
      width: 150,
      editable: true,
    },
    {
      field: "UnitValue",
      headerName: "Unit Value (RWF)",
      width: 180,
      editable: true,
    },
    {
      field: "edit",
      headerName: "Edit Unit",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            setSelectedUnitId(params.row.id);
            setEditDialogOpen(true);
          }}
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete Unit",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(params.row.id, "unit")}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      ),
    },
    {
      field: "book",
      headerName: "Book Unit",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="info"
          onClick={() => handleBook(params.row.id)}
          startIcon={<AutoStoriesIcon />}
        >
          Book
        </Button>
      ),
    },
  ];

  useEffect(() => {
    document.title = `${property?.title || "View Property"}`;
  });

  const location = useLocation();
  const [backPath] = useState(location.state?.from || "/properties");
  const navigate = useNavigate();

  const { id } = useParams();
  const property = properties.find((property) => property.id === parseInt(id));
  const units = property?.units || [];

  if (!property) {
    return (
      <Box className="m-3 flex justify-center p-2 bg-[#2D454D] rounded-md border-t-2 border-t-slate-300">
        <Typography fontWeight="bold">Property Not Found</Typography>
      </Box>
    );
  }

  const selectedUnit = property.units.find(
    (unit) => unit.id === selectedUnitId
  );

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

  const handleBook = (id) => {
    console.log("Booked unit ID:", id);
  };

  const handleAddUnit = (newUnit) => {
    addUnitToProperty(property.id, newUnit);
    showSnackbar(`${newUnit.UnitNumber} added successfully`, "success");
  };

  const processRowUpdate = (newRow) => {
    editUnitInProperty(property.id, newRow);
    showSnackbar(`Unit ${newRow.UnitNumber} updated successfully!`, "success");
    return newRow;
  };

  const handleEditUnit = (updatedUnit) => {
    editUnitInProperty(property.id, updatedUnit);
    showSnackbar(
      `Unit ${updatedUnit.UnitNumber} updated successfully!`,
      "success"
    );
  };

  const deleteUnitProp = `Are you sure you want to Delete this ${deleteType}? If you do so, it will be undone`;

  const handleDelete = (id, type) => {
    if (type === "unit") {
      setDeleteType(type);
      setSelectedUnitId(id);
      setDeleteDialogOpen(true);
    } else {
      setDeleteType(type);
      setSelectedProperty(id);
      setDeleteDialogOpen(true);
    }
  };

  const handleDeleteUnit = () => {
    deleteUnitFromProperty(property.id, selectedUnitId);
    showSnackbar(`Unit deleted successfully!`, "success");
    setDeleteDialogOpen(false);
    setSelectedUnitId(null);
  };

  const handleDeleteProperty = () => {
    navigate(backPath || "/properties", {
      state: {
        snackbar: `${selectedProperty.title} deleted successfully`,
      },
    });
    setDeleteDialogOpen(false);
    setTimeout(() => {
      deleteProperty(selectedProperty.id);
    }, 1000);
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

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          background: "#2D454D",
          borderRadius: "8px",
          p: 2,
        }}
        className="m-2 md:m-5 md:mt-10 border-t-2 border-t-slate-300"
      >
        <Box className="bg-[#1b2c31] md:pr-5 w-fit right-0 top-0 self-end rounded-full group">
          <Link to={backPath} className="group">
            <Tooltip
              title={`Return to ${backPath === "/" ? "Dashboard" : "Profile"}`}
            >
              <IconButton sx={{ bgcolor: "#1b2c31" }}>
                <ArrowCircleLeftIcon
                  fontSize="medium"
                  className="md:group-hover:translate-x-5"
                />
              </IconButton>
            </Tooltip>
          </Link>
        </Box>
        {/* Property Header */}
        <Box className="flex flex-col md:flex-row justify-between md:items-center -mt-10">
          <Box className="flex flex-col md:flex-row items-center gap-1">
            <Box>
              <img
                src={property.image}
                alt="lodge"
                className="shadow-md shadow-slate-900 rounded-md md:-mt-12 w-fit md:w-52"
              />
            </Box>
            <Box className="md:text-start ml-2 md:ml-0 flex flex-col gap-1">
              <Typography fontWeight="bold">
                <HolidayVillageIcon
                  className="bg-[#1c292d] p-1 rounded-lg"
                  fontSize="large"
                />
                &nbsp;{property.title}
              </Typography>
              <Typography>
                <PlaceIcon
                  className="bg-[#1c292d] p-1 rounded-lg"
                  fontSize="large"
                />
                &nbsp;{property.location}
              </Typography>
            </Box>
          </Box>

          <Box className="flex flex-row justify-center gap-[10px] mt-1 md:mt-10 z-0">
            <Button
              sx={{ height: "fit-content" }}
              variant="contained"
              startIcon={<EditIcon />}
              color="success"
              onClick={() => handleEditPropertyDialogOpen(property)}
            >
              Edit
            </Button>
            <Button
              sx={{ height: "fit-content" }}
              variant="contained"
              startIcon={<DeleteIcon />}
              color="error"
              onClick={() => handleDelete(property, "property")}
            >
              Delete
            </Button>
          </Box>
        </Box>

        {/* Property Info */}
        <Box m="10px" mt="20px">
          <Box>
            <Typography fontWeight="bold">Property Details</Typography>
            <Typography component="p">{property.description}</Typography>
          </Box>

          <Typography fontWeight="bold" mb="3px">
            <ConfirmationNumberIcon
              className="bg-[#1c292d] p-1 rounded-lg"
              fontSize="large"
            />
            &nbsp;{property.units.length} Units
          </Typography>

          <Typography fontWeight="bold">
            <ChairIcon
              className="bg-[#1c292d] p-1 rounded-lg"
              fontSize="large"
            />
            &nbsp; {property.units.filter((unit) => unit.tenant == null).length}{" "}
            Units Available
          </Typography>

          <Box className="flex flex-col md:flex-row items-center justify-between mt-5">
            <Typography fontSize="20px" fontWeight="bold">
              AVAILABLE UNITS
            </Typography>
            <Button
              sx={{ whiteSpace: "nowrap" }}
              variant="contained"
              color="info"
              onClick={() => setOpenModal(true)}
            >
              <AddIcon />
              Add Unit
            </Button>
          </Box>

          <DataGrid
            rows={units.filter((unit) => unit.tenant === null)}
            columns={columns}
            showToolbar
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
            sx={{
              height: "fit-content",
              mt: 1,
              backgroundColor: "inherit",
              color: "#FFFFFF",
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#203040",
                color: "#FFFFFF",
              },
              "& .MuiDataGrid-toolbarContainer": {
                backgroundColor: "#203040",
                color: "#FFFFFF",
              },
              "& .MuiSvgIcon-root": {
                color: "#FFFFFF",
              },
            }}
            processRowUpdate={processRowUpdate}
            pageSizeOptions={[10]}
            checkboxSelection
            disableRowSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 300 },
              },
            }}
          />
        </Box>
      </Box>

      {/* Add Unit Modal */}
      <DataUnitFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAddUnit={handleAddUnit}
      />

      {/* Delete Confirmation Modal */}
      <DataDeleteConfirm
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        deleteUnitProp={deleteUnitProp}
        deleteType={deleteType}
        handleDeleteUnit={handleDeleteUnit}
        handleDeleteProperty={handleDeleteProperty}
      />

      <EditPropertyFormModal
        open={editPropertyFormModal}
        onClose={() => setEditPropertyFormModal(false)}
        onEditProperty={handleEditProp}
        selectedProperty={selectedProperty}
      />

      {/* Edit Unit Modal */}
      <EditUnitFormModal
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onEditUnit={handleEditUnit}
        selectedUnit={selectedUnit}
      />

      {/* Snackbar */}
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

export default PropertyDetails;

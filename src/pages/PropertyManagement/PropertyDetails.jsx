import React, { useState } from "react";
import { Box, Typography, Button, Snackbar, Alert } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DataUnitFormModal from "../../components/UnitFormComponent/DataUnitForm";
import DataDeleteConfirm from "../../components/DeleteConfirmComponent/DataDeleteConfirm";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import EditUnitFormModal from "../../components/UnitFormComponent/EditUnitForm";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import MyProperties from "../../Data/SiteDataComponent/Properties";
import FooterPage from "../Footer/FooterPage";
import AddIcon from "@mui/icons-material/Add";
import PlaceIcon from "@mui/icons-material/Place";

const PropertyDetails = () => {
  const [properties, setProperties] = useState(MyProperties);
  const [openModal, setOpenModal] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUnitId, setSelectedUnitId] = useState(null);
  const [deleteType, setDeleteType] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

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
          onClick={() => {
            setSelectedUnitId(params.row.id);
            setDeleteDialogOpen(true);
          }}
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

  const navigate = useNavigate();

  const { id } = useParams();
  const property = properties.find((property) => property.id === parseInt(id));

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

  const handleBook = (id) => {
    console.log("Booked unit ID:", id);
  };

  const handleAddUnit = (unit) => {
    setProperties((prevProperties) =>
      prevProperties.map((property) =>
        property.id === parseInt(id)
          ? { ...property, units: [...property.units, unit] }
          : property
      )
    );

    setSnackbar({
      open: true,
      message: `Added new unit: ${unit.UnitNumber}`,
      severity: "success",
    });
  };

  const processRowUpdate = (newRow) => {
    const updatedProperty = properties.map((property) =>
      property.id === parseInt(id)
        ? {
            ...property,
            units: property.units.map((unit) =>
              unit.id === newRow.id ? newRow : unit
            ),
          }
        : property
    );

    setProperties(updatedProperty);

    setSnackbar({
      open: true,
      message: `Unit ${newRow.UnitNumber} updated successfully!`,
      severity: "success",
    });

    return newRow;
  };

  const handleDeleteUnit = () => {
    setDeleteType("unit");
    setProperties((prevProperties) =>
      prevProperties.map((property) =>
        property.id === parseInt(id)
          ? {
              ...property,
              units: property.units.filter(
                (unit) => unit.id !== selectedUnitId
              ),
            }
          : property
      )
    );

    setSnackbar({
      open: true,
      message: "Unit deleted successfully!",
      severity: "success",
    });
    setDeleteDialogOpen(false);
    setSelectedUnitId(null);
  };

  const deleteUnit = `Are you sure you want to Delete this ${deleteType}? If you do so, it will be undone`;

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

  const handleDeleteDialogOpen = (property, type) => {
    setDeleteType(type);
    setDeleteDialogOpen(true);
    setSelectedProperty(property);
  };

  const handleDeleteProperty = () => {
    navigate(location.state?.from || "/properties", {
      state: {
        snackbar: `${selectedProperty.title} deleted successfully`,
      },
    });
    setDeleteDialogOpen(false);

    setTimeout(() => {
      setProperties((prev) =>
        prev.filter((property) => property.id !== selectedProperty.id)
      );
    }, 1000);
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
        className="m-5 md:m-12 border-t-2 border-t-slate-300"
      >
        {/* Property Header */}
        <Box className="flex flex-col md:flex-row justify-between md:items-center">
          <Box className="flex flex-col md:flex-row items-center gap-1">
            <Box>
              <img
                src={property.image}
                alt="lodge"
                className="shadow-md shadow-slate-900 rounded-md md:-mt-12 w-fit md:w-52"
              />
            </Box>
            <Box className="text-center md:text-start ml-2 md:ml-0">
              <Typography fontWeight="bold">{property.title}</Typography>
              <Typography>
                <PlaceIcon />
                {property.location}
              </Typography>
            </Box>
          </Box>

          <Box className="flex flex-row justify-center gap-[10px] mt-1 md:mt-10 z-0">
            <Button
              sx={{ height: "fit-content" }}
              variant="contained"
              startIcon={<EditIcon />}
              color="success"
            >
              Edit
            </Button>
            <Button
              sx={{ height: "fit-content" }}
              variant="contained"
              startIcon={<DeleteIcon />}
              color="error"
              onClick={() => handleDeleteDialogOpen(property, "property")}
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

          <Box mt="10px" display="flex" flexDirection="row">
            <Typography fontWeight="bold">
              Number of Units:&nbsp;&nbsp;
            </Typography>
            <Typography>{property.units.length} Units</Typography>
          </Box>

          <Box mt="10px" display="flex" flexDirection="row">
            <Typography fontWeight="bold">
              Units Available:&nbsp;&nbsp;
            </Typography>
            <Typography>
              {property.units.filter((unit) => unit.tenant == null).length}{" "}
              Units
            </Typography>
          </Box>

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
            rows={property.units.filter((unit) => unit.tenant == null)}
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
            // unit
            selectedUnitId={selectedUnitId}
            setSelectedUnitId={setSelectedUnitId}
            handleDeleteUnit={handleDeleteUnit}
            deleteUnit={deleteUnit}
            deleteType={deleteType}
            // property
            selectedPropertyId={property.id}
            // setSelectedPropertyId={setSelectedPropertyId}
            handleDeleteProperty={handleDeleteProperty}
          />

          {/* Edit Unit Modal */}
          <EditUnitFormModal
            open={editDialogOpen}
            onClose={() => setEditDialogOpen(false)}
            onEditUnit={(updatedUnit) => {
              setProperties((prevProperties) =>
                prevProperties.map((property) =>
                  property.id === parseInt(id)
                    ? {
                        ...property,
                        units: property.units.map((unit) =>
                          unit.id === updatedUnit.id ? updatedUnit : unit
                        ),
                      }
                    : property
                )
              );
              setSnackbar({
                open: true,
                message: `Unit ${updatedUnit.UnitNumber} updated successfully!`,
                severity: "success",
              });
            }}
            selectedUnit={selectedUnit}
          />

          {/* Snackbar */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={4000}
            onClose={handleCloseSnackbar}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbar.severity}
              sx={{ width: "100%" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
      <FooterPage />
    </Box>
  );
};

export default PropertyDetails;

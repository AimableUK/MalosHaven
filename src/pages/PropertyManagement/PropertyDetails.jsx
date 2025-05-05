import React, { useState } from "react";
import { Box, Typography, Button, Snackbar, Alert } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DataUnitFormModal from "../../components/DataUnitForm";
import DataDeleteConfirm from "../../components/DataDeleteConfirm";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import EditUnitFormModal from "../../components/EditUnitForm";
import { useParams } from "react-router-dom";
import properties from "../../components/Properties";
import FooterPage from "../Footer/FooterPage";
import AddIcon from "@mui/icons-material/Add";
import PlaceIcon from "@mui/icons-material/Place";



const PropertyDetails = () => {
  const [propertiesState, setPropertiesState] = useState(properties);
  const [openModal, setOpenModal] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUnitId, setSelectedUnitId] = useState(null);
  const [deleteType, setDeleteType] = useState("unit");

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

  const { id } = useParams();
  const property = propertiesState.find(
    (property) => property.id === parseInt(id)
  );

  if (!property) {
    return (
      <Box
        flex="flex"
        justifyContent="center"
        alignSelf="center"
        justifySelf="center"
      >
        <Typography>Property not found</Typography>
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
    setPropertiesState((prevProperties) =>
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
    const updatedProperty = propertiesState.map((property) =>
      property.id === parseInt(id)
        ? {
            ...property,
            units: property.units.map((unit) =>
              unit.id === newRow.id ? newRow : unit
            ),
          }
        : property
    );

    setPropertiesState(updatedProperty);

    setSnackbar({
      open: true,
      message: `Unit ${newRow.UnitNumber} updated successfully!`,
      severity: "success",
    });

    return newRow;
  };

  const handleDeleteUnit = () => {
    setPropertiesState((prevProperties) =>
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

  const deleteUnit = "Are you sure you want to Delete this Unit? If you do so, it will be undone"


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
        className="m-5 md:m-12"
      >
        {/* Property Header */}
        <Box className="flex flex-col md:flex-row justify-between md:items-center"
        >
          <Box className="flex flex-col md:flex-row items-center gap-1">
            <Box>
              <img
                src={property.image}
                alt="lodge"
                className="shadow-md shadow-slate-600 rounded-md md:-mt-12 w-fit md:w-52"
              />
            </Box>
            <Box className="text-center md:text-start ml-2 md:ml-0">
              <Typography fontWeight="bold">{property.title}</Typography>
              <Typography><PlaceIcon />{property.location}</Typography>
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
            <Typography>{property.units.filter((unit) => unit.tenant == null).length} Units</Typography>
          </Box>

          <Box className="flex flex-col md:flex-row items-center justify-between mt-5">
            <Typography fontSize="20px" fontWeight="bold">
              AVAILABLE UNITS
            </Typography>
            <Button sx={{ whiteSpace: "nowrap" }} variant="contained" color="info" onClick={() => setOpenModal(true)}>
              <AddIcon />Add Unit
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
            selectedUnitId={selectedUnitId}
            setSelectedUnitId={setSelectedUnitId}
            handleDeleteUnit={handleDeleteUnit} 
            deleteUnit={deleteUnit}
            deleteType="unit"
          />

          {/* Edit Unit Modal */}
          <EditUnitFormModal
            open={editDialogOpen}
            onClose={() => setEditDialogOpen(false)}
            onEditUnit={(updatedUnit) => {
              setPropertiesState((prevProperties) =>
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

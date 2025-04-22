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

const PropertyDetails = () => {
  const initialRows = [
    { id: 1, UnitNumber: "101", UnitValue: 150000 },
    { id: 2, UnitNumber: "102", UnitValue: 200000 },
    { id: 3, UnitNumber: "103", UnitValue: 180000 },
    { id: 4, UnitNumber: "104", UnitValue: 220000 },
    { id: 5, UnitNumber: "105", UnitValue: 170000 },
    { id: 6, UnitNumber: "106", UnitValue: 210000 },
    { id: 7, UnitNumber: "107", UnitValue: 160000 },
    { id: 8, UnitNumber: "108", UnitValue: 190000 },
    { id: 9, UnitNumber: "109", UnitValue: 230000 },
    { id: 10, UnitNumber: "110", UnitValue: 175000 },
  ];
  
  const [rows, setRows] = useState(initialRows);
  const [openModal, setOpenModal] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUnitId, setSelectedUnitId] = useState(null);
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
  const property = properties.find((property) => property.id === parseInt(id));

  if (!property) {
    return <Typography>Property not found</Typography>;
  }

  const { units } = property;

  const selectedUnit = rows.find((row) => row.id === selectedUnitId);

  const handleBook = (id) => {
    console.log("Booked unit ID:", id);
  };

  const handleAddUnit = (unit) => {
    units.push(unit);
    setSnackbar({
      open: true,
      message: `Added new unit: ${unit.UnitNumber}`,
      severity: "success",
    });
  };

  const processRowUpdate = (newRow) => {
    const updatedRows = rows.map((row) =>
      row.id === newRow.id ? newRow : row
    );
    setRows(updatedRows);
    setSnackbar({
      open: true,
      message: `Unit ${newRow.UnitNumber} updated successfully!`,
      severity: "success",
    });
    return newRow;
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      m="50px"
      sx={{
        display: "flex",
        flexDirection: "column",
        background: "#2D454D",
        borderRadius: "8px",
        p: 2,
      }}
    >
      {/* Property Header */}
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" flexDirection="row" alignItems="center" gap="5px">
          <Box>
            <img
              src={property.image}
              alt="lodge"
              width="210px"
              className="shadow-md shadow-slate-600 rounded-md -mt-12"
            />
          </Box>
          <Box>
            <Typography fontWeight="bold">{property.title}</Typography>
            <Typography>Rukomo Sector</Typography>
          </Box>
        </Box>

        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          gap="10px"
          zIndex="0"
          mt="-40px"
        >
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
          <Typography component="p">
            {property.description}
          </Typography>
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
          <Typography>{property.units.length} Units</Typography>
        </Box>

        <Box
          mt="20px"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography fontSize="20px" fontWeight="bold">
            AVAILABLE UNITS
          </Typography>
          <Button variant="contained" onClick={() => setOpenModal(true)}>
            Add Unit
          </Button>
        </Box>

        <DataGrid
          sx={{ height: "fit-content", mt: 1 }}
          rows={property.units}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          processRowUpdate={processRowUpdate}
          experimentalFeatures={{ newEditingApi: true }}
          slots={{ toolbar: GridToolbar }}
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
          setRows={setRows}
          setSnackbar={setSnackbar}
          setDeleteDialogOpen={setDeleteDialogOpen}
          deleteDialogOpen={deleteDialogOpen}
          selectedUnitId={selectedUnitId}
          setSelectedUnitId={setSelectedUnitId}
        />

        {/* Edit Unit Modal */}
        <EditUnitFormModal
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          onEditUnit={(updatedUnit) => {
            setRows((prev) =>
              prev.map((row) => (row.id === updatedUnit.id ? updatedUnit : row))
            );
            setSnackbar({
              open: true,
              message: `Unit updated ${updatedUnit.UnitNumber} successfully!`,
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
  );
};

export default PropertyDetails;

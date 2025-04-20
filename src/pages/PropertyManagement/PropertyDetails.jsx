import React, { useState } from "react";
import { Box, Typography, Button, Snackbar } from "@mui/material";
import houseImg1 from "../../assets/house1.jpg";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DataUnitFormModal from "../../components/DataUnitForm";
import DataDeleteConfirm from "../../components/DataDeleteConfirm";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

const PropertyDetails = () => {
  const columns = [
    {
      field: "UnitNumber",
      headerName: "Unit Number",
      width: 150,
      editable: true
    },
    {
      field: "UnitValue",
      headerName: "Unit Value (RWF)",
      width: 180,
      editable: true
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
          color="success"
          onClick={() => handleBook(params.row.id)}
          startIcon={<AutoStoriesIcon />}
        >
          Book
        </Button>
      ),
    },
  ];

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
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUnitId, setSelectedUnitId] = useState(null);

  const units = rows.length;

  const processRowUpdate = (newRow) => {
    const updatedRows = rows.map((row) =>
      row.id === newRow.id ? newRow : row
    );
    setRows(updatedRows);
    setSnackbar({ open: true, message: `Updated unit: ${newRow.UnitNumber}`, severity: "success" });
    return newRow;
  };

  const handleBook = (id) => {
    console.log(id);
  };

  const handleAddUnit = (unit) => {
    setRows((prev) => [...prev, unit]);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "" });
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
      {/* property header */}
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" flexDirection="row" alignItems="center" gap="5px">
          <Box>
            <img
              src={houseImg1}
              alt="lodge"
              width="210px"
              className="shadow-md shadow-slate-600 rounded-md -mt-12"
            />
          </Box>
          <Box>
            <Typography fontWeight="bold">Ville Gatsata</Typography>
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
      {/* bottom box */}
      <Box m="10px" mt="20px">
        <Box>
          <Typography fontWeight="bold">Property Details</Typography>
          <Typography component="p">
            this property ... Decisions: If you can’t decide, the answer is no.
            If two equally difficult paths, choose the one more painful in the
            short term (pain avoidance is creating an illusion of equality).
          </Typography>
        </Box>

        <Box mt="10px" display="flex" flexDirection="row">
          <Typography fontWeight="bold">
            Number of Units:&nbsp;&nbsp;
          </Typography>
          <Typography>32 Units</Typography>
        </Box>

        <Box mt="10px" display="flex" flexDirection="row">
          <Typography fontWeight="bold">
            Units Available:&nbsp;&nbsp;
          </Typography>
          <Typography>{units} Units</Typography>
        </Box>

        <Box  mt="20px" display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">

          <Typography fontSize="20px" fontWeight="bold">
            {" "}
            AVAILABLE UNITS
          </Typography>

          <Box>
            <Button variant="contained" onClick={() => setOpenModal(true)}>
              Add Unit
            </Button>
          </Box>
        </Box>

        <DataGrid
          sx={{
            height: "fit-content",
            mt: 1,
          }}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          processRowUpdate={processRowUpdate}
          experimentalFeatures={{ newEditingApi: true }}
          slots={{
            toolbar: GridToolbar,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 300 },
            },
          }}
        />

        <DataUnitFormModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onAddUnit={handleAddUnit}
        />

        <DataDeleteConfirm
          setRows={setRows}
          setSnackbar={setSnackbar}
          setDeleteDialogOpen={setDeleteDialogOpen}
          deleteDialogOpen={deleteDialogOpen}
          selectedUnitId={selectedUnitId}
          setSelectedUnitId={setSelectedUnitId}
        />
        
      </Box>
    </Box>
  );
};

export default PropertyDetails;

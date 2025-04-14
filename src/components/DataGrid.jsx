import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, Snackbar } from "@mui/material";
import DataUserFormModal from "./DataUserFormModal";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import DataDeleteConfirm from "./DataDeleteConfirm";

const initialRows = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 3, name: "Mike Brown", email: "mike@example.com", role: "Editor" },
];

const BasicDataGrid = () => {
  const [rows, setRows] = useState(initialRows);
  const [openModal, setOpenModal] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleAddUser = (user) => {
    setRows((prev) => [...prev, user]);
  };

  const processRowUpdate = (newRow) => {
    const updatedRows = rows.map((row) =>
      row.id === newRow.id ? newRow : row
    );
    setRows(updatedRows);
    setSnackbar({ open: true, message: `Updated user: ${newRow.name}` });
    return newRow;
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "" });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200, editable: true },
    { field: "email", headerName: "Email", width: 250, editable: true },
    { field: "role", headerName: "Role", width: 130, editable: true },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <IconButton
          color="error"
          onClick={() => {
            setSelectedUserId(params.row.id);
            setDeleteDialogOpen(true);
          }}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ height: 500, width: "100%", p: 2, mb: "20px"}}>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={() => setOpenModal(true)}>
          Add User
        </Button>
      </Box>

      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableRowSelectionOnClick
        processRowUpdate={processRowUpdate}
        experimentalFeatures={{ newEditingApi: true }}
        slots={{
          toolbar: GridToolbar,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter :true,
            quickFilterProps: {debounceMs: 300}
          }
        }}
      />

      <DataUserFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAddUser={handleAddUser}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        variant="filled"
        message={snackbar.message}
        onClose={handleCloseSnackbar}
      />

      <DataDeleteConfirm
        setRows={setRows}
        setSnackbar={setSnackbar}
        setDeleteDialogOpen={setDeleteDialogOpen}
        deleteDialogOpen={deleteDialogOpen}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
      />
    </Box>
  );
};

export default BasicDataGrid;

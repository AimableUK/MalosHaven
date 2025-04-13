import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, Snackbar } from "@mui/material";
import DataUserFormModal from "./DataUserFormModal";

const initialRows = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 3, name: "Mike Brown", email: "mike@example.com", role: "Editor" },
];

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 200, editable: true },
  { field: "email", headerName: "Email", width: 250, editable: true },
  { field: "role", headerName: "Role", width: 130, editable: true },
];

const BasicDataGrid = () => {
  const [rows, setRows] = useState(initialRows);
  const [openModal, setOpenModal] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

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

  return (
    <Box sx={{ height: 500, width: "100%", p: 2 }}>
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
    </Box>
  );
};

export default BasicDataGrid;

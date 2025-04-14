import React from "react";
import useSWR from "swr";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, Snackbar, CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import DataUserFormModal from "./DataUserFormModal";
import DataDeleteConfirm from "./DataDeleteConfirm";

// ✅ fetcher function using axios
const fetcher = (url) =>
  axios.get(url).then((res) =>
    res.data.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: "User", // mock role
    }))
  );

const DataGridApi = () => {
  const {
    data: rows,
    error,
    isLoading,
  } = useSWR("https://jsonplaceholder.typicode.com/users", fetcher);

  const [openModal, setOpenModal] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedUserId, setSelectedUserId] = React.useState(null);

  // Optional: You can locally append new users here if you want:
  const [localRows, setLocalRows] = React.useState([]);
  const mergedRows = rows ? [...rows, ...localRows] : [];

  const handleAddUser = (user) => {
    setLocalRows((prev) => [...prev, user]);
  };

  const processRowUpdate = (newRow) => {
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

  if (isLoading)
    return (
      <Box p={3} textAlign="center">
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box p={3} textAlign="center" color="red">
        Failed to load data.
      </Box>
    );

  return (
    <Box sx={{ height: 500, width: "100%", p: 2 }}>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={() => setOpenModal(true)}>
          Add User
        </Button>
      </Box>

      <DataGrid
        rows={mergedRows}
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
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 300 },
          },
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
        message={snackbar.message}
        onClose={handleCloseSnackbar}
      />

      <DataDeleteConfirm
        setRows={setLocalRows}
        setSnackbar={setSnackbar}
        setDeleteDialogOpen={setDeleteDialogOpen}
        deleteDialogOpen={deleteDialogOpen}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
      />
    </Box>
  );
};

export default DataGridApi;

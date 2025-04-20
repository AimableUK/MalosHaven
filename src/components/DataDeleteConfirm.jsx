import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";

const DataDeleteConfirm = ({
  setRows,
  setSnackbar,
  setDeleteDialogOpen,
  deleteDialogOpen,
  setSelectedUserId,
  selectedUserId,
}) => {
  return (
    <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
      <DialogTitle>Delete User</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this user? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            setRows((prev) => prev.filter((row) => row.id !== selectedUserId));
            setSnackbar({ open: true, message: "User deleted" });
            setDeleteDialogOpen(false);
            setSelectedUserId(null);
          }}
          color="error"
          variant="contained"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DataDeleteConfirm;

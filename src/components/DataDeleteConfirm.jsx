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
  setSelectedUnitId,
  selectedUnitId,
}) => {
  return (
    <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
      <DialogTitle>Delete Unit</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this unit? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            setRows((prev) => prev.filter((row) => row.id !== selectedUnitId));
            setSnackbar({ open: true, message: "Unit deleted" });
            setDeleteDialogOpen(false);
            setSelectedUnitId(null);
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

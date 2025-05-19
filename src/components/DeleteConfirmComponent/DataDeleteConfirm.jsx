import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

const DataDeleteConfirm = ({
  deleteDialogOpen,
  setDeleteDialogOpen,
  handleDeleteUnit,
  handleDeleteTenant,
  handleDeleteNotification,
  handleDeleteAssistant,
  handleDeleteProperty,
  handleDeleteInvoice,
  deleteTenant,
  deleteUnit,
  deleteNotification,
  deleteAssistant,
  deleteProperty,
  deleteInvoice,
  deleteType,
}) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "" });
  };

  const handleDelete = () => {
    if (deleteType === "unit") {
      handleDeleteUnit();
    } else if (deleteType === "tenant") {
      handleDeleteTenant();
    } else if (deleteType === "notification") {
      handleDeleteNotification();
    } else if (deleteType === "assistant") {
      handleDeleteAssistant();
    } else if (deleteType === "property") {
      handleDeleteProperty();
    } else if (deleteType === "invoice") {
      handleDeleteInvoice();
    }
  };

  return (
    <>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {deleteTenant} {deleteUnit} {deleteNotification}
            {deleteAssistant} {deleteInvoice} {deleteProperty}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DataDeleteConfirm;

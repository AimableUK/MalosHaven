import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";
import AppSnackbar from "../utils/MySnackbar/AppSnackbar";

const DataDeleteConfirm = ({
  deleteDialogOpen,
  setDeleteDialogOpen,
  handleDeleteUnit,
  handleDeleteTenant,
  handleDeleteNotification,
  handleDeleteAssistant,
  handleDeleteProperty,
  handleDeleteInvoice,
  handleDeleteLodge,
  handleDeleteRoom,
  deleteATenant,
  deleteUnitProp,
  deleteRoomLodge,
  deleteALodge,
  deleteANotification,
  deleteAnAssistant,
  deleteProperty,
  deleteAnInvoice,
  deleteType,
}) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

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
    } else if (deleteType === "lodge") {
      handleDeleteLodge();
    } else if (deleteType === "room") {
      handleDeleteRoom();
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
            {deleteATenant} {deleteUnitProp}
            {deleteRoomLodge} {deleteANotification}
            {deleteAnAssistant} {deleteAnInvoice}
            {deleteProperty} {deleteALodge}
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

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </>
  );
};

export default DataDeleteConfirm;

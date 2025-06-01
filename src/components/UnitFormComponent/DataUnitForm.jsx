import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";

const DataUnitFormModal = ({ open, onClose, onAddUnit }) => {
  const [formData, setFormData] = useState({ unit: "", value: "" });
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

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    const { unit, value } = formData;
    if (!unit.trim() || !value.toString().trim()) {
      showSnackbar({
        open: true,
        message: "Please fill out all fields",
        severity: "error",
      });
      return;
    }

    onAddUnit({
      id: Date.now(),
      UnitNumber: unit,
      UnitValue: Number(value),
    });

    onClose();
    setFormData({ unit: "", value: "" });
    setSnackbar({
      open: true,
      message: "Unit added successfully!",
      severity: "success",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle sx={{ fontWeight: "bold" }}>Add New Unit</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Unit Number"
            name="unit"
            fullWidth
            value={formData.unit}
            onChange={handleChange}
          />
          <TextField
            label="Unit Value"
            name="value"
            fullWidth
            type="number"
            value={formData.value}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
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

export default DataUnitFormModal;

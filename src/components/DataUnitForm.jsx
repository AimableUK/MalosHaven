import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Snackbar
} from "@mui/material";

const DataUnitFormModal = ({ open, onClose, onAddUnit }) => {
  const [formData, setFormData] = useState({ unit: "", value: "" });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    const { name, unit } = formData;
    if (!name.trim() || !unit.trim()) {
      setSnackbar({
        open: true,
        message: "Please fill out all fields",
        severity: "error",
      });
      return;
    }
    onAddUnit({
      id: Date.now(),
      UnitNumber: formData.unit,
      UnitValue: Number(formData.value),
    });

    onClose();
    setFormData({ unit: "", value: "" });
    setSnackbar({
      open: true,
      message: "Property added successfully!",
      severity: "success",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "" });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ fontWeight: "bold" }}>Add New Unit</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
      >
        <TextField
          label="Unit Number"
          name="unit"
          fullWidth
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          label="Unit Value"
          name="value"
          fullWidth
          type="number"
          value={formData.email}
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

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        variant="filled"
        message={snackbar.message}
        onClose={handleCloseSnackbar}
        severity={snackbar.severity}
      />
    </Dialog>
  );
};

export default DataUnitFormModal;

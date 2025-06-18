import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import AppSnackbar from "../utils/MySnackbar/AppSnackbar";
import { v4 as uuidv4 } from "uuid";

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
      showSnackbar("Please fill out all fields", "error");
      return;
    }

    onAddUnit({
      id: `UNT-${uuidv4()}`,
      UnitNumber: unit,
      UnitValue: Number(value),
      tenant: null,
    });

    onClose();
    setFormData({ unit: "", value: "" });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle sx={{ fontWeight: "bold" }}>Add New Unit</DialogTitle>
        <DialogContent sx={{ gap: 2, mt: 1 }}>
          <TextField
            label="Unit Number"
            name="unit"
            fullWidth
            value={formData.unit}
            onChange={handleChange}
            sx={{ mb: 1 }}
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

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </>
  );
};

export default DataUnitFormModal;

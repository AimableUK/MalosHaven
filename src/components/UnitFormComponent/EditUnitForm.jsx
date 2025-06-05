import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import AppSnackbar from "../utils/MySnackbar/AppSnackbar";

const EditUnitFormModal = ({ open, onClose, onEditUnit, selectedUnit }) => {
  const [formData, setFormData] = useState({ unit: "", value: "" });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (selectedUnit) {
      setFormData({
        unit: selectedUnit.UnitNumber || "",
        value: selectedUnit.UnitValue || "",
      });
    }
  }, [selectedUnit]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    const { unit, value } = formData;
    if (!unit.trim() || !value.toString().trim()) {
      setSnackbar({
        open: true,
        message: "Please fill out all fields",
        severity: "error",
      });
      return;
    }

    onEditUnit({
      ...selectedUnit,
      UnitNumber: unit,
      UnitValue: Number(value),
    });

    onClose();
    setSnackbar({
      open: true,
      message: `${unit} Updated Successfully`,
      severity: "success",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle sx={{ fontWeight: "bold" }}>Edit Unit</DialogTitle>
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
            Update
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

export default EditUnitFormModal;

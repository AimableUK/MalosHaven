import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";


const DataUnitFormModal = ({ open, onClose, onAddUnit }) => {
  const [formData, setFormData] = useState({ unit: "", value: ""});

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    onAddUnit({ ...formData, id: Date.now() });
    onClose();
    setFormData({ name: "", email: "", role: "" });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
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
    </Dialog>
  );
};

export default DataUnitFormModal;

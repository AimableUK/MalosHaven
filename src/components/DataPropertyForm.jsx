import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";

const DataPropertyFormModal = ({ open, onClose, onAddProperty }) => {
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    units: "",
    loc: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    const { name, desc, units, loc } = formData;
    if (
      !name.trim() ||
      !desc.trim() ||
      !units.trim() ||
      !loc.trim() ||
      !image
    ) {
      setSnackbar({
        open: true,
        message: "Please fill out all fields",
        severity: "error",
      });
      return;
    }
    onAddProperty({
      id: Date.now(),
      title: formData.name,
      description: formData.desc,
      units: formData.units,
      location: formData.loc,
      image: imagePreview,
    });

    onClose();
    setFormData({ name: "", desc: "", units: "", loc: "" });
    setImage(null);
    setImagePreview(null);
    setSnackbar({
      open: true,
      message: "Property added successfully!",
      severity: "success",
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "" });
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle sx={{ fontWeight: "bold" }}>Add New Property</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <label>Enter the Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && (
            <Box mt={2}>
              <img src={imagePreview} alt="Preview" width="50%" />
            </Box>
          )}

          <TextField
            label="Property Name"
            name="name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <TextField
            label="Property Description"
            name="desc"
            fullWidth
            value={formData.desc}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <TextField
            label="Property Units"
            name="units"
            fullWidth
            value={formData.units}
            onChange={handleChange}
            autoComplete="off"
            required
            helperText="Number of units eg; R234"
          />
          <TextField
            label="Property Location"
            name="loc"
            fullWidth
            value={formData.loc}
            onChange={handleChange}
            autoComplete="off"
            required
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
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DataPropertyFormModal;

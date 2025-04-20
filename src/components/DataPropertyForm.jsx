import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
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

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    onAddProperty({
      id: Date.now(),
      title: formData.name,
      description: formData.desc,
      units: Number(formData.units),
      location: formData.loc,
      image: imagePreview,
    });
    onClose();
    setFormData({ name: "", desc: "", units: "", loc: "" });
    setImage(null);
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
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
        />
        <TextField
          label="Property Description"
          name="desc"
          fullWidth
          value={formData.desc}
          onChange={handleChange}
        />
        <TextField
          label="Property Units"
          name="units"
          type="number"
          fullWidth
          value={formData.units}
          onChange={handleChange}
        />
        <TextField
          label="Property Location"
          name="loc"
          fullWidth
          value={formData.loc}
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

export default DataPropertyFormModal;

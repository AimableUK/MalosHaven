import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import AppSnackbar from "../utils/MySnackbar/AppSnackbar";

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

  const handleSubmit = () => {
    const { name, desc, units, loc } = formData;
    if (!name.trim() || !desc.trim() || !loc.trim() || !image) {
      showSnackbar("Please fill out all fields", "error");
      return;
    }
    onAddProperty({
      id: `PRP-${Date.now()}`,
      title: formData.name,
      description: formData.desc,
      units: [],
      location: formData.loc,
      image: imagePreview,
    });

    onClose();
    setFormData({ name: "", desc: "", loc: "" });
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

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const onCancel = () => {
    setFormData({ name: "", desc: "", loc: "" });
    setImagePreview(null);
    setImage(null);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle sx={{ fontWeight: "bold" }}>Add New Property</DialogTitle>
        <DialogContent sx={{ gap: 2, mt: 1 }}>
          <Box className="flex flex-col mb-2 w-fit">
            <label htmlFor="propertyImage">Select the Image</label>
            <input
              id="propertyImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <Box mt={2}>
                <img src={imagePreview} alt="Preview" width="50%" />
              </Box>
            )}
          </Box>

          <TextField
            label="Property Name"
            name="name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            autoComplete="off"
            required
            sx={{ my: 1 }}
          />
          <TextField
            label="Property Description"
            name="desc"
            fullWidth
            value={formData.desc}
            onChange={handleChange}
            autoComplete="off"
            required
            sx={{ my: 1 }}
          />
          <TextField
            label="Property Location"
            name="loc"
            fullWidth
            value={formData.loc}
            onChange={handleChange}
            autoComplete="off"
            required
            sx={{ mb: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              onClose();
              onCancel();
            }}
            color="secondary"
          >
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

export default DataPropertyFormModal;

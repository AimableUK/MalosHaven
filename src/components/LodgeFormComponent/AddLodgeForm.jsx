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

const AddLodgeFormModal = ({ open, onClose, onAddLodge }) => {
  const [formData, setFormData] = useState({
    name: "",
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
    const { name, loc } = formData;
    if (!name.trim() || !loc.trim() || !image) {
      showSnackbar("Please fill out all fields", "error");
      return;
    }
    onAddLodge({
      id: `LDG-${Date.now()}`,
      name: formData.name,
      location: formData.loc,
      image: imagePreview,
      rooms: [],
    });

    onClose();
    setFormData({ name: "", loc: "" });
    setImage(null);
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSnackbar("Please select a valid image file.", "error");
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle sx={{ fontWeight: "bold" }}>Add New Lodge</DialogTitle>
        <DialogContent sx={{ gap: 2, mt: 1 }}>
          <Box className="flex flex-col mb-2 w-fit">
            <label htmlFor="lodgeImage">Select the Image</label>
            <input
              id="lodgeImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <Box mt={2}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ maxWidth: "50%" }}
                />
              </Box>
            )}
          </Box>

          <TextField
            label="lodge Name"
            name="name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            autoComplete="off"
            required
            sx={{ my: 1 }}
          />
          <TextField
            label="lodge Location"
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

export default AddLodgeFormModal;

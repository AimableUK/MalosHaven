import { useEffect, useState } from "react";
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

const EditLodgeFormModal = ({ open, onClose, onEditLodge, selectedLodge }) => {
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
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (selectedLodge) {
      setFormData({
        name: selectedLodge.name || "",
        loc: selectedLodge.location || "",
      });

      setImagePreview(
        typeof selectedLodge.image === "string" ? selectedLodge.image : null
      );
      setImage(null);
    }
  }, [selectedLodge]);

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
    const { name, loc } = formData;
    if (!name.trim() || !loc.trim() || (!image && !imagePreview)) {
      showSnackbar("Please fill out all fields", "error");
      return;
    }
    onEditLodge({
      ...selectedLodge,
      name: name,
      location: loc,
      image: image || imagePreview,
    });

    onClose();
    setFormData({ name: "", loc: "" });
    setImage(null);
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle sx={{ fontWeight: "bold" }}>Update Lodge</DialogTitle>
        <DialogContent sx={{ gap: 2, mt: 1 }}>
          <Box className="flex flex-col mb-2 w-fit">
            <label htmlFor="lodgeImage">Select the Image</label>
            <input
              id="lodgeImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <img
              src={typeof image === "string" ? image : imagePreview}
              alt="lodge Image"
              style={{ maxWidth: "50%", marginTop: 8 }}
            />
            {preview}
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
            Update lodge
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

export default EditLodgeFormModal;

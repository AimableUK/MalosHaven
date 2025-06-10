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

const EditPropertyFormModal = ({
  open,
  onClose,
  onEditProperty,
  selectedProperty,
}) => {
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
    if (selectedProperty) {
      setFormData({
        name: selectedProperty.title || "",
        desc: selectedProperty.description || "",
        units: selectedProperty.units?.length.toString() || "",
        loc: selectedProperty.location || "",
      });

      setImagePreview(
        typeof selectedProperty.image === "string"
          ? selectedProperty.image
          : null
      );
      setImage(null);
    }
  }, [selectedProperty]);

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
      (!image && !imagePreview)
    ) {
      setSnackbar({
        open: true,
        message: "Please fill out all fields",
        severity: "error",
      });
      return;
    }
    onEditProperty({
      ...selectedProperty,
      title: name,
      description: desc,
      units: selectedProperty.units,
      location: loc,
      image: image || imagePreview,
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
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle sx={{ fontWeight: "bold" }}>Update Property</DialogTitle>
        <DialogContent sx={{ gap: 2, mt: 1 }}>
          <Box className="flex flex-col mb-2 w-fit">
            <label htmlFor="propertyImage">Select the Image</label>
            <input
              id="propertyImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <img
              src={typeof image === "string" ? image : imagePreview}
              alt="Property Image"
              style={{ maxWidth: "100%", marginTop: 8 }}
            />
            {preview}
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
            label="Property Units"
            name="units"
            fullWidth
            value={formData.units}
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
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained">
            Update Property
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

export default EditPropertyFormModal;

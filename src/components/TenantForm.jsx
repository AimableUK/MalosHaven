import {
  Alert,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const TenantForm = ({ open, onClose, onAddTenant, properties }) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [unitsList, setUnitsList] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    national_id: "",
    property: "",
    unit: "",
    gender: "",
    paymentStatus: "",
  });

  const handleGenderChange = (event) => {
    setFormData((prev) => ({ ...prev, gender: event.target.value }));
  };

  const handlePaymentStatusChange = (event) => {
    setFormData((prev) => ({ ...prev, paymentStatus: event.target.value }));
  };

  const handlePropertyChange = (event) => {
    const selectedPropertyTitle = event.target.value;
    const selectedProperty = properties.find(
      (p) =>
        p.title.trim().toLowerCase() ===
        selectedPropertyTitle.trim().toLowerCase()
    );

    setFormData((prev) => ({
      ...prev,
      property: selectedPropertyTitle,
      unit: "",
    }));

    setUnitsList(selectedProperty?.units || []);
  };

  const handleSubmit = () => {
    const {
      name,
      email,
      phone,
      national_id,
      property,
      unit,
      gender,
      paymentStatus,
    } = formData;

    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !national_id.trim() ||
      !property.trim() ||
      !unit.trim() ||
      !gender.trim() ||
      !paymentStatus.trim() ||
      !image
    ) {
      setSnackbar({
        open: true,
        message: "Please fill out all fields",
        severity: "error",
      });
      return;
    }

    onAddTenant({
      tenant_id: `TNT-${Date.now()}`,
      name,
      email,
      phone,
      national_id,
      property,
      unit,
      gender,
      paymentStatus,
      image: imagePreview,
    });

    onClose();
    setFormData({
      name: "",
      email: "",
      phone: "",
      national_id: "",
      property: "",
      unit: "",
      gender: "",
      paymentStatus: "",
    });
    setImage(null);
    setImagePreview(null);
    setSnackbar({
      open: true,
      message: "Tenant added successfully!",
      severity: "success",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "" });
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
      setSnackbar({
        open: true,
        message: "Please select a valid image file.",
        severity: "error",
      });
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} sx={{ minWidth: "300px" }}>
        <DialogTitle>Add Tenant</DialogTitle>
        <DialogContent>
          <Box className="flex justify-center my-10 items-center relative">
            <Avatar
              src={imagePreview}
              alt="user profile avatar"
              sx={{ width: "100px", height: "100px" }}
            />
            <label htmlFor="upload-avatar">
              <IconButton
                component="span"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: "calc(50% + 30px)",
                  transform: "translateX(-50%)",
                  background: "#15512A",
                  color: "white",
                }}
              >
                <CameraAltIcon />
              </IconButton>
            </label>
            <input
              id="upload-avatar"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </Box>

          <Box className="flex flex-col">
            <Box className="flex flex-col md:flex-row gap-4 mb-4">
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <FormControl fullWidth>
                <InputLabel id="select-label">Gender</InputLabel>
                <Select
                  labelId="select-label"
                  value={formData.gender}
                  label="Gender"
                  onChange={handleGenderChange}
                >
                  <MenuItem value="MALE">MALE</MenuItem>
                  <MenuItem value="FEMALE">FEMALE</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box className="flex flex-col md:flex-row gap-4 mb-4">
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Box>

            <Box className="flex flex-col md:flex-row gap-4 mb-4">
              <TextField
                label="National ID"
                variant="outlined"
                fullWidth
                required
                value={formData.national_id}
                onChange={(e) =>
                  setFormData({ ...formData, national_id: e.target.value })
                }
              />
              <FormControl fullWidth>
                <InputLabel id="property-select-label">Property</InputLabel>
                <Select
                  labelId="property-select-label"
                  value={formData.property}
                  label="Property"
                  onChange={handlePropertyChange}
                >
                  {properties.map((property) => (
                    <MenuItem key={property.id} value={property.title}>
                      {property.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box className="flex flex-col md:flex-row gap-4">
              <FormControl fullWidth required>
                <InputLabel id="unit-select-label">Unit</InputLabel>
                <Select
                  labelId="unit-select-label"
                  value={formData.unit}
                  label="Unit"
                  onChange={(e) =>
                    setFormData({ ...formData, unit: e.target.value })
                  }
                  disabled={unitsList.length === 0}
                >
                  {unitsList
                    .filter((unit) => unit.tenant == null)
                    .map((unit) => (
                      <MenuItem key={unit.id} value={unit.UnitNumber}>
                        {unit.UnitNumber}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <FormControl fullWidth required>
                <InputLabel id="payment-status-label">
                  Payment Status
                </InputLabel>
                <Select
                  labelId="payment-status-label"
                  value={formData.paymentStatus}
                  label="Payment Status"
                  onChange={handlePaymentStatusChange}
                >
                  <MenuItem value="PAID">PAID</MenuItem>
                  <MenuItem value="NOT YET">NOT YET</MenuItem>
                  <MenuItem value="PARTIALLY">PARTIALLY</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained">
            Add Tenant
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default TenantForm;

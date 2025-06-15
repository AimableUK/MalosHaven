import {
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
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import AppSnackbar from "../utils/MySnackbar/AppSnackbar";

const TenantUpdateForm = ({
  open,
  onClose,
  onUpdateTenant,
  properties,
  selectedTenant,
}) => {
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

  useEffect(() => {
    if (!selectedTenant) return;

    // Find tenant data
    const foundTenant = properties
      .flatMap((property) =>
        property.units.map((unit) => ({
          ...unit.tenant,
          property: property.title,
          unit: unit.UnitNumber,
        }))
      )
      .find(
        (tenant) => tenant && tenant.tenant_id === selectedTenant.tenant_id
      );

    if (foundTenant) {
      setFormData({
        name: foundTenant.name || "",
        email: foundTenant.email || "",
        phone: foundTenant.phone || "",
        national_id: foundTenant.national_id || "",
        property: foundTenant.property || "",
        unit: foundTenant.unit || "",
        gender: foundTenant.gender || "",
        paymentStatus: foundTenant.paymentStatus || "",
      });
      setImagePreview(foundTenant.image || null);

      const propertyObj = properties.find(
        (p) => p.title === foundTenant.property
      );
      setUnitsList(propertyObj?.units || []);
    }
  }, [selectedTenant, properties]);

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
      !paymentStatus.trim()
    ) {
      showSnackbar("Please fill out all fields", "error");
      return;
    }

    onUpdateTenant({
      tenant_id: selectedTenant?.tenant_id,
      name,
      email,
      phone,
      national_id,
      property,
      unit,
      gender,
      paymentStatus,
      image: imagePreview || selectedTenant?.image,
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
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      showSnackbar("Please select a valid image file.", "error");
    }
  };

  const handleGenderChange = (e) =>
    setFormData((prev) => ({ ...prev, gender: e.target.value }));

  const handlePaymentStatusChange = (e) =>
    setFormData((prev) => ({ ...prev, paymentStatus: e.target.value }));

  const handlePropertyChange = (e) => {
    const propertyTitle = e.target.value;
    const selectedProperty = properties.find(
      (p) => p.title.trim().toLowerCase() === propertyTitle.trim().toLowerCase()
    );
    setFormData((prev) => ({ ...prev, property: propertyTitle, unit: "" }));
    setUnitsList(selectedProperty?.units || []);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} sx={{ minWidth: "300px" }}>
        <DialogTitle>Update Tenant</DialogTitle>
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
            {/* Fields */}
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
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
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
              <FormControl fullWidth required>
                <InputLabel id="property-label">Property</InputLabel>
                <Select
                  labelId="property-label"
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
                <InputLabel id="unit-label">Unit</InputLabel>
                <Select
                  labelId="unit-label"
                  value={formData.unit}
                  label="Unit"
                  onChange={(e) =>
                    setFormData({ ...formData, unit: e.target.value })
                  }
                  disabled={unitsList.length === 0}
                >
                  {unitsList
                    .filter(
                      (unit) =>
                        !unit.tenant || unit.UnitNumber === formData.unit
                    )
                    .map((unit) => (
                      <MenuItem key={unit.id} value={unit.UnitNumber}>
                        {unit.UnitNumber}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <FormControl fullWidth required>
                <InputLabel id="payment-label">Payment Status</InputLabel>
                <Select
                  labelId="payment-label"
                  value={formData.paymentStatus}
                  label="Payment Status"
                  onChange={handlePaymentStatusChange}
                >
                  <MenuItem value="Paid">PAID</MenuItem>
                  <MenuItem value="Not Yet">NOT YET</MenuItem>
                  <MenuItem value="Partially">PARTIALLY</MenuItem>
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
            Update Tenant
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

export default TenantUpdateForm;

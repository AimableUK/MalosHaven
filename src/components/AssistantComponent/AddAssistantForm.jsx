import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

const AddAssistantForm = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    assistantName: "",
    phoneNumber: "",
    workType: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "" });
  };

  const handleSubmit = () => {
    const { assistantName, phoneNumber, workType } = formData;

    if (!assistantName.trim() || !phoneNumber.trim() || !workType.trim()) {
      setSnackbar({
        open: true,
        message: "Please Fill out all fields",
        severity: "error",
      });
      return;
    }
    
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle fontWeight="bold">Add An Assistant</DialogTitle>
      <DialogContent>
        <TextField
          label="Assistant Name"
          name="assistantName"
          fullWidth
          placeholder="Enter Assistant Name"
          autoComplete="off"
          required
          sx={{ mt: 1 }}
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          fullWidth
          placeholder="Enter the Phone Number"
          autoComplete="off"
          required
          sx={{ my: 1 }}
          value={formData.phone}
          onChange={handleChange}
        />
        <TextField
          label="Work Type"
          name="workType"
          fullWidth
          placeholder="Enter the Work Type"
          autoComplete="off"
          required
          value={formData.workType}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Add Assistant
        </Button>
      </DialogActions>

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
    </Dialog>
  );
};

export default AddAssistantForm;

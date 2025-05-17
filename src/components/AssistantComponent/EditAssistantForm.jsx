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
import React, { useEffect, useState } from "react";

const EditAssistantForm = ({
  open,
  onClose,
  onEditAssistant,
  showSnackbar,
  selectedAssistant,
}) => {
  const [formData, setFormData] = useState({
    assistantName: "",
    phoneNumber: "",
    workType: "",
  });

  // ✅ Prefill the form when the selectedAssistant changes
  useEffect(() => {
    if (selectedAssistant) {
      setFormData({
        assistantName: selectedAssistant.assistantName || "",
        phoneNumber: selectedAssistant.phoneNumber || "",
        workType: selectedAssistant.workType || "",
      });
    }
  }, [selectedAssistant]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    const { assistantName, phoneNumber, workType } = formData;

    if (!assistantName.trim() || !phoneNumber.trim() || !workType.trim()) {
      showSnackbar("Please fill out all fields", "error");
      return;
    }

    onEditAssistant({
      ...selectedAssistant,
      assistantName,
      phoneNumber,
      workType,
    });

    setFormData({ assistantName: "", phoneNumber: "", workType: "" });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle fontWeight="bold">Edit An Assistant</DialogTitle>
      <DialogContent>
        <TextField
          label="Assistant Name"
          name="assistantName"
          fullWidth
          placeholder="Enter Assistant Name"
          autoComplete="off"
          required
          sx={{ mt: 1 }}
          value={formData.assistantName}
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
          value={formData.phoneNumber}
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
          Update Assistant
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAssistantForm;

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Snackbar,
  Alert,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@mui/material";

const AddRoomFormModal = ({ open, onClose, onAddRoom }) => {
  const [formData, setFormData] = useState({
    lodgename: "",
    price: "",
    type: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

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
    const { lodgename, price, type } = formData;
    if (!lodgename.trim() || !price.toString().trim() || !type.trim()) {
      showSnackbar({
        open: true,
        message: "Please fill out all fields",
        severity: "error",
      });
      return;
    }

    onAddRoom({
      id: `RM-${Date.now()}`,
      name: lodgename,
      price: Number(price),
      type,
    });

    onClose();
    setFormData({ lodgename: "", price: "", type: "" });
    setSnackbar({
      open: true,
      message: "Lodge added successfully!",
      severity: "success",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle sx={{ fontWeight: "bold" }}>Add New Room</DialogTitle>
        <DialogContent sx={{ gap: 2, mt: "10px" }}>
          <TextField
            label="Lodge Name"
            name="lodgename"
            fullWidth
            value={formData.lodgename}
            onChange={handleChange}
            sx={{ mb: 1 }}
          />
          <TextField
            label="Room Price"
            name="price"
            fullWidth
            type="number"
            value={formData.price}
            onChange={handleChange}
          />
          <FormControl>
            <FormLabel>Lodge Type</FormLabel>
            <RadioGroup
              row
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <FormControlLabel
                value="Single"
                control={<Radio />}
                label="Single"
              />
              <FormControlLabel
                value="Double"
                control={<Radio />}
                label="Double"
              />
              <FormControlLabel
                value="Suite"
                control={<Radio />}
                label="Suite"
              />
            </RadioGroup>
          </FormControl>
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

export default AddRoomFormModal;

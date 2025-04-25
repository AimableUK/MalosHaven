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
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import userAvatar from "../assets/userAvatar.jpg";

const TenantForm = ({ open, onClose }) => {
  const [gender, setGender] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: "false",
    message: "",
    severity: "",
  });

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handlePaymentStatusChange = (event) => {
    setPaymentStatus(event.target.value);
  };

  const handleSubmit = () => {
    
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "" });
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} sx={{ minWidth: "300px" }}>
        <DialogTitle>Add Tenant</DialogTitle>
        <DialogContent>
          <Box className="flex justify-center my-10 items-center">
            <Avatar
              src={userAvatar}
              alt="user profile avatar"
              sx={{ width: "100px", height: "100px" }}
            />
          </Box>

          <Box className="flex flex-col">
            <Box className="flex flex-col md:flex-row gap-4 mb-4">
              <TextField label="Name" variant="outlined" fullWidth required />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={gender}
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
              />
              <TextField label="Email" variant="outlined" fullWidth required />
            </Box>

            <Box className="flex flex-col md:flex-row gap-4 mb-4">
              <TextField
                label="National ID"
                variant="outlined"
                fullWidth
                required
              />
              <TextField
                label="Property"
                variant="outlined"
                fullWidth
                required
              />
            </Box>

            <Box className="flex flex-col md:flex-row gap-4">
              <TextField
                label="Unit Name"
                variant="outlined"
                fullWidth
                required
              />
              <FormControl fullWidth required>
                <InputLabel id="payment-status-label">
                  Payment Status
                </InputLabel>
                <Select
                  labelId="payment-status-label"
                  id="payment-status"
                  value={paymentStatus}
                  label="Payment Status"
                  onChange={handlePaymentStatusChange}
                >
                  <MenuItem value="PAID">PAID</MenuItem>
                  <MenuItem value="UNPAID">UNPAID</MenuItem>
                  <MenuItem value="PARTIALLY PAID">PARTIALLY PAID</MenuItem>
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

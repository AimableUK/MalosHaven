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
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const AddInvoiceForm = ({ open, onClose, onAddInvoice, propertiesState }) => {
  const [selectedIssueDate, setSelectedIssueDate] = useState(null);
  const [selectedDueDate, setSelectedDueDate] = useState(null);

  const [formData, setFormData] = useState({
    tenant: "",
    amount: "",
    issueDate: "",
    dueDate: "",
    paymentStatus: "",
    reason: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    const { tenant, amount, reason, paymentStatus } = formData;

    if (
      !tenant ||
      !amount ||
      !reason ||
      !paymentStatus ||
      !selectedIssueDate ||
      !selectedDueDate
    ) {
      setSnackbar({
        open: true,
        message: "Please fill out all fields",
        severity: "error",
      });
      return;
    }

    onAddInvoice({
      id: `INV-${Date.now()}`,
      tenantName: tenant,
      amount: Number(amount),
      reason,
      status: paymentStatus,
      dateIssued: selectedIssueDate.format("YYYY-MM-DD"),
      dueDate: selectedDueDate.format("YYYY-MM-DD"),
    });

    onClose();
    setFormData({
      tenant: "",
      amount: "",
      issueDate: "",
      dueDate: "",
      paymentStatus: "",
      reason: "",
    });
    setSelectedIssueDate(null);
    setSelectedDueDate(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "" });
  };

  const tenants = propertiesState.flatMap((property) =>
    property.units
      .filter((unit) => unit.tenant !== null)
      .map((unit) => ({
        ...unit.tenant,
        unitNumber: unit.UnitNumber,
        unitValue: unit.UnitValue,
        propertyName: property.title,
      }))
  );

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        sx={{
          "& .MuiSvgIcon-root": {
            color: "#FFFFFF",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>Add New Invoice</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <Box className="flex flex-col md:flex-row items-center mt-3">
            {/* tenant details */}
            <FormControl fullWidth sx={{ width: "full" }}>
              <InputLabel id="tenant-select-label">Tenant</InputLabel>
              <Select
                labelId="tenant-select-label"
                name="tenant"
                value={formData.tenant || ""}
                label="Tenant"
                onChange={handleChange}
              >
                {tenants.map((tenant, idx) => (
                  <MenuItem key={idx} value={tenant.name}>
                    {tenant.name} — Unit ({tenant.unitNumber}) —
                    {tenant.propertyName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <TextField
            label="Amount"
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />

          {/* dates */}
          <Box className="flex flex-col md:flex-row gap-3">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Issue Date"
                value={selectedIssueDate}
                onChange={(newValue) => setSelectedIssueDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Due Date"
                value={selectedDueDate}
                onChange={(newValue) => setSelectedDueDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>

          <FormControl>
            <FormLabel id="status-options-label">Payment Status</FormLabel>
            <RadioGroup
              row
              aria-labelledby="status-options-radio-label"
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleChange}
            >
              <FormControlLabel value="Paid" control={<Radio />} label="Paid" />
              <FormControlLabel
                value="UnPaid"
                control={<Radio />}
                label="UnPaid"
              />
              <FormControlLabel
                value="OverDue"
                control={<Radio />}
                label="OverDue"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            multiline
            rows={4}
            label="Reason"
            name="reason"
            fullWidth
            value={formData.reason}
            onChange={handleChange}
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

export default AddInvoiceForm;

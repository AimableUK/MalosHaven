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
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Avatar,
  Typography,
  Divider,
  Chip,
  Tooltip,
  IconButton,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const AddInvoiceForm = ({
  open,
  onClose,
  onAddInvoice,
  propertiesState,
  setSelectedInvoice,
}) => {
  const [selectedIssueDate, setSelectedIssueDate] = useState(null);
  const [selectedDueDate, setSelectedDueDate] = useState(null);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [invoiceItems, setInvoiceItems] = useState([{ id: 1 }]);

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
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "tenant") {
      const tenantInfo = tenants.find((t) => t.name === value);
      setSelectedTenant(tenantInfo || null);
    }
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
      avatar: selectedTenant.image,
      phone: selectedTenant.phone,
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
    setSelectedInvoice(null);
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

  const handleAddInvoiceItem = () => {
    setInvoiceItems((prev) => [...prev, { id: prev.length + 1 }]);
  };

  const handleDeleteInvoiceItem = (invoiceItemId) => {
    setInvoiceItems((prevItems) => {
      if (prevItems.length === 1) {
        setSnackbar("You can't delete the first Invoice Item");
        return prevItems;
      }
      return prevItems.filter((item) => item.id !== invoiceItemId);
    });
  };

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
          {selectedTenant && (
            <Box className="flex flex-col md:flex-row items-center gap-2">
              <Avatar src={selectedTenant.image} alt="Tenant" width={80} />

              <Typography>
                <strong>Phone Number:</strong> {selectedTenant.phone}
              </Typography>
            </Box>
          )}
          <Box className="flex flex-col md:flex-row items-center mt-3">
            <FormControl fullWidth sx={{ width: "full" }}>
              <InputLabel id="tenant-select-label">Tenant</InputLabel>
              <Select
                labelId="tenant-select-label"
                name="tenant"
                value={formData.tenant || ""}
                label="Tenant"
                onChange={handleChange}
              >
                {tenants.map((tenant) => (
                  <MenuItem
                    key={tenant.email || tenant.name}
                    value={tenant.name}
                  >
                    {tenant.name} — Unit ({tenant.unitNumber}) —
                    {tenant.propertyName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {invoiceItems.map((item, index) => (
            <Box key={item.id} className="mt-6">
              <Divider
                sx={{
                  borderColor: "#ccc",
                  borderBottomWidth: 2,
                  mb: 2,
                }}
              >
                <Chip
                  label={`Invoice Item - ${index + 1}`}
                  size="small"
                  sx={{
                    bgcolor: "#f5f5f5",
                    color: "#333",
                    fontWeight: "bold",
                    fontSize: "0.75rem",
                  }}
                />
                {
                  <Tooltip title="Delete Invoice Item">
                    <IconButton
                      sx={{
                        "&:hover": {
                          backgroundColor: "#EF4F4F",
                        },
                      }}
                      onClick={() => handleDeleteInvoiceItem(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                }
              </Divider>

              <Box className="flex flex-col gap-3">
                <TextField
                  multiline
                  rows={2}
                  label="Description"
                  name={`description-${item.id}`}
                  fullWidth
                  value={formData[`description-${item.id}`] || ""}
                  onChange={handleChange}
                />

                <TextField
                  label="Amount"
                  type="number"
                  name={`amount-${item.id}`}
                  value={formData[`amount-${item.id}`] || ""}
                  onChange={handleChange}
                />

                <Box className="flex flex-col md:flex-row gap-3">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Issue Date"
                      value={formData[`issueDate-${item.id}`] || null}
                      onChange={(newValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          [`issueDate-${item.id}`]: newValue,
                        }))
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Due Date"
                      value={formData[`dueDate-${item.id}`] || null}
                      onChange={(newValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          [`dueDate-${item.id}`]: newValue,
                        }))
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Box>

                <FormControl>
                  <FormLabel>Payment Status</FormLabel>
                  <RadioGroup
                    row
                    name={`paymentStatus-${item.id}`}
                    value={formData[`paymentStatus-${item.id}`] || ""}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="Unpaid"
                      control={<Radio />}
                      label="Unpaid"
                    />
                    <FormControlLabel
                      value="Overdue"
                      control={<Radio />}
                      label="Overdue"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            </Box>
          ))}

          <Button
            startIcon={<AddIcon />}
            variant="contained"
            color="info"
            onClick={handleAddInvoiceItem}
          >
            Add Invoice Item
          </Button>
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

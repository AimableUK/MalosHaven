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
import invoices from "../../Data/SiteDataComponent/Invoices";

const EditInvoiceForm = ({
  open,
  onClose,
  onAddInvoice,
  propertiesState,
  setSelectedInvoice,
}) => {
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [invoiceItems, setInvoiceItems] = useState([{ id: 1 }]);

  const [formData, setFormData] = useState({
    tenant: "",
    description: "",
    amount: "",
    issueDate: "",
    dueDate: "",
    paymentStatus: "",
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
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "tenant") {
      const tenantInfo = tenants.find((t) => t.name === value);
      setSelectedTenant(tenantInfo || null);
    }
  };

  const handleSubmit = () => {
    if (!formData.tenant || !selectedTenant) {
      showSnackbar("Please select a tenant", "error");
      return;
    }

    const compiledItems = invoiceItems.map((item) => {
      const description = formData[`description-${item.id}`];
      const amount = parseFloat(formData[`amount-${item.id}`]);
      const issueDate = formData[`issueDate-${item.id}`];
      const dueDate = formData[`dueDate-${item.id}`];
      const status = formData[`paymentStatus-${item.id}`];

      if (
        !description ||
        !amount ||
        isNaN(amount) ||
        amount <= 0 ||
        !issueDate ||
        !dueDate ||
        !status
      ) {
        showSnackbar("Please fill out all invoice item fields", "error");
      }

      return {
        id: item.id,
        description,
        amount,
        dateIssued: issueDate.format
          ? issueDate.format("YYYY-MM-DD")
          : issueDate,
        dueDate: dueDate.format ? dueDate.format("YYYY-MM-DD") : dueDate,
        status,
      };
    });

    const newInvoice = {
      id: `INV-${Date.now()}`,
      invoiceNumber: `${Date.now()}${invoices.length + 1}`,
      tenantName: formData.tenant,
      email: selectedTenant.email,
      phone: selectedTenant.phone,
      avatar: selectedTenant.image,
      invoiceItems: compiledItems,
    };

    onAddInvoice(newInvoice);

    console.log("Invoice Summary:");
    console.table([
      {
        InvoiceID: newInvoice.id,
        InvoiceNumber: newInvoice.invoiceNumber,
        Tenant: newInvoice.tenantName,
        Email: newInvoice.email,
        Phone: newInvoice.phone,
        Items: newInvoice.invoiceItems.length,
      },
    ]);

    console.log("Invoice Items:");
    console.table(
      newInvoice.invoiceItems.map((item) => ({
        ItemID: item.id,
        Description: item.description,
        Amount: item.amount,
        DateIssued: item.dateIssued,
        DueDate: item.dueDate,
        Status: item.status,
      }))
    );

    onClose();
    setFormData({});
    setSelectedInvoice(null);
    setSelectedTenant(null);
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
    const nextId = invoiceItems.length + 1;
    setInvoiceItems((prev) => [...prev, { id: nextId }]);
    setFormData((prev) => ({
      ...prev,
      [`description-${nextId}`]: "",
      [`amount-${nextId}`]: "",
      [`issueDate-${nextId}`]: null,
      [`dueDate-${nextId}`]: null,
      [`paymentStatus-${nextId}`]: "",
    }));
  };

  const handleDeleteInvoiceItem = (invoiceItemId) => {
    setInvoiceItems((prevItems) => {
      if (prevItems.length === 1) {
        showSnackbar("You can't delete the first Invoice Item", "error");
        return prevItems;
      }
      return prevItems.filter((item) => item.id !== invoiceItemId);
    });
  };

  const onCancel = () => {
    setSelectedTenant(null);
    setFormData({
      tenant: "",
      description: "",
      amount: "",
      issueDate: "",
      dueDate: "",
      paymentStatus: "",
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
            <Box key={item.id}>
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
                      slotProps={{ textField: { variant: "outlined" } }}
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
                      slotProps={{ textField: { variant: "outlined" } }}
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
          <Button
            onClick={() => {
              onClose();
              onCancel();
            }}
            color="secondary"
          >
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

export default EditInvoiceForm;

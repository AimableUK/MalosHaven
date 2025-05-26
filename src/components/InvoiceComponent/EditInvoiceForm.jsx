import React, { useEffect, useMemo, useState } from "react";
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
import dayjs from "dayjs";

const EditInvoiceForm = ({
  open,
  onClose,
  onEditInvoice,
  propertiesState,
  selectedInvoice,
  setSelectedInvoice,
}) => {
  const [selectedTenant, setSelectedTenant] = useState(selectedInvoice);
  const [invoiceItems, setInvoiceItems] = useState([{ id: 1 }]);
  const [userDetails, setUserDetails] = useState({});

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

  const tenants = useMemo(
    () =>
      propertiesState.flatMap((property) =>
        property.units
          .filter((unit) => unit.tenant !== null)
          .map((unit) => ({
            ...unit.tenant,
            unitNumber: unit.UnitNumber,
            unitValue: unit.UnitValue,
            propertyName: property.title,
          }))
      ),
    [propertiesState]
  );

  useEffect(() => {
    if (selectedInvoice) {
      const items = selectedInvoice.invoiceItems.map((item, index) => ({
        id: index + 1,
      }));
      setInvoiceItems(items);

      const data = {
        tenant: selectedInvoice.tenantName,
      };

      const invoiceUserDetails = {
        tenantName: selectedInvoice.tenantName,
        avatar: selectedInvoice.avatar,
      };

      setUserDetails(invoiceUserDetails);

      selectedInvoice.invoiceItems.forEach((item, index) => {
        const id = index + 1;
        data[`description-${id}`] = item.description;
        data[`amount-${id}`] = item.amount;
        data[`issueDate-${id}`] = item.dateIssued;
        data[`dueDate-${id}`] = item.dueDate;
        data[`paymentStatus-${id}`] = item.status;
      });

      setFormData(data);

      const tenantInfo = tenants.find(
        (t) => t.name === selectedInvoice.tenantName
      );
      if (
        tenantInfo &&
        (!selectedTenant || selectedTenant.name !== tenantInfo.name)
      ) {
        setSelectedTenant(tenantInfo);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedInvoice, tenants]);

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
  };

  const handleSubmit = () => {
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
      id: selectedInvoice?.id || `INV-${Date.now()}`,
      invoiceNumber:
        selectedInvoice?.invoiceNumber || `${Date.now()}${invoices.length + 1}`,
      tenantName: formData.tenant,
      invoiceItems: compiledItems,
    };

    onEditInvoice(newInvoice);
    showSnackbar(`Updated ${userDetails.tenantName} Successfully`, "success");

    onClose();
    setFormData({});
    setSelectedInvoice(null);
    setSelectedTenant(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "" });
  };

  const handleEditInvoiceItem = () => {
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
        <DialogTitle sx={{ fontWeight: "bold" }}>Edit Invoice</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <Box className="flex flex-col md:flex-row items-center gap-2">
            <Box className="flex flex-row items-center gap-3">
              <Avatar
                src={userDetails.avatar}
                alt="Tenant"
                sx={{ width: "50px", height: "50px" }}
              />

              <Typography
                key={userDetails.tenantName}
                value={userDetails.tenantName}
                fontWeight="bold"
              >
                {userDetails.tenantName}
              </Typography>
            </Box>
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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Box className="flex flex-col md:flex-row gap-3">
                    <DatePicker
                      label="Issue Date"
                      value={
                        formData[`issueDate-${item.id}`]
                          ? dayjs(formData[`issueDate-${item.id}`])
                          : null
                      }
                      onChange={(newValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          [`issueDate-${item.id}`]: newValue,
                        }))
                      }
                      slotProps={{ textField: { variant: "outlined" } }}
                    />

                    <DatePicker
                      label="Due Date"
                      value={
                        formData[`dueDate-${item.id}`]
                          ? dayjs(formData[`dueDate-${item.id}`])
                          : null
                      }
                      onChange={(newValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          [`dueDate-${item.id}`]: newValue,
                        }))
                      }
                      slotProps={{ textField: { variant: "outlined" } }}
                    />
                  </Box>
                </LocalizationProvider>

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
            onClick={handleEditInvoiceItem}
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
            Update
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

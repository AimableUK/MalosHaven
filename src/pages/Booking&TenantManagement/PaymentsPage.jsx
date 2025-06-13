import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { DataGrid } from "@mui/x-data-grid";
import AddInvoiceForm from "../../components/InvoiceComponent/AddInvoiceForm.jsx";
import DataDeleteConfirm from "../../components/DeleteConfirmComponent/DataDeleteConfirm.jsx";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import EditInvoiceForm from "../../components/InvoiceComponent/EditInvoiceForm.jsx";
import userAvatar from "../../assets/userAvatar.jpg";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AppSnackbar from "../../components/utils/MySnackbar/AppSnackbar.jsx";
import useInvoiceStore from "../../Store/InvoicesStore/useInvoiceStore.js";
import usePropertiesStore from "../../Store/PropertiesStore/usePropertiesStore.js";

const PaymentsPage = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const properties = usePropertiesStore((state) => state.properties);

  const invoices = useInvoiceStore((state) => state.invoices);
  const addInvoice = useInvoiceStore((state) => state.addInvoice);
  const editInvoice = useInvoiceStore((state) => state.editInvoice);
  const deleteInvoice = useInvoiceStore((state) => state.deleteInvoice);

  const deleteAnInvoice =
    "Are you sure you want to Delete this Invoice? If you do so, it will be undone";

  const columns = [
    {
      field: "tenantName",
      headerName: "Tenant",
      minWidth: 210,
      flex: 1,
      renderCell: (params) => (
        <Box className="flex items-center gap-2">
          <img
            src={params.row.avatar || userAvatar}
            alt={params.value}
            className="w-8 h-8 rounded-full"
          />
          <Box>
            <Box className="font-medium text-white">{params.value}</Box>
          </Box>
        </Box>
      ),
    },
    {
      field: "phone",
      headerName: "Phone",
      minWidth: 200,
      flex: 1,
      renderCell: (params) => (
        <span className="text-white">{params.value}</span>
      ),
    },
    {
      field: "invoiceNumber",
      headerName: "Invoice NUmber",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        <span className="text-white">{params.value}</span>;
      },
    },
    {
      field: "actions",
      headerName: "More",
      minWidth: 80,
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <Box className="text-gray-400 cursor-pointer">
          <MoreVertIcon
            onClick={(event) => handleActionsClick(event, params.row)}
          />
        </Box>
      ),
    },
  ];

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

  const handleAddInvoice = (invoice) => {
    addInvoice(invoice);
    showSnackbar(
      `Invoice of ${invoice.tenantName} added Successfully`,
      "success"
    );
  };

  const handleActionsClick = (event, invoice) => {
    setSelectedInvoice(invoice);
    setAnchorEl(event.currentTarget);
  };

  const handleDeleteDialogOpen = (invoice) => {
    setDeleteDialogOpen(true);
    setSelectedInvoice(invoice);
    handleCloseMenu();
  };

  const handleDeleteInvoice = () => {
    deleteInvoice(selectedInvoice.id);
    setDeleteDialogOpen(false);
    showSnackbar(
      `${selectedInvoice.tenantName}'s Invoice deleted successfully`,
      "success"
    );
  };

  const handleEditDialogOpen = () => {
    setOpenEditModal(true);
    handleCloseMenu();
  };

  const handleEditInvoice = (updatedInvoice) => {
    editInvoice(updatedInvoice);
    showSnackbar(
      `Updated ${updatedInvoice.tenantName} Successfully`,
      "success"
    );
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Box m="20px" className="bg-[#24383E] rounded-md p-5">
        <Box className="flex flex-col md:flex-row items-center justify-between">
          <Typography sx={{ fontWeight: "bold" }}>
            <ReceiptIcon sx={{ fontSize: "30px", mr: 1 }} />
            Invoice List
          </Typography>
          <Button
            variant="contained"
            color="info"
            onClick={() => setOpenAddModal(true)}
            startIcon={<AddIcon />}
          >
            Add New Invoice
          </Button>
        </Box>
        <Box>
          <DataGrid
            rows={invoices}
            columns={columns}
            showToolbar
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
            sx={{
              height: "fit-content",
              mt: 1,
              backgroundColor: "inherit",
              color: "#FFFFFF",
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#203040",
                color: "#FFFFFF",
              },
              "& .MuiDataGrid-toolbarContainer": {
                backgroundColor: "#203040",
                color: "#FFFFFF",
              },
              "& .MuiSvgIcon-root": {
                color: "#FFFFFF",
              },
            }}
            pageSizeOptions={[10]}
            checkboxSelection
            disableRowSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 300 },
              },
            }}
          />

          <AddInvoiceForm
            open={openAddModal}
            onClose={() => setOpenAddModal(false)}
            onAddInvoice={handleAddInvoice}
            properties={properties}
            setSelectedInvoice={setSelectedInvoice}
          />

          <EditInvoiceForm
            open={openEditModal}
            onClose={() => setOpenEditModal(false)}
            onEditInvoice={handleEditInvoice}
            properties={properties}
            selectedInvoice={selectedInvoice}
            setSelectedInvoice={setSelectedInvoice}
          />

          {/* Delete Confirmation Modal */}
          <DataDeleteConfirm
            deleteDialogOpen={deleteDialogOpen}
            setDeleteDialogOpen={setDeleteDialogOpen}
            handleDeleteInvoice={handleDeleteInvoice}
            deleteAnInvoice={deleteAnInvoice}
            deleteType="invoice"
          />

          {/* Snackbar */}
          <AppSnackbar
            open={snackbar.open}
            message={snackbar.message}
            severity={snackbar.severity}
            onClose={handleCloseSnackbar}
          />

          {/* menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            {selectedInvoice && (
              <Link to={`/invoiceview/${selectedInvoice.id}`}>
                <MenuItem
                  onClick={handleCloseMenu}
                  className="group hover:text-[#0288d1]"
                >
                  <VisibilityIcon className="group-hover:text-[#0288d1]" />
                  View
                </MenuItem>
              </Link>
            )}

            <MenuItem
              onClick={() => handleEditDialogOpen(selectedInvoice)}
              onClose={handleCloseMenu}
              className="group hover:text-[#10b981]"
            >
              <EditIcon className="group-hover:text-[#10b981]" />
              Edit
            </MenuItem>
            <MenuItem
              onClose={handleCloseMenu}
              onClick={() => handleDeleteDialogOpen(selectedInvoice)}
              className="group hover:text-[#F44545]"
            >
              <DeleteIcon className="group-hover:text-[#F44545]" />
              Delete
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </>
  );
};

export default PaymentsPage;

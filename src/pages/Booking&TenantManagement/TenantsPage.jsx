import {
  Avatar,
  Box,
  Button,
  IconButton,
  Typography,
  Skeleton,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
  useMediaQuery,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PlaceIcon from "@mui/icons-material/Place";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PaidIcon from "@mui/icons-material/Paid";
import TenantForm from "../../components/TenantFormComponent/TenantForm";
import TenantUpdateForm from "../../components/TenantFormComponent/TenantUpdateForm";
import MyProperties from "../../Data/SiteDataComponent/Properties";
import DeleteIcon from "@mui/icons-material/Delete";
import DataDeleteConfirm from "../../components/DeleteConfirmComponent/DataDeleteConfirm";
import userAvatar from "../../assets/userAvatar.jpg";
import MobileTenantDisplay from "./MobileTenantDisplay";

const TenantsPage = () => {
  const [properties, setProperties] = useState(MyProperties);
  const [tenants, setTenants] = useState([]);

  const [showClearIcon, setShowClearIcon] = useState("none");
  const [searchTerm, setSearchTerm] = useState("");

  const [tenantDetails, setTenantDetails] = useState();
  const [addTenantOpenModal, setAddTenantOpenModal] = useState(false);
  const [updateTenantOpenModal, setUpdateTenantOpenModal] = useState(false);
  const [mobileTenantDisplayOpenModal, setMobileTenantDisplayOpenModal] =
    useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [deleteType, setDeleteType] = useState("tenant");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const deleteTenant =
    "Are you sure you want to Delete this Tenant? If you do so, it will be undone";

  const isTablet = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    const allTenants = properties.flatMap((property) =>
      property.units.map((unit) => unit.tenant).filter((tenant) => tenant)
    );
    setTenants(allTenants);
  }, [properties]);

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

  const handleUpdateClick = (tenant) => {
    setSelectedTenant(tenant);
    setUpdateTenantOpenModal(true);
  };

  const handleActionsClick = (event, tenant) => {
    setAnchorEl(event.currentTarget);
    setSelectedTenant(tenant);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDeleteTenant = () => {
    setTenants((prevTenants) =>
      prevTenants.filter(
        (tenant) => tenant.tenant_id !== selectedTenant.tenant_id
      )
    );
    setDeleteDialogOpen(false);
    setMobileTenantDisplayOpenModal(false);
    showSnackbar(`${selectedTenant.name} deleted Successfully`, "success");
  };

  const displayTenant = (tenant) => {
    setSelectedTenant(tenant);
    setMobileTenantDisplayOpenModal(true);
  };

  useEffect(() => {
    if (selectedTenant) {
      const updatedDetails = tenants.find(
        (t) => t.tenant_id === selectedTenant.tenant_id
      );
      setTenantDetails(updatedDetails);
    } else {
      setTenantDetails(undefined);
    }
  }, [selectedTenant, tenants]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    setShowClearIcon(event.target.value === "" ? "none" : "flex");
  };

  const handleAddTenant = (newTenant) => {
    const tenantId = `TNT-${Date.now()}`;

    setTenants((prevTenants) => [
      ...prevTenants,
      { ...newTenant, tenant_id: tenantId },
    ]);

    setProperties((prevProperties) =>
      prevProperties.map((property) => {
        if (property.title === newTenant.property) {
          return {
            ...property,
            units: property.units.map((unit) => {
              if (unit.UnitNumber === newTenant.unit) {
                return {
                  ...unit,
                  tenant: { ...newTenant, tenant_id: tenantId },
                };
              }
              return unit;
            }),
          };
        }
        return property;
      })
    );
  };

  const handleUpdateTenant = (updatedTenant) => {
    // Update properties
    setProperties((prev) =>
      prev.map((property) => {
        if (property.title !== updatedTenant.property) return property;

        return {
          ...property,
          units: property.units.map((unit) => {
            if (unit.UnitNumber === updatedTenant.unit) {
              return { ...unit, tenant: updatedTenant };
            }
            return unit;
          }),
        };
      })
    );

    // Update tenants
    setTenants((prev) =>
      prev.map((tenant) =>
        tenant.tenant_id === updatedTenant.tenant_id ? updatedTenant : tenant
      )
    );
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box m="20px" display="flex" flexDirection="column">
      <Box className="flex flex-col lg:grid grid-cols-12 gap-4">
        <Box className="bg-[#2D454D] col-span-8 rounded-l-lg p-5">
          {/* tenants header */}
          <Box className="flex flex-col md:flex-row justify-between">
            <Typography fontWeight="bold">Tenants List</Typography>
            <SearchBar
              value={searchTerm}
              onChange={handleChange}
              showClearIcon={showClearIcon}
            />
          </Box>

          {/* divider */}
          <Box
            sx={{
              height: "1px",
              width: "100%",
              background:
                "linear-gradient(to right, #2d454d, #ABADAE, #2d454d)",
              my: 1,
              borderRadius: "999px",
            }}
          />

          {/* Tenants */}
          <Box className="flex flex-wrap">
            {tenants
              .filter(
                (tenant) =>
                  tenant.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  tenant.phone.includes(searchTerm) ||
                  tenant.paymentStatus
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  tenant.property
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
              )
              .map((tenant) => (
                <Box
                  key={tenant.tenant_id}
                  className="flex flex-col md:flex-row gap-3 rounded-b border-t-2 border-t-slate-300 p-3 m-1 shadow-sm shadow-slate-900 w-[calc(30%-1rem)] min-w-[230px] max-w-[300px] cursor-pointer transition duration-50 ease-in-out active:scale-95"
                  onClick={() => displayTenant(tenant)}
                >
                  <Avatar src={tenant.image || userAvatar} />
                  <Box className="flex flex-col">
                    <Typography fontWeight="bold">{tenant.name}</Typography>
                    <Typography sx={{ fontSize: "14px", color: "#D0D0D0" }}>
                      {tenant.phone}
                    </Typography>
                  </Box>
                </Box>
              ))}
          </Box>
        </Box>
        {!isTablet && (
          <Box className="col-span-4 flex flex-col bg-[#2D454D] p-3 rounded-r-lg">
            <Button
              onClick={() => setAddTenantOpenModal(true)}
              variant="contained"
              color="info"
              startIcon={<AddIcon />}
            >
              Add Tenant
            </Button>

            {/* action buttons */}
            {tenantDetails ? (
              <Box key={tenantDetails.tenant_id}>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  sx={{ mt: 3 }}
                >
                  <IconButton onClick={() => handleUpdateClick(tenantDetails)}>
                    <EditIcon sx={{ color: "white" }} />
                  </IconButton>
                  <IconButton
                    onClick={(event) =>
                      handleActionsClick(event, tenantDetails)
                    }
                  >
                    <MoreHorizIcon sx={{ color: "white" }} />
                  </IconButton>
                </Box>

                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Avatar
                    src={tenantDetails.image}
                    sx={{ width: "100px", height: "100px" }}
                  />
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "20px",
                      m: 1,
                    }}
                  >
                    {tenantDetails.name}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    height: "1px",
                    width: "100%",
                    background:
                      "linear-gradient(to right, #2d454d, #ABADAE, #2d454d)",
                    my: 1,
                    borderRadius: "999px",
                  }}
                />
                <Box
                  display="flex"
                  flexDirection="column"
                  color="#D4D4D4"
                  gap="15px"
                >
                  <Typography>
                    <PersonIcon />
                    &nbsp;&nbsp;{tenantDetails.gender}
                  </Typography>
                  <Typography>
                    <PhoneIcon />
                    &nbsp;&nbsp;{tenantDetails.phone}
                  </Typography>
                  <Typography>
                    <EmailIcon />
                    &nbsp;&nbsp;{tenantDetails.email}
                  </Typography>
                  <Typography>
                    <CreditCardIcon />
                    &nbsp;&nbsp;{tenantDetails.national_id}
                  </Typography>
                  <Typography>
                    <ApartmentIcon />
                    &nbsp;&nbsp;{tenantDetails.property}
                  </Typography>
                  <Typography>
                    <PlaceIcon />
                    &nbsp;&nbsp;{tenantDetails.unit}
                  </Typography>
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography>
                      <PaidIcon />
                      &nbsp;&nbsp;STATUS
                    </Typography>
                    <Typography
                      sx={{
                        border: "1px solid",
                        px: 2,
                        py: "4px",
                        borderRadius: "8px",
                        backgroundColor: (() => {
                          switch (tenantDetails.paymentStatus) {
                            case "Paid":
                              return "#089846";
                            case "Not Yet":
                              return "#8D071E";
                            case "Partially":
                              return "#9D861C";
                            default:
                              return "grey";
                          }
                        })(),
                        color: "white",
                      }}
                    >
                      {tenantDetails.paymentStatus}
                    </Typography>
                  </Box>
                  {/* </Box> */}
                  <Button variant="contained" color="success">
                    Full Payment Status
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box>
                {/* Skeleton UI for loading state */}
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  sx={{ mt: 3 }}
                >
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="circular" width={40} height={40} />
                </Box>

                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  mt={2}
                >
                  <Skeleton variant="circular" width={100} height={100} />
                  <Skeleton width="60%" height={30} sx={{ mt: 2 }} />
                </Box>

                <Box
                  sx={{
                    height: "1px",
                    width: "100%",
                    background:
                      "linear-gradient(to right, #2d454d, #ABADAE, #2d454d)",
                    my: 2,
                    borderRadius: "999px",
                  }}
                />

                <Box display="flex" flexDirection="column" gap="15px">
                  <Skeleton height={24} width="80%" />
                  <Skeleton height={24} width="80%" />
                  <Skeleton height={24} width="80%" />
                  <Skeleton height={24} width="80%" />
                  <Skeleton height={24} width="80%" />
                  <Skeleton height={24} width="80%" />

                  <Box display="flex" justifyContent="space-between">
                    <Skeleton height={24} width="30%" />
                    <Skeleton height={30} width="60px" />
                  </Box>

                  <Skeleton
                    height={36}
                    width="100%"
                    sx={{ borderRadius: "6px" }}
                  />
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Box>

      <TenantForm
        open={addTenantOpenModal}
        onClose={() => setAddTenantOpenModal(false)}
        onAddTenant={handleAddTenant}
        properties={properties}
      />

      <TenantUpdateForm
        open={updateTenantOpenModal}
        onClose={() => setUpdateTenantOpenModal(false)}
        onUpdateTenant={handleUpdateTenant}
        properties={properties}
        selectedTenant={selectedTenant}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem
          onClose={handleCloseMenu}
          onClick={() => {
            setDeleteDialogOpen(true);
            setAnchorEl(null);
          }}
          className="group hover:text-[#F44545]"
        >
          <DeleteIcon className="group-hover:text-[#F44545]" />
          Delete
        </MenuItem>
      </Menu>

      {isTablet && (
        <MobileTenantDisplay
          mobileTenantDisplayOpenModal={mobileTenantDisplayOpenModal}
          tenantDetails={tenantDetails}
          handleUpdateClick={handleUpdateClick}
          handleActionsClick={handleActionsClick}
          setSelectedTenant={setSelectedTenant}
          selectedTenant={selectedTenant}
          tenants={tenants}
          setTenantDetails={setTenantDetails}
          onClose={() => {
            setMobileTenantDisplayOpenModal(false);
            setTenantDetails(null);
          }}
        />
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <DataDeleteConfirm
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        selectedTenant={selectedTenant}
        setSelectedTenant={setSelectedTenant}
        handleDeleteTenant={handleDeleteTenant}
        deleteTenant={deleteTenant}
        deleteType="tenant"
      />
    </Box>
  );
};

export default TenantsPage;

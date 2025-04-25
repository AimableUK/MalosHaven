import {
  Avatar,
  Box,
  Button,
  IconButton,
  Typography,
  Skeleton,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
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
import TenantForm from "../../components/TenantForm";
import MyProperties from "../../components/Properties";
import DeleteIcon from "@mui/icons-material/Delete";

const TenantsPage = () => {
  const [properties, setProperties] = useState(MyProperties);
  const [tenants, setTenants] = useState([]);
  const [showClearIcon, setShowClearIcon] = useState("none");
  const [searchTerm, setSearchTerm] = useState("");
  const [tenantDetails, setTenantDetails] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleActionsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const allTenants = properties.flatMap((property) =>
      property.units.map((unit) => unit.tenant).filter((tenant) => tenant)
    );
    setTenants(allTenants);
  }, [properties]);

  const displayTenant = (tenantID) => {
    const selectedTenant = tenants.find((t) => t.tenant_id === tenantID);
    setTenantDetails(selectedTenant);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    setShowClearIcon(event.target.value === "" ? "none" : "flex");
  };

  const handleAddTenant = (newTenant) => {
    setTenants((prev) => [...prev, newTenant]);

    setProperties((prevProperties) =>
      prevProperties.map((property) => {
        if (property.name === newTenant.property) {
          return {
            ...property,
            units: property.units.map((unit) => {
              if (unit.unit_name === newTenant.unit) {
                return {
                  ...unit,
                  tenant: {
                    ...newTenant,
                    tenant_id: Date.now(),
                  },
                };
              }
              return unit;
            }),
          };
        }
        return property;
      })
    );

    setOpenModal(false);
  };


  return (
    <Box m="20px" display="flex" flexDirection="column">
      <Box className="flex flex-col md:grid grid-cols-12 gap-4">
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
                  className="flex flex-col md:flex-row gap-3 border rounded p-3 m-1 shadow-sm w-[calc(30%-1rem)] min-w-[230px] max-w-[300px] cursor-pointer hover:shadow-lg hover:shadow-[#182427] transition duration-50 ease-in-out active:scale-95"
                  onClick={() => displayTenant(tenant.tenant_id)}
                >
                  <Avatar src={tenant.image} />
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
        <Box className="col-span-4 flex flex-col bg-[#2D454D] p-3 rounded-r-lg">
          <Button
            onClick={() => setOpenModal(true)}
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
                <IconButton onClick={() => setOpenModal(true)}>
                  <EditIcon sx={{ color: "white" }} />
                </IconButton>
                <IconButton onClick={handleActionsClick}>
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
                    whiteSpace: "nowrap",
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
                    className={(() => {
                      switch (tenantDetails.paymentStatus) {
                        case "Paid":
                          return "border px-3 py-1 rounded-md bg-green-500";
                        case "Not Yet":
                          return "border px-3 py-1 rounded-md bg-red-500";
                        case "Partially":
                          return "border px-3 py-1 rounded-md bg-yellow-700";
                        default:
                          return "";
                      }
                    })()}
                    color="white"
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
      </Box>
      <TenantForm
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAddTenant={handleAddTenant}
        properties={properties}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleCloseMenu}>
          <DeleteIcon />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default TenantsPage;

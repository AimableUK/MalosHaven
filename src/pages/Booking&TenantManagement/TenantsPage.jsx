import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import SearchBar from "../../components/SearchBar";
import userAvatar from "../../assets/userAvatar.jpg";
import tenants from "../../components/TenantsList";

const TenantsPage = () => {
  const [showClearIcon, setShowClearIcon] = useState("none");
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    setShowClearIcon(event.target.value === "" ? "none" : "flex");
  };

  return (
    <Box m="20px" display="flex" flexDirection="column">
      <Box className="flex flex-col md:grid grid-cols-12">
        <Box className="bg-[#2D454D] col-span-8 rounded-md p-5">
          {/* tenants header */}
          <Box className="flex flex-col md:flex-row justify-between">
            <Typography fontWeight="bold">Tenants List</Typography>
            <SearchBar
              value={searchTerm}
              onChange={handleChange}
              showClearIcon={showClearIcon}
            />
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
          {/* Tenants */}
          <Box className="flex flex-wrap">
            {tenants.map((tenant) => (
              <Box key={tenant.tenant_id} className="flex flex-col md:flex-row gap-3 border rounded p-3 m-1 shadow-sm w-[calc(30%-1rem)] min-w-[230px] max-w-[300px]">
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
        <Box className="col-span-4">
          <Button>Add User</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TenantsPage;

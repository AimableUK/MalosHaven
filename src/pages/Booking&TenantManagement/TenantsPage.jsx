import { Box, Button, Typography } from "@mui/material";
import React from "react";

const TenantsPage = () => {
  return (
    <Box m="20px">
      <Box className="grid-cols-12 flex flex-row w-full">
        <Box className="bg-[#2D454D] col-span-8">
          <Typography fontWeight="bold">Tenants List</Typography>
          <Box></Box>
        </Box>
        <Box className="col-span-4">
          <Button>Add User</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TenantsPage;

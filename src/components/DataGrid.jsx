import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { columns, rows } from "./DataGridData";

const BasicDataGrid = () => {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid 
        rows={rows} 
        columns={columns} 
        pageSize={5}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default BasicDataGrid;

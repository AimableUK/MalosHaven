import { Box, TextField, InputAdornment, IconButton } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const SearchBar = ({ value, onChange, showClearIcon }) => {
  const handleClick = () => {
    onChange({ target: { value: "" } });
  };

  return (
    <Box>
      <TextField
        variant="outlined"
        placeholder="Search..."
        value={value}
        onChange={onChange}
        size="small"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{color: "white"}}/>
              </InputAdornment>
            ),
            endAdornment: showClearIcon === "flex" && (
              <InputAdornment position="end">
                <IconButton onClick={handleClick} edge="end" size="small">
                  <ClearIcon sx={{color: "white"}}/>
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;

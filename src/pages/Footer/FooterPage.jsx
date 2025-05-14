import React from "react";
import { Box, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const FooterPage = () => {
  return (
    <Box>
      <Typography
        variant="body2"
        align="center"
        m="10px"
        sx={{ color: "#aaa" }}
      >
        &copy; 2025, made with
        <FavoriteIcon sx={{ color: "red", fontSize: "large" }} /> by&nbsp;
        <a href="#">
          <strong>Malos Technologies</strong>
        </a>
      </Typography>
    </Box>
  );
};

export default FooterPage;

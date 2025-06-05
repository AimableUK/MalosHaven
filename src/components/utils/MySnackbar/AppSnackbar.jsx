import { Alert, Box, Snackbar } from "@mui/material";

const AppSnackbar = ({ open, message, severity, onClose }) => {
  return (
    <Box>
      <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
        <Alert
          onClose={onClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AppSnackbar;

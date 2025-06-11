import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@mui/material";
import AppSnackbar from "../utils/MySnackbar/AppSnackbar";

const EditRoomFormModal = ({ open, onClose, onEditRoom, selectedRoom }) => {
  const [formData, setFormData] = useState({
    lodgename: "",
    price: "",
    type: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (selectedRoom) {
      setFormData({
        lodgename: selectedRoom.name || "",
        price: selectedRoom.price || "",
        type: selectedRoom.type || "",
      });
    }
  }, [selectedRoom]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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

  const handleSubmit = () => {
    const { lodgename, price, type } = formData;
    if (!lodgename.trim() || !price.toString().trim() || !type.trim()) {
      showSnackbar("Please fill out all fields", "error");
      return;
    }

    onEditRoom({
      id: selectedRoom?.id,
      name: lodgename,
      type,
      price: Number(price),
      isAvailable: selectedRoom?.isAvailable,
      client: selectedRoom?.client,
    });

    onClose();
    showSnackbar(`${lodgename} Updated Successfully`, "success");
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle sx={{ fontWeight: "bold" }}>Edit Room</DialogTitle>
        <DialogContent sx={{ gap: 2, mt: "10px" }}>
          <TextField
            label="Lodge Name"
            name="lodgename"
            fullWidth
            value={formData.lodgename}
            onChange={handleChange}
            sx={{ mb: 1 }}
          />
          <TextField
            label="Room Price"
            name="price"
            fullWidth
            type="number"
            value={formData.price}
            onChange={handleChange}
          />
          <FormControl>
            <FormLabel>Lodge Type</FormLabel>
            <RadioGroup
              row
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <FormControlLabel
                value="Single"
                control={<Radio />}
                label="Single"
              />
              <FormControlLabel
                value="Double"
                control={<Radio />}
                label="Double"
              />
              <FormControlLabel
                value="Suite"
                control={<Radio />}
                label="Suite"
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </>
  );
};

export default EditRoomFormModal;

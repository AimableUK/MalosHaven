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

const EditRoomFormModal = ({ open, onClose, onEditUnit, selectedUnit }) => {
  const [formData, setFormData] = useState({ unit: "", value: "" });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (selectedUnit) {
      setFormData({
        unit: selectedUnit.UnitNumber || "",
        value: selectedUnit.UnitValue || "",
      });
    }
  }, [selectedUnit]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    const { unit, value } = formData;
    if (!unit.trim() || !value.toString().trim()) {
      setSnackbar({
        open: true,
        message: "Please fill out all fields",
        severity: "error",
      });
      return;
    }

    onEditUnit({
      ...selectedUnit,
      UnitNumber: unit,
      UnitValue: Number(value),
    });

    onClose();
    setSnackbar({
      open: true,
      message: `${unit} Updated Successfully`,
      severity: "success",
    });
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

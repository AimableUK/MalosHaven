import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

const roles = ["Admin", "Editor", "User"];

const DataUserFormModal = ({ open, onClose, onAddUser }) => {
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    onAddUser({ ...formData, id: Date.now() });
    onClose();
    setFormData({ name: '', email: '', role: ''})
  };

  return (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1}}>
            <TextField label="Name" name="name" fullWidth value={formData.name} onChange={handleChange} />
            
        </DialogContent>
    </Dialog>
)
};

export default DataUserFormModal;

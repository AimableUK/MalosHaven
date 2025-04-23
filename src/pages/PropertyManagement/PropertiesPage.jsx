import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DataPropertyFormModal from "../../components/DataPropertyForm";
import MyProperties from "../../components/Properties";

const PropertiesPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [properties, setProperties] = useState(MyProperties);

  const handleAddProp = (newProp) => {
    setProperties((prev) => [...prev, newProp]);
    setOpenModal(false);
  };

  return (
    <Box m="10px" className="font-roboto" padding="10px">
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        my="5px"
      >
        <Typography fontWeight="bold">PROPERTIES</Typography>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          color="info"
          onClick={() => setOpenModal(true)}
        >
          ADD PROPERTY
        </Button>
      </Box>

      <DataPropertyFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAddProperty={handleAddProp}
      />

      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="10px">
        {properties.map((property) => (
          <Box
            key={property.id}
            sx={{
              gridColumn: "span 4",
              display: "flex",
              flexDirection: "column",
              background: "#2D454D",
              borderRadius: "8px",
              justifyContent: "space-between",
              p: 2,
              mb: 1,
            }}
            className="group shadow-md shadow-slate-600"
          >
            <Box>
              <img
                src={property.image}
                alt="house"
                className="shadow-md shadow-slate-500 rounded-md transition-transform duration-300 ease-in-out group-hover:-translate-y-12 cursor-pointer z-10 relative"
              />

              <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                gap="10px"
                zIndex="0"
                mt="-40px"
              >
                <Link to={`/propertydetails/${property.id}`} key={property.id}>
                  <Button
                    variant="contained"
                    startIcon={<VisibilityIcon />}
                    color="info"
                  >
                    View
                  </Button>
                </Link>

                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  color="success"
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  color="error"
                >
                  Delete
                </Button>
              </Box>
            </Box>
            <Box>
              <Link to={`/propertydetails/${property.id}`} key={property.id}>
                <Typography fontWeight="bold" textAlign="center" m="15px">
                  {property.title}
                </Typography>
              </Link>
              <Typography variant="body1" component="p">
                {property.description}
              </Typography>
            </Box>
            <Box
              sx={{
                height: "2px",
                width: "100%",
                background:
                  "linear-gradient(to right, #2d454d, white, #2d454d)",
                my: 3,
                borderRadius: "999px",
              }}
            />
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Typography fontWeight="bold">{property.units.length} Units</Typography>
              <Typography textAlign="center">
                <PlaceIcon />
                {property.location}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PropertiesPage;

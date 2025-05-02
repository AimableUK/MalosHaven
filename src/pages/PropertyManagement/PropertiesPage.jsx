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
import FooterPage from "../Footer/FooterPage";
import { useMediaQuery } from "@mui/material";

const PropertiesPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [properties, setProperties] = useState(MyProperties);

  const handleAddProp = (newProp) => {
    setProperties((prev) => [...prev, newProp]);
    setOpenModal(false);
  };
  const isSmallScreen = useMediaQuery("(max-width:768px)")
  const isTablet = useMediaQuery("(max-width:1024px)");

  return (
    <Box className={`${isSmallScreen ? "" : "m-[10px]"}`} padding="10px">
      <Box
        className="flex flex-col md:flex-row justify-between items-center my-1"
      >
        <Typography fontWeight="bold">PROPERTIES</Typography>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          color="info"
          onClick={() => setOpenModal(true)}
          sx={{whiteSpace: "nowrap"}}
        >
          ADD PROPERTY
        </Button>
      </Box>

      <DataPropertyFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAddProperty={handleAddProp}
      />

      <Box className="flex flex-col md:grid grid-cols-12 gap-[10px] p-[10px] font-roboto">
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
                zIndex="0"
                mt="-40px"
              >
                <Link to={`/propertydetails/${property.id}`} key={property.id}>
                  <Button
                  variant={isTablet ? "text" : "contained"}
                  color="info"
                  startIcon={<VisibilityIcon />}
                  >{!isTablet && "Edit" }
                  </Button>
                </Link>

                <Button
                  variant={isTablet ? "text" : "contained"}
                  startIcon={<EditIcon />}
                  color="success"
                >{!isTablet && "Edit" }
                </Button>
                <Button
                  variant={isTablet ? "text" : "contained"}
                  startIcon={<DeleteIcon />}
                  color= "error"
                >
                  {!isTablet && "Delete" }
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
              <Typography fontWeight="bold">
                {property.units.filter((unit) => unit.tenant == null).length}
                &nbsp;Units
              </Typography>
              <Typography textAlign="center">
                <PlaceIcon />
                {property.location}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
      <FooterPage />
    </Box>
  );
};

export default PropertiesPage;

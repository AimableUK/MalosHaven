import React from 'react'
import { Box, Button, Typography } from "@mui/material";
import houseImg from "../../assets/house.jpg";
import houseImg1 from "../../assets/house1.jpg";
import houseImg2 from "../../assets/house2.jpg";
import PlaceIcon from "@mui/icons-material/Place";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';

const PropertiesPage = () => {



  return (
    <Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap="10px"
        m="10px"
        className="font-roboto"
        padding="10px"
      >
        <Box
          sx={{
            gridColumn: "span 4",
            display: "flex",
            flexDirection: "column",
            background: "#2D454D",
            borderRadius: "8px",
            justifyContent: "space-between",
            p: 2,
            mb: 1
          }}
          className="group shadow-md shadow-slate-600"
        >
          <Box>
            <img
              src={houseImg}
              alt="house-image"
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
              <Link to="/propertydetails">
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
            <Typography fontWeight="bold" textAlign="center" m="15px">
              Cozy 5 Stars Apartment
            </Typography>
            <Typography variant="body1" component="p">
              The place is close to Barceloneta Beach and bus stop just 2 min by
              walk and near to "Naviglio" where you can enjoy the main night
              life in Barcelona.
            </Typography>
          </Box>
          <Box
            sx={{
              height: "2px",
              width: "100%",
              background: "linear-gradient(to right, #2d454d, white, #2d454d)",
              my: 3,
              borderRadius: "999px",
            }}
          />{" "}
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography fontWeight="bold">29 Units</Typography>
            <Typography textAlign="center">
              <PlaceIcon />
              Barcelona, Spain
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            gridColumn: "span 4",
            display: "flex",
            flexDirection: "column",
            background: "#2D454D",
            borderRadius: "8px",
            justifyContent: "space-between",
            p: 2,
            mb: 1
          }}
          className="group shadow-md shadow-slate-600"
        >
          <Box>
            <img
              src={houseImg1}
              alt="house-image"
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
              <Button
                variant="contained"
                startIcon={<VisibilityIcon />}
                color="info"
              >
                View
              </Button>
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
            <Typography fontWeight="bold" textAlign="center" m="15px">
              Office Studio
            </Typography>
            <Typography variant="body1" component="p">
              The place is close to Metro Station and bus stop just 2 min by
              walk and near to "Naviglio" where you can enjoy the night life in
              London, UK.
            </Typography>
          </Box>
          <Box
            sx={{
              height: "2px",
              width: "100%",
              background: "linear-gradient(to right, #2d454d, white, #2d454d)",
              my: 3,
              borderRadius: "999px",
            }}
          />{" "}
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography fontWeight="bold">12 Units</Typography>
            <Typography textAlign="center">
              <PlaceIcon />
              London, UK
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            gridColumn: "span 4",
            display: "flex",
            flexDirection: "column",
            background: "#2D454D",
            borderRadius: "8px",
            justifyContent: "space-between",
            p: 2,
            mb: 1
          }}
          className="group shadow-md shadow-slate-600"
        >
          <Box>
            <img
              src={houseImg2}
              alt="house-image"
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
              <Button
                variant="contained"
                startIcon={<VisibilityIcon />}
                color="info"
              >
                View
              </Button>
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
            <Typography fontWeight="bold" textAlign="center" m="15px">
              Beautiful Castle
            </Typography>
            <Typography variant="body1" component="p">
              The place is close to Metro Station and bus stop just 2 min by
              walk and near to "Naviglio" where you can enjoy the main night
              life in Milan.
            </Typography>
          </Box>
          <Box
            sx={{
              height: "2px",
              width: "100%",
              background: "linear-gradient(to right, #2d454d, white, #2d454d)",
              my: 3,
              borderRadius: "999px",
            }}
          />{" "}
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography fontWeight="bold">32 Units</Typography>
            <Typography textAlign="center">
              <PlaceIcon />
              Milan, Italy
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            gridColumn: "span 4",
            display: "flex",
            flexDirection: "column",
            background: "#2D454D",
            borderRadius: "8px",
            justifyContent: "space-between",
            p: 2,
            mb: 1
          }}
          className="group shadow-md shadow-slate-600"
        >
          <Box>
            <img
              src={houseImg}
              alt="house-image"
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
              <Button
                variant="contained"
                startIcon={<VisibilityIcon />}
                color="info"
              >
                View
              </Button>
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
            <Typography fontWeight="bold" textAlign="center" m="15px">
              Cozy 5 Stars Apartment
            </Typography>
            <Typography variant="body1" component="p">
              The place is close to Barceloneta Beach and bus stop just 2 min by
              walk and near to "Naviglio" where you can enjoy the main night
              life in Barcelona.
            </Typography>
          </Box>
          <Box
            sx={{
              height: "2px",
              width: "100%",
              background: "linear-gradient(to right, #2d454d, white, #2d454d)",
              my: 3,
              borderRadius: "999px",
            }}
          />{" "}
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography fontWeight="bold">23 Units</Typography>
            <Typography textAlign="center">
              <PlaceIcon />
              Barcelona, Spain
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            gridColumn: "span 4",
            display: "flex",
            flexDirection: "column",
            background: "#2D454D",
            borderRadius: "8px",
            justifyContent: "space-between",
            p: 2,
            mb: 1
          }}
          className="group shadow-md shadow-slate-600"
        >
          <Box>
            <img
              src={houseImg2}
              alt="house-image"
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
              <Button
                variant="contained"
                startIcon={<VisibilityIcon />}
                color="info"
              >
                View
              </Button>
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
            <Typography fontWeight="bold" textAlign="center" m="15px">
              Beautiful Castle
            </Typography>
            <Typography variant="body1" component="p">
              The place is close to Metro Station and bus stop just 2 min by
              walk and near to "Naviglio" where you can enjoy the main night
              life in Milan.
            </Typography>
          </Box>
          <Box
            sx={{
              height: "2px",
              width: "100%",
              background: "linear-gradient(to right, #2d454d, white, #2d454d)",
              my: 3,
              borderRadius: "999px",
            }}
          />{" "}
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography fontWeight="bold">72 Units</Typography>
            <Typography textAlign="center">
              <PlaceIcon />
              Milan, Italy
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default PropertiesPage

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import FooterPage from "../Footer/FooterPage";
import lodges from "../../Data/SiteDataComponent/Lodges";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const BookingsPage = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [lodgesList, setLoadgesList] = useState(lodges);

  const onCardHover = (lodgeId) => {
    setHoveredId(lodgeId);
  };

  const onCardLeave = () => {
    setHoveredId(null);
  };

  return (
    <Box>
      <Box m="20px">
        <Box className="flex flex-col md:flex-row justify-between items-center my-3">
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: { md: "25px", lg: "28px" },
            }}
          >
            BOOKINGS AND RESERVATION
          </Typography>
          <Button startIcon={<AddIcon />} variant="contained" color="info">
            Add Lodge
          </Button>
        </Box>
        {/* lodges */}
        <Box className="flex flex-col md:grid grid-cols-12 gap-2">
          {lodgesList.length > 0 ? (
            lodgesList.map((lodge) => (
              <Card
                key={lodge.name}
                className="relative bg-[#2D454D] col-span-3 p-3 cursor-pointer transition-transform duration-500 ease-in-out group"
                onMouseEnter={() => onCardHover(lodge.id)}
                onMouseLeave={onCardLeave}
              >
                <CardMedia
                  component="img"
                  alt="lodge one"
                  image={lodge.image}
                  className="transition-all duration-500"
                  style={{
                    borderRadius:
                      hoveredId === lodge.id
                        ? "83% 17% 97% 3% / 12% 88% 12% 88%"
                        : "10% 64% 7% 7% / 10% 47% 9% 8%",
                  }}
                />
                <Box className="flex flex-col justify-between gap-4">
                  <Box className="flex flex-col">
                    <Typography fontWeight="bold">{lodge.name}</Typography>
                    <Typography color="#D4D4D4">
                      <span className="font-bold">Rooms:</span>&nbsp;
                      {lodge.rooms.length}
                    </Typography>
                    <Typography color="#D4D4D4">
                      <span className="font-bold">Available:</span>&nbsp;
                      {lodge.rooms.filter((room) => room.client == null).length}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  className={`
                    absolute bottom-0 left-0 w-full px-3 py-2 bg-[#2D454D] flex items-center justify-between gap-2 transition-all duration-300 border-t-2 border-t-slate-300
                    ${hoveredId === lodge.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
                  `}
                >
                  <Button
                    startIcon={<VisibilityIcon />}
                    variant="contained"
                    color="info"
                    className="flex-1"
                  >
                    View
                  </Button>
                  <IconButton>
                    <EditIcon sx={{ color: "#10b981" }} />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon sx={{ color: "#F44545" }} />
                  </IconButton>
                </Box>
              </Card>
            ))
          ) : (
            <Box>
              <Typography>No Lodges Available</Typography>
            </Box>
          )}
        </Box>
      </Box>
      <FooterPage />
    </Box>
  );
};

export default BookingsPage;

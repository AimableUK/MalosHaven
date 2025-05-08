import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { useState } from "react";
import FooterPage from "../Footer/FooterPage";
import flat1 from "../../assets/flat1.png";
import lodges from "../../components/Lodges";

const BookingsPage = () => {
  const [hovered, setHovered] = useState(false);
  const [lodgesList, setLoadgesList] = useState(lodges);

  // const onCardHover = (event,x) => {
  //   // setHovered((prev) => {

  //   // })
  //   console.log("hi",event, x)
  // }

  return (
    <Box>
      <Box m="20px">
        <Box>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: { md: "25px", lg: "28px" },
              textAlign: "center",
            }}
          >
            BOOKINGS AND RESERVATION
          </Typography>
        </Box>
        {/* lodges */}
        <Box className="flex flex-col md:grid grid-cols-12 gap-2">
          {lodgesList.length > 0 ? (
            lodgesList.map((lodge) => (
              <Card
                key={lodge.name}
                className="bg-[#2D454D] col-span-3 p-4 cursor-pointer"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <CardMedia
                  component="img"
                  alt="lodge one"
                  image={lodge.image}
                  className="transition-all duration-500"
                  style={{
                    borderRadius: hovered
                      ? "83% 17% 97% 3% / 12% 88% 12% 88%"
                      : "10% 64% 7% 7% / 10% 47% 9% 8%",
                  }}
                />
                <CardContent>
                  <Typography fontWeight="bold">{lodge.name}</Typography>
                  <Typography color="#D4D4D4">
                    <span className="font-bold">Rooms:</span>&nbsp;
                    {lodge.rooms.length}
                  </Typography>
                  <Typography color="#D4D4D4">
                    <span className="font-bold">Available:</span>&nbsp;
                    {lodge.rooms.filter((room) => room.client == null).length}
                  </Typography>
                </CardContent>
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

import {
  Box,
  Button,
  Card,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import FooterPage from "../Footer/FooterPage";
import lodgesList from "../../Data/SiteDataComponent/Lodges";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AppSnackbar from "../../components/utils/MySnackbar/AppSnackbar";
import DataDeleteConfirm from "../../components/DeleteConfirmComponent/DataDeleteConfirm";

const BookingsPage = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [lodges, setLodges] = useState(lodgesList);
  const [selectedLodge, setSelectedLodge] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.snackbar) {
      showSnackbar(location.state.snackbar, "success");
      navigate(location.pathname, { replace: true });
    }
  }, [location.state?.snackbar, location.pathname, navigate]);

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

  const onCardHover = (lodgeId) => {
    setHoveredId(lodgeId);
  };

  const onCardLeave = () => {
    setHoveredId(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const deleteLodge =
    "Are you sure you want to Delete this Lodge? If you do so, it will be undone";

  const handleDeleteDialogOpen = (lodge) => {
    setDeleteDialogOpen(true);
    setSelectedLodge(lodge);
  };

  const handleDeleteLodge = () => {
    setLodges((prevLodge) =>
      prevLodge.filter((lodge) => lodge.id !== selectedLodge.id)
    );
    setDeleteDialogOpen(false);
    showSnackbar(`${selectedLodge.name} Lodge deleted successfully`, "success");
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
          {lodges.length > 0 ? (
            lodges.map((lodge) => (
              <Card
                key={lodge.name}
                className="relative bg-[#2D454D] col-span-3 p-3 cursor-pointer transition-transform duration-500 ease-in-out group"
                onMouseEnter={() => onCardHover(lodge.id)}
                onMouseLeave={onCardLeave}
              >
                <Link to={`/viewlodge/${lodge.id}`}>
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
                </Link>
                <Box className="flex flex-col justify-between gap-4">
                  <Box className="flex flex-col">
                    <Link to={`/viewlodge/${lodge.id}`}>
                      <Typography fontWeight="bold">{lodge.name}</Typography>
                    </Link>
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
                  <Link to={`/viewlodge/${lodge.id}`}>
                    <Button
                      startIcon={<VisibilityIcon />}
                      variant="contained"
                      color="info"
                      className="flex-1"
                    >
                      View
                    </Button>
                  </Link>

                  <IconButton>
                    <EditIcon sx={{ color: "#10b981" }} />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteDialogOpen(lodge)}>
                    <DeleteIcon sx={{ color: "#F44545" }} />
                  </IconButton>
                </Box>
              </Card>
            ))
          ) : (
            <Box className="flex col-span-12 mx-2 justify-center p-2 bg-[#2D454D] rounded-md border-t-2 border-t-slate-300">
              <Typography fontWeight="bold">No Lodges Available</Typography>
            </Box>
          )}
        </Box>
      </Box>
      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />

      {/* Delete Confirmation Modal */}
      <DataDeleteConfirm
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        handleDeleteLodge={handleDeleteLodge}
        deleteLodge={deleteLodge}
        deleteType="lodge"
      />
      <FooterPage />
    </Box>
  );
};

export default BookingsPage;

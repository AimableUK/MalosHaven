import { useEffect, useState } from "react";
import { Box, Typography, Button, Tooltip, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from "@mui/x-data-grid";
import DataDeleteConfirm from "../../components/DeleteConfirmComponent/DataDeleteConfirm";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { Link, useNavigate, useParams } from "react-router-dom";
import FooterPage from "../Footer/FooterPage";
import AddIcon from "@mui/icons-material/Add";
import PlaceIcon from "@mui/icons-material/Place";
import EditRoomFormModal from "../../components/RoomFormComponent/EditRoomForm";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import ChairIcon from "@mui/icons-material/Chair";
import AddRoomFormModal from "../../components/RoomFormComponent/AddRoomForm";
import AppSnackbar from "../../components/utils/MySnackbar/AppSnackbar";
import useLodgesStore from "../../Store/LodgesStore/useLodgesStore";
import EditLodgeFormModal from "../../components/LodgeFormComponent/EditLodgeForm";
import useRoomStore from "../../Store/RoomStore/useRoomStore";

const LodgeDetails = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editRoomFormModal, setEditRoomFormModal] = useState(false);

  const [deleteType, setDeleteType] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedLodge, setSelectedLodge] = useState(null);

  const [editLodgeFormModal, setEditLodgeFormModal] = useState(false);

  const lodges = useLodgesStore((state) => state.lodges);
  const editLodge = useLodgesStore((state) => state.editLodge);
  const deleteLodge = useLodgesStore((state) => state.deleteLodge);
  const addRoomToLodge = useLodgesStore((state) => state.addRoomToLodge);
  const updateRoomInLodge = useLodgesStore((state) => state.updateRoomInLodge);
  const { setRoomsfromLodges } = useRoomStore();

  const rooms = useRoomStore((state) => state.rooms);
  const addRoom = useRoomStore((state) => state.addRoom);
  const editRoom = useRoomStore((state) => state.editRoom);
  const deleteRoom = useRoomStore((state) => state.deleteRoom);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  useEffect(() => {
    setRoomsfromLodges(lodges);
  }, [lodges, setRoomsfromLodges]);

  const columns = [
    {
      field: "name",
      headerName: "Room",
      width: 140,
      editable: true,
    },
    {
      field: "type",
      headerName: "Type",
      width: 140,
    },
    {
      field: "price",
      headerName: "Price",
      width: 140,
      editable: true,
    },
    {
      field: "edit",
      headerName: "Edit Room",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            setSelectedRoom(params.row);
            setEditRoomFormModal(true);
          }}
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete Room",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(params.row, "room")}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      ),
    },
    {
      field: "book",
      headerName: "Book Room",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="info"
          //   onClick={() => handleBook(params.row.id)}
          startIcon={<AutoStoriesIcon />}
          disabled={!params.row.isAvailable}
        >
          Book
        </Button>
      ),
    },
  ];

  const navigate = useNavigate();

  const { id } = useParams();
  const lodge = lodges.find((lodge) => lodge.id === parseInt(id));

  useEffect(() => {
    document.title = `${lodge?.name || "View Lodge"}`;
  }, [lodge?.name]);

  if (!lodge) {
    return (
      <Box className="m-3 flex justify-center p-2 bg-[#2D454D] rounded-md border-t-2 border-t-slate-300">
        <Typography fontWeight="bold">Lodge Not Found</Typography>
      </Box>
    );
  }

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

  const handleAddRoom = (newRoom) => {
    addRoom(newRoom);
    addRoomToLodge(lodge.id, newRoom);

    const updatedLodges = useLodgesStore.getState().lodges;
    setRoomsfromLodges(updatedLodges);
    showSnackbar(`${newRoom.name} added Successfully`, "success");
  };

  const processRowUpdate = (newRow) => {
    updateRoomInLodge(newRow);
    editRoom(newRow);
    showSnackbar(`${newRow.name} updated successfully!`, "success");
    return newRow;
  };

  const handleEditRoom = (updatedRoom) => {
    updateRoomInLodge(updatedRoom);
    editRoom(updatedRoom);
    showSnackbar(`Room ${updatedRoom.name} updated successfully!`, "success");
  };

  const deleteRoomLodge = `Are you sure you want to Delete this ${deleteType}? If you do so, it will be undone`;

  const handleDelete = (id, type) => {
    if (type === "room") {
      setDeleteType(type);
      setSelectedRoom(id);
      setDeleteDialogOpen(true);
    } else {
      setDeleteType(type);
      setSelectedLodge(id);
      setDeleteDialogOpen(true);
    }
  };

  const handleDeleteRoom = () => {
    deleteRoom(selectedRoom.id);
    showSnackbar(`${selectedRoom.name} deleted successfully!`, "success");
    setDeleteDialogOpen(false);
    setSelectedRoom(null);
  };

  const handleDeleteLodge = () => {
    navigate("/bookings", {
      state: {
        snackbar: `${selectedLodge.name} deleted successfully`,
      },
    });
    setTimeout(() => {
      deleteLodge(selectedLodge.id);
    }, 1000);

    setDeleteDialogOpen(false);
  };

  const handleEditLodgeDialogOpen = (Lodge) => {
    setEditLodgeFormModal(true);
    setSelectedLodge(Lodge);
  };

  const handleEditLodge = (updatedLodge) => {
    editLodge(updatedLodge);
    setEditLodgeFormModal(false);
    showSnackbar(`${updatedLodge.name} Updated Successfully`, "success");
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box className="m-2 md:m-5">
      {/* Header nav */}
      <Box className="flex items-center justify-center relative bg-[#24383E] mb-2 rounded-t-md border-t-2 border-t-slate-300 h-[47px] md:h-[42px] px-1 md:px-6">
        <Box
          sx={{
            borderRadius: "0 99px 9999px 0",
          }}
          className="mr-auto flex items-center md:bg-gradient-to-l md:from-[#2D454D] md:to-[#24383E] md:pr-5"
        >
          <Tooltip title="Return to Lodges">
            <Link to="/bookings">
              <IconButton>
                <ArrowCircleLeftIcon />
              </IconButton>
            </Link>
          </Tooltip>
        </Box>

        <Typography
          fontWeight="bold"
          className="absolute left-1/2 transform -translate-x-1/2 text-sm md:text-base text-center"
        >
          {lodge.name}
        </Typography>
      </Box>

      <Box className="flex flex-col bg-[#2D454D] p-3 border-t-2 border-t-slate-300 rounded-b-md">
        {/* Lodge Header */}
        <Box className="flex flex-col md:flex-row gap-4">
          <Box>
            <Box>
              <img
                src={lodge.image}
                alt="lodge"
                className="shadow-md shadow-slate-900 rounded-md w-fit md:w-52"
              />
            </Box>
            <Box className="flex flex-row justify-center gap-[10px] mt-2 z-0">
              <Button
                sx={{ height: "fit-content" }}
                variant="contained"
                startIcon={<EditIcon />}
                color="success"
                onClick={() => handleEditLodgeDialogOpen(lodge)}
              >
                Edit
              </Button>
              <Button
                sx={{ height: "fit-content" }}
                variant="contained"
                startIcon={<DeleteIcon />}
                color="error"
                onClick={() => handleDelete(lodge, "lodge")}
              >
                Delete
              </Button>
            </Box>
          </Box>
          <Box className="flex flex-col gap-1">
            <Typography fontWeight="bold">
              <HolidayVillageIcon
                className="bg-[#1c292d] p-1 rounded-lg"
                fontSize="large"
              />
              &nbsp;{lodge.name}
            </Typography>
            <Typography fontWeight="bold">
              <PlaceIcon
                className="bg-[#1c292d] p-1 rounded-lg"
                fontSize="large"
              />
              &nbsp;{lodge.location}
            </Typography>
            <Typography fontWeight="bold">
              <ConfirmationNumberIcon
                className="bg-[#1c292d] p-1 rounded-lg"
                fontSize="large"
              />
              &nbsp;
              {lodge.rooms.length}
              &nbsp;Rooms
            </Typography>

            <Typography fontWeight="bold">
              <ChairIcon
                className="bg-[#1c292d] p-1 rounded-lg"
                fontSize="large"
              />
              &nbsp;
              {lodge.rooms.filter((room) => room.isAvailable == true).length}
              &nbsp;Room Available
            </Typography>
          </Box>
        </Box>

        {/* Lodge Info */}
        <Box>
          <Box className="flex flex-col md:flex-row items-center justify-between mt-5">
            <Typography fontSize="20px" fontWeight="bold">
              AVAILABLE ROOMS
            </Typography>
            <Button
              sx={{ whiteSpace: "nowrap" }}
              variant="contained"
              color="info"
              onClick={() => setOpenModal(true)}
            >
              <AddIcon />
              Add Room
            </Button>
          </Box>

          <DataGrid
            rows={
              lodge?.rooms.filter((room) => room.isAvailable === true) || []
            }
            columns={columns}
            showToolbar
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
            sx={{
              height: "fit-content",
              mt: 1,
              backgroundColor: "inherit",
              color: "#FFFFFF",
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#203040",
                color: "#FFFFFF",
              },
              "& .MuiDataGrid-toolbarContainer": {
                backgroundColor: "#203040",
                color: "#FFFFFF",
              },
              "& .MuiSvgIcon-root": {
                color: "#FFFFFF",
              },
            }}
            processRowUpdate={processRowUpdate}
            pageSizeOptions={[10]}
            checkboxSelection
            disableRowSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 300 },
              },
            }}
          />
        </Box>
      </Box>

      {/* Add Room Modal */}
      <AddRoomFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAddRoom={handleAddRoom}
      />

      <EditRoomFormModal
        open={editRoomFormModal}
        onClose={() => setEditRoomFormModal(false)}
        onEditRoom={handleEditRoom}
        selectedRoom={selectedRoom}
      />

      {/* Delete Confirmation Modal */}
      <DataDeleteConfirm
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        deleteRoomLodge={deleteRoomLodge}
        deleteType={deleteType}
        handleDeleteRoom={handleDeleteRoom}
        handleDeleteLodge={handleDeleteLodge}
      />

      <EditLodgeFormModal
        open={editLodgeFormModal}
        onClose={() => setEditLodgeFormModal(false)}
        onEditLodge={handleEditLodge}
        selectedLodge={selectedLodge}
      />

      {/* Snackbar */}
      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
      <FooterPage />
    </Box>
  );
};

export default LodgeDetails;

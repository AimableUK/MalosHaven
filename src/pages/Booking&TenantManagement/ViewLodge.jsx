import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Snackbar,
  Alert,
  Tooltip,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DataDeleteConfirm from "../../components/DeleteConfirmComponent/DataDeleteConfirm";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { Link, useNavigate, useParams } from "react-router-dom";
import FooterPage from "../Footer/FooterPage";
import AddIcon from "@mui/icons-material/Add";
import PlaceIcon from "@mui/icons-material/Place";
import EditPropertyFormModal from "../../components/PropertyFormComponent/EditPropertyForm";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import MyLodges from "../../Data/SiteDataComponent/Lodges";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import ChairIcon from "@mui/icons-material/Chair";
import AddRoomFormModal from "../../components/RoomFormComponent/AddRoomForm";
import EditRoomFormModal from "../../components/RoomFormComponent/EditRoomForm";

const PropertyDetails = () => {
  const [lodges, setLodges] = useState(MyLodges);
  const [openModal, setOpenModal] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [deleteType, setDeleteType] = useState(null);
  const [selectedLodge, setSelectedLodge] = useState(null);

  const [editPropertyFormModal, setEditPropertyFormModal] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  useEffect(() => {
    document.title = `${lodge?.name || "View Lodge"}`;
  });

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
            setSelectedRoomId(params.row.id);
            setEditDialogOpen(true);
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
          onClick={() => handleDelete(params.row.id, "room")}
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

  if (!lodge) {
    return (
      <Box className="m-3 flex justify-center p-2 bg-[#2D454D] rounded-md border-t-2 border-t-slate-300">
        <Typography fontWeight="bold">Lodge Not Found</Typography>
      </Box>
    );
  }

    const selectedRoom = lodge.rooms.find(
      (room) => room.id === selectedRoomId
    );

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
    setLodges((prevLodges) =>
      prevLodges.map((lodgeItem) =>
        lodgeItem.id === parseInt(id)
          ? { ...lodgeItem, rooms: [...lodgeItem.rooms, newRoom] }
          : lodgeItem
      )
    );
  };

  const processRowUpdate = (newRow) => {
    const updatedLodge = lodges.map((lodge) =>
      lodge.id === parseInt(id)
        ? {
            ...lodge,
            rooms: lodge.rooms.map((room) =>
              room.id === newRow.id ? newRow : room
            ),
          }
        : lodge
    );
    setLodges(updatedLodge);
    showSnackbar(`${newRow.name} updated successfully!`, "success");
    return newRow;
  };

  const deleteRoomLodge = `Are you sure you want to Delete this ${deleteType}? If you do so, it will be undone`;

  const handleDelete = (id, type) => {
    if (type === "room") {
      setDeleteType(type);
      setSelectedRoomId(id);
      setDeleteDialogOpen(true);
    } else {
      setDeleteType(type);
      setSelectedLodge(id);
      setDeleteDialogOpen(true);
    }
  };

  const handleDeleteRoom = () => {
    setLodges((prevLodges) =>
      prevLodges.map((lodge) =>
        lodge.id === parseInt(id)
          ? {
              ...lodge,
              rooms: lodge.rooms.filter((room) => room.id !== selectedRoomId),
            }
          : lodge
      )
    );

    showSnackbar("Room deleted successfully!", "success");
    setDeleteDialogOpen(false);
    setSelectedRoomId(null);
  };

  const handleDeleteLodge = () => {
    navigate("/bookings", {
      state: {
        snackbar: `${selectedLodge.name} deleted successfully`,
      },
    });

    setDeleteDialogOpen(false);

    setTimeout(() => {
      setLodges((prev) =>
        prev.filter((lodge) => lodge.id !== selectedLodge.id)
      );
    }, 1000);
  };

  //   const handleEditPropertyDialogOpen = (property) => {
  //     setEditPropertyFormModal(true);
  //     setSelectedProperty(property);
  //   };

  //   const handleEditProp = (updatedProperty) => {
  //     setProperties((prevProperties) =>
  //       prevProperties.map((property) =>
  //         property.id === updatedProperty.id ? updatedProperty : property
  //       )
  //     );
  //     setEditPropertyFormModal(false);
  //     showSnackbar(`${updatedProperty.title} Updated Successfully`, "success");
  //   };

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
        {/* Property Header */}
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
                // onClick={() => handleEditPropertyDialogOpen(property)}
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

        {/* Property Info */}
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
            rows={lodge.rooms.filter((room) => room.isAvailable == true)}
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

      {/* Add Unit Modal */}
      <AddRoomFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAddRoom={handleAddRoom}
      />

      <EditRoomFormModal
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        // onEditUnit={(updatedUnit) => {
        //   setProperties((prevProperties) =>
        //     prevProperties.map((property) =>
        //       property.id === parseInt(id)
        //         ? {
        //             ...property,
        //             units: property.units.map((unit) =>
        //               unit.id === updatedUnit.id ? updatedUnit : unit
        //             ),
        //           }
        //         : property
        //     )
        //   );
        // setSnackbar({
        //   open: true,
        //   message: `Unit ${updatedUnit.UnitNumber} updated successfully!`,
        //   severity: "success",
        // });
        // }}
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

      <EditPropertyFormModal
        open={editPropertyFormModal}
        onClose={() => setEditPropertyFormModal(false)}
        // onEditProperty={handleEditProp}
        selectedLodge={selectedLodge}
      />

      {/* Edit Unit Modal */}

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <FooterPage />
    </Box>
  );
};

export default PropertyDetails;

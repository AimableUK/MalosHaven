import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PlaceIcon from "@mui/icons-material/Place";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PaidIcon from "@mui/icons-material/Paid";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";

const MobileTenantDisplay = ({
  tenantDetails,
  handleUpdateClick,
  handleActionsClick,
  mobileTenantDisplayOpenModal,
  onClose,
}) => {
  return (
    <>
      <Dialog open={mobileTenantDisplayOpenModal} onClose={onClose}>
        <DialogTitle className="flex flex-row justify-between items-center">
          <Typography sx={{ fontSize: "23px" }} fontWeight="bold">
            Tenant Details
          </Typography>
          <IconButton edge="end" aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        {tenantDetails && (
          <DialogContent className="-mt-5">
            <Box key={tenantDetails.tenant_id}>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                sx={{ mt: 3 }}
              >
                <IconButton onClick={() => handleUpdateClick(tenantDetails)}>
                  <EditIcon sx={{ color: "white" }} />
                </IconButton>
                <IconButton
                  onClick={(event) => handleActionsClick(event, tenantDetails)}
                >
                  <MoreHorizIcon sx={{ color: "white" }} />
                </IconButton>
              </Box>

              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Avatar
                  src={tenantDetails.image}
                  sx={{ width: "100px", height: "100px" }}
                />
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    m: 1,
                  }}
                >
                  {tenantDetails.name}
                </Typography>
              </Box>

              <Box
                sx={{
                  height: "1px",
                  width: "100%",
                  background:
                    "linear-gradient(to right, #2d454d, #ABADAE, #2d454d)",
                  my: 1,
                  borderRadius: "999px",
                }}
              />
              <Box
                display="flex"
                flexDirection="column"
                color="#D4D4D4"
                gap="15px"
              >
                <Typography>
                  <PersonIcon />
                  &nbsp;&nbsp;{tenantDetails.gender}
                </Typography>
                <Typography>
                  <PhoneIcon />
                  &nbsp;&nbsp;{tenantDetails.phone}
                </Typography>
                <Typography>
                  <EmailIcon />
                  &nbsp;&nbsp;{tenantDetails.email}
                </Typography>
                <Typography>
                  <CreditCardIcon />
                  &nbsp;&nbsp;{tenantDetails.national_id}
                </Typography>
                <Typography>
                  <ApartmentIcon />
                  &nbsp;&nbsp;{tenantDetails.property}
                </Typography>
                <Typography>
                  <PlaceIcon />
                  &nbsp;&nbsp;{tenantDetails.unit}
                </Typography>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography>
                    <PaidIcon />
                    &nbsp;&nbsp;STATUS
                  </Typography>
                  <Typography
                    sx={{
                      border: "1px solid",
                      px: 2,
                      py: "4px",
                      borderRadius: "8px",
                      backgroundColor: (() => {
                        switch (tenantDetails.paymentStatus) {
                          case "Paid":
                            return "#089846";
                          case "Not Yet":
                            return "#8D071E";
                          case "Partially":
                            return "#9D861C";
                          default:
                            return "grey";
                        }
                      })(),
                      color: "white",
                    }}
                  >
                    {tenantDetails.paymentStatus}
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{ mt: 1 }}
              >
                Full Payment Status
              </Button>
            </Box>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default MobileTenantDisplay;

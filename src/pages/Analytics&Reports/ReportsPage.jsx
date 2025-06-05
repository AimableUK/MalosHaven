import { Box, Button, Typography } from "@mui/material";
import salesEarning from "../../assets/salesEarning.svg";
import DownloadIcon from "@mui/icons-material/Download";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import PaidIcon from "@mui/icons-material/Paid";
import MovingIcon from "@mui/icons-material/Moving";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import FlareIcon from "@mui/icons-material/Flare";
import PreviewIcon from "@mui/icons-material/Preview";
import FooterPage from "../Footer/FooterPage";
import SMLineChart from "../../components/DataCharts/SMLineChart";
import { useMediaQuery } from "@mui/material";

const ReportsPage = () => {

  const isTablet = useMediaQuery("(max-width:768px)");

  return (
    <Box>
      {/* first box */}
      <Box className={`${isTablet && "flex-col"} flex flex-col md:grid grid-cols-12 gap-3 md:gap-4 p-2 font-roboto m-2`}>
        {/* right One */}
        <Box className="col-span-12 md:col-span-4 bg-[#2D454D] rounded border-t-2 border-t-slate-300 p-4 py-10 flex flex-col justify-between items-center">
          <Typography fontWeight="bold">Total Payments</Typography>
          <FlareIcon
            sx={{
              color: "#6950e8",
              background: "#272d49",
              p: "5px",
              borderRadius: "6px",
              fontSize: "45px",
            }}
          />
          <Typography
            fontWeight="bold"
            sx={{
              fontSize: { xs: "1.4rem", md: "2.1rem", lg: "2.1rem" },
            }}
          >
            $35,800
          </Typography>
          <Typography color="#11b886" fontWeight="bold">
            <ArrowUpwardIcon
              sx={{
                color: "#11b786",
                background: "#185E49",
                p: "5px",
                borderRadius: "100%",
                fontSize: "35px",
              }}
            />
            &nbsp;+10.23%
          </Typography>
          <Typography className="text-[#BDBDBD]">
            Calculated in the last 7 days
          </Typography>
          <Button startIcon={<PreviewIcon />} variant="contained" color="info">
            View Full Report
          </Button>
        </Box>

        {/* second row Box */}
        <Box className="col-span-12 md:col-span-8 flex flex-col gap-3 md:gap-4">
          {/* Revenue Box */}
          <Box className="flex flex-row justify-between items-center border-t-2 border-t-slate-300 bg-[#2D454D] rounded p-4 col-span-8">
            <Box className="flex flex-col">
              <Typography className="text-[#BDBDBD]">Revenue</Typography>
              <Typography
                fontWeight="bold"
                sx={{
                  fontSize: { xs: "1.4rem", md: "2.1rem", lg: "2.1rem" },
                }}
              >
                $35,800
              </Typography>
              <Button
                startIcon={<DownloadIcon />}
                variant="contained"
                color="info"
              >
                Download
              </Button>
            </Box>

            <Box>
              <img src={salesEarning} alt="sales Earnings" />
            </Box>
          </Box>

          {/* other 3 */}
          <Box className="flex flex-col md:flex-row gap-3 md:gap-4 text-center h-full">
            {/* 1 */}
            <Box className="flex-1 border-t-2 border-t-slate-300 bg-[#2D454D] rounded-b flex-col flex items-center justify-center py-5">
              <LocalGroceryStoreIcon
                sx={{
                  color: "#6950e8",
                  background: "#2e315a",
                  p: "5px",
                  borderRadius: "6px",
                  fontSize: "45px",
                }}
              />
              <Typography mt="12px">Total Payments</Typography>
              <Typography color="#8F7CED">$785K</Typography>
            </Box>

            {/* 2 */}
            <Box className="flex-1 border-t-2 border-t-slate-300 bg-[#2D454D] rounded-b flex-col flex items-center justify-center py-5">
              <PaidIcon
                sx={{
                  color: "#11b786",
                  background: "#1c4647",
                  p: "5px",
                  borderRadius: "6px",
                  fontSize: "45px",
                }}
              />
              <Typography mt="12px">Payments Completed</Typography>
              <Typography color="#11b786">$33K</Typography>
            </Box>

            {/* 3 */}
            <Box className="flex-1 border-t-2 border-t-slate-300 bg-[#2D454D] rounded-b flex-col flex items-center justify-center py-5">
              <MovingIcon
                sx={{
                  color: "#ef4770",
                  background: "#492f42",
                  p: "5px",
                  borderRadius: "6px",
                  fontSize: "45px",
                }}
              />
              <Typography mt="12px">Remaining Payments</Typography>
              <Typography color="#ef4770">$1.2K</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* second box */}
      <Box className="flex flex-col md:grid grid-cols-1 p-2 font-roboto m-2">
        {/* meta data */}
        <Box className="bg-[#2D454D] rounded shadow-md shadow-slate-600">
          {/* smlinechart */}
          <Box className="bg-[#6950e8] p-3 rounded">
            <Typography fontWeight="bold">Last Shipment</Typography>
            <Box sx={{ minHeight: 240, width: "100%" }}>
              <SMLineChart />
            </Box>
          </Box>

          {/* 4 below grids */}
          <Box className="flex flex-col gap-3 p-5 -mt-16">
            {/* 1 with two */}
            <Box className="flex flex-col md:flex-row gap-3">
              <Box className="flex-1 border-t-2 border-t-slate-300 shadow-md shadow-slate-800 bg-[#2D454D] rounded-lg flex-col flex justify-between p-4 border-gray-400 gap-3">
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    gap="10px"
                  >
                    <Typography
                      fontWeight="bold"
                      sx={{
                        fontSize: { xs: "1.4rem", md: "1.2rem", lg: "1.2rem" },
                      }}
                    >
                      $35,800
                    </Typography>
                    <Typography
                      className="rounded-2xl px-1 bg-[#2a6956] text-[#65f6ca] h-fit"
                      sx={{ fontSize: "12px" }}
                    >
                      +4.67%
                    </Typography>
                  </Box>
                  <Typography color="#BDBDBD" sx={{ fontSize: "15px" }}>
                    Total Online Sales
                  </Typography>
                </Box>

                <Box display="flex" flexDirection="column">
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                  >
                    <Typography sx={{ fontWeight: "bold", fontSize: "13px" }}>
                      $100K to goal
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "13px",
                        color: "#BDBDBD",
                      }}
                    >
                      75%
                    </Typography>
                  </Box>

                  <Box className="w-full bg-gray-300 rounded-full">
                    <Box className="w-[75%] h-2 bg-red-400 bg-primaryBorder rounded-full"></Box>
                  </Box>
                </Box>
              </Box>

              <Box
                gap="10px"
                className="flex-1 border-t-2 border-t-slate-300 shadow-md shadow-slate-800 bg-[#2D454D] rounded-lg flex-col flex justify-between p-4 border-gray-400"
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      fontWeight="bold"
                      sx={{
                        fontSize: { xs: "1.4rem", md: "1.2rem", lg: "1.2rem" },
                      }}
                    >
                      $35,800
                    </Typography>
                    <Typography
                      className="rounded-2xl px-1 bg-[#2a6956] text-[#65f6ca] h-fit"
                      sx={{ fontSize: "12px" }}
                    >
                      +4.67%
                    </Typography>
                  </Box>
                  <Typography color="#BDBDBD" sx={{ fontSize: "15px" }}>
                    Total Online Sales
                  </Typography>
                </Box>

                <Box display="flex" flexDirection="column" gap="5px">
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                  >
                    <Typography sx={{ fontWeight: "bold", fontSize: "13px" }}>
                      $100K to goal
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "13px",
                        color: "#BDBDBD",
                      }}
                    >
                      75%
                    </Typography>
                  </Box>

                  <Box className="w-full bg-gray-300 rounded-full">
                    <Box className="w-[75%] h-2 bg-red-400 bg-primaryBorder rounded-full"></Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* 2 with two */}
            <Box className="flex flex-col md:flex-row gap-3">
              <Box className="flex-1 border-t-2 border-t-slate-300 shadow-md shadow-slate-800 bg-[#2D454D] rounded-lg flex-col flex justify-between p-4 border-gray-400 gap-3">
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    gap="10px"
                  >
                    <Typography
                      fontWeight="bold"
                      sx={{
                        fontSize: { xs: "1.4rem", md: "1.2rem", lg: "1.2rem" },
                      }}
                    >
                      $35,800
                    </Typography>
                    <Typography
                      className="rounded-2xl px-1 bg-[#2a6956] text-[#65f6ca] h-fit"
                      sx={{ fontSize: "12px" }}
                    >
                      +4.67%
                    </Typography>
                  </Box>
                  <Typography color="#BDBDBD" sx={{ fontSize: "15px" }}>
                    Total Online Sales
                  </Typography>
                </Box>

                <Box display="flex" flexDirection="column" gap="5px">
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                  >
                    <Typography sx={{ fontWeight: "bold", fontSize: "13px" }}>
                      $100K to goal
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "13px",
                        color: "#BDBDBD",
                      }}
                    >
                      75%
                    </Typography>
                  </Box>

                  <Box className="w-full bg-gray-300 rounded-full">
                    <Box className="w-[75%] h-2 bg-red-400 bg-primaryBorder rounded-full"></Box>
                  </Box>
                </Box>
              </Box>

              <Box
                gap="10px"
                className="flex-1 border-t-2 border-t-slate-300 shadow-md shadow-slate-800 bg-[#2D454D] rounded-lg flex-col flex justify-between p-4 border-gray-400"
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      fontWeight="bold"
                      sx={{
                        fontSize: { xs: "1.4rem", md: "1.2rem", lg: "1.2rem" },
                      }}
                    >
                      $35,800
                    </Typography>
                    <Typography
                      className="rounded-2xl px-1 bg-[#2a6956] text-[#65f6ca] h-fit"
                      sx={{ fontSize: "12px" }}
                    >
                      +4.67%
                    </Typography>
                  </Box>
                  <Typography color="#BDBDBD" sx={{ fontSize: "15px" }}>
                    Total Online Sales
                  </Typography>
                </Box>

                <Box display="flex" flexDirection="column" gap="5px">
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                  >
                    <Typography sx={{ fontWeight: "bold", fontSize: "13px" }}>
                      $100K to goal
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "13px",
                        color: "#BDBDBD",
                      }}
                    >
                      75%
                    </Typography>
                  </Box>

                  <Box className="w-full bg-gray-300 rounded-full">
                    <Box className="w-[75%] h-2 bg-red-400 bg-primaryBorder rounded-full"></Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* 3 with two */}
            <Box className="flex flex-col md:flex-row gap-3">
              <Box className="flex-1 border-t-2 border-t-slate-300 shadow-md shadow-slate-800 bg-[#2D454D] rounded-lg flex-col flex justify-between p-4 border-gray-400 gap-3">
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    gap="10px"
                  >
                    <Typography
                      fontWeight="bold"
                      sx={{
                        fontSize: { xs: "1.4rem", md: "1.2rem", lg: "1.2rem" },
                      }}
                    >
                      $35,800
                    </Typography>
                    <Typography
                      className="rounded-2xl px-1 bg-[#2a6956] text-[#65f6ca] h-fit"
                      sx={{ fontSize: "12px" }}
                    >
                      +4.67%
                    </Typography>
                  </Box>
                  <Typography color="#BDBDBD" sx={{ fontSize: "15px" }}>
                    Total Online Sales
                  </Typography>
                </Box>

                <Box display="flex" flexDirection="column" gap="5px">
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                  >
                    <Typography sx={{ fontWeight: "bold", fontSize: "13px" }}>
                      $100K to goal
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "13px",
                        color: "#BDBDBD",
                      }}
                    >
                      75%
                    </Typography>
                  </Box>

                  <Box className="w-full bg-gray-300 rounded-full">
                    <Box className="w-[75%] h-2 bg-red-400 bg-primaryBorder rounded-full"></Box>
                  </Box>
                </Box>
              </Box>

              <Box
                gap="10px"
                className="flex-1 border-t-2 border-t-slate-300 shadow-md shadow-slate-800 bg-[#2D454D] rounded-lg flex-col flex justify-between p-4 border-gray-400"
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      fontWeight="bold"
                      sx={{
                        fontSize: { xs: "1.4rem", md: "1.2rem", lg: "1.2rem" },
                      }}
                    >
                      $35,800
                    </Typography>
                    <Typography
                      className="rounded-2xl px-1 bg-[#2a6956] text-[#65f6ca] h-fit"
                      sx={{ fontSize: "12px" }}
                    >
                      +4.67%
                    </Typography>
                  </Box>
                  <Typography color="#BDBDBD" sx={{ fontSize: "15px" }}>
                    Total Online Sales
                  </Typography>
                </Box>

                <Box display="flex" flexDirection="column" gap="5px">
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                  >
                    <Typography sx={{ fontWeight: "bold", fontSize: "13px" }}>
                      $100K to goal
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "13px",
                        color: "#BDBDBD",
                      }}
                    >
                      75%
                    </Typography>
                  </Box>

                  <Box className="w-full bg-gray-300 rounded-full">
                    <Box className="w-[75%] h-2 bg-red-400 bg-primaryBorder rounded-full"></Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <FooterPage />
    </Box>
  );
};

export default ReportsPage;

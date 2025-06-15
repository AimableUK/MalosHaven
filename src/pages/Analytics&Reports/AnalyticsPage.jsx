import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import PieChart from "../../components/DataCharts/PieChart";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LineChart from "../../components/DataCharts/LineChart";
import SMPieChart from "../../components/DataCharts/SMPieChart";
import FooterPage from "../Footer/FooterPage";
import { useMediaQuery } from "@mui/material";
import propertiesList from "../../Data/SiteDataComponent/Properties";

const AnalyticsPage = () => {
  const [value, setValue] = useState("monthly");
  const [properties, setProperties] = useState(propertiesList);

  const [requests, setRequests] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [solvedRequests, setSolvedRequests] = useState([]);

  const is1230 = useMediaQuery("(min-width: 1230px)");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const isTablet = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    const allRequests = [];

    properties.forEach((property) => {
      property.units.forEach((unit) => {
        const tenant = unit.tenant;
        if (tenant?.maintenanceRequests?.length > 0) {
          tenant.maintenanceRequests.forEach((request) => {
            allRequests.push({
              ...request,
              tenantName: tenant.name,
              tenantPhone: tenant.phone,
              tenantImage: tenant.image,
              propertyTitle: property.title,
              unit: unit.UnitNumber,
            });
          });
        }
      });
    });

    setRequests(allRequests);
    setPendingRequests(allRequests.filter((r) => r.status === "pending"));
    setSolvedRequests(allRequests.filter((r) => r.status === "done"));
  }, [properties]);

  const MaintenancesChart = [
    {
      id: "All",
      label: "All",
      value: requests?.length,
      color: "hsl(53, 70%, 50%)",
    },
    {
      id: "Pending",
      label: "Pending",
      value: pendingRequests?.length,
      color: "hsl(285, 70%, 50%)",
    },
    {
      id: "Solved",
      label: "Solved",
      value: solvedRequests?.length,
      color: "hsl(75, 70%, 50%)",
    },
  ];

  return (
    <Box className="m-1 md:m-3">
      {/* first extended row */}
      <Box
        className={`flex ${is1230 ? "flex-row" : "flex-col"} gap-1 w-full my-2`}
        sx={{ alignItems: "stretch" }}
      >
        {/* boxes */}
        <Box className="flex flex-col w-full h-full">
          {/* first 2 boxes */}
          <Box display="flex" flexDirection="row">
            <Box
              className="flex flex-col border-t-2 border-t-slate-300 gap-y-1 justify-center"
              sx={{
                width: "100%",
                display: "flex",
                borderRadius: "8px",
                p: "16px",
                background: "#2D454D",
                margin: "5px",
                overflow: "hidden",
              }}
            >
              <Typography className="text-[#BDBDBD]">Renevue</Typography>
              <Typography
                fontWeight="bold"
                sx={{
                  fontSize: { xs: "1.4rem", md: "2.1rem", lg: "2.1rem" },
                }}
              >
                $35,800
              </Typography>
            </Box>
            <Box
              className="flex flex-col border-t-2 border-t-slate-300 gap-y-1 justify-center"
              sx={{
                width: "100%",
                display: "flex",
                borderRadius: "8px",
                p: "16px",
                background: "#2D454D",
                margin: "5px",
                overflow: "hidden",
              }}
            >
              <Typography fontSize="14px" color="#BDBDBD">
                Repeat Purchase
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "1.4rem", md: "2.1rem", lg: "2.1rem" },
                }}
                fontWeight="bold"
              >
                $12,900
              </Typography>
            </Box>
          </Box>

          {/* second 2 boxes */}
          <Box display="flex" flexDirection="row">
            <Box
              className="flex flex-col border-t-2 border-t-slate-300 justify-center"
              sx={{
                width: "100%",
                display: "flex",
                borderRadius: "8px",
                p: "16px",
                background: "#2D454D",
                m: "5px",
              }}
            >
              <Typography fontSize="14px" color="#BDBDBD">
                Average Order value
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "1.4rem", md: "2.1rem", lg: "2.1rem" },
                }}
                fontWeight="bold"
              >
                $1,000
              </Typography>
            </Box>
            <Box
              className="flex flex-col border-t-2 border-t-slate-300 justify-center"
              sx={{
                width: "100%",
                display: "flex",
                borderRadius: "8px",
                p: "16px",
                background: "#2D454D",
                margin: "5px",
              }}
            >
              <Typography fontSize="14px" color="#BDBDBD">
                New Customers
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "1.4rem", md: "2.1rem", lg: "2.1rem" },
                }}
                fontWeight="bold"
              >
                $143
              </Typography>
            </Box>
          </Box>

          {/* third 1 box */}
          <Box display="flex" flexDirection="row">
            <Box
              className="flex flex-col border-t-2 border-t-slate-300 h-full justify-center"
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                borderRadius: "8px",
                p: "16px",
                background: "#2D454D",
                mx: "5px",
                mt: "2px",
              }}
            >
              <Typography fontSize="14px" color="#BDBDBD">
                Average Order value
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "1.4rem", md: "2.1rem", lg: "2.1rem" },
                }}
                fontWeight="bold"
              >
                $1,000
              </Typography>
              <Typography fontSize="14px" color="#BDBDBD">
                Average Order value
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "1.4rem", md: "2.1rem", lg: "2.1rem" },
                }}
                fontWeight="bold"
              >
                $1,000
              </Typography>
              <Typography fontSize="14px" color="#BDBDBD">
                Average Order value
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* chart */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: "8px",
            p: 2,
            background: "#2D454D",
            overflow: "hidden",
            mt: "5px",
          }}
          className="border-t-2 border-t-slate-300 w-full"
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography sx={{ color: "#fff", mb: 1, fontWeight: "bold" }}>
              Earnings Report
            </Typography>
            <FormControl>
              <InputLabel id="custom-select-label">Date Range</InputLabel>
              <Select
                labelId="custom-select-label"
                value={value}
                label="Date Range"
                onChange={handleChange}
                IconComponent={ArrowDropDownIcon}
                sx={{
                  "& .MuiSelect-icon": {
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "white",
                  },
                  width: "fit-content",
                }}
              >
                <MenuItem value="weekly" defaultChecked>
                  Weekly
                </MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="annually">Annually</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minHeight: "340px", width: "100%" }}>
            <PieChart />
          </Box>
        </Box>
      </Box>

      {/* second extended row */}
      <Box
        className={`flex ${is1230 ? "flex-row" : "flex-col"} gap-3 font-roboto`}
      >
        {/* line chart */}
        <Box
          sx={{
            gridColumn: isTablet ? "span 12" : "span 8",
            display: "flex",
            flexDirection: "column",
            borderRadius: "8px",
            p: 2,
            background: "#2D454D",
            overflow: "hidden",
          }}
          className="border-t-2 border-t-slate-300 h-full w-full"
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography sx={{ color: "#fff", mb: 1 }} fontWeight="bold">
              Revenue
            </Typography>
            <FormControl>
              <InputLabel id="custom-select-label">Date Range</InputLabel>
              <Select
                labelId="custom-select-label"
                value={value}
                label="Date Range"
                onChange={handleChange}
                IconComponent={ArrowDropDownIcon}
                sx={{
                  "& .MuiSelect-icon": {
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "white",
                  },
                  width: "fit-content",
                }}
              >
                <MenuItem value="weekly" defaultChecked>
                  Weekly
                </MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="annually">Annually</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ minHeight: 240, width: "100%" }}>
            <LineChart />
          </Box>
        </Box>

        {/* small pie chart */}
        <Box
          sx={{
            gridColumn: isTablet ? "span 12" : "span 4",
            display: "flex",
            flexDirection: "column",
            borderRadius: "8px",
            p: 2,
            background: "#2D454D",
            overflow: "hidden",
          }}
          className="border-t-2 border-t-slate-300 h-full w-full"
        >
          <Typography
            sx={{ color: "#fff", mb: 1, textAlign: "center" }}
            fontWeight="bold"
          >
            Maintainence Overview
          </Typography>
          <Box sx={{ minHeight: 240, width: "100%" }}>
            <SMPieChart data={MaintenancesChart} />
          </Box>
        </Box>
      </Box>
      <FooterPage />
    </Box>
  );
};

export default AnalyticsPage;

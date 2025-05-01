import { ResponsivePie } from "@nivo/pie";
import PiechartData from "../../Data/ChartsJS/PieChartData";
import { useMediaQuery } from "@mui/material";
import { useLocation } from "react-router-dom";

const PieChart = () => {
  const isSmallScreen = useMediaQuery("(max-width:768px)");

  const location = useLocation()
  const isAnalytics = location.pathname === "/analytics"

  return (
    <div style={{ height: "280px", width: "100%" }}>
      <ResponsivePie
        data={PiechartData}
        margin={{ top: 10, right: 80, bottom: 70, left: 80 }}
        innerRadius={0.1}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLinkLabels={!isAnalytics}
        arcLinkLabelsOffset={-11}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#fff"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "ruby",
            },
            id: "dots",
          },
          {
            match: {
              id: "c",
            },
            id: "dots",
          },
          {
            match: {
              id: "go",
            },
            id: "dots",
          },
          {
            match: {
              id: "python",
            },
            id: "dots",
          },
          {
            match: {
              id: "scala",
            },
            id: "lines",
          },
          {
            match: {
              id: "lisp",
            },
            id: "lines",
          },
          {
            match: {
              id: "elixir",
            },
            id: "lines",
          },
          {
            match: {
              id: "javascript",
            },
            id: "lines",
          },
        ]}
        legends={[
          {

            anchor: "bottom",
            direction: isSmallScreen ? "column" : "row",
            translateX: isSmallScreen ? 10 : 0,
            translateY: isSmallScreen ? 10 : 56,
            justify: false,
            itemsSpacing: -45,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#fff",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 12,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "grey",
                },
              },
            ],
          },
        ]}
        theme={{
          tooltip: {
            container: {
              background: "#222",
              color: "#ffffff",
            },
          },
        }}
      />
    </div>
  );
};

export default PieChart;

import React from "react";
import { ResponsivePie } from "@nivo/pie";
import SMPieChartData from "../Data/SMPieChartData";
import { useMediaQuery } from "@mui/material";

const SMPieChart = () => {
  const isSmallScreen = useMediaQuery("(max-width:768px)");

  return (
    <div style={{ height: "280px", width: "100%" }}>
      <ResponsivePie
        data={SMPieChartData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.66}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "purpleRed_green" }}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", "2.5"]],
        }}
        enableArcLinkLabels={false}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color", modifiers: [] }}
        enableArcLabels={false}
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
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: isSmallScreen ? 3 : -30,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#fff",
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

export default SMPieChart;

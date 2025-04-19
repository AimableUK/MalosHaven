import React from "react";
import LineChartData from "../Data/LineChartData";
import { ResponsiveLine } from "@nivo/line";

const LineChart = () => {
  return (
    <div style={{ height: "280px", width: "100%" }}>
      <ResponsiveLine
        data={LineChartData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "transportation",
          legendOffset: 36,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "count",
          legendOffset: -40,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        enableGridX={false}
        lineWidth={3}
        pointSize={7}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableArea={true}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: "#ffffff", // white text
            itemOpacity: 1,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(255, 255, 255, 0.5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(255, 255, 255, 0.1)",
                  itemOpacity: 1,
                  itemTextColor: "#fff",
                },
              },
            ],
          },
        ]}
        theme={{
          textColor: "#ffffff",
          axis: {
            domain: {
              line: {
                stroke: "#ffffff",
              },
            },
            ticks: {
              line: {
                stroke: "#ffffff",
              },
              text: {
                fill: "#ffffff",
              },
            },
            legend: {
              text: {
                fill: "#ffffff",
              },
            },
          },
          grid: {
            line: {
              stroke: "#444444", // optional, dark grid lines
              strokeDasharray: "4 4",
            },
          },
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

export default LineChart;

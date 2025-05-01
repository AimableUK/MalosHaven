import React from "react";
import SMLineChartData from "../../Data/ChartsJS/SMLineChartData";
import { ResponsiveLine } from "@nivo/line";

const SMLineChart = () => {
  return (
    <div style={{ height: "280px", width: "100%" }}>
      <ResponsiveLine
        data={SMLineChartData}
        margin={{ top: 20, right: 20, bottom: 50, left: 20 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={null}
        enableGridX={false}
        colors={{ scheme: "purple_orange" }}
        lineWidth={4}
        pointSize={5}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[]}
        motionConfig="default"
        theme={{
          textColor: "#ffffff",
          grid: {
            line: {
              stroke: "white",
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

export default SMLineChart;

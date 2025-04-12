import React from "react";
import { ResponsiveTree } from "@nivo/tree";
import { treeChartData } from "./TreeChartData";

const TreeChart = () => {
  return (
    <div style={{ height: 400 }}>
      <ResponsiveTree
        data={treeChartData}
        identity="name"
        activeNodeSize={24}
        inactiveNodeSize={12}
        nodeColor={{ scheme: "tableau10" }}
        fixNodeColorAtDepth={1}
        linkThickness={2}
        activeLinkThickness={8}
        inactiveLinkThickness={2}
        linkColor={{
          from: "target.color",
          modifiers: [["opacity", 0.4]],
        }}
        margin={{ top: 90, right: 90, bottom: 90, left: 90 }}
        motionConfig="stiff"
        meshDetectionRadius={80}
      />
    </div>
  );
};

export default TreeChart;

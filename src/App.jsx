import Calendar from "./components/calendar";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import LineChart from "./components/LineChart";
import HeatMapChart from "./components/HeatMapChart";
import RadarChart from "./components/RadarChart";
import TreeChart from "./components/TreeChart";
import BasicDataGrid from "./components/DataGrid";

import "./App.css";
import { DataGrid } from "@mui/x-data-grid";
import DataGridApi from "./components/DataGridApi";

function App() {
  return (
    <div>
      <p className="text-center font-bold text-xl p-5">1. Calendar Lesson</p>
      <Calendar />

      <p className="text-center font-bold text-xl p-5">2. Bar Chart Lesson</p>
      <BarChart />

      <p className="text-center font-bold text-xl p-5">3. PIE Chart Lesson</p>
      <PieChart />

      <p className="text-center font-bold text-xl p-5">4. LINE Chart Lesson</p>
      <LineChart />

      <p className="text-center font-bold text-xl p-5">5. HEATMAP Chart Lesson</p>
      <HeatMapChart />

      <p className="text-center font-bold text-xl p-5">6. RADAR Chart Lesson</p>
      <RadarChart />

      <p className="text-center font-bold text-xl p-5">7. TREE Chart Lesson</p>
      <TreeChart />

      <p className="text-center font-bold text-xl p-5">7. Data Grid Lesson</p>
      <BasicDataGrid />

      <p className="text-center font-bold text-xl p-5">7. Data Grid API Lesson</p>
      <DataGridApi />

    </div>
  );
}

export default App;

import Calendar from "./components/calendar";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";

import "./App.css";

function App() {
  return (
    <div>
      <p className="text-center font-bold text-xl p-5">1. Calendar Lesson</p>
      <Calendar />

      <p className="text-center font-bold text-xl p-5">2. Bar Chart Lesson</p>
      <BarChart />

      <p className="text-center font-bold text-xl p-5">3. PIE Chart Lesson</p>
      <PieChart />

    </div>
  );
}

export default App;

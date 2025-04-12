import Calendar from "./components/calendar";
import BarChart from "./components/BarChart";

import "./App.css";

function App() {
  return (
    <div>
      <p className="text-center font-bold text-xl p-5">1. Calendar Lesson</p>
      <Calendar />

      <p className="text-center font-bold text-xl p-5">1. Chart Lesson</p>
      <BarChart />

    </div>
  );
}

export default App;

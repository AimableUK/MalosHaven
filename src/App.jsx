import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import Team from "./pages/Team";
import Invoices from "./pages/Invoices";
import { CssBaseline, ThemeProvider } from "@mui/material";

import "./index.css";

function App() {

  return (
      <ThemeProvider>
        <CssBaseline />

        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="team" element={<Team />} />
            <Route path="invoices" element={<Invoices />} />
          </Route>
        </Routes>
      </ThemeProvider>
  );
}

export default App;

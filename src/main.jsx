import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";

// eslint-disable-next-line react-refresh/only-export-components
const Root = () => {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Root />
  </StrictMode>
);

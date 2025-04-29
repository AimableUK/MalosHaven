import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { Analytics } from "@vercel/analytics/react"


const Root = () => {
  return (
    <>
      <CssBaseline />
      <Analytics />
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

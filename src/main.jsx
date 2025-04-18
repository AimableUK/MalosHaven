import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ColorModeContext, useMode } from "./Theme";

// eslint-disable-next-line react-refresh/only-export-components
const Root = () => {
  const [theme, colorMode] = useMode();

  return (
    <BrowserRouter>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </BrowserRouter>
  );
};

// Find the existing root and render to it
const root = document.getElementById("root");
const rootInstance = createRoot(root);
rootInstance.render(
  <StrictMode>
    <Root />
  </StrictMode>
);

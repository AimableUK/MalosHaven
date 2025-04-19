import { createTheme } from "@mui/material/styles";

export const customTheme = createTheme({
  palette: {
    primary: {
      main: "#1e40af",
    },
    background: {
      default: "linear-gradient(to right, #24243e, #302b63, #0f0c29)",
      paper: "#1e293b",
    },
    text: {
      primary: "#ffffff",
      secondary: "#94a3b8",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "#1C292D",
          minHeight: "100vh",
          margin: 0,
          padding: 0,
          color: "#ffffff",
          backgroundAttachment: "fixed",
        },
      },
    },
    MuiBox: {
      variants: [
        {
          props: { variant: "card" },
          style: {
            backgroundColor: "#1e293b",
            color: "#ffffff",
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          },
        },
      ],
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#1e293b",
          color: "#ffffff",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#213142",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "#334155",
            color: "#ffffff",
          },
          "&:hover": {
            backgroundColor: "#475569",
          },
        },
      },
    },
  },
});

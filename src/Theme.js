import { createTheme } from "@mui/material/styles";

export const customTheme = createTheme({
  palette: {
    // mode: "dark",
    primary: {
      main: "#fff",
    },
    background: {
      default: "#203040",
      paper: "#24383E",
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
          backgroundColor: "#24383E",
          color: "#ffffff",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#2D454D",
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
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#ffffff",
        },
      },
    },
  },
});

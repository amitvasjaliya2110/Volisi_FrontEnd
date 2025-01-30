import { createTheme } from "@mui/material";
import { orange, grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
      light: orange[300],
      dark: orange[700],
      contrastText: grey[50],
    },
    secondary: {
      main: orange[200],
      dark: orange[400],
      contrastText: grey[900],
    },
  },
  typography: {
    // fontFamily: "Visby Round CF, sans-serif",
    fontFamily: "Noto Sans, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          fontSize: "16px",
          borderRadius: "12px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderColor: "#A1A1AA",
            borderRadius: "8px",
            "&:hover fieldset": {
              borderColor: "#A1A1AA",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#A1A1AA",
            },
            height: "52px",
          },
          "& .MuiInputBase-input::placeholder": {
            color: "#18181B",
            fontFamily: "Noto Sans, sans-serif",
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "19.2px",
            opacity: "50%",
          },
        },
      },
    },
  },
});

export default theme;

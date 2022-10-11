import { createTheme } from "@mui/material/styles";

export const defaultDarkTheme = createTheme({
  palette: {
    primary: {
      light: "#ffffff",
      main: "#eceff1",
      dark: "#babdbe",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#ffffff",
    },
    divider: "#ffffff",
  },

});
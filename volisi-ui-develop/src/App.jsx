import { ThemeProvider } from "@mui/material/styles";
import AppRouter from "./components/router/AppRouter";
import theme from "./lib/MuiTheme";
import VolisiContextProvider from "./app/contexts/VolisiContextProvider";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <VolisiContextProvider>
        <AppRouter />
      </VolisiContextProvider>
    </ThemeProvider>
  );
}
export default App;

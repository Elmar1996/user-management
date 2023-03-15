import AdapterLuxon from "@mui/lab/AdapterLuxon";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import CssBaseline from "@mui/material/CssBaseline";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { NotificationsProvider } from 'redux/NotificationsContext';
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from "react-redux";
import store from "redux/store";
import Routes from "routes";
import smoothscroll from "smoothscroll-polyfill";
import theme from "theme";



const App: React.FC = () => {
  const queryClient = new QueryClient();
 
  useEffect(() => {
    smoothscroll.polyfill();
  }, []);
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <NotificationsProvider>
            <CssBaseline />
            <Routes />
            </NotificationsProvider>
          </QueryClientProvider>
          </Provider>
        </ThemeProvider>
      </StyledEngineProvider>
    </LocalizationProvider>
  );
};

export default App;

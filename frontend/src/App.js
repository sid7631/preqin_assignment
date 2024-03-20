import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import InvestorsList from './views/InvestorsList';
import InvestorDetails from './views/InvestorDetails';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const theme = createTheme({
  typography: {
    fontFamily: ['-apple-system', 'BlinkMacSystemFont', 'sans-serif'].join(','),
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: 'white',
          color: 'black',
        },
      },
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', backgroundColor: '#f6f7f9', minHeight: '100vh' }}>
          <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
            <Router>
              <Routes>
                <Route exact path="/" element={<InvestorsList />} />
                <Route path="/investors/:firm_id" element={<InvestorDetails />} />
              </Routes>
            </Router>
          </Box>
        </Box>
      </ThemeProvider>
    </Provider>
  );
}

export default App;

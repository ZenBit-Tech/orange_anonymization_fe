import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { store, useAppDispatch } from '@/store/store';
import { theme } from '@/theme';
import { AppRoutes } from '@/routes';
import { useEffect } from 'react';
import { initializeAuth } from '@/store/auth';

function AppContent() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return <AppRoutes />;
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;

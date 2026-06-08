import { BrowserRouter, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { persistor, store, useAppDispatch } from '@/store/store';
import { theme } from '@/theme';
import { AppRoutes } from '@/routes';
import { useEffect } from 'react';
import { initializeAuth } from '@/store/auth';
import { PersistGate } from 'redux-persist/integration/react';
import { ROUTES } from './constants';

function AppContent() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    const isVerifyRoute = location.pathname.startsWith(ROUTES.VERIFY_BASE);

    if (!isVerifyRoute) {
      dispatch(initializeAuth());
    }
  }, [dispatch, location.pathname]);

  return <AppRoutes />;
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;

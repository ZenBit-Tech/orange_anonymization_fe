import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AUTH_SESSION_STARTED_AT_KEY, AUTH_TOKEN_KEY, AUTH_USER_KEY, ROUTES } from '@/constants';
import { inactivityImages } from '@/assets/images/inactivity';
import { inactivityStyles } from './styles';

const Inactivity = () => {
  useEffect(() => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    localStorage.removeItem(AUTH_SESSION_STARTED_AT_KEY);
  }, []);

  return (
    <Box sx={inactivityStyles.root}>
      <Box sx={inactivityStyles.container}>
        <Box sx={inactivityStyles.logoRow}>
          <Box
            component="img"
            src={inactivityImages.logo}
            alt="De-ID Studio logo"
            sx={inactivityStyles.logoImage}
          />
          <Box sx={inactivityStyles.logoTextBlock}>
            <Typography sx={inactivityStyles.logoTitle}>De-ID Studio</Typography>
            <Typography sx={inactivityStyles.logoSubtitle}>De-ID & Synthesis</Typography>
          </Box>
        </Box>

        <Box sx={inactivityStyles.illustrationWrapper}>
          <Box
            component="img"
            src={inactivityImages.clock}
            alt="Session expired"
            sx={inactivityStyles.illustration}
          />
        </Box>

        <Box sx={inactivityStyles.content}>
          <Typography sx={inactivityStyles.title}>Your session has expired</Typography>

          <Typography sx={inactivityStyles.description}>
            Your session timed out due to inactivity.
            <br />
            Please sign in again to continue.
          </Typography>

          <Box component={RouterLink} to={ROUTES.LOGIN} sx={inactivityStyles.signInLink}>
            Sign in again
          </Box>
        </Box>
      </Box>

      <Box sx={inactivityStyles.mobileGradient} />
    </Box>
  );
};

export default Inactivity;

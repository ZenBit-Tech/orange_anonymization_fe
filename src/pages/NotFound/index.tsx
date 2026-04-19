import { Box, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { notFoundImages } from '@/assets/images/not-found';
import { notFoundStyles } from './styles';

const NotFound = () => {
  return (
    <Box sx={notFoundStyles.root}>
      <Box sx={notFoundStyles.container}>
        <Box sx={notFoundStyles.logoRow}>
          <Box
            component="img"
            src={notFoundImages.logo}
            alt="De-ID Studio logo"
            sx={notFoundStyles.logoImage}
          />
          <Box sx={notFoundStyles.logoTextBlock}>
            <Typography sx={notFoundStyles.logoTitle}>De-ID Studio</Typography>
            <Typography sx={notFoundStyles.logoSubtitle}>De-ID & Synthesis</Typography>
          </Box>
        </Box>

        <Box sx={notFoundStyles.illustrationWrapper}>
          <Box
            component="img"
            src={notFoundImages.error}
            alt="404"
            sx={notFoundStyles.illustrationCenter}
          />
        </Box>

        <Box sx={notFoundStyles.content}>
          <Typography sx={notFoundStyles.title}>Page not found</Typography>

          <Typography sx={notFoundStyles.description}>
            The page you&apos;re looking for doesn&apos;t exist
            <br />
            or may have been moved.
          </Typography>

          <Box component={RouterLink} to={ROUTES.LANDING} sx={notFoundStyles.homeLink}>
            Go to home
          </Box>
        </Box>
      </Box>

      <Box sx={notFoundStyles.mobileGradient} />
    </Box>
  );
};

export default NotFound;

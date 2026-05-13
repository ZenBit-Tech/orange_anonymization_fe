import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SyntheticDataForm from '@/components/business/syntheticData/SyntheticDataForm';

const SyntheticData = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#settings') {
      setTimeout(() => {
        const el = document.getElementById('settings');
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  }, [location.hash]);

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
      }}
    >
      <Box id="settings">
        <SyntheticDataForm />
      </Box>
    </Box>
  );
};

export default SyntheticData;

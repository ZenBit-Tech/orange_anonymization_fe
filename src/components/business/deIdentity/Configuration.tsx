import { useAppSelector } from '@/store/store';
import { Box, Typography } from '@mui/material';
import HIPAAConfiguration from './HIPAAConfiguration';

const Configuration = () => {
  const { currentJob } = useAppSelector((state) => state.jobs);

  return (
    <Box sx={{ mx: '20px' }}>
      <Typography sx={{ color: 'neutral.900', fontWeight: 600, fontSize: '24px', mb: '8px' }}>
        Configure De-Identification
      </Typography>
      <Typography sx={{ color: 'neutral.500', fontSize: '14px', mb: '48px' }}>
        Choose how patient data will be anonymized under HIPAA
      </Typography>

      {currentJob?.wizardState?.frameworkSelection === 'HIPAA' ? (
        <HIPAAConfiguration />
      ) : (
        <Box></Box>
      )}
    </Box>
  );
};

export default Configuration;

import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import SyntheticDataForm from '@/components/business/syntheticData/SyntheticDataForm';
import { useAppSelector } from '@/store/store';

const SyntheticData = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const currentJobId = useAppSelector((state) => state.jobs.currentJob?.id);
  const jobIdFromUrl = searchParams.get('jobId') || currentJobId || undefined;

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
        <SyntheticDataForm sourceJobId={jobIdFromUrl} />
      </Box>
    </Box>
  );
};

export default SyntheticData;

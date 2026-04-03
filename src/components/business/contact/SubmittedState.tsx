import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TaskAlt as TaskAltIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import type { FC } from 'react';

interface IProps {
  setSubmitted: (submitted: boolean) => void;
}

export const SubmittedState: FC<IProps> = ({ setSubmitted }) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TaskAltIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
        <Typography fontWeight={700} sx={{ mb: 1, color: 'common.white', fontSize: '24px' }}>
          {t('landing.contact.form.sent')}
        </Typography>
        <Typography sx={{ color: 'neutral.500', fontSize: '14px', mb: 2 }}>
          {t('landing.contact.form.success')}
        </Typography>
        <Typography sx={{ color: 'neutral.500', fontSize: '14px' }}>
          {t('landing.contact.form.successSubtitle')}
        </Typography>
      </Box>
      <Button
        variant="text"
        sx={{ mt: 2, color: 'neutral.500', textTransform: 'none' }}
        startIcon={<ArrowBackIcon />}
        onClick={() => setSubmitted(false)}
      >
        {t('landing.contact.form.backToForm')}
      </Button>
    </Box>
  );
};

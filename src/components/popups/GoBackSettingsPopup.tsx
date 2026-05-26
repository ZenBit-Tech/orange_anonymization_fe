import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import {
  Close as CloseIcon,
  WarningAmber as WarningAmberIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import BasePopup from '@/components/popups/BasePopup';

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const GoBackSettingsPopup: FC<IProps> = ({ isVisible, onClose, onConfirm }) => {
  const { t } = useTranslation();

  return (
    <BasePopup isVisible={isVisible} onClose={onClose}>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center', p: 4, width: 520 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <IconButton
            onClick={onClose}
            sx={{ color: 'neutral.500', '&:hover': { bgcolor: 'whiteOpacity.8' } }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <WarningAmberIcon
          sx={{ color: 'warning.main', mx: 'auto', height: 38, width: 44, mb: 3 }}
        />

        <Typography
          variant="h3"
          component="h2"
          align="center"
          sx={{ color: 'neutral.900', fontWeight: 'fontWeightMedium', mb: 1 }}
        >
          {t('deidentify.reviewResults.goBackPopup.title')}
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography
            variant="body2"
            align="center"
            sx={{ color: 'neutral.500', maxWidth: 420, mx: 'auto' }}
          >
            {t('deidentify.reviewResults.goBackPopup.message')}
          </Typography>
        </Box>

        <Box sx={{ height: 1, width: '100%', bgcolor: 'neutral.200', mb: 3 }} />

        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
          <Button
            onClick={onConfirm}
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIcon />}
            sx={{
              minWidth: 140,
              textTransform: 'none',
              fontWeight: 'fontWeightMedium',
            }}
          >
            {t('deidentify.reviewResults.goBackPopup.goBack')}
          </Button>

          <Button
            onClick={onClose}
            variant="text"
            sx={{
              color: (theme) => theme.palette.neutral[700],
              textTransform: 'none',
              fontWeight: 'fontWeightMedium',
            }}
          >
            {t('deidentify.reviewResults.goBackPopup.stayOnReview')}
          </Button>
        </Stack>
      </Box>
    </BasePopup>
  );
};

export default GoBackSettingsPopup;

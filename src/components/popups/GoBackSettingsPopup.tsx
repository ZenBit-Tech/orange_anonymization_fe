import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { Close as CloseIcon, WarningAmber as WarningAmberIcon } from '@mui/icons-material';
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
        sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center', p: 1, width: 460 }}
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
          sx={{ color: 'warning.main', mx: 'auto', height: 55, width: 55, mb: 1 }}
        />

        <Typography
          variant="h3"
          component="h2"
          align="center"
          sx={{ color: 'neutral.900', fontWeight: 'fontWeightBold', mb: 1 }}
        >
          {t('deIdentify.reviewResults.goBackPopup.title')}
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography
            variant="body2"
            align="center"
            sx={{ color: 'neutral.500', maxWidth: 420, mx: 'auto', mb: 0 }}
          >
            {t('deIdentify.reviewResults.goBackPopup.messageLine1')}
          </Typography>
          <Typography
            variant="body2"
            align="center"
            sx={{ color: 'neutral.500', maxWidth: 420, mx: 'auto' }}
          >
            {t('deIdentify.reviewResults.goBackPopup.messageLine2')}
          </Typography>
        </Box>

        <Box sx={{ height: 1, width: '100%', bgcolor: 'neutral.200', mb: 2 }} />

        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
          <Button
            onClick={onConfirm}
            variant="contained"
            color="primary"
            sx={{
              minWidth: 140,
              textTransform: 'none',
              fontWeight: 'fontWeightMedium',
            }}
          >
            {t('deIdentify.reviewResults.goBackPopup.goBack')}
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
            {t('deIdentify.reviewResults.goBackPopup.stayOnReview')}
          </Button>
        </Stack>
      </Box>
    </BasePopup>
  );
};

export default GoBackSettingsPopup;

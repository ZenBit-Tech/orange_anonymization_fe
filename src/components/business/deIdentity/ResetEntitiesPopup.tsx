import { useTranslation } from 'react-i18next';
import type { FC } from 'react';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BasePopup from '@/components/popups/BasePopup';

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  onReset: () => void;
}

const ResetEntitiesPopup: FC<IProps> = ({ isVisible, onClose, onReset }) => {
  const { t } = useTranslation();

  return (
    <BasePopup isVisible={isVisible} onClose={onClose}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <IconButton
            onClick={onClose}
            sx={{ color: 'neutral.500', '&:hover': { bgcolor: 'whiteOpacity.8' } }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <WarningAmberIcon
          sx={{ color: 'warning.main', mx: 'auto', height: '38px', width: '44px', mb: '30px' }}
        />

        <Typography
          variant="h3"
          component="h2"
          align="center"
          sx={{ color: 'neutral.900', fontWeight: 'fontWeightMedium', mb: '8px' }}
        >
          {t('deIdentify.settings.resetDialog.title')}
        </Typography>

        <Box sx={{ mb: '24px' }}>
          <Typography variant="body2" align="center" sx={{ color: 'neutral.500' }}>
            {t('deIdentify.settings.resetDialog.message')}
          </Typography>
        </Box>

        <Box sx={{ height: '1px', width: '100%', bgcolor: 'neutral.500', mb: '24px' }}></Box>

        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            onClick={onClose}
            variant="outlined"
            color="inherit"
            sx={{
              color: 'neutral.700',
              borderColor: 'whiteOpacity.8',
              fontWeight: 'fontWeightMedium',
            }}
            startIcon={<ArrowBackIcon />}
          >
            {t('common.cancel')}
          </Button>

          <Button
            onClick={onReset}
            sx={{
              color: 'common.white',
              bgcolor: 'primary.500',
              fontWeight: 'fontWeightMedium',
              '&:hover': { opacity: 0.8 },
            }}
            endIcon={<ArrowForwardIcon />}
          >
            {t('deIdentify.settings.resetDialog.confirm')}
          </Button>
        </Stack>
      </Box>
    </BasePopup>
  );
};

export default ResetEntitiesPopup;

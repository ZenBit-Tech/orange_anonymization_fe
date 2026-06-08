import { type FC } from 'react';
import BasePopup from './BasePopup';
import CloseIcon from '@mui/icons-material/Close';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, IconButton, Typography, Box, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface IProps {
  isVisible: boolean;
  onClose: () => void;
}

const SyntheticWarningPopup: FC<IProps> = ({ isVisible, onClose }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onDeIdentify = () => {
    onClose();
    navigate('/app/de-identify');
  };

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
          {t('common.warning')}
        </Typography>

        <Box sx={{ mb: '24px' }}>
          <Typography variant="body2" align="center" sx={{ color: 'neutral.500' }}>
            {t('common.warningSyntheticMessage')}
          </Typography>
          <Typography variant="body2" align="center" sx={{ color: 'neutral.500' }}>
            {t('common.warningSyntheticMessage2')}
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
            onClick={onDeIdentify}
            sx={{
              color: 'common.white',
              bgcolor: 'primary.500',
              fontWeight: 'fontWeightMedium',
              '&:hover': { opacity: 0.8 },
            }}
            endIcon={<ArrowForwardIcon />}
          >
            {t('common.deIdentify')}
          </Button>
        </Stack>
      </Box>
    </BasePopup>
  );
};

export default SyntheticWarningPopup;

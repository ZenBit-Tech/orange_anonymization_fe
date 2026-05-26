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
  onClose: () => void; // Користувач передумав (Cancel)
  onConfirm: () => void; // Користувач підтвердив, що хоче назад (Confirm)
}

const GoBackSettingsPopup: FC<IProps> = ({ isVisible, onClose, onConfirm }) => {
  const { t } = useTranslation();

  return (
    <BasePopup isVisible={isVisible} onClose={onClose}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
        {/* Кнопка закриття (хрестик) — працює як скасування */}
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <IconButton
            onClick={onClose}
            sx={{ color: 'neutral.500', '&:hover': { bgcolor: 'whiteOpacity.8' } }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Іконка попередження */}
        <WarningAmberIcon
          sx={{ color: 'warning.main', mx: 'auto', height: '38px', width: '44px', mb: '30px' }}
        />

        {/* Заголовок модалки */}
        <Typography
          variant="h3"
          component="h2"
          align="center"
          sx={{ color: 'neutral.900', fontWeight: 'fontWeightMedium', mb: '8px' }}
        >
          {t('deidentify.reviewResults.goBackPopup.title')}
          {/* Або прямий текст, якщо ще немає перекладів: "Go back to settings?" */}
        </Typography>

        {/* Опис/Текст попередження */}
        <Box sx={{ mb: '24px' }}>
          <Typography variant="body2" align="center" sx={{ color: 'neutral.500' }}>
            {t('deidentify.reviewResults.goBackPopup.message')}
            {/* Наприклад: "Are you sure you want to go back? Your current review progress might be lost." */}
          </Typography>
        </Box>

        <Box sx={{ height: '1px', width: '100%', bgcolor: 'neutral.500', mb: '24px' }}></Box>

        {/* Кнопки дій */}
        <Stack direction="row" spacing={2} justifyContent="center">
          {/* Скасувати (Залишитися на екрані результатів) */}
          <Button
            onClick={onClose}
            variant="outlined"
            color="inherit"
            sx={{
              color: 'neutral.700',
              borderColor: 'whiteOpacity.8',
              fontWeight: 'fontWeightMedium',
            }}
          >
            {t('common.cancel')}
          </Button>

          {/* Підтвердити (Повернутися на Крок 3) */}
          <Button
            onClick={onConfirm}
            variant="contained" // Змінив на contained, зазвичай головна дія зафарбована
            color="warning" // або primary, залежно від Figma
            sx={{
              fontWeight: 'fontWeightMedium',
            }}
            startIcon={<ArrowBackIcon />}
          >
            {t('common.confirm')} {/* або t('deidentify.reviewResults.goBackPopup.confirmBtn') */}
          </Button>
        </Stack>
      </Box>
    </BasePopup>
  );
};

export default GoBackSettingsPopup;

import type { FC } from 'react';
import BasePopup from './BasePopup';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import {
  Close as CloseIcon,
  WarningAmber as WarningAmberIcon,
  ArrowBack as ArrowBackIcon,
  Loop as LoopIcon,
} from '@mui/icons-material';

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  onRegenerate: () => void;
}

const SyntheticRegeneratePopup: FC<IProps> = ({ isVisible, onClose, onRegenerate }) => {
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
          Regenerate dataset?
        </Typography>

        <Box sx={{ mb: '24px' }}>
          <Typography variant="body2" align="center" sx={{ color: 'neutral.500' }}>
            Current data exists only in this session.
          </Typography>
          <Typography variant="body2" align="center" sx={{ color: 'neutral.500' }}>
            Download before regenerating to avoid data loss.
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
            Cancel
          </Button>

          <Button
            onClick={onRegenerate}
            sx={{
              color: 'common.white',
              bgcolor: 'primary.500',
              fontWeight: 'fontWeightMedium',
              '&:hover': { opacity: 0.8 },
            }}
            endIcon={<LoopIcon />}
          >
            Regenerate
          </Button>
        </Stack>
      </Box>
    </BasePopup>
  );
};

export default SyntheticRegeneratePopup;

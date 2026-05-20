import type { FC } from 'react';
import BasePopup from './BasePopup';
import {
  alpha,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import {
  Close as CloseIcon,
  ArrowCircleDown as ArrowCircleDownIcon,
  ArrowBack as ArrowBackIcon,
  InfoOutlined as InfoOutlinedIcon,
} from '@mui/icons-material';
import { FONT_SIZES } from '@/constants';

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  onDownload: () => void;
}

const SyntheticDownloadPopup: FC<IProps> = ({ isVisible, onClose, onDownload }) => {
  return (
    <BasePopup isVisible={isVisible} onClose={onClose}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '8px' }}
        >
          <Typography
            variant="h3"
            component="h2"
            align="center"
            sx={{ color: 'neutral.900', fontWeight: 'fontWeightMedium' }}
          >
            Download synthetic dataset
          </Typography>

          <IconButton
            onClick={onClose}
            sx={{ color: 'neutral.500', '&:hover': { bgcolor: 'whiteOpacity.8' } }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ bgcolor: 'neutral.50', borderRadius: '8px', p: '16px', mb: '20px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>Format</Typography>
            <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.900' }}>CSV</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>Records</Typography>
            <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.900' }}>1,000</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>Fields</Typography>
            <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.900' }}>23</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>
              Framework
            </Typography>
            <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.900' }}>
              HIPAA Safe Harbor
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>
              Validation
            </Typography>
            <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.900' }}>
              Validation
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            px: '16px',
            py: '12px',
            mb: '20px',
            borderRadius: '8px',
            border: '1px solid',
            borderColor: 'info.main',
            boxShadow: (theme) => `0px 1px 3px 0px ${alpha(theme.palette.common.black, 0.14)}`,
            bgcolor: (theme) => `${alpha(theme.palette.info.light, 0.3)}`,
          }}
        >
          <InfoOutlinedIcon sx={{ color: 'info.main' }} />
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'info.main' }}>
            Generated data will not be stored after this session.
          </Typography>
        </Box>

        <FormGroup
          sx={{
            color: 'neutral.700',
            mb: '20px',
            '& .MuiFormControlLabel-root': {
              marginBottom: '-10px',
            },
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                sx={{ '&.Mui-checked': { color: 'primary.500' }, color: 'neutral.400' }}
              />
            }
            label="Include validation report"
            slotProps={{
              typography: { fontSize: FONT_SIZES.xs },
            }}
          />
          <FormControlLabel
            control={
              <Checkbox sx={{ '&.Mui-checked': { color: 'primary.500' }, color: 'neutral.400' }} />
            }
            label="Include schema summary"
            slotProps={{
              typography: { fontSize: FONT_SIZES.xs },
            }}
          />
        </FormGroup>

        <Box sx={{ height: '1px', width: '100%', bgcolor: 'neutral.200', mb: '20px' }}></Box>

        <Stack direction="row" spacing={2} justifyContent="end">
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
            onClick={onDownload}
            sx={{
              color: 'common.white',
              bgcolor: 'primary.500',
              fontWeight: 'fontWeightMedium',
              '&:hover': { opacity: 0.8 },
            }}
            startIcon={<ArrowCircleDownIcon />}
          >
            Download
          </Button>
        </Stack>
      </Box>
    </BasePopup>
  );
};

export default SyntheticDownloadPopup;

import { FONT_SIZES } from '@/constants';
import { alpha, Box, Button, Drawer, Typography } from '@mui/material';
import type { FC } from 'react';
import {
  Close as CloseIcon,
  CheckCircleOutlined as CheckCircleOutlinedIcon,
  Check as CheckIcon,
  WarningAmber as WarningAmberIcon,
  InfoOutlined as InfoOutlinedIcon,
  ArrowCircleDownOutlined as ArrowCircleDownOutlinedIcon,
} from '@mui/icons-material';

interface IProps {
  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;
  onDownload: () => void;
}

const ValidationDetailsDrawer: FC<IProps> = ({ drawerOpen, setDrawerOpen, onDownload }) => {
  const handleDownload = () => {
    setDrawerOpen(false);
    onDownload();
  };

  return (
    <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
      <Box sx={{ p: '32px', width: '560px' }}>
        <Box
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: '6px' }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: FONT_SIZES.lg,
                color: 'neutral.900',
                fontWeight: 'fontWeightSemiBold',
              }}
            >
              Validation Details
            </Typography>

            <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.400' }}>
              HIPAA Safe Harbor
            </Typography>
          </Box>

          <Button onClick={() => setDrawerOpen(false)} sx={{ minWidth: 'auto', p: 0 }}>
            <CloseIcon sx={{ color: 'neutral.500' }} />
          </Button>
        </Box>

        <Box sx={{ height: '1px', width: '100%', bgcolor: 'neutral.200', my: '20px' }}></Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '20px' }}>
          <CheckCircleOutlinedIcon sx={{ color: 'success.main' }} />
          <Typography
            sx={{ fontSize: FONT_SIZES.md, fontWeight: 'fontWeightMedium', color: 'neutral.700' }}
          >
            Passed with review notes
          </Typography>
        </Box>

        <Typography
          sx={{
            color: 'neutral.400',
            fontSize: FONT_SIZES.xs,
            fontWeight: 'fontWeightMedium',
            mb: '12px',
          }}
        >
          CHECKS
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '6px' }}>
          <CheckIcon sx={{ color: 'success.main' }} />
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>Names</Typography>
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.700' }}>Removed</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '6px' }}>
          <CheckIcon sx={{ color: 'success.main' }} />
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>
            Phone numbers
          </Typography>
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.700' }}>Removed</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '6px' }}>
          <CheckIcon sx={{ color: 'success.main' }} />
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>
            Email addresses
          </Typography>
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.700' }}>Removed</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '6px' }}>
          <CheckIcon sx={{ color: 'success.main' }} />
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>
            Medical record numbers
          </Typography>
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.700' }}>Removed</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '6px' }}>
          <CheckIcon sx={{ color: 'success.main' }} />
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>Dates</Typography>
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.700' }}>Removed</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '6px' }}>
          <CheckIcon sx={{ color: 'success.main' }} />
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>
            Geographic data
          </Typography>
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.700' }}>Removed</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '6px' }}>
          <CheckIcon sx={{ color: 'success.main' }} />
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>
            Free-text fields
          </Typography>
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.700' }}>Removed</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '6px' }}>
          <CheckIcon sx={{ color: 'success.main' }} />
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>
            Export format
          </Typography>
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.700' }}>Removed</Typography>
        </Box>

        <Box sx={{ height: '1px', width: '100%', bgcolor: 'neutral.200', my: '20px' }}></Box>

        <Typography
          sx={{
            color: 'neutral.400',
            fontSize: FONT_SIZES.xs,
            fontWeight: 'fontWeightMedium',
            mb: '12px',
          }}
        >
          WARNINGS
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '6px' }}>
          <WarningAmberIcon sx={{ color: 'warning.main' }} />
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>
            Generated_note_text
          </Typography>
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.700' }}>
            Medium confidence
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '6px' }}>
          <WarningAmberIcon sx={{ color: 'warning.main' }} />
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>
            Diagnosis code
          </Typography>
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.700' }}>
            Medium consistancy
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '38px' }}>
          <WarningAmberIcon sx={{ color: 'warning.main' }} />
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>
            Provider type
          </Typography>
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.700' }}>
            Medium confidence
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            px: '16px',
            py: '12px',
            borderRadius: '8px',
            border: '1px solid',
            borderColor: 'info.main',
            boxShadow: (theme) => `0px 1px 3px 0px ${alpha(theme.palette.common.black, 0.14)}`,
            bgcolor: (theme) => `${alpha(theme.palette.info.light, 0.3)}`,
          }}
        >
          <InfoOutlinedIcon sx={{ color: 'info.main' }} />
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'info.main' }}>
            Review warnings before using this dataset in regulated workflows
          </Typography>
        </Box>

        <Box sx={{ height: '1px', width: '100%', bgcolor: 'neutral.200', my: '20px' }}></Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
          <Button
            sx={{ color: 'primary.500', fontSize: FONT_SIZES.sm, fontWeight: 'fontWeightMedium' }}
            onClick={() => setDrawerOpen(false)}
          >
            Cancel
          </Button>
          <Button
            sx={{
              color: 'common.white',
              fontSize: FONT_SIZES.sm,
              fontWeight: 'fontWeightMedium',
              bgcolor: 'primary.500',
            }}
            startIcon={<ArrowCircleDownOutlinedIcon />}
            onClick={handleDownload}
          >
            Download
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ValidationDetailsDrawer;

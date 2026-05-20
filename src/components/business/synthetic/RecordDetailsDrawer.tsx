import { FONT_SIZES } from '@/constants';
import { Box, Button, Drawer, Typography } from '@mui/material';
import type { FC } from 'react';
import { Close as CloseIcon, Check as CheckIcon } from '@mui/icons-material';

interface IProps {
  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;
}

const RecordDetailsDrawer: FC<IProps> = ({ drawerOpen, setDrawerOpen }) => {
  return (
    <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
      <Box sx={{ p: '32px', width: '400px' }}>
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
              Record details
            </Typography>

            <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.400' }}>
              SYN-00041
            </Typography>
          </Box>

          <Button onClick={() => setDrawerOpen(false)} sx={{ minWidth: 'auto', p: 0 }}>
            <CloseIcon sx={{ color: 'neutral.500' }} />
          </Button>
        </Box>

        <Box sx={{ height: '1px', width: '100%', bgcolor: 'neutral.200', my: '20px' }}></Box>

        <Box
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: '4px' }}
        >
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>
            Document type
          </Typography>
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.900' }}>
            Discharge Summary
          </Typography>
        </Box>

        <Box
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: '4px' }}
        >
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>Compliance</Typography>
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.900' }}>Passed</Typography>
        </Box>

        <Box
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: '4px' }}
        >
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>Compliance</Typography>
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.900' }}>Compliance</Typography>
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
          GENERATED FIELDS
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckIcon sx={{ color: 'success.main' }} />
            <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>
              Age range
            </Typography>
          </Box>
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.700' }}>55-64</Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckIcon sx={{ color: 'success.main' }} />
            <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>
              Encounter date
            </Typography>
          </Box>
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.700' }}>2025-04-14</Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckIcon sx={{ color: 'success.main' }} />
            <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>Category</Typography>
          </Box>
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.700' }}>
            Endocrinology
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckIcon sx={{ color: 'success.main' }} />
            <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>
              Diagnosis
            </Typography>
          </Box>
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.700' }}>E11.9</Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckIcon sx={{ color: 'success.main' }} />
            <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>
              Discharge status
            </Typography>
          </Box>
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.700' }}>Follow-up</Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckIcon sx={{ color: 'success.main' }} />
            <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>
              Medication
            </Typography>
          </Box>
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.700' }}>Metformin</Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckIcon sx={{ color: 'success.main' }} />
            <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>
              Provider type
            </Typography>
          </Box>
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.700' }}>
            Endocrinologist
          </Typography>
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
          CLINICAL NOTE
        </Typography>

        <Box sx={{ p: '12px', borderRadius: '8px', bgcolor: 'neutral.50' }}>
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>
            Patient presented for routine follow-up. Synthetic note generated for testing purposes.
            No direct identifiers detected.
          </Typography>
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
          COMPLIANCE
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckIcon sx={{ color: 'success.main' }} />
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>
            No direct identifiers detected
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckIcon sx={{ color: 'success.main' }} />
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>
            Dates transformed
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckIcon sx={{ color: 'success.main' }} />
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>
            Field confidence: High
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckIcon sx={{ color: 'success.main' }} />
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>
            Synthetic identifiers generated
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckIcon sx={{ color: 'success.main' }} />
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>
            Direct identifiers removed
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default RecordDetailsDrawer;

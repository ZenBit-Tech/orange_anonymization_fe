import { FONT_SIZES } from '@/constants';
import {
  alpha,
  Box,
  Button,
  Checkbox,
  Drawer,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';
import type { FC } from 'react';
import { Close as CloseIcon, InfoOutlined as InfoOutlinedIcon } from '@mui/icons-material';

interface IProps {
  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;
}

const CustomizeColumnsDrawer: FC<IProps> = ({ drawerOpen, setDrawerOpen }) => {
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
              Customize columns
            </Typography>

            <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.400' }}>
              Choose fields to display
            </Typography>
          </Box>

          <Button onClick={() => setDrawerOpen(false)} sx={{ minWidth: 'auto', p: 0 }}>
            <CloseIcon sx={{ color: 'neutral.500' }} />
          </Button>
        </Box>

        <Box sx={{ height: '1px', width: '100%', bgcolor: 'neutral.200', my: '20px' }}></Box>

        <Box
          sx={{
            display: 'flex',
            gap: '8px',
            px: '16px',
            py: '12px',
            borderRadius: '8px',
            border: '1px solid',
            borderColor: 'info.main',
            boxShadow: (theme) => `0px 1px 3px 0px ${alpha(theme.palette.common.black, 0.14)}`,
            bgcolor: (theme) => `${alpha(theme.palette.info.light, 0.3)}`,
            mb: '24px',
          }}
        >
          <InfoOutlinedIcon sx={{ color: 'info.main' }} />
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'info.main' }}>
            This only affects the preview table. Downloaded dataset includes all 23 fields
          </Typography>
        </Box>

        <Typography
          sx={{
            color: 'neutral.700',
            fontSize: FONT_SIZES.sm,
            fontWeight: 'fontWeightMedium',
            mb: '12px',
          }}
        >
          Selected 5 of 23
        </Typography>

        <FormGroup
          sx={{
            color: 'neutral.700',
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
            label="Record ID"
            slotProps={{
              typography: { fontSize: FONT_SIZES.xs },
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                sx={{ '&.Mui-checked': { color: 'primary.500' }, color: 'neutral.400' }}
              />
            }
            label="Document Type"
            slotProps={{
              typography: { fontSize: FONT_SIZES.xs },
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                sx={{ '&.Mui-checked': { color: 'primary.500' }, color: 'neutral.400' }}
              />
            }
            label="Age Range"
            slotProps={{
              typography: { fontSize: FONT_SIZES.xs },
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                sx={{ '&.Mui-checked': { color: 'primary.500' }, color: 'neutral.400' }}
              />
            }
            label="Date"
            slotProps={{
              typography: { fontSize: FONT_SIZES.xs },
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                sx={{ '&.Mui-checked': { color: 'primary.500' }, color: 'neutral.400' }}
              />
            }
            label="Quality"
            slotProps={{
              typography: { fontSize: FONT_SIZES.xs },
            }}
          />
        </FormGroup>

        <Box sx={{ height: '1px', width: '100%', bgcolor: 'neutral.200', my: '20px' }}></Box>

        <Typography
          sx={{
            color: 'neutral.400',
            fontSize: FONT_SIZES.xs,
            fontWeight: 'fontWeightMedium',
            mb: '12px',
          }}
        >
          ADDITIONAL FIELDS
        </Typography>

        <Box sx={{ display: 'flex' }}>
          <FormGroup
            sx={{
              color: 'neutral.700',
              '& .MuiFormControlLabel-root': {
                marginBottom: '-10px',
              },
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ '&.Mui-checked': { color: 'primary.500' }, color: 'neutral.400' }}
                />
              }
              label="PERSON"
              slotProps={{
                typography: { fontSize: FONT_SIZES.xs },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ '&.Mui-checked': { color: 'primary.500' }, color: 'neutral.400' }}
                />
              }
              label="LOCATION"
              slotProps={{
                typography: { fontSize: FONT_SIZES.xs },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ '&.Mui-checked': { color: 'primary.500' }, color: 'neutral.400' }}
                />
              }
              label="DATE"
              slotProps={{
                typography: { fontSize: FONT_SIZES.xs },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ '&.Mui-checked': { color: 'primary.500' }, color: 'neutral.400' }}
                />
              }
              label="PHONE"
              slotProps={{
                typography: { fontSize: FONT_SIZES.xs },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ '&.Mui-checked': { color: 'primary.500' }, color: 'neutral.400' }}
                />
              }
              label="FAX"
              slotProps={{
                typography: { fontSize: FONT_SIZES.xs },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ '&.Mui-checked': { color: 'primary.500' }, color: 'neutral.400' }}
                />
              }
              label="EMAIL"
              slotProps={{
                typography: { fontSize: FONT_SIZES.xs },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ '&.Mui-checked': { color: 'primary.500' }, color: 'neutral.400' }}
                />
              }
              label="SSN"
              slotProps={{
                typography: { fontSize: FONT_SIZES.xs },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ '&.Mui-checked': { color: 'primary.500' }, color: 'neutral.400' }}
                />
              }
              label="MRN"
              slotProps={{
                typography: { fontSize: FONT_SIZES.xs },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ '&.Mui-checked': { color: 'primary.500' }, color: 'neutral.400' }}
                />
              }
              label="BENEFICIARY"
              slotProps={{
                typography: { fontSize: FONT_SIZES.xs },
              }}
            />
          </FormGroup>

          <FormGroup
            sx={{
              color: 'neutral.700',
              '& .MuiFormControlLabel-root': {
                marginBottom: '-10px',
              },
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ '&.Mui-checked': { color: 'primary.500' }, color: 'neutral.400' }}
                />
              }
              label="ACCOUNT"
              slotProps={{
                typography: { fontSize: FONT_SIZES.xs },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ '&.Mui-checked': { color: 'primary.500' }, color: 'neutral.400' }}
                />
              }
              label="LICENSE"
              slotProps={{
                typography: { fontSize: FONT_SIZES.xs },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ '&.Mui-checked': { color: 'primary.500' }, color: 'neutral.400' }}
                />
              }
              label="VEHICLE"
              slotProps={{
                typography: { fontSize: FONT_SIZES.xs },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ '&.Mui-checked': { color: 'primary.500' }, color: 'neutral.400' }}
                />
              }
              label="DEVICE"
              slotProps={{
                typography: { fontSize: FONT_SIZES.xs },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ '&.Mui-checked': { color: 'primary.500' }, color: 'neutral.400' }}
                />
              }
              label="URL"
              slotProps={{
                typography: { fontSize: FONT_SIZES.xs },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ '&.Mui-checked': { color: 'primary.500' }, color: 'neutral.400' }}
                />
              }
              label="IP"
              slotProps={{
                typography: { fontSize: FONT_SIZES.xs },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ '&.Mui-checked': { color: 'primary.500' }, color: 'neutral.400' }}
                />
              }
              label="BIOMETRIC"
              slotProps={{
                typography: { fontSize: FONT_SIZES.xs },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ '&.Mui-checked': { color: 'primary.500' }, color: 'neutral.400' }}
                />
              }
              label="PHOTO"
              slotProps={{
                typography: { fontSize: FONT_SIZES.xs },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ '&.Mui-checked': { color: 'primary.500' }, color: 'neutral.400' }}
                />
              }
              label="OTHER"
              slotProps={{
                typography: { fontSize: FONT_SIZES.xs },
              }}
            />
          </FormGroup>
        </Box>

        <Box sx={{ height: '1px', width: '100%', bgcolor: 'neutral.200', my: '20px' }}></Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button
            sx={{
              color: 'primary.500',
              fontSize: FONT_SIZES.md,
              fontWeight: 'fontWeightMedium',
            }}
          >
            Reset to default
          </Button>
          <Button
            sx={{
              color: 'common.white',
              fontSize: FONT_SIZES.md,
              fontWeight: 'fontWeightMedium',
              bgcolor: 'primary.500',
            }}
          >
            Apply
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CustomizeColumnsDrawer;

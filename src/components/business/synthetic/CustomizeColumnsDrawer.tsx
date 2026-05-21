import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
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
import { Close as CloseIcon, InfoOutlined as InfoOutlinedIcon } from '@mui/icons-material';

interface IProps {
  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;
}

const formGroupStyle = {
  color: 'neutral.700',
  flex: 1,
  '& .MuiFormControlLabel-root': {
    marginBottom: '-10px',
  },
};

interface CustomCheckboxFieldProps {
  label: string;
  defaultChecked?: boolean;
}

const CustomCheckboxField = ({ label, defaultChecked = false }: CustomCheckboxFieldProps) => (
  <FormControlLabel
    control={
      <Checkbox
        defaultChecked={defaultChecked}
        sx={{ '&.Mui-checked': { color: 'primary.500' }, color: 'neutral.400' }}
      />
    }
    label={label}
    slotProps={{
      typography: { fontSize: FONT_SIZES.xs },
    }}
  />
);

const CustomizeColumnsDrawer: FC<IProps> = ({ drawerOpen, setDrawerOpen }) => {
  const { t } = useTranslation();

  const baseFields = [
    'syntheticData.results.drawers.customizeColumns.fields.recordId',
    'syntheticData.results.drawers.customizeColumns.fields.documentType',
    'syntheticData.results.drawers.customizeColumns.fields.ageRange',
    'syntheticData.results.drawers.customizeColumns.fields.date',
    'syntheticData.results.drawers.customizeColumns.fields.quality',
  ];

  const additionalFieldsCol1 = [
    { key: 'dashboard.entityTypesChart.labels.PERSON' },
    { key: 'dashboard.entityTypesChart.labels.LOCATION' },
    { key: 'dashboard.entityTypesChart.labels.DATE_TIME' },
    { key: 'dashboard.entityTypesChart.labels.PHONE_NUMBER' },
    { label: 'FAX' },
    { key: 'dashboard.entityTypesChart.labels.EMAIL_ADDRESS' },
    { key: 'dashboard.entityTypesChart.labels.US_SSN' },
    { key: 'dashboard.entityTypesChart.labels.MEDICAL_RECORD_NUMBER' },
    { label: 'BENEFICIARY' },
  ];

  const additionalFieldsCol2 = [
    { key: 'dashboard.entityTypesChart.labels.IBAN_CODE' },
    { label: 'LICENSE' },
    { key: 'dashboard.entityTypesChart.labels.US_PASSPORT' },
    { key: 'dashboard.entityTypesChart.labels.DEVICE_ID' },
    { key: 'dashboard.entityTypesChart.labels.URL' },
    { key: 'dashboard.entityTypesChart.labels.IP_ADDRESS' },
    { key: 'dashboard.entityTypesChart.labels.BIOMETRIC' },
    { key: 'dashboard.entityTypesChart.labels.PHOTO' },
    { label: 'OTHER' },
  ];

  const getLabel = (field: { key?: string; label?: string }) =>
    field.key ? t(field.key) : field.label || '';

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
              {t('syntheticData.results.drawers.customizeColumns.title')}
            </Typography>
            <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.400' }}>
              {t('syntheticData.results.drawers.customizeColumns.subtitle')}
            </Typography>
          </Box>
          <Button onClick={() => setDrawerOpen(false)} sx={{ minWidth: 'auto', p: 0 }}>
            <CloseIcon sx={{ color: 'neutral.500' }} />
          </Button>
        </Box>

        <Box sx={{ height: '1px', width: '100%', bgcolor: 'neutral.200', my: '20px' }}></Box>

        <Box
          sx={(theme) => ({
            display: 'flex',
            gap: '8px',
            px: '16px',
            py: '12px',
            borderRadius: '8px',
            border: '1px solid',
            borderColor: 'info.main',
            bgcolor: alpha(theme.palette.info.light, 0.3),
            mb: '24px',
            boxShadow: `0px 1px 3px 0px ${alpha(theme.palette.common.black, 0.14)}`,
          })}
        >
          <InfoOutlinedIcon sx={{ color: 'info.main' }} />
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'info.main' }}>
            {t('syntheticData.results.drawers.customizeColumns.info')}
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
          {t('syntheticData.results.drawers.customizeColumns.selectedCount', {
            selected: 5,
            total: 23,
          })}
        </Typography>

        <FormGroup sx={formGroupStyle}>
          {baseFields.map((fieldKey) => (
            <CustomCheckboxField key={fieldKey} label={t(fieldKey)} defaultChecked />
          ))}
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
          {t('syntheticData.results.drawers.customizeColumns.additionalFields')}
        </Typography>

        <Box sx={{ display: 'flex', gap: '16px' }}>
          <FormGroup sx={formGroupStyle}>
            {additionalFieldsCol1.map((field, index) => (
              <CustomCheckboxField key={field.key || index} label={getLabel(field)} />
            ))}
          </FormGroup>

          <FormGroup sx={formGroupStyle}>
            {additionalFieldsCol2.map((field, index) => (
              <CustomCheckboxField key={field.key || index} label={getLabel(field)} />
            ))}
          </FormGroup>
        </Box>

        <Box sx={{ height: '1px', width: '100%', bgcolor: 'neutral.200', my: '20px' }}></Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button
            sx={{ color: 'primary.500', fontSize: FONT_SIZES.md, fontWeight: 'fontWeightMedium' }}
          >
            {t('syntheticData.results.drawers.customizeColumns.resetToDefault')}
          </Button>
          <Button
            sx={{
              color: 'common.white',
              fontSize: FONT_SIZES.md,
              fontWeight: 'fontWeightMedium',
              bgcolor: 'primary.500',
              '&:hover': { bgcolor: 'primary.600' },
            }}
          >
            {t('syntheticData.results.drawers.customizeColumns.apply')}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CustomizeColumnsDrawer;

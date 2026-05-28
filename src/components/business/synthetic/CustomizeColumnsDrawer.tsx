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
import { useState } from 'react';

interface IProps {
  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;
  selectedColumns: string[];
  onApplyColumns: (columns: string[]) => void;
}

const formGroupStyle = {
  color: 'neutral.700',
  flex: 1,
  '& .MuiFormControlLabel-root': {
    marginBottom: '-10px',
  },
};

const BASE_COLUMNS = ['record_id', 'docType', 'age_range', 'date', 'quality'];

const CustomizeColumnsDrawer: FC<IProps> = ({
  drawerOpen,
  setDrawerOpen,
  selectedColumns,
  onApplyColumns,
}) => {
  const { t } = useTranslation();

  const additionalFieldsCol1 = [
    { id: 'PERSON', key: 'dashboard.entityTypesChart.labels.PERSON' },
    { id: 'LOCATION', key: 'dashboard.entityTypesChart.labels.LOCATION' },
    { id: 'DATE_TIME', key: 'dashboard.entityTypesChart.labels.DATE_TIME' },
    { id: 'PHONE_NUMBER', key: 'dashboard.entityTypesChart.labels.PHONE_NUMBER' },
    { id: 'FAX', label: 'FAX' },
    { id: 'EMAIL_ADDRESS', key: 'dashboard.entityTypesChart.labels.EMAIL_ADDRESS' },
    { id: 'US_SSN', key: 'dashboard.entityTypesChart.labels.US_SSN' },
    { id: 'MEDICAL_RECORD_NUMBER', key: 'dashboard.entityTypesChart.labels.MEDICAL_RECORD_NUMBER' },
    { id: 'BENEFICIARY', label: 'BENEFICIARY' },
  ];

  const additionalFieldsCol2 = [
    { id: 'IBAN_CODE', key: 'dashboard.entityTypesChart.labels.IBAN_CODE' },
    { id: 'LICENSE', label: 'LICENSE' },
    { id: 'US_PASSPORT', key: 'dashboard.entityTypesChart.labels.US_PASSPORT' },
    { id: 'DEVICE_ID', key: 'dashboard.entityTypesChart.labels.DEVICE_ID' },
    { id: 'URL', key: 'dashboard.entityTypesChart.labels.URL' },
    { id: 'IP_ADDRESS', key: 'dashboard.entityTypesChart.labels.IP_ADDRESS' },
    { id: 'BIOMETRIC', key: 'dashboard.entityTypesChart.labels.BIOMETRIC' },
    { id: 'PHOTO', key: 'dashboard.entityTypesChart.labels.PHOTO' },
    { id: 'OTHER', label: 'OTHER' },
  ];

  const allFieldsCount =
    BASE_COLUMNS.length + additionalFieldsCol1.length + additionalFieldsCol2.length;

  const [localSelected, setLocalSelected] = useState<string[]>(selectedColumns);

  const handleCheckboxChange = (id: string, checked: boolean) => {
    if (checked) {
      setLocalSelected((prev) => [...prev, id]);
    } else {
      setLocalSelected((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleApply = () => {
    onApplyColumns(localSelected);
    setDrawerOpen(false);
  };

  const handleReset = () => {
    setLocalSelected(BASE_COLUMNS);
  };

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
            selected: localSelected.length,
            total: allFieldsCount,
          })}
        </Typography>

        <FormGroup sx={formGroupStyle}>
          {BASE_COLUMNS.map((id) => (
            <FormControlLabel
              key={id}
              control={
                <Checkbox
                  checked={localSelected.includes(id)}
                  onChange={(e) => handleCheckboxChange(id, e.target.checked)}
                  sx={{ '&.Mui-checked': { color: 'primary.500' }, color: 'neutral.400' }}
                />
              }
              label={t(
                `syntheticData.results.drawers.customizeColumns.fields.${id === 'record_id' ? 'recordId' : id === 'docType' ? 'documentType' : id === 'age_range' ? 'ageRange' : id}`,
              )}
              slotProps={{ typography: { fontSize: FONT_SIZES.xs } }}
            />
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
            {additionalFieldsCol1.map((field) => (
              <FormControlLabel
                key={field.id}
                control={
                  <Checkbox
                    checked={localSelected.includes(field.id)}
                    onChange={(e) => handleCheckboxChange(field.id, e.target.checked)}
                    sx={{ '&.Mui-checked': { color: 'primary.500' }, color: 'neutral.400' }}
                  />
                }
                label={getLabel(field)}
                slotProps={{ typography: { fontSize: FONT_SIZES.xs } }}
              />
            ))}
          </FormGroup>

          <FormGroup sx={formGroupStyle}>
            {additionalFieldsCol2.map((field) => (
              <FormControlLabel
                key={field.id}
                control={
                  <Checkbox
                    checked={localSelected.includes(field.id)}
                    onChange={(e) => handleCheckboxChange(field.id, e.target.checked)}
                    sx={{ '&.Mui-checked': { color: 'primary.500' }, color: 'neutral.400' }}
                  />
                }
                label={getLabel(field)}
                slotProps={{ typography: { fontSize: FONT_SIZES.xs } }}
              />
            ))}
          </FormGroup>
        </Box>

        <Box sx={{ height: '1px', width: '100%', bgcolor: 'neutral.200', my: '20px' }}></Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button
            onClick={handleReset}
            sx={{ color: 'primary.500', fontSize: FONT_SIZES.md, fontWeight: 'fontWeightMedium' }}
          >
            {t('syntheticData.results.drawers.customizeColumns.resetToDefault')}
          </Button>
          <Button
            onClick={handleApply}
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

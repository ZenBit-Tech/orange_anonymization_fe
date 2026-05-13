import React from 'react';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Switch,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Paper,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { useSyntheticDataForm } from './useSyntheticDataForm';

const DATASET_TYPES = [
  { value: 'Patient Records' },
  { value: 'Clinical Notes' },
  { value: 'Lab Results' },
  { value: 'Prescriptions' },
];

const OUTPUT_FORMATS = [{ value: 'csv' }, { value: 'json' }, { value: 'xlsx' }];

const tokens = {
  primary: '#1B3A6B',
  background: '#F9FAFB',
  cardBg: '#FFFFFF',
  border: '#E5E7EB',
  muted: '#6B7280',
  subtle: '#D1D5DB',
  neutral600: '#374151',
  iconGray: '#9CA3AF',
  shadow: '0px 2px 12px rgba(0, 0, 0, 0.06)',
  primaryHover: '#152a53',
  disabledBg: '#D1D5DB',
  disabledColor: '#9CA3AF',
  error: '#EF4444',
  textPrimary: '#111827',
  warningBg: '#FEF3C7',
  warning: '#D97706',
};

const metrics = {
  estimateMultiplier: 2.3,
  kb: 1024,
  mbDivider: 1000,
};

const layout = {
  leftWidth: 400,
  rightWidth: 616,
  totalWidth: 1040,
  gap: 24,
};

const limits = {
  maxRecords: 1000000,
};

export default function SyntheticDataForm() {
  const { t } = useTranslation();
  const {
    datasetType,
    file,
    useDeidentified,
    records,
    framework,
    outputFormat,
    loading,
    error,
    success,
    deidentifiedPreview,
    frameworks,
    isValid,
    setDatasetType,
    setRecords,
    setFramework,
    setOutputFormat,
    handleFileChange,
    handleDrop,
    handleToggleChange,
    handleSubmit,
    setError,
    setSuccess,
  } = useSyntheticDataForm();

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: tokens.background,
        minHeight: '100%',
        py: 3,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: layout.totalWidth,
          px: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography
            sx={{
              fontWeight: 600,
              color: tokens.textPrimary,
              fontSize: '24px',
              lineHeight: '32px',
            }}
          >
            {t('syntheticData.generationSettings')}
          </Typography>
          <Typography
            sx={{ color: tokens.muted, fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}
          >
            {t('syntheticData.configureParameters')}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: `${layout.gap}px` }}>
          <Paper
            sx={{
              width: `${layout.leftWidth}px`,
              flexShrink: 0,
              p: 3,
              backgroundColor: tokens.cardBg,
              border: `1px solid ${tokens.border}`,
              boxShadow: tokens.shadow,
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: 2.5,
            }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: '16px', color: tokens.textPrimary }}>
              {t('syntheticData.dataSource')}
            </Typography>

            <Box>
              <Typography
                sx={{ fontWeight: 500, mb: 1, fontSize: '14px', color: tokens.neutral600 }}
              >
                {t('syntheticData.datasetType')}
              </Typography>
              <FormControl fullWidth size="small">
                <Select
                  value={datasetType}
                  onChange={(e) => setDatasetType(String(e.target.value))}
                  sx={{
                    backgroundColor: tokens.background,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: tokens.subtle,
                    },
                  }}
                >
                  {DATASET_TYPES.map((d) => (
                    <MenuItem key={d.value} value={d.value}>
                      {t(`syntheticData.datasetTypes.${d.value}`, d.value)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box>
              <Typography
                sx={{ fontWeight: 500, mb: 1, fontSize: '14px', color: tokens.neutral600 }}
              >
                {t('syntheticData.uploadYourFile')}
              </Typography>
              <Box
                component="label"
                role="button"
                tabIndex={0}
                onDrop={(e: React.DragEvent<HTMLLabelElement>) => {
                  e.preventDefault();
                  const f = e.dataTransfer?.files?.[0];
                  if (f) handleDrop(f);
                }}
                onDragOver={(e: React.DragEvent<HTMLLabelElement>) => e.preventDefault()}
                onKeyDown={(e: React.KeyboardEvent<HTMLLabelElement>) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    const input = e.currentTarget.querySelector(
                      'input[type="file"]',
                    ) as HTMLInputElement | null;
                    input?.click();
                    e.preventDefault();
                  }
                }}
                sx={{
                  border: `2px dashed ${tokens.subtle}`,
                  borderRadius: '8px',
                  p: 3,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backgroundColor: tokens.background,
                  '&:hover': {
                    borderColor: tokens.primary,
                    backgroundColor: '#F3F4F6',
                  },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
                  hidden
                  accept=".csv,.json,.xlsx,.xls"
                />
                <CloudUploadOutlinedIcon sx={{ fontSize: 32, color: tokens.iconGray, mb: 1 }} />
                <Typography sx={{ fontWeight: 500, mb: 0.5, fontSize: '14px' }}>
                  {t('syntheticData.dragDrop')}
                </Typography>
                <Typography sx={{ color: tokens.muted, mb: 1, fontSize: '14px' }}>
                  {t('syntheticData.or')}
                </Typography>
                <Typography
                  sx={{
                    color: tokens.primary,
                    fontSize: '14px',
                    fontWeight: 500,
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  {t('syntheticData.browseFile')}
                </Typography>
              </Box>
              <Typography
                sx={{
                  display: 'block',
                  mt: 1,
                  color: tokens.muted,
                  fontSize: '12px',
                  textAlign: 'center',
                }}
              >
                {t('syntheticData.supportedFormats')}
              </Typography>
              {file && (
                <Typography sx={{ mt: 1.5, color: tokens.primary, fontSize: '14px' }}>
                  ✓ {file.name} ({Math.round(file.size / metrics.kb)} KB)
                </Typography>
              )}
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: 2,
              }}
            >
              <Box>
                <Typography sx={{ fontWeight: 500, color: tokens.textPrimary, fontSize: '14px' }}>
                  {t('syntheticData.useDeidentified')}
                </Typography>
                <Typography
                  sx={{ color: tokens.muted, mt: 0.5, fontSize: '12px', display: 'block' }}
                >
                  {t('syntheticData.usePreviouslyDeidentified')}
                </Typography>
              </Box>
              <Switch
                checked={useDeidentified}
                onChange={(e) => handleToggleChange(e.target.checked)}
              />
            </Box>

            {deidentifiedPreview && (
              <Box
                sx={{
                  p: 2,
                  backgroundColor: tokens.background,
                  borderRadius: '8px',
                  borderLeft: `4px solid ${tokens.primary}`,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 500,
                    color: tokens.neutral600,
                    fontSize: '12px',
                    display: 'block',
                    mb: 1,
                  }}
                >
                  {deidentifiedPreview}
                </Typography>
                <Typography sx={{ color: tokens.muted, fontSize: '12px' }}>
                  {t('syntheticData.passedFromCurrentSession')}
                </Typography>
              </Box>
            )}
          </Paper>

          <Paper
            sx={{
              width: `${layout.rightWidth}px`,
              flexShrink: 0,
              p: 3,
              backgroundColor: tokens.cardBg,
              border: `1px solid ${tokens.border}`,
              boxShadow: tokens.shadow,
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: 2.5,
            }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: '16px', color: tokens.textPrimary }}>
              {t('syntheticData.configuration')}
            </Typography>

            <Box>
              <Typography
                sx={{ fontWeight: 500, mb: 1, fontSize: '14px', color: tokens.neutral600 }}
              >
                {t('syntheticData.numberOfRecords')}
              </Typography>
              <TextField
                fullWidth
                type="number"
                value={records}
                onChange={(e) => setRecords(Number(e.target.value))}
                size="small"
                inputProps={{ min: 1, max: limits.maxRecords }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: tokens.background,
                  },
                }}
              />
              <Typography sx={{ display: 'block', mt: 0.5, color: tokens.muted, fontSize: '12px' }}>
                {t('syntheticData.maxRecords')}
              </Typography>
            </Box>

            <Box>
              <Typography
                sx={{ fontWeight: 500, mb: 1, fontSize: '14px', color: tokens.neutral600 }}
              >
                {t('syntheticData.chooseFramework')}
                <Typography component="span" sx={{ color: tokens.error }}>
                  *
                </Typography>
              </Typography>
              <FormControl fullWidth size="small">
                <Select
                  value={framework}
                  onChange={(e) => setFramework(String(e.target.value))}
                  sx={{
                    backgroundColor: tokens.background,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: tokens.subtle,
                    },
                  }}
                >
                  {frameworks.map((f) => (
                    <MenuItem key={f.value} value={f.value}>
                      <Box>
                        <Typography sx={{ fontSize: '14px' }}>{f.label}</Typography>
                        <Typography sx={{ color: tokens.muted, fontSize: '12px' }}>
                          {t(`syntheticData.frameworks.${f.value}.desc`, f.desc)}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box>
              <Typography
                sx={{ fontWeight: 500, mb: 1, fontSize: '14px', color: tokens.neutral600 }}
              >
                {t('syntheticData.chooseFormat')}
              </Typography>
              <FormControl fullWidth size="small">
                <Select
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(String(e.target.value))}
                  sx={{
                    backgroundColor: tokens.background,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: tokens.subtle,
                    },
                  }}
                >
                  {OUTPUT_FORMATS.map((o) => (
                    <MenuItem key={o.value} value={o.value}>
                      {t(`syntheticData.outputFormats.${o.value}`, o.value.toUpperCase())}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ pt: 2, borderTop: `1px solid ${tokens.border}` }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ color: tokens.muted, fontSize: '14px' }}>
                  {t('syntheticData.estimatedOutput')}
                </Typography>
                <Typography sx={{ fontWeight: 600, color: tokens.textPrimary, fontSize: '14px' }}>
                  {(records * metrics.estimateMultiplier) / metrics.mbDivider} MB
                </Typography>
              </Box>
            </Box>

            {!isValid && (
              <Box sx={{ mt: 1, p: 2, backgroundColor: tokens.warningBg, borderRadius: '8px' }}>
                <Typography sx={{ color: tokens.warning, fontSize: '12px' }}>
                  {t('syntheticData.completeRequiredFields')}
                </Typography>
              </Box>
            )}
          </Paper>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, pt: 2 }}>
          <Button
            variant="contained"
            disabled={!isValid || loading}
            onClick={handleSubmit}
            sx={{
              minWidth: 200,
              backgroundColor: tokens.primary,
              '&:hover': {
                backgroundColor: tokens.primaryHover,
              },
              '&:disabled': {
                backgroundColor: tokens.disabledBg,
                color: tokens.disabledColor,
              },
            }}
          >
            {loading ? (
              <>
                <CircularProgress size={18} color="inherit" sx={{ mr: 1 }} />
                {t('syntheticData.generating')}
              </>
            ) : (
              t('syntheticData.generate')
            )}
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setError(null)} severity="error" variant="filled">
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={() => setSuccess(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setSuccess(null)} severity="success" variant="filled">
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
}

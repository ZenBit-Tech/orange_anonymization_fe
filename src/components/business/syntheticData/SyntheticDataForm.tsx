import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Paper,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import StarIcon from '@mui/icons-material/Star';
import { useSyntheticDataForm } from './useSyntheticDataForm';

interface SyntheticDataFormProps {
  sourceJobId?: string;
}

const OUTPUT_FORMATS = [{ value: 'csv' }, { value: 'json' }, { value: 'xlsx' }];

const tokens = {
  primary: '#1B3A6B',
  background: '#F9FAFB',
  cardBg: '#FFFFFF',
  border: '#E5E7EB',
  muted: '#6B7280',
  subtle: '#D1D5DB',
  neutral600: '#374151',
  neutral700: '#374151',
  neutral900: '#111827',
  iconGray: '#9CA3AF',
  shadow: '0px 2px 12px rgba(0, 0, 0, 0.06)',
  shadowSm: '0px 1px 3px rgba(0, 0, 0, 0.08)',
  primaryHover: '#152a53',
  disabledBg: '#D1D5DB',
  disabledColor: '#9CA3AF',
  error: '#EF4444',
  textPrimary: '#111827',
  warningBg: '#FEF3C7',
  warning: '#D97706',
  lightGray: '#F3F4F6',
};

const metrics = {
  estimateMultiplier: 2.3,
  kb: 1024,
  mbDivider: 1000,
};

const layout = {
  cardWidth: 1040,
  contentPadding: 2,
  gap: 4,
  fieldGap: 1.5,
};

const limits = {
  maxRecords: 1000000,
};

export default function SyntheticDataForm({ sourceJobId }: SyntheticDataFormProps) {
  const { t } = useTranslation();
  const {
    records,
    framework,
    outputFormat,
    loading,
    previewLoading,
    error,
    success,
    deidentifiedPreview,
    frameworks,
    isValid,
    setRecords,
    setFramework,
    setOutputFormat,
    handleSubmit,
    setError,
    setSuccess,
  } = useSyntheticDataForm(sourceJobId);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: tokens.background,
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '24px 32px',
          gap: '16px',
          backgroundColor: tokens.background,
          overflowY: 'auto',
          flex: 1,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: layout.cardWidth,
            display: 'flex',
            flexDirection: 'column',
            gap: layout.gap,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography
              sx={{
                fontWeight: 600,
                color: tokens.neutral900,
                fontSize: '18px',
                lineHeight: '26px',
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

          <Paper
            sx={{
              width: '100%',
              p: layout.contentPadding,
              backgroundColor: tokens.cardBg,
              border: `1.5px solid ${tokens.border}`,
              boxShadow: tokens.shadow,
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: layout.gap,
            }}
          >
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: tokens.neutral700,
                  }}
                >
                  {t('syntheticData.configuration')}
                </Typography>
                <Box sx={{ flex: 1, height: '1px', backgroundColor: tokens.lightGray }} />
              </Box>
            </Box>

            <Box>
              <Typography
                sx={{
                  fontWeight: 500,
                  mb: layout.fieldGap,
                  fontSize: '12px',
                  lineHeight: '16px',
                  color: tokens.muted,
                }}
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

            <Box sx={{ display: 'flex', gap: layout.gap }}>
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    mb: layout.fieldGap,
                    fontSize: '12px',
                    lineHeight: '16px',
                    color: tokens.muted,
                  }}
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
                        borderColor: tokens.border,
                      },
                    }}
                  >
                    {frameworks.map((f) => (
                      <MenuItem key={f.value} value={f.value}>
                        <Box>
                          <Typography sx={{ fontSize: '16px', lineHeight: '24px' }}>
                            {f.label}
                          </Typography>
                          <Typography sx={{ color: tokens.muted, fontSize: '12px' }}>
                            {t(`syntheticData.frameworks.${f.value}.desc`, f.desc)}
                          </Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    mb: layout.fieldGap,
                    fontSize: '12px',
                    lineHeight: '25px',
                    color: tokens.muted,
                  }}
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
                        borderColor: tokens.border,
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
            </Box>

            <Box
              sx={{
                p: 2,
                backgroundColor: tokens.lightGray,
                border: `1px solid ${tokens.lightGray}`,
                boxShadow: tokens.shadowSm,
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontWeight: 500,
                    color: tokens.neutral900,
                    fontSize: '14px',
                    lineHeight: '20px',
                  }}
                >
                  {t('syntheticData.useDeidentified')}
                </Typography>
                <Typography sx={{ color: tokens.muted, mt: 0.5, fontSize: '12px' }}>
                  {t('syntheticData.usePreviouslyDeidentified')}
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 1.5,
                  minHeight: '72px',
                  backgroundColor: tokens.cardBg,
                  border: `1px solid ${tokens.border}`,
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'flex-start',
                }}
              >
                <Typography
                  title={previewLoading ? t('common.loading') : (deidentifiedPreview ?? '')}
                  sx={{
                    width: '100%',
                    color: deidentifiedPreview ? tokens.neutral700 : tokens.muted,
                    fontSize: '12px',
                    lineHeight: '16px',
                    whiteSpace: 'pre-wrap',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2,
                    textOverflow: 'ellipsis',
                  }}
                >
                  {previewLoading
                    ? t('common.loading')
                    : (deidentifiedPreview ?? t('syntheticData.passedFromCurrentSession'))}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Typography sx={{ color: tokens.muted, fontSize: '12px' }}>
                {t('syntheticData.estimatedOutput')}
              </Typography>
              <Typography sx={{ fontWeight: 600, color: tokens.neutral700, fontSize: '12px' }}>
                {(records * metrics.estimateMultiplier) / metrics.mbDivider} MB
              </Typography>
            </Box>

            {!isValid && (
              <Typography sx={{ color: tokens.warning, fontSize: '12px', textAlign: 'right' }}>
                {t('syntheticData.completeRequiredFields')}
              </Typography>
            )}
          </Paper>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }}>
            <Button
              variant="contained"
              disabled={!isValid || loading}
              onClick={handleSubmit}
              startIcon={<StarIcon />}
              sx={{
                width: '249px',
                height: '40px',
                backgroundColor: tokens.primary,
                color: tokens.cardBg,
                border: `2px solid ${tokens.primary}`,
                '&:hover': {
                  backgroundColor: tokens.primaryHover,
                  borderColor: tokens.primaryHover,
                },
                '&:disabled': {
                  backgroundColor: tokens.disabledBg,
                  color: tokens.disabledColor,
                  borderColor: tokens.disabledBg,
                },
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: '20px',
                textTransform: 'none',
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

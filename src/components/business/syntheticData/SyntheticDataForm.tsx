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
import synthetic, { layout, metrics, limits } from './styles';

interface SyntheticDataFormProps {
  sourceJobId?: string;
}

const OUTPUT_FORMATS = [{ value: 'csv' }, { value: 'json' }, { value: 'xlsx' }];

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
    <Box sx={synthetic.root}>
      <Box sx={synthetic.pageInner}>
        <Box sx={synthetic.container}>
          <Box sx={synthetic.titleGroup}>
            <Typography
              sx={(theme) => ({
                fontWeight: 600,
                color: theme.palette.text.primary,
                fontSize: '18px',
                lineHeight: '26px',
              })}
            >
              {t('syntheticData.generationSettings')}
            </Typography>
            <Typography
              sx={(theme) => ({
                color: theme.palette.text.secondary,
                fontSize: '14px',
                lineHeight: '20px',
                fontWeight: 400,
              })}
            >
              {t('syntheticData.configureParameters')}
            </Typography>
          </Box>

          <Paper sx={synthetic.paper}>
            <Box>
              <Box sx={synthetic.headerRow}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: (theme) => theme.palette.text.secondary,
                  }}
                >
                  {t('syntheticData.configuration')}
                </Typography>
                <Box sx={synthetic.dividerLine} />
              </Box>
            </Box>

            <Box>
              <Typography
                sx={(theme) => ({
                  fontWeight: 500,
                  mb: layout.fieldGap,
                  fontSize: '12px',
                  lineHeight: '16px',
                  color: theme.palette.text.secondary,
                })}
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
                sx={synthetic.textField}
              />
              <Typography
                sx={(theme) => ({
                  display: 'block',
                  mt: 0.5,
                  color: theme.palette.text.secondary,
                  fontSize: '12px',
                })}
              >
                {t('syntheticData.maxRecords')}
              </Typography>
            </Box>

            <Box sx={synthetic.twoColumnRow}>
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={(theme) => ({
                    fontWeight: 500,
                    mb: layout.fieldGap,
                    fontSize: '12px',
                    lineHeight: '16px',
                    color: theme.palette.text.secondary,
                  })}
                >
                  {t('syntheticData.chooseFramework')}
                  <Typography
                    component="span"
                    sx={(theme) => ({ color: theme.palette.error.main })}
                  >
                    *
                  </Typography>
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={framework}
                    onChange={(e) => setFramework(String(e.target.value))}
                    sx={(theme) => ({
                      backgroundColor: theme.palette.background.default,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.divider,
                      },
                    })}
                  >
                    {frameworks.map((f) => (
                      <MenuItem key={f.value} value={f.value}>
                        <Box>
                          <Typography sx={{ fontSize: '16px', lineHeight: '24px' }}>
                            {t(`syntheticData.frameworks.${f.value}.label`, String(f.value))}
                          </Typography>
                          <Typography
                            sx={(theme) => ({
                              color: theme.palette.text.secondary,
                              fontSize: '12px',
                            })}
                          >
                            {t(`syntheticData.frameworks.${f.value}.desc`)}
                          </Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={(theme) => ({
                    fontWeight: 500,
                    mb: layout.fieldGap,
                    fontSize: '12px',
                    lineHeight: '25px',
                    color: theme.palette.text.secondary,
                  })}
                >
                  {t('syntheticData.chooseFormat')}
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={outputFormat}
                    onChange={(e) => setOutputFormat(String(e.target.value))}
                    sx={(theme) => ({
                      backgroundColor: theme.palette.background.default,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.divider,
                      },
                    })}
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

            <Box sx={synthetic.previewSection}>
              <Box>
                <Typography
                  sx={(theme) => ({
                    fontWeight: 500,
                    color: theme.palette.text.primary,
                    fontSize: '14px',
                    lineHeight: '20px',
                  })}
                >
                  {t('syntheticData.useDeidentified')}
                </Typography>
                <Typography
                  sx={(theme) => ({
                    color: theme.palette.text.secondary,
                    mt: 0.5,
                    fontSize: '12px',
                  })}
                >
                  {t('syntheticData.usePreviouslyDeidentified')}
                </Typography>
              </Box>

              <Box sx={synthetic.previewBox}>
                <Typography
                  title={previewLoading ? t('common.loading') : (deidentifiedPreview ?? '')}
                  sx={(theme) => ({
                    ...synthetic.previewText(),
                    color: deidentifiedPreview
                      ? theme.palette.text.secondary
                      : theme.palette.text.secondary,
                  })}
                >
                  {previewLoading
                    ? t('common.loading')
                    : (deidentifiedPreview ?? t('syntheticData.passedFromCurrentSession'))}
                </Typography>
              </Box>
            </Box>

            <Box sx={synthetic.footerRow}>
              <Typography
                sx={(theme) => ({ color: theme.palette.text.secondary, fontSize: '12px' })}
              >
                {t('syntheticData.estimatedOutput')}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 600,
                  color: (theme) => theme.palette.text.secondary,
                  fontSize: '12px',
                }}
              >
                {(records * metrics.estimateMultiplier) / metrics.mbDivider} MB
              </Typography>
            </Box>

            {!isValid && (
              <Typography
                sx={(theme) => ({
                  color: theme.palette.warning.main,
                  fontSize: '12px',
                  textAlign: 'right',
                })}
              >
                {t('syntheticData.completeRequiredFields')}
              </Typography>
            )}
          </Paper>

          <Box sx={synthetic.actionRow}>
            <Button
              variant="contained"
              disabled={!isValid || loading}
              onClick={handleSubmit}
              startIcon={<StarIcon />}
              sx={synthetic.generateButton}
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

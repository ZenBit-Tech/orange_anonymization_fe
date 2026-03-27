import { useTranslation } from 'react-i18next';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Slider,
  Step,
  StepLabel,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Download as DownloadIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  nextStep,
  prevStep,
  setFramework,
  setInputText,
  updateSettings,
  resetWorkflow,
  analyzeText,
  anonymizeText,
} from '@/store/slices/deIdentificationSlice';
import { ANONYMIZATION_STRATEGIES, PRESIDIO_ENTITIES, PRESIDIO_LANGUAGES } from '@/constants';
import { downloadAsFile, entityColor, formatScore } from '@/utils';
import type { ComplianceFramework } from './types';

const SAMPLE_TEXT = `Patient John Carter (DOB: 03/15/1982) was admitted on 12/10/2023 with chest pain.
SSN: 523-45-6789. Address: 142 Maple Street, Austin TX 78701.
Contact: john.carter@email.com / (512) 555-0147.
Attending physician: Dr. Sarah Mitchell, License TX-MD-98234.
Diagnosis: Acute myocardial infarction. Prescribed atorvastatin 40mg.`;

export default function DeIdentify() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const {
    currentStep,
    framework,
    inputText,
    settings,
    analysisResult,
    anonymizeResult,
    processingTimeMs,
    isAnalyzing,
    isAnonymizing,
    error,
  } = useAppSelector((s) => s.deIdentification);

  const steps = [
    t('deIdentify.steps.selectFramework'),
    t('deIdentify.steps.inputText'),
    t('deIdentify.steps.settings'),
    t('deIdentify.steps.results'),
  ];

  const handleAnalyzeAndAnonymize = async () => {
    const analyzeResult = await dispatch(
      analyzeText({ text: inputText, language: settings.language, entities: settings.entities }),
    );
    if (analyzeText.fulfilled.match(analyzeResult)) {
      await dispatch(
        anonymizeText({
          text: inputText,
          analyzerResults: analyzeResult.payload,
          strategy: settings.strategy,
          language: settings.language,
        }),
      );
    }
    dispatch(nextStep());
  };

  const handleDownload = () => {
    if (!anonymizeResult) return;
    const content = JSON.stringify(
      { original: inputText, anonymized: anonymizeResult.text, entities: analysisResult },
      null,
      2,
    );
    downloadAsFile(content, 'de-identified-result.json', 'application/json');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 3 }}>
              {t('deIdentify.framework.title')}
            </Typography>
            <RadioGroup
              value={framework}
              onChange={(e) => dispatch(setFramework(e.target.value as ComplianceFramework))}
            >
              {(
                [
                  {
                    value: 'hipaa',
                    labelKey: 'deIdentify.framework.hipaa.label',
                    descKey: 'deIdentify.framework.hipaa.description',
                  },
                  {
                    value: 'gdpr',
                    labelKey: 'deIdentify.framework.gdpr.label',
                    descKey: 'deIdentify.framework.gdpr.description',
                  },
                  {
                    value: 'custom',
                    labelKey: 'deIdentify.framework.custom.label',
                    descKey: 'deIdentify.framework.custom.description',
                  },
                ] as const
              ).map((opt) => (
                <Card
                  key={opt.value}
                  onClick={() => dispatch(setFramework(opt.value))}
                  sx={{
                    mb: 2,
                    cursor: 'pointer',
                    border: 2,
                    borderColor: framework === opt.value ? 'primary.main' : 'divider',
                    transition: 'border-color 0.2s',
                  }}
                >
                  <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <FormControlLabel
                      value={opt.value}
                      control={<Radio />}
                      label=""
                      sx={{ m: 0 }}
                    />
                    <Box>
                      <Typography fontWeight={600}>{t(opt.labelKey)}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {t(opt.descKey)}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </RadioGroup>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {t('deIdentify.input.title')}
            </Typography>
            <Button size="small" sx={{ mb: 2 }} onClick={() => dispatch(setInputText(SAMPLE_TEXT))}>
              {t('deIdentify.input.sampleText')}
            </Button>
            <TextField
              label={t('deIdentify.input.label')}
              placeholder={t('deIdentify.input.placeholder')}
              multiline
              rows={12}
              fullWidth
              value={inputText}
              onChange={(e) => dispatch(setInputText(e.target.value))}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
              {t('deIdentify.input.characterCount', { count: inputText.length })}
            </Typography>
          </Box>
        );

      case 2:
        return (
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>{t('deIdentify.settings.strategy')}</InputLabel>
                <Select
                  value={settings.strategy}
                  label={t('deIdentify.settings.strategy')}
                  onChange={(e) =>
                    dispatch(
                      updateSettings({ strategy: e.target.value as typeof settings.strategy }),
                    )
                  }
                >
                  {ANONYMIZATION_STRATEGIES.map((s) => (
                    <MenuItem key={s} value={s}>
                      {t(`deIdentify.settings.strategies.${s}`)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>{t('deIdentify.settings.language')}</InputLabel>
                <Select
                  value={settings.language}
                  label={t('deIdentify.settings.language')}
                  onChange={(e) => dispatch(updateSettings({ language: e.target.value }))}
                >
                  {PRESIDIO_LANGUAGES.map((l) => (
                    <MenuItem key={l.code} value={l.code}>
                      {l.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {t('deIdentify.settings.confidence')}: {formatScore(settings.minScore)}
              </Typography>
              <Slider
                value={settings.minScore}
                min={0}
                max={1}
                step={0.05}
                marks
                onChange={(_, v) => dispatch(updateSettings({ minScore: v as number }))}
                sx={{ mb: 3 }}
              />

              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                {t('deIdentify.settings.entityTypes')}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {PRESIDIO_ENTITIES.map((entity) => {
                  const selected = settings.entities.includes(entity);
                  return (
                    <Chip
                      key={entity}
                      label={entity}
                      clickable
                      size="small"
                      color={selected ? 'primary' : 'default'}
                      onClick={() => {
                        const updated = selected
                          ? settings.entities.filter((e) => e !== entity)
                          : [...settings.entities, entity];
                        dispatch(updateSettings({ entities: updated }));
                      }}
                    />
                  );
                })}
              </Box>
            </Grid>
          </Grid>
        );

      case 3:
        return (
          <Box>
            {processingTimeMs !== null && (
              <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                {t('deIdentify.results.stats.entitiesFound', {
                  count: analysisResult?.length ?? 0,
                })}
                {' · '}
                {t('deIdentify.results.stats.processingTime', { time: processingTimeMs })}
              </Typography>
            )}

            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  {t('deIdentify.results.original')}
                </Typography>
                <Box
                  component="pre"
                  sx={{
                    p: 2,
                    bgcolor: 'background.default',
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 2,
                    fontFamily: 'monospace',
                    fontSize: '0.82rem',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-all',
                    minHeight: 160,
                  }}
                >
                  {inputText}
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  {t('deIdentify.results.anonymized')}
                </Typography>
                <Box
                  component="pre"
                  sx={{
                    p: 2,
                    bgcolor: '#F0FFF4',
                    border: 1,
                    borderColor: 'success.light',
                    borderRadius: 2,
                    fontFamily: 'monospace',
                    fontSize: '0.82rem',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-all',
                    minHeight: 160,
                    color: 'success.dark',
                  }}
                >
                  {anonymizeResult?.text ?? ''}
                </Box>
              </Grid>
            </Grid>

            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {t('deIdentify.results.entities')}
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>{t('deIdentify.results.entityColumns.type')}</TableCell>
                    <TableCell>{t('deIdentify.results.entityColumns.text')}</TableCell>
                    <TableCell align="right">
                      {t('deIdentify.results.entityColumns.confidence')}
                    </TableCell>
                    <TableCell align="right">
                      {t('deIdentify.results.entityColumns.position')}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(analysisResult ?? []).map((entity, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Chip
                          label={entity.entity_type}
                          size="small"
                          sx={{
                            bgcolor: `${entityColor(entity.entity_type)}22`,
                            color: entityColor(entity.entity_type),
                            fontWeight: 600,
                            fontSize: '0.7rem',
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                        {inputText.slice(entity.start, entity.end)}
                      </TableCell>
                      <TableCell align="right">{formatScore(entity.score)}</TableCell>
                      <TableCell
                        align="right"
                        sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}
                      >
                        {entity.start}–{entity.end}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Button variant="outlined" startIcon={<DownloadIcon />} onClick={handleDownload}>
                {t('deIdentify.results.download')}
              </Button>
              <Button startIcon={<RefreshIcon />} onClick={() => dispatch(resetWorkflow())}>
                {t('deIdentify.results.processAnother')}
              </Button>
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    if (currentStep === 1 && inputText.trim().length < 50) return false;
    return true;
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700}>
          {t('deIdentify.title')}
        </Typography>
        <Typography color="text.secondary">{t('deIdentify.subtitle')}</Typography>
      </Box>

      <Stepper activeStep={currentStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Card>
        <CardContent sx={{ p: 4 }}>{renderStep()}</CardContent>
      </Card>

      {currentStep < 3 && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button disabled={currentStep === 0} onClick={() => dispatch(prevStep())}>
            {t('common.back')}
          </Button>
          <Button
            variant="contained"
            disabled={!canProceed() || isAnalyzing || isAnonymizing}
            onClick={
              currentStep === 2
                ? () => void handleAnalyzeAndAnonymize()
                : () => dispatch(nextStep())
            }
            endIcon={
              isAnalyzing || isAnonymizing ? (
                <CircularProgress size={18} color="inherit" />
              ) : undefined
            }
          >
            {currentStep === 2 ? t('deIdentify.steps.results') : t('common.next')}
          </Button>
        </Box>
      )}
    </Box>
  );
}

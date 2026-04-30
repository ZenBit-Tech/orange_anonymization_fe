import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  RadioButtonCheckedOutlined as RadioButtonCheckedOutlinedIcon,
  RadioButtonUncheckedOutlined as RadioButtonUncheckedOutlinedIcon,
  ReportProblemOutlined as ReportProblemOutlinedIcon,
  Check as CheckIcon,
  Search as SearchIcon,
  Block as RedactIcon,
  Cached as ReplaceIcon,
  AutoAwesome as SyntheticIcon,
  VisibilityOff as MaskIcon,
  LockClock as HashIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';
import { Box, Grid, Typography, TextField, InputAdornment, Chip, alpha } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setJobAC } from '@/store/slices/jobsSlice';
import { jobsService } from '@/services/jobsService';
import { FONT_SIZES, ALL_LANGUAGES, RECENTLY_USED } from '@/constants';
import type { HIPAAMethodUI, IJob, RedactOption } from '@/pages/DeIdentify/types';
import IdentifiersAccordion from './IdentifiersAccordion';
import Dropdown from '@/components/UI/Dropdown';

const HIPAAMethods: HIPAAMethodUI[] = [
  {
    id: 1,
    title: 'Safe Harbor',
    titleKey: 'deIdentify.settings.method.safeHarbor.title',
    descKey: 'deIdentify.settings.method.safeHarbor.description',
    commentKey: 'deIdentify.settings.method.safeHarbor.comment',
  },
  {
    id: 2,
    title: 'Expert Determination',
    titleKey: 'deIdentify.settings.method.expertDetermination.title',
    descKey: 'deIdentify.settings.method.expertDetermination.description',
    commentKey: 'deIdentify.settings.method.expertDetermination.comment',
  },
];

const thresholds = [
  {
    id: 1,
    titleKey: 'deIdentify.settings.detection.thresholds.conservative.title',
    descKey: 'deIdentify.settings.detection.thresholds.conservative.description',
    score: 0.3,
  },
  {
    id: 2,
    titleKey: 'deIdentify.settings.detection.thresholds.balanced.title',
    descKey: 'deIdentify.settings.detection.thresholds.balanced.description',
    score: 0.5,
  },
  {
    id: 3,
    titleKey: 'deIdentify.settings.detection.thresholds.aggressive.title',
    descKey: 'deIdentify.settings.detection.thresholds.aggressive.description',
    score: 0.7,
  },
];

const STRATEGY_OPTIONS: RedactOption[] = [
  {
    id: 'Redact',
    category: 'REMOVE',
    categoryLabel: 'deIdentify.settings.strategies.categories.remove',
    titleKey: 'deIdentify.settings.strategies.redact.title',
    descKey: 'deIdentify.settings.strategies.redact.description',
    icon: <RedactIcon />,
  },
  {
    id: 'Replace',
    category: 'REPLACE',
    categoryLabel: 'deIdentify.settings.strategies.categories.replace',
    titleKey: 'deIdentify.settings.strategies.replace.title',
    descKey: 'deIdentify.settings.strategies.replace.description',
    icon: <ReplaceIcon />,
  },
  {
    id: 'Synthetic',
    category: 'REPLACE',
    categoryLabel: 'deIdentify.settings.strategies.categories.replace',
    titleKey: 'deIdentify.settings.strategies.synthetic.title',
    descKey: 'deIdentify.settings.strategies.synthetic.description',
    icon: <SyntheticIcon />,
  },
  {
    id: 'Mask',
    category: 'PROTECT',
    categoryLabel: 'deIdentify.settings.strategies.categories.protect',
    titleKey: 'deIdentify.settings.strategies.mask.title',
    descKey: 'deIdentify.settings.strategies.mask.description',
    icon: <MaskIcon />,
  },
  {
    id: 'Hash',
    category: 'PROTECT',
    categoryLabel: 'deIdentify.settings.strategies.categories.protect',
    titleKey: 'deIdentify.settings.strategies.hash.title',
    descKey: 'deIdentify.settings.strategies.hash.description',
    icon: <HashIcon />,
  },
];

const HIPAAConfiguration = () => {
  const { t } = useTranslation();
  const { currentJob } = useAppSelector((state) => state.jobs);
  const dispatch = useAppDispatch();

  const [langSearch, setLangSearch] = useState('');

  const updateJob = async (jobId: string, updateData: Partial<IJob>) => {
    const response = await jobsService.updateJob(jobId, updateData);
    dispatch(setJobAC(response));
  };

  const firstEntity = currentJob?.wizardState?.configSettings.entities?.[0];
  const strategies =
    (currentJob?.wizardState?.configSettings.strategies as Record<string, string>) || {};
  const selectedStrategyId = (firstEntity && strategies[firstEntity]) || 'Redact';

  const strategyOptions = useMemo(
    () =>
      STRATEGY_OPTIONS.map((opt) => ({
        id: opt.id,
        title: t(opt.titleKey),
        description: t(opt.descKey),
        icon: opt.icon,
        category: t(opt.categoryLabel),
      })),
    [t],
  );

  const handleStrategyChange = async (id: string) => {
    if (!currentJob?.wizardState) return;
    const entities = currentJob.wizardState.configSettings.entities || [];
    const newStrategies = Object.fromEntries(entities.map((e) => [e, id]));
    await updateJob(currentJob.id, {
      wizardState: {
        ...currentJob.wizardState,
        configSettings: { ...currentJob.wizardState.configSettings, strategies: newStrategies },
      },
    });
  };

  const currentLangCode = currentJob?.wizardState?.configSettings.language || 'en';

  const languageOptions = useMemo(() => {
    const options = [];
    const searchLower = langSearch.toLowerCase();

    if (!langSearch && currentJob?.wizardState?.configSettings.isAutoDetected) {
      const currentLang = ALL_LANGUAGES.find((l) => l.code === currentLangCode);
      options.push({
        id: currentLangCode,
        title: currentLang?.name || t('deIdentify.languageSelect.autoDetectedUnknown'),
        category: '',
        rightElement: (
          <Chip
            label={t('deIdentify.languageSelect.autoDetected')}
            size="small"
            sx={{
              bgcolor: (theme) => alpha(theme.palette.accent[400]!, 0.1),
              color: 'accent.400',
              height: 20,
              fontSize: FONT_SIZES.xs,
            }}
          />
        ),
      });
    }

    if (!langSearch) {
      RECENTLY_USED.forEach((l) => {
        options.push({
          id: l.code,
          title: l.name,
          category: t('deIdentify.languageSelect.recentlyUsed'),
          rightElement:
            l.code === currentLangCode ? (
              <CheckIcon sx={{ fontSize: FONT_SIZES.lg, color: 'primary.500' }} />
            ) : null,
        });
      });
    }

    const filteredAll = ALL_LANGUAGES.filter((l) => l.name.toLowerCase().includes(searchLower));
    filteredAll.forEach((l) => {
      options.push({
        id: l.code,
        title: l.name,
        category: langSearch ? '' : t('deIdentify.languageSelect.allLanguages'),
        rightElement:
          l.code === currentLangCode ? (
            <CheckIcon sx={{ fontSize: FONT_SIZES.lg, color: 'primary.500' }} />
          ) : null,
      });
    });

    return options;
  }, [langSearch, currentLangCode, currentJob, t]);

  const handleLanguageChange = async (code: string) => {
    if (!currentJob?.wizardState) return;
    await updateJob(currentJob.id, {
      wizardState: {
        ...currentJob.wizardState,
        configSettings: { ...currentJob.wizardState.configSettings, language: code },
      },
    });
  };

  const selectMethod = async (method: HIPAAMethodUI) => {
    if (!currentJob?.wizardState) return;
    const entities = [
      'NAME',
      'DATE',
      'SSN',
      'PHONE',
      'FAX',
      'EMAIL',
      'ADDRESS',
      'ACCOUNT',
      'LICENSE',
      'VEHICLE',
      'URL',
      'IP',
      'BIOMETRIC',
      'PHOTO',
      'DEVICE',
      'MRN',
      'BENEFICIARY',
      'CERTIFICATE',
    ];
    await updateJob(currentJob.id, {
      wizardState: {
        ...currentJob.wizardState,
        configSettings: {
          ...currentJob.wizardState.configSettings,
          method: method.title,
          strategies: method.id === 1 ? Object.fromEntries(entities.map((e) => [e, 'Redact'])) : {},
          entities,
        },
      },
    });
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ mb: '48px' }}>
        <Typography
          sx={{
            color: 'neutral.900',
            fontWeight: 'fontWeightMedium',
            mb: '10px',
            fontSize: FONT_SIZES.xxl,
          }}
        >
          {t('deIdentify.settings.sections.method')}
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{ borderLeft: '4px solid', borderColor: 'accent.100', pl: 2 }}
        >
          {HIPAAMethods.map((method) => {
            const isActive = currentJob?.wizardState?.configSettings.method === method.title;
            return (
              <Grid size={{ xs: 12, md: 6 }} key={method.id}>
                <Box
                  onClick={() => selectMethod(method)}
                  sx={{
                    border: `${isActive ? 2 : 1}px solid`,
                    borderColor: isActive ? 'primary.500' : 'neutral.200',
                    borderRadius: '12px',
                    bgcolor: isActive ? 'primary.50' : 'common.white',
                    p: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': { transform: 'scale(1.01)' },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 3,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {isActive ? (
                        <RadioButtonCheckedOutlinedIcon color="primary" />
                      ) : (
                        <RadioButtonUncheckedOutlinedIcon sx={{ color: 'neutral.400' }} />
                      )}
                      <Typography
                        sx={{
                          color: 'primary.500',
                          fontWeight: 'fontWeightSemiBold',
                          fontSize: FONT_SIZES.lg,
                        }}
                      >
                        {t(method.titleKey)}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography sx={{ color: 'neutral.700', fontSize: FONT_SIZES.md, mb: 1 }}>
                    {t(method.descKey)}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      color: method.id === 1 ? 'neutral.500' : 'warning.main',
                    }}
                  >
                    {method.id === 2 && (
                      <ReportProblemOutlinedIcon sx={{ fontSize: FONT_SIZES.md }} />
                    )}
                    <Typography sx={{ fontSize: FONT_SIZES.sm }}>{t(method.commentKey)}</Typography>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      <Box sx={{ mb: '48px' }}>
        <Typography
          sx={{
            color: currentJob?.wizardState?.configSettings.method ? 'neutral.900' : 'neutral.400',
            fontWeight: 'fontWeightMedium',
            mb: '10px',
            fontSize: FONT_SIZES.xxl,
          }}
        >
          {t('deIdentify.settings.sections.identifiers')}
        </Typography>
        <Box sx={{ borderLeft: '4px solid', borderColor: 'accent.100', pl: 2 }}>
          <IdentifiersAccordion
            isExpertMode={currentJob?.wizardState?.configSettings.method === 'Expert Determination'}
            updateJob={updateJob}
            currentJob={currentJob}
          />
        </Box>
      </Box>

      <Box sx={{ mb: '48px' }}>
        <Typography
          sx={{
            color: 'neutral.900',
            fontWeight: 'fontWeightMedium',
            mb: '10px',
            fontSize: FONT_SIZES.xxl,
          }}
        >
          {t('deIdentify.settings.sections.output')}
        </Typography>

        <Box sx={{ borderLeft: '4px solid', borderColor: 'accent.100', pl: 2 }}>
          <Typography sx={{ fontWeight: 'fontWeightMedium', fontSize: FONT_SIZES.md }}>
            {t('deIdentify.settings.strategies.title')}
          </Typography>
          <Typography sx={{ color: 'neutral.500', fontSize: FONT_SIZES.sm, mb: 2 }}>
            {t('deIdentify.settings.subtitle')}
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' }, mb: 4 }}>
            <Box sx={{ flex: 2, width: '100%' }}>
              <Dropdown
                options={strategyOptions}
                value={selectedStrategyId}
                onChange={handleStrategyChange}
                showIcons
              />
            </Box>
            <Box sx={{ flex: 1, width: '100%' }}>
              <Dropdown
                options={languageOptions}
                value={currentLangCode}
                onChange={handleLanguageChange}
                startIcon={<LanguageIcon />}
                renderSearch={
                  <Box sx={{ p: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <TextField
                      fullWidth
                      size="small"
                      autoFocus
                      placeholder={t('deIdentify.languageSelect.search')}
                      value={langSearch}
                      onChange={(e) => setLangSearch(e.target.value)}
                      variant="standard"
                      onClick={(e) => e.stopPropagation()}
                      InputProps={{
                        disableUnderline: true,
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon sx={{ color: 'neutral.400', ml: 1 }} />
                          </InputAdornment>
                        ),
                        sx: { px: 1, py: 1, fontSize: FONT_SIZES.sm },
                      }}
                    />
                  </Box>
                }
              />
            </Box>
          </Box>

          <Typography sx={{ fontWeight: 'fontWeightMedium', fontSize: FONT_SIZES.md, mb: 1 }}>
            {t('deIdentify.settings.detection.title')}
          </Typography>
          <Grid container spacing={2}>
            {thresholds.map((threshold) => {
              const isActive =
                currentJob?.wizardState?.configSettings.threshold === threshold.score;
              return (
                <Grid size={{ xs: 12, md: 4 }} key={threshold.id}>
                  <Box
                    onClick={() =>
                      updateJob(currentJob!.id, {
                        wizardState: {
                          ...currentJob!.wizardState!,
                          configSettings: {
                            ...currentJob!.wizardState!.configSettings,
                            threshold: threshold.score,
                          },
                        },
                      })
                    }
                    sx={{
                      border: `${isActive ? 2 : 1}px solid`,
                      borderColor: isActive ? 'primary.500' : 'neutral.200',
                      borderRadius: '12px',
                      bgcolor: isActive ? 'primary.50' : 'common.white',
                      p: 2,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': { transform: 'scale(1.02)' },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      {isActive ? (
                        <RadioButtonCheckedOutlinedIcon color="primary" />
                      ) : (
                        <RadioButtonUncheckedOutlinedIcon sx={{ color: 'neutral.400' }} />
                      )}
                      <Typography sx={{ fontWeight: 'fontWeightSemiBold' }}>
                        {t(threshold.titleKey)}
                      </Typography>
                    </Box>
                    <Typography sx={{ fontSize: FONT_SIZES.sm, color: 'neutral.600' }}>
                      {t(threshold.descKey)}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default HIPAAConfiguration;

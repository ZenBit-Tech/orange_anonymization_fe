import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ALL_LANGUAGES, DEFAULT_STRATEGIES, FONT_SIZES, RECENTLY_USED } from '@/constants';
import {
  alpha,
  Box,
  Button,
  Chip,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  type SxProps,
  type Theme,
} from '@mui/material';
import {
  RadioButtonCheckedOutlined as RadioButtonCheckedOutlinedIcon,
  RadioButtonUncheckedOutlined as RadioButtonUncheckedOutlinedIcon,
  ArrowForward as ArrowForwardIcon,
  Info as InfoIcon,
  WarningAmber as WarningAmberIcon,
  Check as CheckIcon,
  Search as SearchIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { ComplianceFramework, Threshold, type IJob } from '@/pages/DeIdentify/types';
import { jobsService } from '@/services/jobsService';
import { setJobAC } from '@/store/slices/jobsSlice';
import Dropdown from '@/components/UI/Dropdown';
import ConfigurationLogicDrawer from './ConfigurationLogicDrawer';
import EntityConfigurationAccordion from './EntityConfigurationAccordion';

const FRAMEWORK_INFO: Record<string, { descriptionKey: string; warningKey: string }> = {
  [ComplianceFramework.EU_GDPR]: {
    descriptionKey: 'deIdentify.settings.frameworkInfo.euGdpr.description',
    warningKey: 'deIdentify.settings.frameworkInfo.euGdpr.warning',
  },
  [ComplianceFramework.UK_GDPR]: {
    descriptionKey: 'deIdentify.settings.frameworkInfo.ukGdpr.description',
    warningKey: 'deIdentify.settings.frameworkInfo.ukGdpr.warning',
  },
  [ComplianceFramework.SWISS_FADP]: {
    descriptionKey: 'deIdentify.settings.frameworkInfo.swissFadp.description',
    warningKey: 'deIdentify.settings.frameworkInfo.swissFadp.warning',
  },
};

const DEFAULT_INFO = {
  descriptionKey: 'deIdentify.settings.frameworkInfo.default.description',
  warningKey: 'deIdentify.settings.frameworkInfo.default.warning',
};

const thresholds = [
  {
    id: 1,
    titleKey: 'deIdentify.settings.detection.thresholds.low.title',
    descKey: 'deIdentify.settings.detection.thresholds.low.description',
    score: Threshold.LOW,
  },
  {
    id: 2,
    titleKey: 'deIdentify.settings.detection.thresholds.medium.title',
    descKey: 'deIdentify.settings.detection.thresholds.medium.description',
    score: Threshold.MIDDLE,
  },
  {
    id: 3,
    titleKey: 'deIdentify.settings.detection.thresholds.high.title',
    descKey: 'deIdentify.settings.detection.thresholds.high.description',
    score: Threshold.HIGH,
  },
];

const sectionWrapperStyle: SxProps<Theme> = {
  borderLeft: '4px solid',
  borderColor: 'accent.100',
  pl: 2,
};

const sectionHeaderStyle = (isEnabled = true): SxProps<Theme> => ({
  color: isEnabled ? 'neutral.900' : 'neutral.400',
  fontWeight: 'fontWeightMedium',
  mb: '10px',
  fontSize: FONT_SIZES.xxl,
});

const cardContainerStyle = (isActive: boolean): SxProps<Theme> => ({
  height: '100%',
  border: `${isActive ? 2 : 1}px solid`,
  borderColor: isActive ? 'primary.500' : 'neutral.200',
  borderRadius: '12px',
  backgroundColor: isActive ? 'primary.50' : 'common.white',
  boxShadow: (theme: Theme) => `0px 1px 3px ${alpha(theme.palette.common.black, 0.08)}`,
  padding: '20px',
  cursor: 'pointer',
  transition: 'transform 0.3s',
  '&:hover': { transform: 'scale(1.02)' },
});

interface LanguageOption {
  id: string;
  title: string;
  category: string;
  rightElement: React.ReactNode;
}

const StandardComplianceConfiguration = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { currentJob } = useAppSelector((state) => state.jobs);

  const [langSearch, setLangSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const config = currentJob?.wizardState?.configSettings;
  const currentLangCode = config?.language || t('languages.english');
  const frameworkKey = currentJob?.wizardState?.frameworkSelection || '';
  const activeFramework = FRAMEWORK_INFO[frameworkKey] || DEFAULT_INFO;

  const languageOptions = useMemo(() => {
    const options: LanguageOption[] = [];
    const searchLower = langSearch.toLowerCase();

    if (!langSearch && config?.isAutoDetected) {
      const currentLang = ALL_LANGUAGES.find((l) => l.code === currentLangCode);
      options.push({
        id: currentLangCode,
        title: currentLang
          ? t(currentLang.name)
          : t('deIdentify.languageSelect.autoDetectedUnknown'),
        category: '',
        rightElement: (
          <Chip
            label={t('deIdentify.languageSelect.autoDetected')}
            size="small"
            sx={{
              bgcolor: (theme: Theme) => alpha(theme.palette.accent[400]!, 0.1),
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
          title: t(l.name),
          category: t('deIdentify.languageSelect.recentlyUsed'),
          rightElement:
            l.code === currentLangCode ? (
              <CheckIcon sx={{ fontSize: FONT_SIZES.lg, color: 'primary.500' }} />
            ) : null,
        });
      });
    }

    ALL_LANGUAGES.map((l) => ({ ...l, translatedName: t(l.name) }))
      .filter((l) => l.translatedName.toLowerCase().includes(searchLower))
      .forEach((l) => {
        options.push({
          id: l.code,
          title: l.translatedName,
          category: langSearch ? '' : t('deIdentify.languageSelect.allLanguages'),
          rightElement:
            l.code === currentLangCode ? (
              <CheckIcon sx={{ fontSize: FONT_SIZES.lg, color: 'primary.500' }} />
            ) : null,
        });
      });

    return options;
  }, [langSearch, currentLangCode, config, t]);

  const updateJob = async (jobId: string, updateData: Partial<IJob>): Promise<void> => {
    try {
      const response = await jobsService.updateJob(jobId, updateData);
      dispatch(setJobAC(response));
    } catch (error) {
      console.error(error);
    }
  };

  const selectThreshold = async (threshold: number): Promise<void> => {
    if (!currentJob?.wizardState || !currentJob.id) return;
    await updateJob(currentJob.id, {
      wizardState: {
        ...currentJob.wizardState,
        configSettings: {
          ...config!,
          threshold,
          language: config?.language || t('languages.english'),
          strategies: currentJob?.wizardState.configSettings.strategies || DEFAULT_STRATEGIES,
          entities: Object.keys(DEFAULT_STRATEGIES),
        },
      },
    });
  };

  const handleLanguageChange = async (code: string): Promise<void> => {
    if (!currentJob?.wizardState) return;
    await updateJob(currentJob.id, {
      wizardState: { ...currentJob.wizardState, configSettings: { ...config!, language: code } },
    });
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ mb: '48px' }}>
        <Typography sx={sectionHeaderStyle()}>
          {t('deIdentify.settings.sections.privacyRisk')}
        </Typography>
        <Grid container spacing={2} sx={sectionWrapperStyle}>
          {thresholds.map((threshold) => {
            const isActive = config?.threshold === threshold.score;
            return (
              <Grid size={{ xs: 12, md: 6, lg: 12, xl: 4 }} key={threshold.id}>
                <Box
                  onClick={() => selectThreshold(threshold.score)}
                  sx={cardContainerStyle(isActive)}
                >
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: '24px' }}>
                      {isActive ? (
                        <RadioButtonCheckedOutlinedIcon />
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
                        {t(threshold.titleKey)}
                      </Typography>
                    </Box>
                    {threshold.id === 2 && (
                      <Box
                        sx={{
                          padding: '4px 12px',
                          borderRadius: '999px',
                          bgcolor: 'accent.100',
                          color: 'accent.500',
                          border: '1px solid',
                          borderColor: 'accent.500',
                          fontSize: FONT_SIZES.xs,
                          fontWeight: 'fontWeightMedium',
                        }}
                      >
                        {t('deIdentify.settings.detection.recommended')}
                      </Box>
                    )}
                  </Box>
                  <Typography sx={{ color: 'neutral.700', fontSize: FONT_SIZES.md }}>
                    {t(threshold.descKey)}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {config?.threshold === Threshold.LOW && (
        <Box
          sx={{
            width: '100%',
            p: '16px',
            mb: '24px',
            border: '1px solid',
            borderColor: 'warning.main',
            bgcolor: (theme) => alpha(theme.palette.warning.light, 0.14),
            borderRadius: '8px',
            boxShadow: (theme) => `0px 1px 3px 0px ${alpha(theme.palette.common.black, 0.14)}`,
            display: 'flex',
            gap: 1,
          }}
        >
          <WarningAmberIcon sx={{ color: 'warning.main' }} />
          <Box>
            <Typography
              sx={{
                color: 'warning.main',
                fontWeight: 'fontWeightMedium',
                fontSize: FONT_SIZES.sm,
                lineHeight: 1.2,
                mb: '4px',
              }}
            >
              {t(activeFramework.warningKey)}
            </Typography>
            <Typography sx={{ color: 'neutral.700', fontSize: FONT_SIZES.xs }}>
              {t(activeFramework.descriptionKey)}
            </Typography>
          </Box>
        </Box>
      )}

      <Box
        sx={{
          width: '100%',
          p: '16px',
          mb: '48px',
          border: '1px solid',
          borderColor: 'info.main',
          bgcolor: 'info.light',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          justifyContent: 'space-between',
          boxShadow: (theme) => `0px 1px 3px 0px ${alpha(theme.palette.common.black, 0.14)}`,
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <InfoIcon sx={{ color: 'info.main' }} />
          <Box>
            <Typography
              sx={{
                color: 'neutral.900',
                fontWeight: 'fontWeightMedium',
                fontSize: FONT_SIZES.sm,
                lineHeight: 1,
                mb: '4px',
              }}
            >
              {t('deIdentify.settings.howItWorks.title')}
            </Typography>
            <Typography sx={{ color: 'neutral.700', fontSize: FONT_SIZES.xs }}>
              {t(activeFramework.descriptionKey)}
            </Typography>
          </Box>
        </Box>
        <Button
          color="inherit"
          sx={{ mr: 1, color: (theme) => theme.palette.accent[500] }}
          endIcon={<ArrowForwardIcon />}
          onClick={() => setDrawerOpen(true)}
        >
          {t('deIdentify.settings.howItWorks.viewLogic')}
        </Button>
      </Box>

      <Box sx={{ mb: '48px' }}>
        <Typography sx={sectionHeaderStyle()}>
          {t('deIdentify.settings.sections.entityConfiguration')}
        </Typography>
        {!!config?.threshold && (
          <Box sx={sectionWrapperStyle}>
            <Typography sx={{ fontWeight: 'fontWeightMedium', fontSize: FONT_SIZES.md }}>
              {t('deIdentify.settings.entityConfig.chooseIdentifiers')}
            </Typography>
            <Typography sx={{ color: 'neutral.500', fontSize: FONT_SIZES.sm, mb: 2 }}>
              {t('deIdentify.settings.entityConfig.deselectedByDefault')}
            </Typography>

            <Box
              sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' }, mb: 4 }}
            >
              <Box sx={{ flex: 2, width: '100%' }}>
                <EntityConfigurationAccordion currentJob={currentJob!} updateJob={updateJob} />
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
          </Box>
        )}
      </Box>

      <ConfigurationLogicDrawer
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        currentJob={currentJob!}
      />
    </Box>
  );
};

export default StandardComplianceConfiguration;

import React, { type FC, type ElementType, useMemo, useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  alpha,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  RestartAlt as ResetIcon,
  Block as RedactIcon,
  LabelOutlined as ReplaceIcon,
  KeyOutlined as TokenIcon,
  AutoAwesomeOutlined as SyntheticIcon,
  VisibilityOffOutlined as MaskIcon,
  LockOutlined as HashIcon,
  CompressOutlined as GeneraliseIcon,
  StorageOutlined as PseudonymiseIcon,
  PsychologyOutlined as NLPIcon,
  CorporateFareOutlined as BusinessIcon,
  AccountCircleOutlined as PersonIcon,
  CalendarMonthOutlined as CalendarIcon,
  LocationOnOutlined as LocationIcon,
  RouterOutlined as IpIcon,
  MapOutlined as GeoPointIcon,
  BadgeOutlined as NationalIdIcon,
  CreditCardOutlined as CreditCardIcon,
  AccountBalanceOutlined as BankAccountIcon,
  EmailOutlined as EmailIcon,
  LocalPhoneOutlined as PhoneIcon,
  HealthAndSafetyOutlined as MedicalIcon,
  DevicesOutlined as DeviceIdIcon,
  ArticleOutlined as FreeTextIcon,
  Fingerprint as BiologicalIcon,
  ImageOutlined as PhotoIcon,
} from '@mui/icons-material';
import Dropdown from '@/components/UI/Dropdown';
import type { IJob } from '@/pages/DeIdentify/types';
import { DEFAULT_STRATEGIES, FONT_SIZES } from '@/constants';
import ResetEntitiesPopup from './ResetEntitiesPopup';
import { useTranslation } from 'react-i18next';

interface EntityConfig {
  id: string;
  labelKey: string;
  icon: ElementType;
  categoryKey: string;
  isSensitive?: boolean;
}

interface IProps {
  currentJob: IJob | null;
  updateJob: (jobId: string, updateData: Partial<IJob>) => Promise<void>;
}

const FRAMEWORK_LABELS: Record<string, string> = {
  'eu-gdpr': 'deIdentify.settings.logicDrawer.frameworks.euGdpr.label',
  'uk-gdpr': 'deIdentify.settings.logicDrawer.frameworks.ukGdpr.label',
  'swiss-fadp': 'deIdentify.settings.logicDrawer.frameworks.swissFadp.label',
};

const ALL_STRATEGIES = [
  {
    id: 'Redact',
    groupKey: 'deIdentify.settings.strategies.categories.remove',
    labelKey: 'deIdentify.settings.strategies.redact.title',
    descKey: 'deIdentify.settings.strategies.redact.description',
    icon: RedactIcon,
  },
  {
    id: 'Replace',
    groupKey: 'deIdentify.settings.strategies.categories.replace',
    labelKey: 'deIdentify.settings.strategies.replace.title',
    descKey: 'deIdentify.settings.strategies.replace.description',
    icon: ReplaceIcon,
  },
  {
    id: 'Token',
    groupKey: 'deIdentify.settings.strategies.categories.replace',
    labelKey: 'deIdentify.settings.strategies.token.title',
    descKey: 'deIdentify.settings.strategies.token.description',
    icon: TokenIcon,
  },
  {
    id: 'Synthetic',
    groupKey: 'deIdentify.settings.strategies.categories.replace',
    labelKey: 'deIdentify.settings.strategies.synthetic.title',
    descKey: 'deIdentify.settings.strategies.synthetic.description',
    icon: SyntheticIcon,
  },
  {
    id: 'Mask',
    groupKey: 'deIdentify.settings.strategies.categories.protect',
    labelKey: 'deIdentify.settings.strategies.mask.title',
    descKey: 'deIdentify.settings.strategies.mask.description',
    icon: MaskIcon,
  },
  {
    id: 'Hash',
    groupKey: 'deIdentify.settings.strategies.categories.protect',
    labelKey: 'deIdentify.settings.strategies.hash.title',
    descKey: 'deIdentify.settings.strategies.hash.description',
    icon: HashIcon,
  },
  {
    id: 'Generalise',
    groupKey: 'deIdentify.settings.strategies.categories.transform',
    labelKey: 'deIdentify.settings.strategies.generalise.title',
    descKey: 'deIdentify.settings.strategies.generalise.description',
    icon: GeneraliseIcon,
  },
  {
    id: 'Pseudonymise',
    groupKey: 'deIdentify.settings.strategies.categories.transform',
    labelKey: 'deIdentify.settings.strategies.pseudonymise.title',
    descKey: 'deIdentify.settings.strategies.pseudonymise.description',
    icon: PseudonymiseIcon,
  },
  {
    id: 'NLP',
    groupKey: 'deIdentify.settings.strategies.categories.transform',
    labelKey: 'deIdentify.settings.strategies.nlp.title',
    descKey: 'deIdentify.settings.strategies.nlp.description',
    icon: NLPIcon,
  },
];

const ENTITIES_DATA: EntityConfig[] = [
  {
    id: 'PERSON',
    labelKey: 'deIdentify.settings.logicDrawer.entities.person.title',
    icon: PersonIcon,
    categoryKey: 'deIdentify.settings.entityConfig.categories.identity',
  },
  {
    id: 'ORGANIZATION',
    labelKey: 'deIdentify.settings.logicDrawer.entities.organization.title',
    icon: BusinessIcon,
    categoryKey: 'deIdentify.settings.entityConfig.categories.identity',
  },
  {
    id: 'LOCATION',
    labelKey: 'deIdentify.settings.logicDrawer.entities.location.title',
    icon: LocationIcon,
    categoryKey: 'deIdentify.settings.entityConfig.categories.datesLocation',
  },
  {
    id: 'DATE',
    labelKey: 'deIdentify.settings.logicDrawer.entities.dateTime.title',
    icon: CalendarIcon,
    categoryKey: 'deIdentify.settings.entityConfig.categories.datesLocation',
  },
  {
    id: 'IP',
    labelKey: 'deIdentify.settings.logicDrawer.entities.ip.title',
    icon: IpIcon,
    categoryKey: 'deIdentify.settings.entityConfig.categories.datesLocation',
  },
  {
    id: 'GEOPOINT',
    labelKey: 'deIdentify.settings.logicDrawer.entities.geopoint.title',
    icon: GeoPointIcon,
    categoryKey: 'deIdentify.settings.entityConfig.categories.datesLocation',
  },
  {
    id: 'NATIONAL_ID',
    labelKey: 'deIdentify.settings.logicDrawer.entities.nationalId.title',
    icon: NationalIdIcon,
    categoryKey: 'deIdentify.settings.entityConfig.categories.sensitiveIdentifiers',
  },
  {
    id: 'ID_NUMBER',
    labelKey: 'deIdentify.settings.logicDrawer.entities.idNumber.title',
    icon: NationalIdIcon,
    categoryKey: 'deIdentify.settings.entityConfig.categories.sensitiveIdentifiers',
  },
  {
    id: 'PASSPORT',
    labelKey: 'deIdentify.settings.logicDrawer.entities.passport.title',
    icon: NationalIdIcon,
    categoryKey: 'deIdentify.settings.entityConfig.categories.sensitiveIdentifiers',
  },
  {
    id: 'CREDIT_CARD',
    labelKey: 'deIdentify.settings.logicDrawer.entities.creditCard.title',
    icon: CreditCardIcon,
    categoryKey: 'deIdentify.settings.entityConfig.categories.sensitiveIdentifiers',
  },
  {
    id: 'BANK_ACCOUNT',
    labelKey: 'deIdentify.settings.logicDrawer.entities.bankAccount.title',
    icon: BankAccountIcon,
    categoryKey: 'deIdentify.settings.entityConfig.categories.sensitiveIdentifiers',
  },
  {
    id: 'EMAIL',
    labelKey: 'deIdentify.settings.logicDrawer.entities.email.title',
    icon: EmailIcon,
    categoryKey: 'deIdentify.settings.entityConfig.categories.sensitiveIdentifiers',
  },
  {
    id: 'PHONE',
    labelKey: 'deIdentify.settings.logicDrawer.entities.phone.title',
    icon: PhoneIcon,
    categoryKey: 'deIdentify.settings.entityConfig.categories.sensitiveIdentifiers',
  },
  {
    id: 'MEDICAL_RECORD_NUMBER',
    labelKey: 'deIdentify.settings.logicDrawer.entities.mrn.title',
    icon: MedicalIcon,
    categoryKey: 'deIdentify.settings.entityConfig.categories.sensitiveIdentifiers',
  },
  {
    id: 'DEVICE_ID',
    labelKey: 'deIdentify.settings.logicDrawer.entities.deviceId.title',
    icon: DeviceIdIcon,
    categoryKey: 'deIdentify.settings.entityConfig.categories.sensitiveIdentifiers',
  },
  {
    id: 'FREE_TEXT',
    labelKey: 'deIdentify.settings.logicDrawer.entities.freeText.title',
    icon: FreeTextIcon,
    categoryKey: 'deIdentify.settings.entityConfig.categories.unstructuredData',
  },
  {
    id: 'BIOLOGICAL_DATA',
    labelKey: 'deIdentify.settings.logicDrawer.entities.biologicalData.title',
    icon: BiologicalIcon,
    categoryKey: 'deIdentify.settings.entityConfig.categories.specialCategory',
    isSensitive: true,
  },
  {
    id: 'PHOTO',
    labelKey: 'deIdentify.settings.logicDrawer.entities.photo.title',
    icon: PhotoIcon,
    categoryKey: 'deIdentify.settings.entityConfig.categories.specialCategory',
    isSensitive: true,
  },
];

const EntityConfigurationAccordion: FC<IProps> = ({ currentJob, updateJob }) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [isResetEntitiesPopupOpen, setIsResetEntitiesPopupOpen] = useState(false);

  const config = currentJob?.wizardState?.configSettings;
  const strategies = (config?.strategies as Record<string, string>) || {};
  const frameworkKey = currentJob?.wizardState?.frameworkSelection || '';

  const strategyOptions = useMemo(
    () =>
      ALL_STRATEGIES.map((s) => ({
        id: s.id,
        title: t(s.labelKey),
        description: t(s.descKey),
        icon: <s.icon />,
        category: t(s.groupKey),
      })),
    [t],
  );

  const handleEntityStrategyChange = async (entityId: string, strategyId: string) => {
    if (!currentJob?.id || !currentJob.wizardState) return;

    await updateJob(currentJob.id, {
      wizardState: {
        ...currentJob.wizardState,
        configSettings: {
          ...currentJob.wizardState.configSettings,
          strategies: { ...strategies, [entityId]: strategyId },
        },
      },
    });
  };

  const handleReset = async () => {
    if (!currentJob?.id || !currentJob.wizardState) return;

    await updateJob(currentJob.id, {
      wizardState: {
        ...currentJob.wizardState,
        configSettings: {
          ...currentJob.wizardState.configSettings,
          strategies: DEFAULT_STRATEGIES,
        },
      },
    });
    setIsResetEntitiesPopupOpen(false);
  };

  const handleResetClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResetEntitiesPopupOpen(true);
  };

  const categories = useMemo(
    () => Array.from(new Set(ENTITIES_DATA.map((e) => e.categoryKey))),
    [],
  );

  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
      sx={{
        border: '1px solid',
        borderColor: 'neutral.200',
        borderRadius: '8px !important',
        '&:before': { display: 'none' },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          '& .MuiAccordionSummary-content': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        }}
      >
        <Box>
          <Typography
            sx={{ fontSize: FONT_SIZES.sm, fontWeight: 'fontWeightMedium', color: 'neutral.900' }}
          >
            {t('deIdentify.settings.entityConfig.title')}
          </Typography>
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>
            {t('deIdentify.settings.entityConfig.autoConfigured', { count: ENTITIES_DATA.length })}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mr: 1 }}>
          <Button
            size="small"
            startIcon={<ResetIcon />}
            onClick={handleResetClick}
            sx={{
              color: 'accent.400',
              textTransform: 'none',
              fontWeight: 'fontWeightMedium',
              fontSize: FONT_SIZES.sm,
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.common.black, 0.04),
              },
            }}
          >
            {t('deIdentify.settings.entityConfig.resetToDefault')}
          </Button>
          <Typography
            sx={{ color: 'primary.800', fontWeight: 'fontWeightMedium', fontSize: FONT_SIZES.sm }}
          >
            {t('deIdentify.settings.entityConfig.customize')}
          </Typography>
        </Box>
      </AccordionSummary>

      <Divider />

      <AccordionDetails sx={{ p: 0 }}>
        {categories.map((catKey) => {
          const isSpecial =
            catKey === 'deIdentify.settings.entityConfig.categories.specialCategory';
          const articleLabelKey = isSpecial ? FRAMEWORK_LABELS[frameworkKey] : null;

          return (
            <Box key={catKey}>
              <Box
                sx={{
                  bgcolor: 'neutral.100',
                  px: 2,
                  py: 1,
                  borderBottom: '1px solid',
                  borderColor: 'neutral.200',
                }}
              >
                <Typography
                  sx={{
                    fontSize: FONT_SIZES.xs,
                    fontWeight: 'fontWeightMedium',
                    color: isSpecial ? 'warning.main' : 'neutral.700',
                    textTransform: 'uppercase',
                  }}
                >
                  {t(catKey)}
                  {isSpecial && ` — ${articleLabelKey ? t(articleLabelKey) : ''}`}
                </Typography>
              </Box>

              {ENTITIES_DATA.filter((e) => e.categoryKey === catKey).map((entity) => {
                const EntityIcon = entity.icon;
                const currentStrategyId = strategies[entity.id] || 'Redact';

                return (
                  <Box
                    key={entity.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'stretch',
                      borderBottom: '1px solid',
                      borderColor: 'neutral.100',
                      bgcolor: 'primary.50',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '320px',
                        px: 2,
                        py: 1,
                        bgcolor: (theme) => alpha(theme.palette.primary[50] || 'common.white', 0.4),
                        gap: 1.5,
                      }}
                    >
                      <EntityIcon sx={{ color: 'primary.600', fontSize: FONT_SIZES.xl }} />
                      <Typography
                        sx={{
                          fontSize: FONT_SIZES.xs,
                          fontWeight: 'fontWeightMedium',
                          color: 'primary.500',
                          flex: 1,
                        }}
                      >
                        {t(entity.labelKey)}
                      </Typography>
                      {entity.isSensitive && (
                        <Chip
                          label={t('deIdentify.settings.entityConfig.sensitive')}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: FONT_SIZES.xs,
                            bgcolor: (theme) => alpha(theme.palette.warning.light, 0.1),
                            color: 'warning.main',
                          }}
                        />
                      )}
                    </Box>

                    <Divider orientation="vertical" flexItem />

                    <Box sx={{ flex: 1, p: 0.5 }}>
                      <Dropdown
                        options={strategyOptions}
                        value={currentStrategyId}
                        onChange={(id) => handleEntityStrategyChange(entity.id, id)}
                        showIcons
                      />
                    </Box>
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </AccordionDetails>

      <ResetEntitiesPopup
        isVisible={isResetEntitiesPopupOpen}
        onClose={() => setIsResetEntitiesPopupOpen(false)}
        onReset={handleReset}
      />
    </Accordion>
  );
};

export default EntityConfigurationAccordion;

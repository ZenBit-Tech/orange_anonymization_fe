import { FONT_SIZES } from '@/constants';
import {
  alpha,
  Box,
  Button,
  Drawer,
  Typography,
  type SvgIconProps,
  type Theme,
} from '@mui/material';
import { type ElementType, type FC, useMemo } from 'react';
import {
  ArrowForward as ArrowForwardIcon,
  Close as CloseIcon,
  AccountCircleOutlined as AccountCircleOutlinedIcon,
  CalendarMonthOutlined as CalendarIcon,
  LocationOnOutlined as LocationIcon,
  RouterOutlined as IpIcon,
  MapOutlined as GeoPointIcon,
  BadgeOutlined as NationalIdIcon,
  CreditCardOutlined as CreditCardIcon,
  EmailOutlined as EmailIcon,
  HealthAndSafetyOutlined as MedicalIcon,
  DevicesOutlined as DeviceIdIcon,
  ArticleOutlined as FreeTextIcon,
  Fingerprint as BiologicalIcon,
  ImageOutlined as PhotoIcon,
  CorporateFareOutlined as BusinessIcon,
} from '@mui/icons-material';
import type { IJob } from '@/pages/DeIdentify/types';
import { useTranslation } from 'react-i18next';

type IconComponent = ElementType<SvgIconProps>;

interface EntityRow {
  icon: IconComponent;
  titleKey: string | string[];
  methodKey: string;
  descriptionKey: string;
}

interface LogicSection {
  sectionTitleKey: string;
  isSpecial?: boolean;
  specialNoticeKey?: string;
  entities: EntityRow[];
}

interface IProps {
  currentJob: IJob;
  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;
}

const FRAMEWORK_STYLING: Record<string, { labelKey: string; noticeKey: string }> = {
  'eu-gdpr': {
    labelKey: 'deIdentify.settings.logicDrawer.frameworks.euGdpr.label',
    noticeKey: 'deIdentify.settings.logicDrawer.frameworks.euGdpr.notice',
  },
  'uk-gdpr': {
    labelKey: 'deIdentify.settings.logicDrawer.frameworks.ukGdpr.label',
    noticeKey: 'deIdentify.settings.logicDrawer.frameworks.ukGdpr.notice',
  },
  'swiss-fadp': {
    labelKey: 'deIdentify.settings.logicDrawer.frameworks.swissFadp.label',
    noticeKey: 'deIdentify.settings.logicDrawer.frameworks.swissFadp.notice',
  },
};

const DEFAULT_SPECIAL_NOTICE_KEY = 'deIdentify.settings.logicDrawer.frameworks.default.notice';

const LOGIC_SECTIONS: LogicSection[] = [
  {
    sectionTitleKey: 'deIdentify.settings.logicDrawer.sections.identity',
    entities: [
      {
        icon: AccountCircleOutlinedIcon,
        titleKey: 'deIdentify.settings.logicDrawer.entities.person.title',
        methodKey: 'deIdentify.settings.logicDrawer.entities.person.method',
        descriptionKey: 'deIdentify.settings.logicDrawer.entities.person.description',
      },
      {
        icon: BusinessIcon,
        titleKey: 'deIdentify.settings.logicDrawer.entities.organization.title',
        methodKey: 'deIdentify.settings.logicDrawer.entities.organization.method',
        descriptionKey: 'deIdentify.settings.logicDrawer.entities.organization.description',
      },
    ],
  },
  {
    sectionTitleKey: 'deIdentify.settings.logicDrawer.sections.datesLocation',
    entities: [
      {
        icon: CalendarIcon,
        titleKey: 'deIdentify.settings.logicDrawer.entities.dateTime.title',
        methodKey: 'deIdentify.settings.logicDrawer.entities.dateTime.method',
        descriptionKey: 'deIdentify.settings.logicDrawer.entities.dateTime.description',
      },
      {
        icon: LocationIcon,
        titleKey: 'deIdentify.settings.logicDrawer.entities.location.title',
        methodKey: 'deIdentify.settings.logicDrawer.entities.location.method',
        descriptionKey: 'deIdentify.settings.logicDrawer.entities.location.description',
      },
      {
        icon: IpIcon,
        titleKey: 'deIdentify.settings.logicDrawer.entities.ip.title',
        methodKey: 'deIdentify.settings.logicDrawer.entities.ip.method',
        descriptionKey: 'deIdentify.settings.logicDrawer.entities.ip.description',
      },
      {
        icon: GeoPointIcon,
        titleKey: 'deIdentify.settings.logicDrawer.entities.geopoint.title',
        methodKey: 'deIdentify.settings.logicDrawer.entities.geopoint.method',
        descriptionKey: 'deIdentify.settings.logicDrawer.entities.geopoint.description',
      },
    ],
  },
  {
    sectionTitleKey: 'deIdentify.settings.logicDrawer.sections.sensitiveIdentifiers',
    entities: [
      {
        icon: NationalIdIcon,
        titleKey: [
          'deIdentify.settings.logicDrawer.entities.nationalId.title',
          'deIdentify.settings.logicDrawer.entities.idNumber.title',
          'deIdentify.settings.logicDrawer.entities.passport.title',
        ],
        methodKey: 'deIdentify.settings.logicDrawer.entities.nationalId.method',
        descriptionKey: 'deIdentify.settings.logicDrawer.entities.nationalId.description',
      },
      {
        icon: CreditCardIcon,
        titleKey: [
          'deIdentify.settings.logicDrawer.entities.creditCard.title',
          'deIdentify.settings.logicDrawer.entities.bankAccount.title',
        ],
        methodKey: 'deIdentify.settings.logicDrawer.entities.creditCard.method',
        descriptionKey: 'deIdentify.settings.logicDrawer.entities.creditCard.description',
      },
      {
        icon: EmailIcon,
        titleKey: [
          'deIdentify.settings.logicDrawer.entities.email.title',
          'deIdentify.settings.logicDrawer.entities.phone.title',
        ],
        methodKey: 'deIdentify.settings.logicDrawer.entities.email.method',
        descriptionKey: 'deIdentify.settings.logicDrawer.entities.email.description',
      },
      {
        icon: MedicalIcon,
        titleKey: 'deIdentify.settings.logicDrawer.entities.mrn.title',
        methodKey: 'deIdentify.settings.logicDrawer.entities.mrn.method',
        descriptionKey: 'deIdentify.settings.logicDrawer.entities.mrn.description',
      },
      {
        icon: DeviceIdIcon,
        titleKey: 'deIdentify.settings.logicDrawer.entities.deviceId.title',
        methodKey: 'deIdentify.settings.logicDrawer.entities.deviceId.method',
        descriptionKey: 'deIdentify.settings.logicDrawer.entities.deviceId.description',
      },
    ],
  },
  {
    sectionTitleKey: 'deIdentify.settings.logicDrawer.sections.unstructuredData',
    entities: [
      {
        icon: FreeTextIcon,
        titleKey: 'deIdentify.settings.logicDrawer.entities.freeText.title',
        methodKey: 'deIdentify.settings.logicDrawer.entities.freeText.method',
        descriptionKey: 'deIdentify.settings.logicDrawer.entities.freeText.description',
      },
    ],
  },
  {
    sectionTitleKey: 'deIdentify.settings.logicDrawer.sections.specialCategory',
    isSpecial: true,
    entities: [
      {
        icon: BiologicalIcon,
        titleKey: 'deIdentify.settings.logicDrawer.entities.biologicalData.title',
        methodKey: 'deIdentify.settings.logicDrawer.entities.biologicalData.method',
        descriptionKey: 'deIdentify.settings.logicDrawer.entities.biologicalData.description',
      },
      {
        icon: PhotoIcon,
        titleKey: 'deIdentify.settings.logicDrawer.entities.photo.title',
        methodKey: 'deIdentify.settings.logicDrawer.entities.photo.method',
        descriptionKey: 'deIdentify.settings.logicDrawer.entities.photo.description',
      },
    ],
  },
];

const EntityLogicRow: FC<EntityRow & { isSpecial?: boolean }> = ({
  icon: Icon,
  titleKey,
  methodKey,
  descriptionKey,
  isSpecial,
}) => {
  const { t } = useTranslation();
  const titleKeys = Array.isArray(titleKey) ? titleKey : [titleKey];
  const mainColor = isSpecial ? 'warning.main' : 'primary.500';

  return (
    <Box sx={{ mb: '16px', '&:last-child': { mb: 0 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        {titleKeys.map((tk, idx) => (
          <Box key={tk} sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon sx={{ color: mainColor, fontSize: FONT_SIZES.xl }} />
            <Typography
              sx={{
                fontWeight: 'fontWeightMedium',
                fontSize: FONT_SIZES.xs,
                color: mainColor,
                textTransform: 'uppercase',
              }}
            >
              {t(tk)}
            </Typography>
            {idx < titleKeys.length - 1 && (
              <Box sx={{ width: '1px', height: '14px', bgcolor: 'neutral.300', mx: 0.5 }} />
            )}
          </Box>
        ))}
        <ArrowForwardIcon sx={{ color: 'neutral.300', fontSize: FONT_SIZES.lg }} />
        <Typography
          sx={{ fontWeight: 'fontWeightMedium', fontSize: FONT_SIZES.sm, color: mainColor }}
        >
          {t(methodKey)}
        </Typography>
      </Box>
      <Typography sx={{ color: 'neutral.500', fontSize: FONT_SIZES.xs, mt: '2px' }}>
        {t(descriptionKey)}
      </Typography>
    </Box>
  );
};

const ConfigurationLogicDrawer: FC<IProps> = ({ drawerOpen, setDrawerOpen, currentJob }) => {
  const { t } = useTranslation();
  const frameworkKey = currentJob?.wizardState?.frameworkSelection;

  const frameworkData = useMemo(() => {
    if (!frameworkKey || !FRAMEWORK_STYLING[frameworkKey]) {
      return { labelKey: '', noticeKey: DEFAULT_SPECIAL_NOTICE_KEY };
    }
    return FRAMEWORK_STYLING[frameworkKey];
  }, [frameworkKey]);

  return (
    <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
      <Box sx={{ py: '24px', px: '24px', width: '560px' }}>
        <Box
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: '6px' }}
        >
          <Typography
            sx={{ fontSize: FONT_SIZES.lg, color: 'neutral.900', fontWeight: 'fontWeightSemiBold' }}
          >
            {t('deIdentify.settings.logicDrawer.title')}
          </Typography>
          <Button onClick={() => setDrawerOpen(false)} sx={{ minWidth: 'auto', p: 0 }}>
            <CloseIcon sx={{ color: 'neutral.500' }} />
          </Button>
        </Box>
        <Typography sx={{ color: 'neutral.500', fontSize: FONT_SIZES.sm, mb: 1 }}>
          {t('deIdentify.settings.logicDrawer.subtitle')}
        </Typography>

        <Box sx={{ width: '100%', height: '1px', bgcolor: 'neutral.200', my: '20px' }} />

        {LOGIC_SECTIONS.map((section, sIdx) => {
          const isSpecial = !!section.isSpecial;
          const displayNoticeKey = isSpecial ? frameworkData.noticeKey : section.specialNoticeKey;

          return (
            <Box
              key={section.sectionTitleKey + sIdx}
              sx={{
                border: '1px solid',
                borderColor: isSpecial ? 'warning.main' : 'neutral.200',
                borderRadius: '8px',
                mb: '24px',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  bgcolor: (theme: Theme) =>
                    isSpecial ? alpha(theme.palette.warning.light, 0.1) : 'neutral.200',
                  px: '16px',
                  py: '8px',
                  color: isSpecial ? 'warning.main' : 'neutral.700',
                }}
              >
                <Typography
                  sx={{
                    textTransform: 'uppercase',
                    fontSize: FONT_SIZES.xs,
                    fontWeight: 'fontWeightMedium',
                  }}
                >
                  {t(section.sectionTitleKey)}
                  {isSpecial && frameworkData.labelKey && t(frameworkData.labelKey)}
                </Typography>

                {displayNoticeKey && (
                  <Typography
                    sx={{
                      color: 'neutral.500',
                      fontSize: FONT_SIZES.xs,
                      textTransform: 'none',
                      mt: 0.5,
                    }}
                  >
                    {t(displayNoticeKey)}
                  </Typography>
                )}
              </Box>

              <Box sx={{ p: '16px' }}>
                {section.entities.map((entity, idx) => (
                  <EntityLogicRow key={idx} {...entity} isSpecial={isSpecial} />
                ))}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Drawer>
  );
};

export default ConfigurationLogicDrawer;

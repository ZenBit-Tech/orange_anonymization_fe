import { Box, Container } from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import StorageIcon from '@mui/icons-material/Storage';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import type { SvgIconComponent } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import {
  LANDING_COLORS,
  LANDING_GRADIENTS,
  LANDING_SIZES,
  SECTION_IDS,
} from '@/pages/Landing/constants';
import { LandingBody, LandingCardTitle, LandingH2, LandingH4 } from '@/pages/Landing/typography';

interface FeatureCard {
  key: string;
  Icon: SvgIconComponent;
  variant: 'gradient' | 'solid';
  flex: number;
}

const ROW_1: FeatureCard[] = [
  {
    key: 'detection',
    Icon: ManageSearchIcon,
    variant: 'gradient',
    flex: LANDING_SIZES.featureCardFlexSmall,
  },
  {
    key: 'synthetic',
    Icon: StorageIcon,
    variant: 'solid',
    flex: LANDING_SIZES.featureCardFlexLargeAlt,
  },
];

const ROW_2: FeatureCard[] = [
  {
    key: 'compliance',
    Icon: AssignmentIcon,
    variant: 'solid',
    flex: LANDING_SIZES.featureCardFlexLarge,
  },
  {
    key: 'privacy',
    Icon: AdminPanelSettingsIcon,
    variant: 'gradient',
    flex: LANDING_SIZES.featureCardFlexSmall,
  },
];

const CARD_BG = {
  gradient: LANDING_GRADIENTS.featureCard,
  solid: LANDING_COLORS.cardSurface,
} as const;

const CARD_BORDER = {
  gradient: 'none',
  solid: `1.25px solid ${LANDING_COLORS.cardBorderTeal}`,
} as const;

const FeatureCardItem = ({ card }: { card: FeatureCard }) => {
  const { t } = useTranslation();
  const { key, Icon, variant, flex } = card;

  return (
    <Box
      sx={{
        flex: { xs: '1 1 100%', md: flex },
        minWidth: 0,
        background: CARD_BG[variant],
        border: CARD_BORDER[variant],
        borderRadius: LANDING_SIZES.cardRadius,
        p: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '36px',
        height: { md: LANDING_SIZES.featureCardHeight },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <LandingBody>{t(`landing.features.cards.${key}.description`)}</LandingBody>
        <Icon
          sx={{
            color: LANDING_COLORS.iconAccent,
            fontSize: LANDING_SIZES.iconLg,
            flexShrink: 0,
            ml: 2,
          }}
        />
      </Box>

      <LandingCardTitle sx={{ textTransform: 'capitalize' }}>
        {t(`landing.features.cards.${key}.title`)}
      </LandingCardTitle>
    </Box>
  );
};

const FeaturesSection = () => {
  const { t } = useTranslation();

  return (
    <Box component="section" id={SECTION_IDS.solutions} sx={{ py: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'flex-end' },
            gap: { xs: 3, md: 6 },
            mb: { xs: 6, md: 8 },
          }}
        >
          <LandingH2 component="h2" sx={{ maxWidth: { md: 560 } }}>
            {t('landing.features.title')}
          </LandingH2>
          <LandingH4 sx={{ maxWidth: { md: 480 }, textAlign: { xs: 'left', md: 'right' } }}>
            {t('landing.features.subtitle')}
          </LandingH4>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
            {ROW_1.map((card) => (
              <FeatureCardItem key={card.key} card={card} />
            ))}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
            {ROW_2.map((card) => (
              <FeatureCardItem key={card.key} card={card} />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export { FeaturesSection };

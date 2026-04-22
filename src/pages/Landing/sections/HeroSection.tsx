import { Box, Button, Container, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import { useTranslation } from 'react-i18next';
import { LandingSectionDecoration } from '@/components/LandingSectionDecoration';
import { FONT_SIZES } from '@/constants';
import {
  LANDING_COLORS,
  LANDING_SIZES,
  LANDING_TYPOGRAPHY,
  SECTION_IDS,
} from '@/pages/Landing/constants';
import { LandingH1, LandingH4 } from '@/pages/Landing/typography';

export interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  const { t } = useTranslation();

  return (
    <Box
      id={SECTION_IDS.hero}
      component="section"
      sx={{
        position: 'relative',
        pt: { xs: 12, md: '200px' },
        pb: { xs: 18, md: '340px' },
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <LandingH1 component="h1" sx={{ mb: 3 }}>
          {t('landing.hero.title')}
        </LandingH1>

        <LandingH4 sx={{ maxWidth: 480, mx: 'auto', mb: 5, textAlign: 'center' }}>
          {t('landing.hero.subtitle')}
        </LandingH4>

        <Button
          variant="contained"
          onClick={onGetStarted}
          endIcon={<ArrowForwardIcon />}
          sx={{
            width: LANDING_SIZES.primaryCtaWidth,
            height: LANDING_SIZES.primaryCtaHeight,
            mb: 6,
            fontSize: FONT_SIZES.sm,
            textTransform: 'none',
            color: 'primary.800',
            background: (theme) => theme.palette.accent[400],
            '& .MuiButton-endIcon': { ml: '12px' },
            '&:hover': {
              background: (theme) => theme.palette.accent[500],
            },
          }}
        >
          {t('landing.hero.cta')}
        </Button>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: 2, md: 4 },
            flexWrap: 'wrap',
          }}
        >
          {(['hipaa', 'gdpr', 'accuracy'] as const).map((badge) => (
            <Box key={badge} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <VerifiedOutlinedIcon
                sx={{ color: LANDING_COLORS.faintWhite, fontSize: LANDING_SIZES.iconSm }}
              />
              <Typography
                variant="caption"
                sx={{
                  color: LANDING_COLORS.mutedWhite,
                  letterSpacing: LANDING_TYPOGRAPHY.letterSpacingWide,
                }}
              >
                {t(`landing.hero.trustBadges.${badge}`)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>

      <LandingSectionDecoration variant="hero" />
    </Box>
  );
};

export { HeroSection };

import { Box, Button, Container, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTranslation } from 'react-i18next';
import { LandingSectionDecoration } from '@/components/LandingSectionDecoration';
import { FONT_SIZES } from '@/constants';
import {
  LANDING_COLORS,
  LANDING_GRADIENTS,
  LANDING_SIZES,
  LANDING_TYPOGRAPHY,
} from '@/pages/Landing/constants';
import { LandingH2 } from '@/pages/Landing/typography';

export interface CtaSectionProps {
  onGetStarted: () => void;
}

const CtaSection = ({ onGetStarted }: CtaSectionProps) => {
  const { t } = useTranslation();

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        pt: { xs: 10, md: 14 },
        pb: { xs: 16, md: 22 },
        overflow: 'hidden',
      }}
    >
      <LandingSectionDecoration variant="cta" />

      <Container
        maxWidth={false}
        sx={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center' }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: LANDING_SIZES.ctaPanelMaxWidth,
            borderRadius: LANDING_SIZES.cardRadius,
            py: '32px',
            px: { xs: 3, md: 5 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '32px',
            textAlign: 'center',
            background: LANDING_GRADIENTS.ctaPanel,
            backdropFilter: `blur(${LANDING_SIZES.ctaPanelBlur})`,
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              borderRadius: LANDING_SIZES.cardRadius,
              padding: LANDING_SIZES.ctaPanelBorderWidth,
              background: LANDING_GRADIENTS.ctaPanelBorder,
              mask: `linear-gradient(${LANDING_COLORS.maskOpaque} 0 0) content-box, linear-gradient(${LANDING_COLORS.maskOpaque} 0 0)`,
              maskComposite: 'exclude',
              WebkitMaskComposite: 'xor',
              pointerEvents: 'none',
            },
          }}
        >
          <LandingH2 component="h2">{t('landing.cta.title')}</LandingH2>

          <Typography
            variant="body1"
            sx={{
              color: LANDING_COLORS.mutedWhite,
              maxWidth: LANDING_SIZES.ctaSubtitleMaxWidth,
              lineHeight: LANDING_TYPOGRAPHY.looseLineHeight,
            }}
          >
            {t('landing.cta.subtitle')}
          </Typography>

          <Button
            variant="contained"
            onClick={onGetStarted}
            endIcon={<ArrowForwardIcon />}
            sx={{
              width: LANDING_SIZES.primaryCtaWidth,
              height: LANDING_SIZES.primaryCtaHeight,
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
            {t('landing.cta.button')}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export { CtaSection };

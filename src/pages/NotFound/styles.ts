import type { SxProps, Theme } from '@mui/material';

const FIGMA_CANVAS_WIDTH = 1440;
const FIGMA_ILLUSTRATION_WIDTH = 533.426;
const FIGMA_ILLUSTRATION_HEIGHT = 247.787;

export const notFoundStyles: Record<string, SxProps<Theme>> = {
  root: {
    minHeight: '100dvh',
    bgcolor: '#01132F',
    color: 'common.white',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  container: {
    width: '100%',
    maxWidth: `${FIGMA_CANVAS_WIDTH}px`,
    minHeight: '100dvh',
    mx: 'auto',
    position: 'relative',
    px: { xs: 2, sm: 0 },
  },
  logoRow: {
    position: 'absolute',
    top: 'clamp(1px, 2.2dvh, 24px)',
    left: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 'min(100%, 1440px)',
    height: 'auto',
    display: { xs: 'none', md: 'block' },
    objectFit: 'contain',
  },
  logoTextBlock: {
    display: { xs: 'flex', md: 'none' },
    flexDirection: 'column',
    alignItems: 'center',
    lineHeight: 1,
  },
  logoTitle: {
    fontSize: 24,
    lineHeight: '28px',
    fontWeight: 700,
    color: '#FFFFFF',
  },
  logoSubtitle: {
    fontSize: 12,
    lineHeight: '16px',
    fontWeight: 600,
    color: '#FFFFFF',
  },
  illustrationWrapper: {
    position: 'absolute',
    left: '50%',
    top: { xs: '36%', sm: '38%', md: '37%' },
    transform: 'translate(-50%, -50%)',
    width: {
      xs: 'min(88vw, 320px)',
      sm: 'min(86vw, 460px)',
      md: FIGMA_ILLUSTRATION_WIDTH,
    },
    height: 'auto',
    aspectRatio: `${FIGMA_ILLUSTRATION_WIDTH} / ${FIGMA_ILLUSTRATION_HEIGHT}`,
  },
  illustrationCenter: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    display: 'block',
  },

  content: {
    position: 'absolute',
    left: '50%',
    top: { xs: '75%', sm: '76.5%', md: '74%' },
    transform: 'translate(-50%, -50%)',
    width: { xs: 'min(92vw, 320px)', sm: 420, md: 480 },
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: { xs: '21px', md: '33px' },
  },
  title: {
    fontSize: { xs: 38, sm: 40, md: 36 },
    lineHeight: { xs: '44px', sm: '46px', md: '44px' },
    fontWeight: 700,
    color: '#B2EDE5',
  },
  description: {
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: 500,
    color: '#9CA3AF',
  },
  homeLink: {
    minWidth: '132px',
    height: 40,
    borderRadius: '6px',
    px: '24px',
    py: '10px',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 500,
    color: '#0F213D',
    bgcolor: '#00BFA5',
    transition: 'background-color 120ms ease',
    '&:hover': {
      bgcolor: '#00A68F',
    },
  },
  mobileGradient: {
    display: { xs: 'block', lg: 'none' },
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    background:
      'linear-gradient(180deg, rgba(1,19,47,0) 0%, rgba(1,19,47,0.25) 35%, rgba(1,19,47,0.45) 100%)',
  },
};

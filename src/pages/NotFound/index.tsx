import { Box, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ROUTES } from '@/constants';

const IMG_GROUP_LEFT = 'https://www.figma.com/api/mcp/asset/6e2ecd8f-8449-47b2-9e64-68b21ad1ffb5';
const IMG_GROUP_RIGHT = 'https://www.figma.com/api/mcp/asset/180a3c48-be01-413e-9639-9d11d6c287d3';
const IMG_GROUP_CENTER = 'https://www.figma.com/api/mcp/asset/327ddb3b-a1a0-4729-a10a-e3141ef7f2fa';
const IMG_LOGO = 'https://www.figma.com/api/mcp/asset/485cd537-527a-4492-8426-e13343387e39';

const FIGMA_CANVAS_WIDTH = 1440;

const FIGMA_ILLUSTRATION_WIDTH = 563.426;
const FIGMA_ILLUSTRATION_HEIGHT = 247.787;

const NotFound = () => {
  return (
    <Box
      sx={{
        minHeight: '100dvh',
        bgcolor: '#01132F',
        color: 'common.white',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: `${FIGMA_CANVAS_WIDTH}px`,
          minHeight: '100dvh',
          mx: 'auto',
          position: 'relative',
          px: { xs: 2, sm: 0 },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 'clamp(28px, 4.7dvh, 48px)',
            left: 0,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            gap: 1.2,
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            src={IMG_LOGO}
            alt="De-ID Studio logo"
            sx={{ width: 32, height: 34 }}
          />
          <Box>
            <Typography
              sx={{ fontSize: 24, lineHeight: '28px', fontWeight: 600, color: '#FFFFFF' }}
            >
              De-ID Studio
            </Typography>
            <Typography
              sx={{ fontSize: 12, lineHeight: '16px', fontWeight: 500, color: '#FFFFFF' }}
            >
              De-ID & Synthesis
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: '42%',
            transform: {
              xs: 'translate(-50%, -50%) scale(0.62)',
              sm: 'translate(-50%, -50%) scale(0.76)',
              md: 'translate(-50%, -50%) scale(0.9)',
              lg: 'translate(-50%, -50%) scale(1)',
            },
            width: FIGMA_ILLUSTRATION_WIDTH,
            height: FIGMA_ILLUSTRATION_HEIGHT,
          }}
        >
          <Box
            component="img"
            src={IMG_GROUP_LEFT}
            alt=""
            sx={{
              position: 'absolute',
              left: { xs: 50, md: 50 },
              top: 28,
              width: 144,
              height: 178,
            }}
          />
          <Box
            component="img"
            src={IMG_GROUP_RIGHT}
            alt=""
            sx={{
              position: 'absolute',
              right: { xs: 50, md: 58 },
              top: 28,
              width: 144,
              height: 178,
            }}
          />
          <Box
            component="img"
            src={IMG_GROUP_CENTER}
            alt="404"
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 261,
              height: 261,
            }}
          />
        </Box>

        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: '74.5%',
            transform: 'translate(-50%, -50%)',
            width: { xs: 320, sm: 420, md: 480 },
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: { xs: '21px', md: '33px' },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: 34, md: 36 },
              lineHeight: { xs: '40px', md: '44px' },
              fontWeight: 700,
              color: '#B2EDE5',
            }}
          >
            Page not found
          </Typography>

          <Typography
            sx={{
              fontSize: 16,
              lineHeight: '24px',
              fontWeight: 500,
              color: '#9CA3AF',
            }}
          >
            The page you&apos;re looking for doesn&apos;t exist
            <br />
            or may have been moved.
          </Typography>

          <Box
            component={RouterLink}
            to={ROUTES.LANDING}
            sx={{
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
            }}
          >
            Go to home
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: { xs: 'block', lg: 'none' },
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'linear-gradient(180deg, rgba(1,19,47,0) 0%, rgba(1,19,47,0.25) 35%, rgba(1,19,47,0.45) 100%)',
        }}
      />
    </Box>
  );
};

export default NotFound;

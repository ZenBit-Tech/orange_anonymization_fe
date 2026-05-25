import { Box, Typography, Avatar, IconButton, useMediaQuery } from '@mui/material';
import { alpha } from '@mui/material/styles';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { LAYOUT } from '@/theme';
import { useHeader } from '@/components/layouts/Header/useHeader';
import { useAppSelector } from '@/store/store';
import { useSessionExpiration } from '@/components/layouts/useSessionExpiration';

export interface HeaderProps {
  userEmail: string;
  isMobile: boolean;
  onMenuOpen: () => void;
}

const COMPACT_HEADER_HEIGHT = 48;

const Header = ({ userEmail, isMobile, onMenuOpen }: HeaderProps) => {
  const { t, title, subtitle } = useHeader(userEmail);
  const currentJob = useAppSelector((state) => state.jobs.currentJob);
  const isLandscapePhone = useMediaQuery('(orientation: landscape) and (max-height: 600px)');
  const isCompact = isMobile && isLandscapePhone;
  const isReviewResultsStep = currentJob?.wizardState?.currentStep === 4;
  const {
    isVisible: showSessionCountdown,
    remainingLabel,
    isCritical,
  } = useSessionExpiration(isReviewResultsStep);

  return (
    <Box
      component="header"
      sx={(theme) => ({
        position: 'relative',
        height: isCompact
          ? COMPACT_HEADER_HEIGHT
          : isMobile
            ? LAYOUT.header.mobileHeight
            : LAYOUT.header.height,
        px: isMobile ? `${LAYOUT.header.mobilePaddingX}px` : undefined,
        py: isMobile ? (isCompact ? '6px' : `${LAYOUT.header.mobilePaddingY}px`) : undefined,
        pt: isMobile ? undefined : `${LAYOUT.header.paddingTop}px`,
        pr: isMobile ? undefined : `${LAYOUT.header.paddingRight}px`,
        pb: isMobile ? undefined : `${LAYOUT.header.paddingBottom}px`,
        pl: isMobile ? undefined : `${LAYOUT.header.paddingLeft}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
      })}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: isCompact ? 1 : 1.5, minWidth: 0 }}>
        {isMobile && (
          <IconButton
            onClick={onMenuOpen}
            aria-label={title}
            size={isCompact ? 'small' : 'medium'}
            sx={(theme) => ({
              color: theme.palette.text.primary,
            })}
          >
            <MenuIcon sx={{ fontSize: isCompact ? 22 : LAYOUT.header.menuIconSize }} />
          </IconButton>
        )}
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant={isMobile ? 'body1' : 'h5'}
            noWrap
            sx={(theme) => ({
              color: theme.palette.text.primary,
              fontWeight: theme.typography.fontWeightBold,
              fontSize: isCompact ? '0.875rem' : undefined,
            })}
          >
            {title}
          </Typography>
          {!isMobile && (
            <Typography
              variant="body2"
              sx={(theme) => ({
                color: theme.palette.text.secondary,
              })}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {!isMobile && showSessionCountdown && (
          <Box
            sx={(theme) => ({
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              px: 1.25,
              py: 0.5,
              borderRadius: 9999,
              border: '1px solid',
              borderColor: isCritical ? theme.palette.error.main : theme.palette.warning.main,
              color: isCritical ? theme.palette.error.main : theme.palette.warning.main,
              bgcolor: isCritical
                ? alpha(theme.palette.error.main, 0.08)
                : alpha(theme.palette.warning.main, 0.08),
              fontWeight: theme.typography.fontWeightSemiBold,
              lineHeight: 1,
              whiteSpace: 'nowrap',
            })}
            aria-label={t('header.sessionCountdownLabel', { time: remainingLabel })}
          >
            <AccessTimeOutlinedIcon sx={{ fontSize: 16 }} />
            <Typography sx={{ fontSize: 12, fontWeight: 'inherit', lineHeight: 1 }}>
              {remainingLabel}
            </Typography>
          </Box>
        )}

        <Avatar
          sx={(theme) => ({
            width: isCompact ? 28 : LAYOUT.header.avatarSize,
            height: isCompact ? 28 : LAYOUT.header.avatarSize,
            bgcolor: theme.palette.background.paper,
            border: `2px solid ${theme.palette.text.primary}`,
          })}
        >
          <AccountCircleOutlinedIcon
            sx={(theme) => ({
              color: theme.palette.text.primary,
              fontSize: isCompact ? 24 : LAYOUT.header.avatarIconSize,
            })}
          />
        </Avatar>
        {!isMobile && (
          <Typography
            variant="body2"
            sx={(theme) => ({
              color: theme.palette.text.primary,
              fontWeight: theme.typography.fontWeightMedium,
            })}
          >
            {userEmail}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export { Header };

import { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  Typography,
  type Theme,
} from '@mui/material';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { LAYOUT } from '@/theme';
import { useSidebar } from '@/components/layouts/Sidebar/useSidebar';
import LogoutPopup from '@/components/popups/LogoutPopup';
import GeneratedDataIcon from '@/assets/icons/generatedDataIcon.svg?react';
import { ROUTES } from '@/constants';
import { useAppSelector } from '@/store/store';

export interface SidebarProps {
  isMobile: boolean;
  drawerOpen: boolean;
  onDrawerClose: () => void;
}

const SidebarContent = ({ onDrawerClose }: { onDrawerClose?: () => void }) => {
  const { t, navItems, isActive, handleNavigate, handleSignOut } = useSidebar(onDrawerClose);
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);
  const { data } = useAppSelector((state) => state.syntheticResult);

  return (
    <Box
      sx={(theme) => ({
        width: LAYOUT.sidebar.width,
        minHeight: '100vh',
        bgcolor: theme.palette.sidebar.background,
        display: 'flex',
        flexDirection: 'column',
        pb: 3,
      })}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        <Typography
          variant="h6"
          sx={(theme) => ({
            color: theme.palette.primary.contrastText,
            fontWeight: theme.typography.fontWeightBold,
          })}
        >
          {t('sidebar.brand')}
        </Typography>
        <Typography
          variant="caption"
          sx={(theme) => ({
            color: theme.palette.grey[400],
          })}
        >
          {t('sidebar.brandSubtitle')}
        </Typography>
      </Box>

      <List sx={{ flex: 1, px: 1.5 }}>
        {navItems.map((item) => {
          const active = isActive(item.path);
          const isDashboard = item.path === ROUTES.DASHBOARD;
          const isAnalysesPage = isActive(ROUTES.ANALYSES);
          const isDashboardGreen = isDashboard && isAnalysesPage;

          return (
            <Box key={item.path}>
              <ListItemButton
                onClick={() => handleNavigate(item.path)}
                sx={(theme) => ({
                  borderRadius: 1.5,
                  mb: 0.5,
                  bgcolor: active ? theme.palette.sidebar.activeOverlay : 'transparent',
                  borderLeft: active
                    ? `${LAYOUT.sidebar.activeBorderWidth}px solid ${theme.palette.primary.light}`
                    : `${LAYOUT.sidebar.activeBorderWidth}px solid transparent`,

                  '&:hover': {
                    bgcolor: theme.palette.sidebar.hoverOverlay,
                  },
                })}
              >
                <ListItemIcon
                  sx={(theme) => ({
                    color:
                      active || isDashboardGreen
                        ? theme.palette.accent[400]
                        : theme.palette.grey[400],
                    minWidth: LAYOUT.sidebar.iconMinWidth,
                  })}
                >
                  <item.icon fontSize="small" />
                </ListItemIcon>

                <ListItemText
                  primary={t(item.labelKey)}
                  primaryTypographyProps={{
                    variant: 'body2',
                    sx: (theme) => ({
                      color:
                        active || isDashboardGreen
                          ? theme.palette.accent[400]
                          : theme.palette.grey[400],

                      fontWeight:
                        active || isDashboardGreen
                          ? theme.typography.fontWeightMedium
                          : theme.typography.fontWeightRegular,
                    }),
                  }}
                />
              </ListItemButton>

              {isDashboard && isAnalysesPage && (
                <List
                  sx={{
                    pl: 4,
                    mb: 0.5,
                  }}
                >
                  <ListItemButton
                    onClick={() => handleNavigate(ROUTES.ANALYSES)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      borderRadius: 1,
                      py: 0.5,
                      gap: 1.5,
                      '&:hover': {
                        bgcolor: 'transparent',
                      },
                    }}
                  >
                    <Box
                      sx={(theme) => ({
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: theme.palette.accent[400],
                      })}
                    >
                      <FormatListBulletedIcon sx={(theme) => ({ fontSize: theme.spacing(2) })} />
                    </Box>

                    <Box
                      component="span"
                      sx={(theme) => ({
                        ...theme.typography.labelMd,
                        color: theme.palette.accent[400],
                        display: 'flex',
                        alignItems: 'center',
                      })}
                    >
                      {t('sidebar.allAnalyses')}
                    </Box>
                  </ListItemButton>
                </List>
              )}
            </Box>
          );
        })}

        {navItems.map((item) => {
          if (item.path !== ROUTES.SYNTHETIC_DATA) return null;

          const isSettingsActive = isActive(ROUTES.SYNTHETIC_DATA);
          const isResultsActive = isActive(ROUTES.SYNTHETIC_RESULTS);

          if (!isSettingsActive && !isResultsActive) return null;

          return (
            <List key={`${item.path}-sub`} sx={{ pl: 4, mt: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavigate(ROUTES.SYNTHETIC_DATA)}
                sx={(theme) => ({
                  borderRadius: 1,
                  mb: 0.5,
                  bgcolor: isSettingsActive ? theme.palette.action.selected : 'transparent',
                  '&:hover': {
                    bgcolor: theme.palette.action.hover,
                  },
                })}
              >
                <ListItemIcon
                  sx={(theme) => ({
                    color: isSettingsActive ? 'accent.500' : theme.palette.grey[400],
                    minWidth: LAYOUT.sidebar.iconMinWidth,
                  })}
                >
                  <SettingsOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={t('nav.syntheticDataGenerationSettings')}
                  primaryTypographyProps={{
                    variant: 'caption',
                    sx: (theme) => ({
                      color: isSettingsActive ? 'accent.500' : theme.palette.grey[400],
                      fontWeight: isSettingsActive
                        ? theme.typography.fontWeightMedium
                        : theme.typography.fontWeightRegular,
                    }),
                  }}
                />
              </ListItemButton>

              {!!data && (
                <ListItemButton
                  onClick={() => handleNavigate(`/app/synthetic-data/${data.dataset_id}`)}
                  sx={(theme) => ({
                    borderRadius: 1,
                    mb: 0.5,
                    bgcolor: isResultsActive ? theme.palette.action.selected : 'transparent',
                    '&:hover': {
                      bgcolor: theme.palette.action.hover,
                    },
                  })}
                >
                  <ListItemIcon
                    sx={(theme) => ({
                      color: isResultsActive ? 'accent.500' : theme.palette.grey[400],
                      minWidth: LAYOUT.sidebar.iconMinWidth,
                    })}
                  >
                    <SvgIcon
                      component={GeneratedDataIcon}
                      inheritViewBox
                      sx={(theme: Theme) => ({
                        color: isResultsActive ? 'accent.500' : theme.palette.grey[400],
                      })}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={t('nav.syntheticGeneratedData')}
                    primaryTypographyProps={{
                      variant: 'caption',
                      sx: (theme) => ({
                        color: isResultsActive ? 'accent.500' : theme.palette.grey[400],
                        fontWeight: isResultsActive
                          ? theme.typography.fontWeightMedium
                          : theme.typography.fontWeightRegular,
                      }),
                    }}
                  />
                </ListItemButton>
              )}
            </List>
          );
        })}
      </List>

      <Box sx={{ px: 1.5 }}>
        <ListItemButton
          onClick={() => setIsLogoutPopupOpen(true)}
          sx={(theme) => ({
            borderRadius: 1.5,
            '&:hover': {
              bgcolor: theme.palette.sidebar.hoverOverlay,
            },
          })}
        >
          <ListItemIcon
            sx={(theme) => ({
              color: theme.palette.grey[400],
              minWidth: LAYOUT.sidebar.iconMinWidth,
            })}
          >
            <LogoutOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={t('sidebar.signOut')}
            primaryTypographyProps={{
              variant: 'body2',
              sx: (theme) => ({
                color: theme.palette.grey[400],
              }),
            }}
          />
        </ListItemButton>
      </Box>

      <LogoutPopup
        isVisible={isLogoutPopupOpen}
        onClose={() => setIsLogoutPopupOpen(false)}
        onLogout={handleSignOut}
      />
    </Box>
  );
};

const Sidebar = ({ isMobile, drawerOpen, onDrawerClose }: SidebarProps) => {
  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={onDrawerClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: LAYOUT.sidebar.width,
            border: 'none',
          },
        }}
      >
        <SidebarContent onDrawerClose={onDrawerClose} />
      </Drawer>
    );
  }

  return (
    <Box
      component="nav"
      sx={(theme) => ({
        width: LAYOUT.sidebar.width,
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: theme.zIndex.drawer,
      })}
    >
      <SidebarContent />
    </Box>
  );
};

export { Sidebar };

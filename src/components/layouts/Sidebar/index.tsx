import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { LAYOUT } from '@/theme';
import { ROUTES } from '@/constants';
import { useSidebar } from '@/components/layouts/Sidebar/useSidebar';
import { useState } from 'react';
import LogoutPopup from '@/components/popups/LogoutPopup';

export interface SidebarProps {
  isMobile: boolean;
  drawerOpen: boolean;
  onDrawerClose: () => void;
}

const SidebarContent = ({ onDrawerClose }: { onDrawerClose?: () => void }) => {
  const { t, navItems, isActive, handleNavigate, handleSignOut } = useSidebar(onDrawerClose);
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);

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
                    pl: 3,
                    mb: 0.5,
                  }}
                >
                  <ListItemButton
                    onClick={() => handleNavigate(ROUTES.ANALYSES)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      minHeight: 32,
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
                      <FormatListBulletedIcon sx={{ fontSize: 16 }} />
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
          const active = isActive(item.path);
          if (!active || item.path !== ROUTES.SYNTHETIC_DATA) return null;
          return (
            <List key={`${item.path}-sub`} sx={{ pl: 4 }}>
              <ListItemButton
                onClick={() => handleNavigate(ROUTES.SYNTHETIC_DATA)}
                sx={(theme) => ({
                  borderRadius: 1,
                  mb: 0.5,
                  bgcolor: theme.palette.action.hover,
                })}
              >
                <ListItemIcon
                  sx={(theme) => ({
                    color: theme.palette.grey[400],
                    minWidth: LAYOUT.sidebar.iconMinWidth,
                  })}
                >
                  <SettingsOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={t('nav.syntheticDataGenerationSettings')}
                  primaryTypographyProps={{
                    variant: 'caption',
                    sx: (theme) => ({ color: theme.palette.grey[400] }),
                  }}
                />
              </ListItemButton>
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

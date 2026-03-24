import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  LocalHospital as LocalHospitalIcon,
} from '@mui/icons-material';
import { ROUTES } from '@/constants';

interface NavLink {
  labelKey: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { labelKey: 'nav.solutions', href: '#features' },
  { labelKey: 'nav.aboutUs', href: '#about' },
  { labelKey: 'nav.contactUs', href: '#contact' },
];

export function LandingHeader() {
  const { t } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ gap: 2 }}>
            <LocalHospitalIcon sx={{ color: 'primary.main', mr: 0.5 }} />
            <Typography variant="h6" fontWeight={800} color="primary.main" sx={{ flexGrow: 0 }}>
              {t('nav.brand')}
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 0.5, ml: 4 }}>
              {NAV_LINKS.map((link) => (
                <Button
                  key={link.href}
                  href={link.href}
                  color="inherit"
                  sx={{ fontWeight: 500 }}
                >
                  {t(link.labelKey)}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 1, display: { md: 'none' } }} />

            <Button
              variant="contained"
              component={RouterLink}
              to={ROUTES.LOGIN}
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              {t('nav.getStarted')}
            </Button>

            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { md: 'none' } }}
              aria-label={t('nav.menuOpen')}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 280, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
            <IconButton onClick={() => setDrawerOpen(false)} aria-label={t('nav.menuClose')}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {NAV_LINKS.map((link) => (
              <ListItemButton
                key={link.href}
                component="a"
                href={link.href}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemText primary={t(link.labelKey)} />
              </ListItemButton>
            ))}
            <Box sx={{ px: 2, mt: 2 }}>
              <Button
                variant="contained"
                fullWidth
                component={RouterLink}
                to={ROUTES.LOGIN}
                onClick={() => setDrawerOpen(false)}
              >
                {t('nav.getStarted')}
              </Button>
            </Box>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

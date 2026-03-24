import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import { LocalHospital as LocalHospitalIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface AuthLayoutProps {
  children?: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
        <LocalHospitalIcon sx={{ fontSize: 36, color: 'primary.main' }} />
        <Typography variant="h5" fontWeight={800} color="primary.main">
          {t('nav.brand')}
        </Typography>
      </Box>

      <Container maxWidth="sm">
        {children ?? <Outlet />}
      </Container>
    </Box>
  );
}

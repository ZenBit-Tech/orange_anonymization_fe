import { useEffect, useMemo } from 'react';
import { Routes, Route, Navigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { Email as EmailIcon, MarkEmailRead as MarkEmailReadIcon } from '@mui/icons-material';
import { AuthLayout } from '@/layouts/AuthLayout';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants';
import { useForm, type SubmitHandler } from 'react-hook-form';

interface LoginFormValues {
  email: string;
}

function buildLoginSchema(t: (key: string) => string) {
  return yup.object({
    email: yup
      .string()
      .email(t('auth.validation.emailInvalid'))
      .required(t('auth.validation.emailRequired')),
  });
}

function LoginView() {
  const { t } = useTranslation();
  const { sendMagicLink, isLoading, error, magicLinkSent, magicLinkEmail } = useAuth();

  const schema = useMemo(() => buildLoginSchema(t), [t]);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
    defaultValues: { email: '' },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async ({ email }) => {
    await sendMagicLink(email);
  };

  if (magicLinkSent) {
    return (
      <Card elevation={0} sx={{ border: 1, borderColor: 'divider', borderRadius: 3 }}>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <MarkEmailReadIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
          <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
            {t('auth.checkEmail')}
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            {t('auth.linkSent', { email: magicLinkEmail ?? getValues('email') })}
          </Typography>
          <Button
            variant="outlined"
            onClick={() => sendMagicLink(magicLinkEmail ?? getValues('email'))}
          >
            {t('auth.resend')}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card elevation={0} sx={{ border: 1, borderColor: 'divider', borderRadius: 3 }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
          {t('auth.title')}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          {t('auth.subtitle')}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label={t('auth.email')}
            type="email"
            placeholder={t('auth.emailPlaceholder')}
            fullWidth
            required
            autoFocus
            sx={{ mb: 3 }}
            {...register('email')}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <EmailIcon />}
          >
            {isLoading ? t('auth.requesting') : t('auth.requestLink')}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

function VerifyView() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { verifyToken, isLoading, error } = useAuth();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      void verifyToken(token);
    }
  }, [token, verifyToken]);

  if (!token) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return (
    <Card elevation={0} sx={{ border: 1, borderColor: 'divider', borderRadius: 3 }}>
      <CardContent sx={{ p: 4, textAlign: 'center' }}>
        {isLoading && (
          <>
            <CircularProgress sx={{ mb: 2 }} />
            <Typography color="text.secondary">{t('common.loading')}</Typography>
          </>
        )}
        {error && <Alert severity="error">{t('auth.errors.verifyFailed')}</Alert>}
      </CardContent>
    </Card>
  );
}

export default function Auth() {
  return (
    <AuthLayout>
      <Routes>
        <Route path="login" element={<LoginView />} />
        <Route path="verify" element={<VerifyView />} />
        <Route path="*" element={<Navigate to="login" replace />} />
      </Routes>
    </AuthLayout>
  );
}

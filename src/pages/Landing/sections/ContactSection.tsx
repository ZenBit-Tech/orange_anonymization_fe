import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Send as SendIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { type SubmitHandler, useForm } from 'react-hook-form';

interface ContactFormValues {
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  message: string;
}

function buildSchema(t: (key: string) => string) {
  return yup.object({
    firstName: yup.string().required(t('landing.contact.form.validation.firstNameRequired')),
    lastName: yup.string().required(t('landing.contact.form.validation.lastNameRequired')),
    email: yup
      .string()
      .email(t('landing.contact.form.validation.emailInvalid'))
      .required(t('landing.contact.form.validation.emailRequired')),
    organization: yup.string().default(''),
    message: yup
      .string()
      .min(20, t('landing.contact.form.validation.messageMin'))
      .required(t('landing.contact.form.validation.messageRequired')),
  });
}

export function ContactSection() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: yupResolver(buildSchema(t)),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      organization: '',
      message: '',
    },
  });

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    setSubmitError(null);
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 1200));
      console.warn('[ContactSection] Form submitted (mock):', data);
      setSubmitted(true);
      reset();
    } catch {
      setSubmitError(t('errors.generic'));
    }
  };

  return (
    <Box id="contact" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="md">
        <Box textAlign="center" sx={{ mb: 6 }}>
          <Typography variant="h2" sx={{ mb: 2 }}>
            {t('landing.contact.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
            {t('landing.contact.subtitle')}
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{ p: { xs: 3, sm: 5 }, border: 1, borderColor: 'divider', borderRadius: 3 }}
        >
          {submitted ? (
            <Box textAlign="center" py={4}>
              <CheckCircleIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
              <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
                {t('landing.contact.form.success')}
              </Typography>
              <Button variant="outlined" sx={{ mt: 2 }} onClick={() => setSubmitted(false)}>
                {t('common.reset')}
              </Button>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              {submitError && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {submitError}
                </Alert>
              )}

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label={t('landing.contact.form.firstName')}
                    fullWidth
                    required
                    {...register('firstName')}
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName?.message}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label={t('landing.contact.form.lastName')}
                    fullWidth
                    required
                    {...register('lastName')}
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName?.message}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label={t('landing.contact.form.email')}
                    type="email"
                    fullWidth
                    required
                    {...register('email')}
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label={t('landing.contact.form.organization')}
                    fullWidth
                    {...register('organization')}
                    error={Boolean(errors.organization)}
                    helperText={errors.organization?.message}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    label={t('landing.contact.form.message')}
                    placeholder={t('landing.contact.form.messagePlaceholder')}
                    fullWidth
                    required
                    multiline
                    rows={5}
                    {...register('message')}
                    error={Boolean(errors.message)}
                    helperText={errors.message?.message}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={isSubmitting}
                    endIcon={
                      isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />
                    }
                  >
                    {isSubmitting
                      ? t('landing.contact.form.submitting')
                      : t('landing.contact.form.submit')}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

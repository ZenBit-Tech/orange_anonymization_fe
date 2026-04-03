import { useTranslation } from 'react-i18next';
import { InputAdornment } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuthForm } from './useAuthForm';
import { authText } from './constants';
import {
  AuthPageContainer,
  LogoContainer,
  LogoImage,
  BrandingContainer,
  BrandName,
  BrandTagline,
  AuthFormCard,
  FormTitle,
  FormSubtitle,
  FormContainer,
  EmailFieldContainer,
  FieldLabel,
  RequiredAsterisk,
  EmailInput,
  FieldError,
  ErrorIconContainer,
  SubmitButton,
  BackContainer,
  BackIcon,
  BackText,
} from './styled';

const AuthForm = () => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    onSubmit,
    clearErrors,
    trigger,
  } = useAuthForm();

  const hasError = !!errors.email;
  const isDisabled = !isValid || isSubmitting;
  const isActive = isValid && !isSubmitting;

  return (
    <AuthPageContainer>
      <LogoContainer>
        <LogoImage src="/logo.svg" alt={t('auth.branding.name')} />
        <BrandingContainer>
          <BrandName variant="h3">{t('auth.branding.name')}</BrandName>
          <BrandTagline variant="body2">{t('auth.branding.tagline')}</BrandTagline>
        </BrandingContainer>
      </LogoContainer>

      <AuthFormCard>
        <FormTitle variant="h3">{t(authText.title)}</FormTitle>
        <FormSubtitle variant="body2">{t(authText.subtitle)}</FormSubtitle>

        <FormContainer onSubmit={handleSubmit(onSubmit)} noValidate>
          <EmailFieldContainer>
            <FieldLabel>
              {t(authText.email)}
              <RequiredAsterisk>*</RequiredAsterisk>
            </FieldLabel>

            <EmailInput
              {...register('email', {
                onBlur: () => trigger('email'),
              })}
              placeholder={t(authText.emailPlaceholder)}
              fullWidth
              error={!!errors.email}
              onFocus={() => clearErrors('email')}
              endAdornment={
                errors.email && (
                  <InputAdornment position="end">
                    <ErrorIconContainer>
                      <ErrorOutlineIcon />
                    </ErrorIconContainer>
                  </InputAdornment>
                )
              }
            />

            {hasError && <FieldError>{t(errors.email?.message || '')}</FieldError>}
          </EmailFieldContainer>

          <SubmitButton type="submit" fullWidth disabled={isDisabled} isActive={isActive}>
            {isSubmitting ? t(authText.submitting) : t(authText.submit)}
          </SubmitButton>
        </FormContainer>

        <BackContainer>
          <BackIcon as={ArrowBackIcon} fontSize="small" />
          <BackText>{t('auth.back')}</BackText>
        </BackContainer>
      </AuthFormCard>
    </AuthPageContainer>
  );
};

export default AuthForm;

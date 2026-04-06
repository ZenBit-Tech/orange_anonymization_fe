import { Box, Button, Divider, FormHelperText, OutlinedInput, Typography } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { styled } from '@mui/material/styles';
import { LAYOUT, SHADOWS, GRADIENTS } from '@/theme';

export const AuthPageContainer = styled(Box)({
  minHeight: '100vh',
  position: 'relative',
  background: GRADIENTS.authBackground,
});

export const LogoContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(6),
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
}));

export const LogoImage = styled('img')({
  width: LAYOUT.authPage.logo.width,
  height: LAYOUT.authPage.logo.height,
});

export const BrandingContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

export const BrandName = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.auth.button.activeText,
}));

export const BrandTagline = styled(Typography)(({ theme }) => ({
  ...theme.typography.caption,
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.auth.button.activeText,
}));

export const AuthFormCard = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: LAYOUT.authPage.formCard.topPosition,
  left: '50%',
  transform: 'translate(-50%, -50%)',

  width: '90%',
  [theme.breakpoints.up('sm')]: {
    width: LAYOUT.authPage.formCard.smWidth,
  },

  borderRadius: LAYOUT.authPage.formCard.borderRadius,
  padding: theme.spacing(6),
  backgroundColor: theme.palette.auth.background,

  display: 'flex',
  flexDirection: 'column',

  boxShadow: SHADOWS.authCard,
}));

export const FormTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.h5,
  marginBottom: theme.spacing(1),
  color: theme.palette.auth.title,
}));

export const FormSubtitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  marginBottom: theme.spacing(3),
  color: theme.palette.auth.subtitle,
}));

export const FormContainer = styled('form')({
  display: 'flex',
  flexDirection: 'column',
});

export const EmailFieldContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(1.25),
}));

export const FieldLabel = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  fontWeight: theme.typography.fontWeightMedium,
  marginBottom: theme.spacing(0.5),
  color: theme.palette.auth.labelText,
}));

export const RequiredAsterisk = styled('span')(({ theme }) => ({
  color: theme.palette.auth.borderInputError,
}));

export const EmailInput = styled(OutlinedInput)(({ theme }) => ({
  borderRadius: LAYOUT.authPage.input.borderRadius,

  '& .MuiOutlinedInput-input': {
    padding: `${LAYOUT.authPage.input.paddingY}px ${LAYOUT.authPage.input.paddingX - 6}px ${LAYOUT.authPage.input.paddingY}px ${LAYOUT.authPage.input.paddingX}px`,

    '&::placeholder': {
      ...theme.typography.body2,
      color: theme.palette.auth.placeholder,
    },
  },

  '&.MuiOutlinedInput-adornedEnd .MuiOutlinedInput-input': {
    paddingRight: LAYOUT.authPage.input.paddingAdornedRight,
  },

  '& .MuiOutlinedInput-notchedOutline': {
    borderWidth: LAYOUT.authPage.input.borderWidth,
    borderStyle: 'solid',
    borderColor: theme.palette.auth.borderInput,
  },

  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.auth.borderInputHover,
  },

  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.auth.borderInputHover,
  },

  '&.Mui-error .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.auth.borderInputError,
  },

  '&.Mui-focused .MuiOutlinedInput-input::placeholder': {
    color: theme.palette.auth.placeholderFocus,
  },
}));

export const FieldError = styled(FormHelperText)(({ theme }) => ({
  marginTop: theme.spacing(0.5),
  ...theme.typography.caption,
  color: theme.palette.auth.borderInputError,
}));

export const ErrorIconContainer = styled(Box)(({ theme }) => ({
  '& svg': {
    width: LAYOUT.authPage.errorIcon.width,
    height: LAYOUT.authPage.errorIcon.height,
    color: theme.palette.auth.borderInputError,
  },
}));

export const SubmitButton = styled(Button)<{ isActive?: boolean }>(({ isActive, theme }) => ({
  height: LAYOUT.authPage.submitButton.height,
  borderRadius: LAYOUT.authPage.submitButton.borderRadius,
  marginTop: theme.spacing(3),

  ...theme.typography.button,

  backgroundColor: isActive ? theme.palette.auth.button.active : theme.palette.auth.button.disabled,

  color: isActive ? theme.palette.auth.button.activeText : theme.palette.auth.button.disabledText,

  '&:hover': {
    backgroundColor: isActive
      ? theme.palette.auth.button.hover
      : theme.palette.auth.button.disabled,
  },

  '&.Mui-disabled': {
    backgroundColor: theme.palette.auth.button.disabled,
    color: theme.palette.auth.button.disabledText,
  },
}));

export const BackContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: theme.spacing(3),
  cursor: 'pointer',
}));

export const BackIcon = styled('svg')(({ theme }) => ({
  width: LAYOUT.authPage.backIcon.width,
  height: LAYOUT.authPage.backIcon.height,
  color: theme.palette.auth.backIcon,
}));

export const BackText = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  ...theme.typography.body2,
  fontWeight: theme.typography.fontWeightMedium,
  textAlign: 'center',
  color: theme.palette.auth.backText,
}));

export const EmailSentContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  width: '100%',
});

export const EmailSentIcon = styled(EmailOutlinedIcon)(({ theme }) => ({
  width: LAYOUT.authPage.emailSentIcon.width,
  height: LAYOUT.authPage.emailSentIcon.height,
  marginBottom: theme.spacing(3),
  color: theme.palette.auth.emailSent.icon,
}));

export const EmailSentTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.h5,
  marginBottom: theme.spacing(1),
  color: theme.palette.auth.emailSent.title,
}));

export const EmailSentMessage = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  marginBottom: theme.spacing(3),
  color: theme.palette.auth.emailSent.message,
}));

export const HighlightedEmail = styled('span')(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.auth.emailSent.highlight,
}));

export const EmailSentDivider = styled(Divider)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(3),
  border: `1px solid ${theme.palette.auth.emailSent.divider}`,
}));

export const EmailSentNotice = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  marginBottom: theme.spacing(3),
  color: theme.palette.auth.emailSent.notice,
}));

export const ResendLinkButton = styled(Button)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.auth.emailSent.resendLink,
  textTransform: 'none',
  padding: 0,
}));

export const BackToSignInButton = styled(Button)(({ theme }) => ({
  width: '100%',

  ...theme.typography.body2,
  fontWeight: theme.typography.fontWeightMedium,

  color: theme.palette.auth.emailSent.backButton.text,
  backgroundColor: theme.palette.auth.emailSent.backButton.background,
  border: `1px solid ${theme.palette.auth.emailSent.backButton.border}`,

  '&:hover': {
    backgroundColor: theme.palette.auth.emailSent.backButton.hover,
  },

  '& .MuiButton-startIcon': {
    color: theme.palette.auth.emailSent.backButton.text,
  },
}));

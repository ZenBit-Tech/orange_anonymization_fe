import { Box, Button, Divider, FormHelperText, OutlinedInput, Typography } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { styled } from '@mui/material/styles';
import { COLORS, SHADOWS, GRADIENTS } from '@/theme';

export const AuthPageContainer = styled(Box)({
  minHeight: '100vh',
  position: 'relative',
  background: GRADIENTS.authBackground,
});

export const LogoContainer = styled(Box)({
  position: 'absolute',
  top: 48,
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

export const LogoImage = styled('img')({
  width: 32,
  height: 34,
});

export const BrandingContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

export const BrandName = styled(Typography)({
  fontWeight: 600,
  fontSize: '24px',
  lineHeight: 1.2,
  color: '#FFFFFF',
});

export const BrandTagline = styled(Typography)({
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: 1.3,
  color: '#FFFFFF',
});

export const AuthFormCard = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '450px',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  [theme.breakpoints.up('sm')]: {
    width: 440,
  },
  borderRadius: '16px',
  padding: theme.spacing(6),
  backgroundColor: COLORS.auth.background,
  display: 'flex',
  flexDirection: 'column',
  boxShadow: SHADOWS.authCard,
}));

export const FormTitle = styled(Typography)({
  fontWeight: 600,
  fontSize: 24,
  lineHeight: 1.2,
  marginBottom: '8px',
  color: COLORS.auth.title,
});

export const FormSubtitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: 14,
  lineHeight: 1.4,
  marginBottom: '24px',
  color: COLORS.auth.subtitle,
}));

export const FormContainer = styled('form')({
  display: 'flex',
  flexDirection: 'column',
});

export const EmailFieldContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  padding: '10px',
});

export const FieldLabel = styled(Typography)({
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: 1.4,
  marginBottom: '4px',
  color: COLORS.auth.labelText,
});

export const RequiredAsterisk = styled('span')({
  color: COLORS.auth.borderInputError,
});

export const EmailInput = styled(OutlinedInput)({
  borderRadius: '8px',
  '& .MuiOutlinedInput-input': {
    padding: '10px 8px 10px 14px',
    '&::placeholder': {
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: 1.4,
      color: COLORS.auth.placeholder,
    },
  },
  '&.MuiOutlinedInput-adornedEnd .MuiOutlinedInput-input': {
    paddingRight: '14px',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderWidth: '1.5px',
    borderStyle: 'solid',
    borderColor: COLORS.auth.borderInput,
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: COLORS.auth.borderInputHover,
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: COLORS.auth.borderInputHover,
  },
  '&.Mui-error .MuiOutlinedInput-notchedOutline': {
    borderColor: COLORS.auth.borderInputError,
  },
  '&.Mui-focused .MuiOutlinedInput-input::placeholder': {
    color: COLORS.auth.placeholderFocus,
  },
});

export const FieldError = styled(FormHelperText)({
  marginTop: '4px',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: 1.3,
  color: COLORS.auth.borderInputError,
});

export const ErrorIconContainer = styled(Box)({
  '& svg': {
    width: '20px',
    height: '20px',
    color: COLORS.auth.borderInputError,
  },
});

export const SubmitButton = styled(Button)<{ isActive?: boolean }>(({ isActive }) => ({
  height: '48px',
  borderRadius: '6px',
  marginTop: '24px',
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: 1.5,
  textAlign: 'center',
  backgroundColor: isActive ? COLORS.auth.button.active : COLORS.auth.button.disabled,
  color: isActive ? COLORS.auth.button.activeText : COLORS.auth.button.disabledText,
  '&:hover': {
    backgroundColor: isActive ? COLORS.auth.button.hover : COLORS.auth.button.disabled,
  },
  '&.Mui-disabled': {
    backgroundColor: COLORS.auth.button.disabled,
    color: COLORS.auth.button.disabledText,
  },
}));

export const BackContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '24px',
  cursor: 'pointer',
});

export const BackIcon = styled('svg')({
  width: 24,
  height: 24,
  color: COLORS.auth.backIcon,
});

export const BackText = styled(Typography)({
  marginLeft: 8,
  fontWeight: 500,
  fontSize: 14,
  lineHeight: 1.4,
  textAlign: 'center',
  color: COLORS.auth.backText,
});

// ---------------------

export const EmailSentContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  width: '100%',
});

export const EmailSentIcon = styled(EmailOutlinedIcon)({
  width: '48px',
  height: '48px',
  marginBottom: '24px',
  color: COLORS.auth.emailSent.icon,
});

export const EmailSentTitle = styled(Typography)({
  fontWeight: 600,
  fontSize: '24px',
  lineHeight: 1.1,
  color: COLORS.auth.emailSent.title,
  marginBottom: '8px',
});

export const EmailSentMessage = styled(Typography)({
  marginBottom: '24px',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: 1.4,
  color: COLORS.auth.emailSent.message,
});

export const HighlightedEmail = styled('span')({
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: 1.4,
  color: COLORS.auth.emailSent.highlight,
});

export const EmailSentDivider = styled(Divider)({
  width: '100%',
  marginBottom: '24px',
  border: `1px solid ${COLORS.auth.emailSent.divider}`,
});

export const EmailSentNotice = styled(Typography)({
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: 1.4,
  marginBottom: '24px',
  color: COLORS.auth.emailSent.notice,
});

export const ResendLinkButton = styled(Button)({
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: 1.4,
  color: COLORS.auth.emailSent.resendLink,
  textTransform: 'none',
  padding: 0,
});

export const BackToSignInButton = styled(Button)({
  width: '100%',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: 1.4,
  color: COLORS.auth.emailSent.backButton.text,
  backgroundColor: COLORS.auth.emailSent.backButton.background,
  '&:hover': {
    backgroundColor: COLORS.auth.emailSent.backButton.hover,
  },
  '& .MuiButton-startIcon': {
    color: COLORS.auth.emailSent.backButton.text,
  },
  '& .MuiButton-startIcon svg': {
    color: COLORS.auth.emailSent.backButton.text,
  },
});

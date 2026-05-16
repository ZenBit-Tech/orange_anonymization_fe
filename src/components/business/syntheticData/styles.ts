import type { Theme } from '@mui/material/styles';

export const layout = {
  cardWidth: 1040,
  contentPadding: 2,
  gap: 4,
  fieldGap: 1.5,
};

export const synthetic = {
  root: (theme: Theme) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
  }),

  pageInner: (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px 32px',
    gap: '16px',
    backgroundColor: theme.palette.background.default,
    overflowY: 'auto',
    flex: 1,
  }),

  container: () => ({
    width: '100%',
    maxWidth: layout.cardWidth,
    display: 'flex',
    flexDirection: 'column',
    gap: layout.gap,
  }),

  titleGroup: () => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 0.5,
  }),

  paper: (theme: Theme) => ({
    width: '100%',
    padding: layout.contentPadding,
    backgroundColor: theme.palette.background.paper,
    border: `1.5px solid ${theme.palette.divider}`,
    boxShadow: theme.customShadows?.card ?? 'none',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: layout.gap,
  }),

  headerRow: () => ({ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }),

  dividerLine: (theme: Theme) => ({
    flex: 1,
    height: '1px',
    backgroundColor: theme.palette.grey[100],
  }),

  fieldLabel: (theme: Theme) => ({
    fontWeight: 500,
    mb: layout.fieldGap,
    fontSize: '12px',
    lineHeight: '16px',
    color: theme.palette.text.secondary,
  }),

  textField: (theme: Theme) => ({
    '& .MuiOutlinedInput-root': { backgroundColor: theme.palette.background.default },
  }),

  twoColumnRow: () => ({ display: 'flex', gap: layout.gap }),

  previewSection: (theme: Theme) => ({
    p: 2,
    backgroundColor: theme.palette.grey[100],
    border: `1px solid ${theme.palette.grey[100]}`,
    boxShadow: theme.customShadows?.sm ?? 'none',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: 0.5,
  }),

  previewBox: (theme: Theme) => ({
    p: 1.5,
    minHeight: '72px',
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'flex-start',
  }),

  previewText: () => ({
    width: '100%',
    fontSize: '12px',
    lineHeight: '16px',
    whiteSpace: 'pre-wrap',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical' as unknown as string,
    WebkitLineClamp: 2 as unknown as number,
    textOverflow: 'ellipsis',
  }),

  title: (theme: Theme) => ({
    fontWeight: 600,
    color: theme.palette.text.primary,
    fontSize: '18px',
    lineHeight: '26px',
  }),

  subtitle: (theme: Theme) => ({
    color: theme.palette.text.secondary,
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 400,
  }),

  headerTitle: (theme: Theme) => ({
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '24px',
    color: theme.palette.text.secondary,
  }),

  numberLabel: (theme: Theme) => ({
    fontWeight: 500,
    mb: layout.fieldGap,
    fontSize: '12px',
    lineHeight: '16px',
    color: theme.palette.text.secondary,
  }),

  helperText: (theme: Theme) => ({
    display: 'block',
    mt: 0.5,
    color: theme.palette.text.secondary,
    fontSize: '12px',
  }),

  requiredAsterisk: (theme: Theme) => ({ color: theme.palette.error.main }),

  frameworkLabel: () => ({ fontSize: '16px', lineHeight: '24px' }),

  frameworkDesc: (theme: Theme) => ({ color: theme.palette.text.secondary, fontSize: '12px' }),

  formatLabel: (theme: Theme) => ({
    fontWeight: 500,
    mb: layout.fieldGap,
    fontSize: '12px',
    lineHeight: '25px',
    color: theme.palette.text.secondary,
  }),

  previewTitle: (theme: Theme) => ({
    fontWeight: 500,
    color: theme.palette.text.primary,
    fontSize: '14px',
    lineHeight: '20px',
  }),

  previewSubtitle: (theme: Theme) => ({
    color: theme.palette.text.secondary,
    mt: 0.5,
    fontSize: '12px',
  }),

  footerLabel: (theme: Theme) => ({ color: theme.palette.text.secondary, fontSize: '12px' }),

  footerValue: (theme: Theme) => ({
    fontWeight: 600,
    color: theme.palette.text.secondary,
    fontSize: '12px',
  }),

  footerRow: () => ({ display: 'flex', justifyContent: 'flex-end', gap: 1 }),

  actionRow: () => ({ display: 'flex', justifyContent: 'flex-end', pt: 2 }),

  generateButton: (theme: Theme) => ({
    width: '249px',
    height: '40px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.paper,
    border: `2px solid ${theme.palette.primary.main}`,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark ?? theme.palette.primary.main,
      borderColor: theme.palette.primary.dark ?? theme.palette.primary.main,
    },
    '&:disabled': {
      backgroundColor: theme.palette.grey[300],
      color: theme.palette.grey[400],
      borderColor: theme.palette.grey[300],
    },
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '20px',
    textTransform: 'none',
  }),

  warningText: (theme: Theme) => ({
    color: theme.palette.warning.main,
    fontSize: '12px',
    textAlign: 'right',
  }),
};

export default synthetic;

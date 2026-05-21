import type { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { FONT_SIZES } from '@/constants';
import { alpha, Box, Button, Drawer, Typography } from '@mui/material';
import {
  Close as CloseIcon,
  CheckCircleOutlined as CheckCircleOutlinedIcon,
  Check as CheckIcon,
  WarningAmber as WarningAmberIcon,
  InfoOutlined as InfoOutlinedIcon,
  ArrowCircleDownOutlined as ArrowCircleDownOutlinedIcon,
} from '@mui/icons-material';

interface IProps {
  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;
  onDownload: () => void;
}

interface ValidationRowProps {
  icon: ReactNode;
  label: string;
  status: string;
}

const ValidationRow = ({ icon, label, status }: ValidationRowProps) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '6px' }}>
    {icon}
    <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500', flex: 1 }}>{label}</Typography>
    <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.700' }}>{status}</Typography>
  </Box>
);

const ValidationDetailsDrawer: FC<IProps> = ({ drawerOpen, setDrawerOpen, onDownload }) => {
  const { t } = useTranslation();

  const handleDownload = () => {
    setDrawerOpen(false);
    onDownload();
  };

  const checkItems = [
    'deIdentify.settings.identifiers.items.names',
    'deIdentify.settings.identifiers.items.phone',
    'deIdentify.settings.identifiers.items.email',
    'deIdentify.settings.identifiers.items.medical',
    'deIdentify.settings.identifiers.items.dates',
    'deIdentify.settings.identifiers.items.geographic',
    'dashboard.entityTypesChart.labels.FREE_TEXT',
    'syntheticData.chooseFormat',
  ];

  const warningItems = [
    {
      labelKey: 'syntheticData.results.drawers.validationDetails.Generated_note_text',
      statusKey: 'syntheticData.results.drawers.validationDetails.values.mediumConfidence',
    },
    {
      labelKey: 'syntheticData.results.drawers.validationDetails.Diagnosis_code',
      statusKey: 'syntheticData.results.drawers.validationDetails.values.mediumConsistency',
    },
    {
      labelKey: 'syntheticData.results.drawers.recordDetails.fields.providerType',
      statusKey: 'syntheticData.results.drawers.validationDetails.values.mediumConfidence',
    },
  ];

  const renderDivider = () => (
    <Box sx={{ height: '1px', width: '100%', bgcolor: 'neutral.200', my: '20px' }}></Box>
  );

  const renderSectionTitle = (titleKey: string) => (
    <Typography
      sx={{
        color: 'neutral.400',
        fontSize: FONT_SIZES.xs,
        fontWeight: 'fontWeightMedium',
        mb: '12px',
      }}
    >
      {t(`syntheticData.results.drawers.validationDetails.${titleKey}`)}
    </Typography>
  );

  return (
    <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
      <Box sx={{ p: '32px', width: '560px' }}>
        <Box
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: '6px' }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: FONT_SIZES.lg,
                color: 'neutral.900',
                fontWeight: 'fontWeightSemiBold',
              }}
            >
              {t('syntheticData.results.drawers.validationDetails.title')}
            </Typography>
            <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.400' }}>
              {t('syntheticData.results.drawers.validationDetails.HIPAA')}
            </Typography>
          </Box>
          <Button onClick={() => setDrawerOpen(false)} sx={{ minWidth: 'auto', p: 0 }}>
            <CloseIcon sx={{ color: 'neutral.500' }} />
          </Button>
        </Box>

        {renderDivider()}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '20px' }}>
          <CheckCircleOutlinedIcon sx={{ color: 'success.main' }} />
          <Typography
            sx={{ fontSize: FONT_SIZES.md, fontWeight: 'fontWeightMedium', color: 'neutral.700' }}
          >
            {t('syntheticData.results.drawers.validationDetails.passed')}
          </Typography>
        </Box>

        {renderSectionTitle('checks')}

        {checkItems.map((itemKey) => (
          <ValidationRow
            key={itemKey}
            icon={<CheckIcon sx={{ color: 'success.main' }} fontSize="small" />}
            label={t(itemKey)}
            status={t('syntheticData.results.drawers.validationDetails.values.removed')}
          />
        ))}

        {renderDivider()}

        <Box sx={{ mb: warningItems.length > 0 ? '32px' : 0 }}>
          {renderSectionTitle('warnings')}
          {warningItems.map((item) => (
            <ValidationRow
              key={item.labelKey}
              icon={<WarningAmberIcon sx={{ color: 'warning.main' }} fontSize="small" />}
              label={t(item.labelKey)}
              status={t(item.statusKey)}
            />
          ))}
        </Box>

        <Box
          sx={(theme) => ({
            display: 'flex',
            gap: '8px',
            px: '16px',
            py: '12px',
            borderRadius: '8px',
            border: '1px solid',
            borderColor: 'info.main',
            bgcolor: alpha(theme.palette.info.light, 0.3),
            boxShadow: `0px 1px 3px 0px ${alpha(theme.palette.common.black, 0.14)}`,
          })}
        >
          <InfoOutlinedIcon sx={{ color: 'info.main' }} />
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'info.main' }}>
            {t('syntheticData.results.drawers.validationDetails.info')}
          </Typography>
        </Box>

        {renderDivider()}

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', gap: '16px' }}>
          <Button
            sx={{ color: 'primary.500', fontSize: FONT_SIZES.sm, fontWeight: 'fontWeightMedium' }}
            onClick={() => setDrawerOpen(false)}
          >
            {t('common.cancel')}
          </Button>
          <Button
            sx={{
              color: 'common.white',
              fontSize: FONT_SIZES.sm,
              fontWeight: 'fontWeightMedium',
              bgcolor: 'primary.500',
              '&:hover': { bgcolor: 'primary.600' },
            }}
            startIcon={<ArrowCircleDownOutlinedIcon />}
            onClick={handleDownload}
          >
            {t('common.download')}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ValidationDetailsDrawer;

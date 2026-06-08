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
import type { SyntheticDataSummary } from '@/services/synthetic/types';

interface IProps {
  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;
  onDownload: () => void;
  data: SyntheticDataSummary;
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

const ValidationDetailsDrawer: FC<IProps> = ({ drawerOpen, setDrawerOpen, onDownload, data }) => {
  const { t } = useTranslation();

  const handleDownload = () => {
    setDrawerOpen(false);
    onDownload();
  };

  const checkItems = [
    { key: 'dates', checked: data.compliance_validation_checks.dates_transformed },
    { key: 'freeText', checked: data.compliance_validation_checks.free_text_fields_checked },
    { key: 'format', checked: data.compliance_validation_checks.export_format_validated },
    {
      key: 'synthetic',
      checked: data.compliance_validation_checks.synthetic_identifiers_generated,
    },
    { key: 'direct', checked: data.compliance_validation_checks.direct_identifiers_removed },
  ];

  const warningItems = data.data_quality.warnings;

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
              {data.compliance.framework}
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

        {checkItems.map((item) => (
          <ValidationRow
            key={item.key}
            icon={
              <CheckIcon
                sx={{ color: item.checked ? 'success.main' : 'neutral.300' }}
                fontSize="small"
              />
            }
            label={t(`syntheticData.syntheticResults.validation.checks.${item.key}`)}
            status={
              item.checked
                ? t(
                    'syntheticData.results.drawers.validationDetails.values.removed',
                    'Valid / Removed',
                  )
                : t('common.failed', 'Failed')
            }
          />
        ))}

        {renderDivider()}

        {warningItems.length > 0 && (
          <Box sx={{ mb: '32px' }}>
            {renderSectionTitle('warnings')}
            {warningItems.map((warningText, index) => (
              <ValidationRow
                key={index}
                icon={<WarningAmberIcon sx={{ color: 'warning.main' }} fontSize="small" />}
                label={warningText}
                status={t(
                  'syntheticData.results.drawers.validationDetails.values.mediumConfidence',
                  'Review Required',
                )}
              />
            ))}
          </Box>
        )}

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

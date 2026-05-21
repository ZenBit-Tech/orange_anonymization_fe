import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FONT_SIZES } from '@/constants';
import { Box, Button, Drawer, Typography } from '@mui/material';
import { Close as CloseIcon, Check as CheckIcon } from '@mui/icons-material';

interface IProps {
  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;
}

const rowBoxStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px',
  mb: '4px',
};

const MetaRow = ({ label, value }: { label: string; value: string }) => (
  <Box sx={rowBoxStyle}>
    <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>{label}</Typography>
    <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.900' }}>{value}</Typography>
  </Box>
);

const GeneratedFieldRow = ({ label, value }: { label: string; value: string }) => (
  <Box sx={rowBoxStyle}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <CheckIcon sx={{ color: 'success.main' }} fontSize="small" />
      <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>{label}</Typography>
    </Box>
    <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.700' }}>{value}</Typography>
  </Box>
);

const ComplianceCheckRow = ({ label }: { label: string }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '2px' }}>
    <CheckIcon sx={{ color: 'success.main' }} fontSize="small" />
    <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>{label}</Typography>
  </Box>
);

const RecordDetailsDrawer: FC<IProps> = ({ drawerOpen, setDrawerOpen }) => {
  const { t } = useTranslation();

  const generatedFields = [
    { labelKey: 'ageRange', valueKey: '55-64' },
    { labelKey: 'encounterDate', valueKey: '2025-04-14' },
    { labelKey: 'category', valueKey: 'Endocrinology' },
    { labelKey: 'diagnosis', valueKey: 'E11.9' },
    { labelKey: 'dischargeStatus', valueKey: 'Follow-up' },
    { labelKey: 'medication', valueKey: 'Metformin' },
    { labelKey: 'providerType', valueKey: 'Endocrinologist' },
  ];

  const complianceChecks = [
    'noDirectIdentifiers',
    'datesTransformed',
    'fieldConfidenceHigh',
    'syntheticIdentifiers',
    'directIdentifiersRemoved',
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
      {t(`syntheticData.results.drawers.recordDetails.${titleKey}`)}
    </Typography>
  );

  return (
    <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
      <Box sx={{ p: '32px', width: '400px' }}>
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
              {t('syntheticData.results.drawers.recordDetails.title')}
            </Typography>
            <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.400' }}>
              {t('syntheticData.results.drawers.recordDetails.SYN-00041')}
            </Typography>
          </Box>
          <Button onClick={() => setDrawerOpen(false)} sx={{ minWidth: 'auto', p: 0 }}>
            <CloseIcon sx={{ color: 'neutral.500' }} />
          </Button>
        </Box>

        {renderDivider()}

        <MetaRow
          label={t('syntheticData.results.drawers.recordDetails.fields.documentType')}
          value={t('syntheticData.results.drawers.recordDetails.Discharge_Summary')}
        />
        <MetaRow
          label={t('syntheticData.results.drawers.recordDetails.fields.compliance')}
          value={t('syntheticData.results.drawers.recordDetails.values.passed')}
        />

        {renderDivider()}

        {renderSectionTitle('generatedFields')}
        {generatedFields.map((field) => (
          <GeneratedFieldRow
            key={field.labelKey}
            label={t(`syntheticData.results.drawers.recordDetails.fields.${field.labelKey}`)}
            value={t(
              `syntheticData.results.drawers.recordDetails.values.${field.valueKey}`,
              field.valueKey,
            )}
          />
        ))}

        {renderDivider()}

        {renderSectionTitle('clinicalNote')}
        <Box sx={{ p: '12px', borderRadius: '8px', bgcolor: 'neutral.50' }}>
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>
            {t('syntheticData.results.drawers.recordDetails.values.notePlaceholder')}
          </Typography>
        </Box>

        {renderDivider()}

        {renderSectionTitle('compliance')}

        {complianceChecks.map((checkKey) => (
          <ComplianceCheckRow
            key={checkKey}
            label={t(`syntheticData.results.drawers.recordDetails.values.${checkKey}`)}
          />
        ))}
      </Box>
    </Drawer>
  );
};

export default RecordDetailsDrawer;

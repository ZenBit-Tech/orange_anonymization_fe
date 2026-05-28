import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FONT_SIZES } from '@/constants';
import { Box, Button, Drawer, Typography } from '@mui/material';
import { Close as CloseIcon, Check as CheckIcon } from '@mui/icons-material';
import type { SyntheticRecord, SyntheticComplianceChecks } from '@/services/synthetic/types';

interface IProps {
  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;
  record: SyntheticRecord | null;
  complianceChecks: SyntheticComplianceChecks;
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
    <Typography
      sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.900', fontWeight: 'fontWeightMedium' }}
    >
      {value}
    </Typography>
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

const ComplianceCheckRow = ({ label, checked }: { label: string; checked: boolean }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '2px' }}>
    <CheckIcon sx={{ color: checked ? 'success.main' : 'neutral.300' }} fontSize="small" />
    <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>{label}</Typography>
  </Box>
);

const RecordDetailsDrawer: FC<IProps> = ({
  drawerOpen,
  setDrawerOpen,
  record,
  complianceChecks,
}) => {
  const { t } = useTranslation();

  if (!record) return null;

  const { record_id, docType, ...dynamicFields } = record;

  const checksList = [
    { key: 'noDirectIdentifiers', checked: complianceChecks.direct_identifiers_removed },
    { key: 'datesTransformed', checked: complianceChecks.dates_transformed },
    { key: 'fieldConfidenceHigh', checked: complianceChecks.free_text_fields_checked },
    { key: 'syntheticIdentifiers', checked: complianceChecks.synthetic_identifiers_generated },
    { key: 'directIdentifiersRemoved', checked: complianceChecks.direct_identifiers_removed },
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
              {record_id || '—'}
            </Typography>
          </Box>
          <Button onClick={() => setDrawerOpen(false)} sx={{ minWidth: 'auto', p: 0 }}>
            <CloseIcon sx={{ color: 'neutral.500' }} />
          </Button>
        </Box>

        {renderDivider()}

        <MetaRow
          label={t('syntheticData.results.drawers.recordDetails.fields.documentType')}
          value={docType || '—'}
        />
        <MetaRow
          label={t('syntheticData.results.drawers.recordDetails.fields.compliance')}
          value={t('syntheticData.results.drawers.recordDetails.values.passed')}
        />

        {renderDivider()}

        {renderSectionTitle('generatedFields')}

        {Object.entries(dynamicFields).map(([key, value]) => (
          <GeneratedFieldRow
            key={key}
            label={t(`syntheticData.syntheticResults.preview.columns.${key}`, key)}
            value={value || '—'}
          />
        ))}

        {renderDivider()}

        {renderSectionTitle('clinicalNote')}

        <Box
          sx={{
            p: '12px',
            borderRadius: '8px',
            bgcolor: 'neutral.50',
            maxHeight: '150px',
            overflowY: 'auto',
          }}
        >
          <Typography
            sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.600', whiteSpace: 'pre-line' }}
          >
            {record.text ||
              record.clinical_note ||
              t('syntheticData.results.drawers.recordDetails.values.notePlaceholder')}
          </Typography>
        </Box>

        {renderDivider()}

        {renderSectionTitle('compliance')}

        {checksList.map((check) => (
          <ComplianceCheckRow
            key={check.key}
            label={t(`syntheticData.results.drawers.recordDetails.values.${check.key}`)}
            checked={check.checked}
          />
        ))}
      </Box>
    </Drawer>
  );
};

export default RecordDetailsDrawer;

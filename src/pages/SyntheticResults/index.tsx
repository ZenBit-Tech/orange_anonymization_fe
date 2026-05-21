import { FONT_SIZES } from '@/constants';
import {
  alpha,
  Box,
  Button,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  type Theme,
} from '@mui/material';
import {
  ArrowCircleDown as ArrowCircleDownIcon,
  CheckCircleOutlined as CheckCircleOutlinedIcon,
  Settings as SettingsIcon,
  Check as CheckIcon,
  WarningAmber as WarningAmberIcon,
  ArrowForward as ArrowForwardIcon,
  Autorenew as AutorenewIcon,
} from '@mui/icons-material';
import ComplienceIcon from '@/assets/icons/complienceIcon.svg?react';
import FinanceIcon from '@/assets/icons/finance_mode.svg?react';
import TableChartIcon from '@/assets/icons/table_chart_view.svg?react';
import ValidationDetailsDrawer from '@/components/business/synthetic/VaidationDetailsDrawer';
import { useState } from 'react';
import RecordDetailsDrawer from '@/components/business/synthetic/RecordDetailsDrawer';
import CustomizeColumnsDrawer from '@/components/business/synthetic/CustomizeColumnsDrawer';
import SyntheticRegeneratePopup from '@/components/popups/SyntheticRegeneratePopup';
import SyntheticDownloadPopup from '@/components/popups/SyntheticDownloadPopup';
import { useTranslation } from 'react-i18next';

const cardStyle = {
  width: '100%',
  bgcolor: 'common.white',
  p: '16px',
  borderRadius: '8px',
  border: '1px solid',
  borderColor: 'neutral.200',
  boxShadow: (theme: Theme) => `0px 1px 3px 0px ${alpha(theme.palette.common.black, 0.14)}`,
};

interface MetricField {
  label: string;
  value: React.ReactNode;
}

interface MetricCardProps {
  title: string;
  icon: React.ReactNode;
  fields: MetricField[];
  lineColor?: string;
}

const MetricCard = ({ title, icon, fields, lineColor = 'success.main' }: MetricCardProps) => (
  <Box sx={cardStyle}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'neutral.700' }}>
      {icon}
      <Typography
        sx={{
          fontSize: FONT_SIZES.sm,
          fontWeight: 'fontWeightMedium',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </Typography>
    </Box>

    <Box sx={{ height: '1px', width: '100%', bgcolor: lineColor, my: '12px' }}></Box>

    <Box sx={{ display: 'flex', gap: '8px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {fields.map((f, i) => (
          <Typography
            key={i}
            sx={{ fontWeight: 'fontWeightMedium', fontSize: FONT_SIZES.sm, color: 'neutral.700' }}
          >
            {f.label}
          </Typography>
        ))}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {fields.map((f, i) =>
          typeof f.value === 'string' ? (
            <Typography key={i} sx={{ fontSize: FONT_SIZES.sm, color: 'neutral.700' }}>
              {f.value}
            </Typography>
          ) : (
            <Box key={i}>{f.value}</Box>
          ),
        )}
      </Box>
    </Box>
  </Box>
);

const SyntheticResults = () => {
  const { t } = useTranslation();
  const [isValidationDetailsDrawerOpen, setIsValidationDetailsDrawerOpen] = useState(false);
  const [isRecordDetailsDrawerOpen, setIsRecordDetailsDrawerOpen] = useState(false);
  const [isCustomizeColumnsDrawerOpen, setIsCustomizeColumnsDrawerOpen] = useState(false);
  const [isRegeneratePopupOpen, setIsRegeneratePopupOpen] = useState(false);
  const [isDownloadPopupOpen, setIsDownloadPopupOpen] = useState(false);

  const rows = [
    {
      record_id: 'SYN-00041',
      docType: 'Dischrge sum...',
      ageRange: '55-64',
      date: '2026-04-01',
      quality: t('common.good'),
    },
    {
      record_id: 'SYN-00042',
      docType: 'Progress Note',
      ageRange: '34-37',
      date: '2026-04-05',
      quality: t('common.fair'),
    },
    {
      record_id: 'SYN-00043',
      docType: 'Consultation',
      ageRange: '23-34',
      date: '2026-04-04',
      quality: t('common.good'),
    },
    {
      record_id: 'SYN-00044',
      docType: 'Operative',
      ageRange: '20-45',
      date: '2026-04-15',
      quality: t('common.good'),
    },
    {
      record_id: 'SYN-00045',
      docType: 'Operative report',
      ageRange: '30-35',
      date: '2026-04-30',
      quality: t('common.good'),
    },
    {
      record_id: 'SYN-00046',
      docType: 'Radiology',
      ageRange: '30-40',
      date: '2026-04-30',
      quality: t('common.good'),
    },
    {
      record_id: 'SYN-00047',
      docType: 'RadiClinical Not...',
      ageRange: '39-40',
      date: '2026-04-29',
      quality: t('common.good'),
    },
    {
      record_id: 'SYN-00048',
      docType: 'Consultation No...',
      ageRange: '18-23',
      date: '2026-05-01',
      quality: t('common.good'),
    },
  ];

  const validationChecksKeys = [
    'syntheticData.syntheticResults.validation.checks.dates',
    'syntheticData.syntheticResults.validation.checks.freeText',
    'syntheticData.syntheticResults.validation.checks.format',
    'syntheticData.syntheticResults.validation.checks.synthetic',
    'syntheticData.syntheticResults.validation.checks.synthetic',
  ];

  const onRegenerate = async () => {};
  const onDownload = async () => {};

  return (
    <Box sx={{ pb: '40px' }}>
      <Box sx={{ display: 'flex', gap: '24px', flexDirection: { xs: 'column', md: 'row' }, mb: 4 }}>
        <Box
          sx={{
            flex: 2,
            width: '100%',
            display: 'flex',
            gap: '24px',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <MetricCard
            title={t('syntheticData.syntheticResults.compliance.title')}
            icon={<SvgIcon component={ComplienceIcon} inheritViewBox />}
            fields={[
              {
                label: t('syntheticData.syntheticResults.compliance.framework'),
                value: t('syntheticData.syntheticResults.compliance.values.hipaaSh'),
              },
              {
                label: t('syntheticData.syntheticResults.compliance.riskLevel'),
                value: t('common.low'),
              },
              {
                label: t('syntheticData.syntheticResults.compliance.directIdentifiers'),
                value: t('common.low'),
              },
            ]}
          />

          <MetricCard
            title={t('syntheticData.syntheticResults.dataQuality.title')}
            icon={<SvgIcon component={FinanceIcon} inheritViewBox />}
            fields={[
              {
                label: t('syntheticData.syntheticResults.dataQuality.quality'),
                value: t('common.good'),
              },
              {
                label: t('syntheticData.syntheticResults.dataQuality.consistency'),
                value: t('common.high'),
              },
              {
                label: t('syntheticData.syntheticResults.dataQuality.warnings'),
                value: (
                  <Box
                    sx={(theme) => ({
                      bgcolor: alpha(theme.palette.warning[100] || theme.palette.common.white, 0.3),
                      borderRadius: '99px',
                      display: 'flex',
                      gap: '4px',
                      alignItems: 'center',
                      px: 1,
                    })}
                  >
                    <Box
                      sx={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '4px',
                        bgcolor: 'warning.main',
                      }}
                    />
                    <Typography sx={{ fontSize: FONT_SIZES.sm, color: 'warning.main' }}>
                      {t('syntheticData.syntheticResults.dataQuality.lowConfidenceCount', {
                        count: 3,
                      })}
                    </Typography>
                  </Box>
                ),
              },
            ]}
          />

          <MetricCard
            title={t('syntheticData.syntheticResults.export.title')}
            icon={<ArrowCircleDownIcon />}
            fields={[
              {
                label: '',
                value: (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <Box
                      sx={{
                        fontSize: FONT_SIZES.sm,
                        color: 'neutral.700',
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'center',
                      }}
                    >
                      <ArrowCircleDownIcon fontSize="small" />
                      {t('syntheticData.syntheticResults.export.ready')}
                    </Box>
                    <Box
                      sx={{
                        fontSize: FONT_SIZES.sm,
                        color: 'neutral.700',
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'center',
                      }}
                    >
                      <CheckCircleOutlinedIcon sx={{ color: 'success.main' }} fontSize="small" />
                      {t('syntheticData.syntheticResults.export.sessionNotice')}
                    </Box>
                  </Box>
                ),
              },
            ]}
          />
        </Box>

        <Box sx={{ flex: 1, ...cardStyle }}>
          <MetricCard
            title={t('syntheticData.syntheticResults.datasetSummary.title')}
            icon={<SvgIcon component={TableChartIcon} inheritViewBox />}
            fields={[
              {
                label: t('syntheticData.syntheticResults.datasetSummary.format'),
                value: t('syntheticData.syntheticResults.datasetSummary.formatTitle'),
              },
              {
                label: t('syntheticData.syntheticResults.datasetSummary.records'),
                value: t('syntheticData.syntheticResults.datasetSummary.recordsTitle'),
              },
              {
                label: t('syntheticData.syntheticResults.datasetSummary.fields'),
                value: t('syntheticData.syntheticResults.datasetSummary.fieldsTitle'),
              },
            ]}
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: '24px', flexDirection: { xs: 'column', md: 'row' }, mb: 4 }}>
        <Box sx={{ flex: 2, ...cardStyle, p: 0 }}>
          <Box
            sx={{
              p: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: FONT_SIZES.sm,
                  fontWeight: 'fontWeightSemiBold',
                  color: 'neutral.900',
                }}
              >
                {t('syntheticData.syntheticResults.preview.title')}
              </Typography>
              <Typography sx={{ fontSize: FONT_SIZES.sm, color: 'neutral.500' }}>
                {t('syntheticData.syntheticResults.preview.showingCount', {
                  count: 8,
                  total: 1000,
                })}
              </Typography>
            </Box>
            <Button
              sx={{ color: 'primary.500' }}
              startIcon={<SettingsIcon />}
              onClick={() => setIsCustomizeColumnsDrawerOpen(true)}
            >
              {t('syntheticData.results.drawers.customizeColumns.title')}
            </Button>
          </Box>

          <Table size="small" aria-label="dense table">
            <TableHead sx={{ bgcolor: 'neutral.50' }}>
              <TableRow>
                {['recordId', 'docType', 'ageRange', 'date', 'quality', 'action'].map((col) => (
                  <TableCell
                    key={col}
                    sx={{
                      color: 'neutral.500',
                      fontSize: FONT_SIZES.sm,
                      fontWeight: 'fontWeightMedium',
                    }}
                  >
                    {t(`syntheticData.syntheticResults.preview.columns.${col}`)}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.record_id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell sx={{ color: 'neutral.900', fontSize: FONT_SIZES.xs }}>
                    {row.record_id}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: 'neutral.700',
                      fontSize: FONT_SIZES.xs,
                      fontWeight: 'fontWeightMedium',
                    }}
                  >
                    {row.docType}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: 'neutral.700',
                      fontSize: FONT_SIZES.xs,
                      fontWeight: 'fontWeightMedium',
                    }}
                  >
                    {row.ageRange}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: 'neutral.700',
                      fontSize: FONT_SIZES.xs,
                      fontWeight: 'fontWeightMedium',
                    }}
                  >
                    {row.date}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: 'neutral.500',
                      fontSize: FONT_SIZES.xs,
                      fontWeight: 'fontWeightMedium',
                    }}
                  >
                    {row.quality}
                  </TableCell>
                  <TableCell>
                    <Button
                      sx={{ color: 'primary.500', fontSize: FONT_SIZES.xs, p: 0 }}
                      onClick={() => setIsRecordDetailsDrawerOpen(true)}
                    >
                      {t('common.view')}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        <Box sx={{ flex: 1, ...cardStyle }}>
          <Typography
            sx={{
              color: 'neutral.900',
              fontSize: FONT_SIZES.lg,
              fontWeight: 'fontWeightSemiBold',
              mb: '17px',
            }}
          >
            {t('syntheticData.syntheticResults.validation.title')}
          </Typography>

          <Box sx={{ display: 'flex', gap: '8px', mb: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {[
                t('syntheticData.syntheticResults.compliance.framework'),
                t('syntheticData.syntheticResults.compliance.riskLevel'),
                t('syntheticData.syntheticResults.validation.exportStatus'),
              ].map((text, i) => (
                <Typography
                  key={i}
                  sx={{
                    fontWeight: 'fontWeightMedium',
                    fontSize: FONT_SIZES.sm,
                    color: 'primary.700',
                  }}
                >
                  {text}
                </Typography>
              ))}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {[
                t('syntheticData.syntheticResults.compliance.values.hipaaSh'),
                t('common.low'),
                t('syntheticData.syntheticResults.validation.safeToDownload'),
              ].map((text, i) => (
                <Typography key={i} sx={{ fontSize: FONT_SIZES.sm, color: 'neutral.500' }}>
                  {text}
                </Typography>
              ))}
            </Box>
          </Box>

          <Box sx={{ height: '1px', width: '100%', my: '17px', bgcolor: 'neutral.200' }}></Box>

          {validationChecksKeys.map((key, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '2px' }}>
              <CheckIcon sx={{ color: 'success.main' }} fontSize="small" />
              <Typography sx={{ color: 'neutral.500', fontSize: FONT_SIZES.sm }}>
                {t(key)}
              </Typography>
            </Box>
          ))}

          <Box sx={{ height: '1px', width: '100%', my: '17px', bgcolor: 'neutral.200' }}></Box>

          <Box
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              mb: '17px',
              p: '12px',
              borderRadius: '8px',
              bgcolor: alpha(theme.palette.warning[100] || theme.palette.common.white, 0.3),
            })}
          >
            <WarningAmberIcon sx={{ color: 'warning.main' }} />
            <Typography sx={{ color: 'warning.main', fontSize: FONT_SIZES.sm }}>
              {t('syntheticData.syntheticResults.validation.warningReview', { count: 3 })}
            </Typography>
          </Box>

          <Button
            sx={{
              color: 'primary.500',
              fontWeight: 'fontWeightMedium',
              fontSize: FONT_SIZES.sm,
              p: 0,
            }}
            endIcon={<ArrowForwardIcon />}
            onClick={() => setIsValidationDetailsDrawerOpen(true)}
          >
            {t('syntheticData.syntheticResults.validation.viewDetails')}
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          bgcolor: 'common.white',
          px: '32px',
          py: '16px',
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.appBar,
          border: '1px solid',
          borderColor: 'neutral.200',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
          gap: '24px',
        }}
      >
        <Button
          sx={{ color: 'primary.500', fontWeight: 'fontWeightMedium', fontSize: FONT_SIZES.sm }}
          startIcon={<AutorenewIcon />}
          onClick={() => setIsRegeneratePopupOpen(true)}
        >
          {t('common.regenerate')}
        </Button>

        <Button
          sx={{
            color: 'common.white',
            fontWeight: 'fontWeightMedium',
            fontSize: FONT_SIZES.sm,
            bgcolor: 'primary.500',
            '&:hover': { bgcolor: 'primary.600' },
          }}
          startIcon={<ArrowCircleDownIcon />}
          onClick={() => setIsDownloadPopupOpen(true)}
        >
          {t('common.download')}
        </Button>
      </Box>

      <ValidationDetailsDrawer
        drawerOpen={isValidationDetailsDrawerOpen}
        setDrawerOpen={setIsValidationDetailsDrawerOpen}
        onDownload={() => setIsDownloadPopupOpen(true)}
      />
      <RecordDetailsDrawer
        drawerOpen={isRecordDetailsDrawerOpen}
        setDrawerOpen={setIsRecordDetailsDrawerOpen}
      />
      <CustomizeColumnsDrawer
        drawerOpen={isCustomizeColumnsDrawerOpen}
        setDrawerOpen={setIsCustomizeColumnsDrawerOpen}
      />
      <SyntheticRegeneratePopup
        isVisible={isRegeneratePopupOpen}
        onClose={() => setIsRegeneratePopupOpen(false)}
        onRegenerate={onRegenerate}
      />
      <SyntheticDownloadPopup
        isVisible={isDownloadPopupOpen}
        onClose={() => setIsDownloadPopupOpen(false)}
        onDownload={onDownload}
      />
    </Box>
  );
};

export default SyntheticResults;

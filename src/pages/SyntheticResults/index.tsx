import { FONT_SIZES } from '@/constants';
import {
  alpha,
  Box,
  Button,
  CircularProgress,
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
import { useState, useEffect, useRef } from 'react';
import RecordDetailsDrawer from '@/components/business/synthetic/RecordDetailsDrawer';
import CustomizeColumnsDrawer from '@/components/business/synthetic/CustomizeColumnsDrawer';
import SyntheticRegeneratePopup from '@/components/popups/SyntheticRegeneratePopup';
import SyntheticDownloadPopup from '@/components/popups/SyntheticDownloadPopup';
import { useTranslation } from 'react-i18next';
import type {
  SyntheticDataSummary,
  SyntheticOutputFormat,
  SyntheticRecord,
  SyntheticStatusResponse,
} from '@/services/synthetic/types';
import { syntheticService } from '@/services/synthetic/syntheticService';
import { useNavigate, useParams } from 'react-router-dom';

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

import type { SxProps } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setDataAC } from '@/store/slices/syntheticResultSlice';

interface MetricCardProps {
  title: string;
  icon: React.ReactNode;
  fields: MetricField[];
  lineColor?: string;
  sx?: SxProps<Theme>;
}

const MetricCard = ({ title, icon, fields, sx, lineColor = 'success.main' }: MetricCardProps) => {
  const hasLabels = fields.some((f) => f.label && f.label.trim() !== '');

  return (
    <Box sx={{ ...cardStyle, ...sx }}>
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
        {hasLabels && (
          <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: '120px' }}>
            {fields.map((f, i) => (
              <Typography
                key={i}
                sx={{
                  fontWeight: 'fontWeightMedium',
                  fontSize: FONT_SIZES.sm,
                  color: 'neutral.700',
                  mb: 0.5,
                }}
              >
                {f.label}
              </Typography>
            ))}
          </Box>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          {fields.map((f, i) =>
            typeof f.value === 'string' || typeof f.value === 'number' ? (
              <Typography key={i} sx={{ fontSize: FONT_SIZES.sm, color: 'neutral.700', mb: 0.5 }}>
                {f.value}
              </Typography>
            ) : (
              <Box key={i} sx={{ mb: 0.5, width: '100%' }}>
                {f.value}
              </Box>
            ),
          )}
        </Box>
      </Box>
    </Box>
  );
};

const SyntheticResults = () => {
  const { t } = useTranslation();
  const { datasetId } = useParams<{ datasetId: string }>();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<SyntheticRecord | null>(null);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    'record_id',
    'docType',
    'age_range',
    'date',
    'quality',
  ]);

  const [isValidationDetailsDrawerOpen, setIsValidationDetailsDrawerOpen] = useState(false);
  const [isRecordDetailsDrawerOpen, setIsRecordDetailsDrawerOpen] = useState(false);
  const [isCustomizeColumnsDrawerOpen, setIsCustomizeColumnsDrawerOpen] = useState(false);
  const [isRegeneratePopupOpen, setIsRegeneratePopupOpen] = useState(false);
  const [isDownloadPopupOpen, setIsDownloadPopupOpen] = useState(false);

  const pollingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { data } = useAppSelector((state) => state.syntheticResult);
  const { currentJob } = useAppSelector((state) => state.jobs);
  const { localOriginalTexts } = useAppSelector((state) => state.jobs);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const result = await syntheticService.getGeneratedData(datasetId!);

        if ('status' in result) {
          const status = result.status.toUpperCase();

          if (status === 'COMPLETED' || status === 'READY') {
            dispatch(setDataAC(result as SyntheticDataSummary));
            setIsProcessing(false);
            setLoading(false);
            if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
          } else if (status === 'ERROR' || (result as SyntheticStatusResponse).error_message) {
            throw new Error(
              (result as SyntheticStatusResponse).error_message || 'Backend generation failed',
            );
          } else {
            setIsProcessing(true);
            setLoading(false);
          }
        } else {
          dispatch(setDataAC(result as SyntheticDataSummary));
          setIsProcessing(false);
          setLoading(false);
          if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
        setLoading(false);
        setIsProcessing(false);
        if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
      }
    };

    if (datasetId) {
      void checkStatus();

      pollingIntervalRef.current = setInterval(() => {
        void checkStatus();
      }, 2000);
    }

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [datasetId, t]);

  const onRegenerate = async () => {
    setIsRegeneratePopupOpen(false);

    if (!currentJob) {
      navigate(`/app/synthetic-data`);
      return;
    }

    try {
      const fullRawText = localOriginalTexts[currentJob.id!] || '';
      const response = await syntheticService.generateSyntheticData({
        raw_text: fullRawText,
        dataset_type: 'medical_records',
        num_records: data?.export_summary.records_count || 100,
        compliance_framework: data?.compliance.framework || 'HIPAA',
        output_format:
          (data?.export_summary.format.toUpperCase() as SyntheticOutputFormat) || 'CSV',
      });
      navigate(`/app/synthetic-data/${response.dataset_id}`);
    } catch (error) {
      console.error('Error regenerating synthetic data:', error);
    }
  };

  const onDownload = async () => {
    try {
      const blobData = await syntheticService.downloadSyntheticData(datasetId!);
      const downloadUrl = window.URL.createObjectURL(new Blob([blobData]));
      const link = document.createElement('a');
      link.href = downloadUrl;

      const fileExtension = data?.export_summary.format.toLowerCase() || 'csv';
      link.setAttribute('download', `synthetic-dataset-${datasetId}.${fileExtension}`);

      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);

      window.URL.revokeObjectURL(downloadUrl);

      setIsDownloadPopupOpen(false);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isProcessing) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
          gap: '16px',
        }}
      >
        <CircularProgress size={48} />
        <Typography
          sx={{ fontSize: FONT_SIZES.md, color: 'neutral.700', fontWeight: 'fontWeightMedium' }}
        >
          {t('syntheticData.status.processing', 'Generating synthetic data, please wait...')}
        </Typography>
      </Box>
    );
  }

  if (error || !data) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="error" sx={{ fontWeight: 'fontWeightMedium' }}>
          {error || 'No data available'}
        </Typography>
      </Box>
    );
  }

  const validationChecks = [
    { key: 'dates', checked: data.compliance_validation_checks.dates_transformed },
    { key: 'freeText', checked: data.compliance_validation_checks.free_text_fields_checked },
    { key: 'format', checked: data.compliance_validation_checks.export_format_validated },
    {
      key: 'synthetic',
      checked: data.compliance_validation_checks.synthetic_identifiers_generated,
    },
    { key: 'direct', checked: data.compliance_validation_checks.direct_identifiers_removed },
  ];

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
                value: data.compliance.framework,
              },
              {
                label: t('syntheticData.syntheticResults.compliance.riskLevel'),
                value: t(`common.${data.compliance.risk_level.toLowerCase()}`, {
                  defaultValue: data.compliance.risk_level,
                }),
              },
              {
                label: t('syntheticData.syntheticResults.compliance.directIdentifiers'),
                value: t(`common.${data.compliance.direct_identifiers_detected.toLowerCase()}`, {
                  defaultValue: data.compliance.direct_identifiers_detected,
                }),
              },
            ]}
          />

          <MetricCard
            title={t('syntheticData.syntheticResults.dataQuality.title')}
            icon={<SvgIcon component={FinanceIcon} inheritViewBox />}
            fields={
              [
                {
                  label: t('syntheticData.syntheticResults.dataQuality.quality'),
                  value: t(`common.${data.data_quality.quality.toLowerCase()}`, {
                    defaultValue: data.data_quality.quality,
                  }),
                },
                {
                  label: t('syntheticData.syntheticResults.dataQuality.consistency'),
                  value: t(`common.${data.data_quality.consistency.toLowerCase()}`, {
                    defaultValue: data.data_quality.consistency,
                  }),
                },
                data.data_quality.warnings.length > 0 && {
                  label: t('syntheticData.syntheticResults.dataQuality.warnings'),
                  value: (
                    <Box
                      sx={(theme) => ({
                        bgcolor: alpha(
                          theme.palette.warning[100] || theme.palette.common.white,
                          0.3,
                        ),
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
                        {data.data_quality.warnings[0]}
                      </Typography>
                    </Box>
                  ),
                },
              ].filter(Boolean) as MetricField[]
            }
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

        <MetricCard
          title={t('syntheticData.syntheticResults.datasetSummary.title')}
          icon={<SvgIcon component={TableChartIcon} inheritViewBox />}
          sx={{ flex: 1, ...cardStyle }}
          fields={[
            {
              label: t('syntheticData.syntheticResults.datasetSummary.format'),
              value: data.export_summary.format,
            },
            {
              label: t('syntheticData.syntheticResults.datasetSummary.records'),
              value: data.export_summary.records_count,
            },
            {
              label: t('syntheticData.syntheticResults.datasetSummary.fields'),
              value: data.export_summary.fields_count,
            },
          ]}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: '24px', flexDirection: { xs: 'column', md: 'row' }, mb: 4 }}>
        <Box sx={{ flex: 2, ...cardStyle, p: 0, overflowX: 'auto' }}>
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
                  count: data.preview_records.length,
                  total: data.export_summary.records_count,
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
                {[...visibleColumns, 'action'].map((col) => (
                  <TableCell
                    key={col}
                    sx={{
                      color: 'neutral.500',
                      fontSize: FONT_SIZES.sm,
                      fontWeight: 'fontWeightMedium',
                    }}
                  >
                    {col === 'action'
                      ? t('syntheticData.syntheticResults.preview.columns.action', 'Action')
                      : t(
                          `syntheticData.syntheticResults.preview.columns.${col === 'record_id' ? 'recordId' : col === 'docType' ? 'docType' : col === 'age_range' ? 'ageRange' : col}`,
                          { defaultValue: col },
                        )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.preview_records.map((row, index) => (
                <TableRow
                  key={row.record_id || index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {visibleColumns.map((colKey) => (
                    <TableCell
                      key={colKey}
                      sx={{
                        color: colKey === 'record_id' ? 'neutral.900' : 'neutral.700',
                        fontSize: FONT_SIZES.xs,
                        fontWeight: colKey === 'record_id' ? 'normal' : 'fontWeightMedium',
                      }}
                    >
                      {row[colKey] !== undefined ? row[colKey] : '—'}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Button
                      sx={{ color: 'primary.500', fontSize: FONT_SIZES.xs, p: 0 }}
                      onClick={() => {
                        setSelectedRecord(row);
                        setIsRecordDetailsDrawerOpen(true);
                      }}
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
            <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: '120px' }}>
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
                    mb: 0.5,
                  }}
                >
                  {text}
                </Typography>
              ))}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {[
                data.compliance.framework,
                t(`common.${data.compliance.risk_level.toLowerCase()}`, {
                  defaultValue: data.compliance.risk_level,
                }),
                t('syntheticData.syntheticResults.validation.safeToDownload'),
              ].map((text, i) => (
                <Typography key={i} sx={{ fontSize: FONT_SIZES.sm, color: 'neutral.500', mb: 0.5 }}>
                  {text}
                </Typography>
              ))}
            </Box>
          </Box>

          <Box sx={{ height: '1px', width: '100%', my: '17px', bgcolor: 'neutral.200' }}></Box>

          {validationChecks.map((check) => (
            <Box
              key={check.key}
              sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '4px' }}
            >
              <CheckIcon
                sx={{ color: check.checked ? 'success.main' : 'neutral.300' }}
                fontSize="small"
              />
              <Typography sx={{ color: 'neutral.500', fontSize: FONT_SIZES.sm }}>
                {t(`syntheticData.syntheticResults.validation.checks.${check.key}`)}
              </Typography>
            </Box>
          ))}

          <Box sx={{ height: '1px', width: '100%', my: '17px', bgcolor: 'neutral.200' }}></Box>

          {data.data_quality.warnings.length > 0 && (
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
                {t('syntheticData.syntheticResults.validation.warningReview', {
                  count: data.data_quality.warnings.length,
                })}
              </Typography>
            </Box>
          )}

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
          zIndex: 1,
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
        data={data}
      />
      <RecordDetailsDrawer
        drawerOpen={isRecordDetailsDrawerOpen}
        setDrawerOpen={setIsRecordDetailsDrawerOpen}
        record={selectedRecord}
        complianceChecks={data.compliance_validation_checks}
      />
      <CustomizeColumnsDrawer
        drawerOpen={isCustomizeColumnsDrawerOpen}
        setDrawerOpen={setIsCustomizeColumnsDrawerOpen}
        selectedColumns={visibleColumns}
        onApplyColumns={(updatedColumns) => setVisibleColumns(updatedColumns)}
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
        data={data}
      />
    </Box>
  );
};

export default SyntheticResults;

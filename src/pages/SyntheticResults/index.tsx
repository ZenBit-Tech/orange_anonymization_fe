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

const SyntheticResults = () => {
  const [isValidationDetailsDrawerOpen, setIsValidationDetailsDrawerOpen] = useState(false);
  const [isRecordDetailsDrawerOpen, setIsRecordDetailsDrawerOpen] = useState(false);
  const [isCustomizeColumnsDrawerOpen, setIsCustomizeColumnsDrawerOpen] = useState(false);
  const [isRegeneratePopupOpen, setIsRegeneratePopupOpen] = useState(false);
  const [isDownloadPopupOpen, setIsDownloadPopupOpen] = useState(false);

  function createData(
    record_id: string,
    docType: string,
    ageRange: string,
    date: string,
    quality: string,
  ) {
    return { record_id, docType, ageRange, date, quality };
  }

  const rows = [
    createData('SYN-00041', 'Dischrge sum...', '55-64', '2026-04-01', 'Good'),
    createData('SYN-00042', 'Progress Note', '34-37', '2026-04-05', 'Fair'),
    createData('SYN-00043', 'Consultation', '23-34', '2026-04-04', 'Good'),
    createData('SYN-00044', 'Operative', '20-45', '2026-04-15', 'Good'),
    createData('SYN-00045', 'Operative report', '30-35', '2026-04-30', 'Good'),
    createData('SYN-00046', 'Radiology', '30-40', '2026-04-30', 'Good'),
    createData('SYN-00047', 'RadiClinical Not...', '39-40', '2026-04-29', 'Good'),
    createData('SYN-00048', 'Consultation No...', '18-23', '2026-05-01', 'Good'),
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
          <Box
            sx={{
              width: '100%',
              bgcolor: 'common.white',
              p: '16px',
              borderRadius: '8px',
              border: '1px solid',
              borderColor: 'neutral.200',
              boxShadow: (theme) => `0px 1px 3px 0px ${alpha(theme.palette.common.black, 0.14)}`,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'neutral.700' }}>
              <SvgIcon component={ComplienceIcon} inheritViewBox />

              <Typography
                sx={{
                  fontSize: FONT_SIZES.sm,
                  fontWeight: 'fontWeightMedium',
                  textTransform: 'uppercase',
                }}
              >
                Compliance
              </Typography>
            </Box>

            <Box sx={{ height: '1px', width: '100%', bgcolor: 'success.main', my: '12px' }}></Box>

            <Box sx={{ display: 'flex', gap: '8px' }}>
              <Box>
                <Typography
                  sx={{
                    fontWeight: 'fontWeightMedium',
                    fontSize: FONT_SIZES.sm,
                    color: 'neutral.700',
                  }}
                >
                  Framework:
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 'fontWeightMedium',
                    fontSize: FONT_SIZES.sm,
                    color: 'neutral.700',
                  }}
                >
                  Risk level:
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 'fontWeightMedium',
                    fontSize: FONT_SIZES.sm,
                    color: 'neutral.700',
                  }}
                >
                  Direct identifiers:
                </Typography>
              </Box>

              <Box>
                <Typography sx={{ fontSize: FONT_SIZES.sm, color: 'neutral.700' }}>
                  HIPAA SH
                </Typography>
                <Typography sx={{ fontSize: FONT_SIZES.sm, color: 'neutral.700' }}>Low</Typography>
                <Typography sx={{ fontSize: FONT_SIZES.sm, color: 'neutral.700' }}>Low</Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              width: '100%',
              bgcolor: 'common.white',
              p: '16px',
              borderRadius: '8px',
              border: '1px solid',
              borderColor: 'neutral.200',
              boxShadow: (theme) => `0px 1px 3px 0px ${alpha(theme.palette.common.black, 0.14)}`,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'neutral.700' }}>
              <SvgIcon component={FinanceIcon} inheritViewBox />

              <Typography
                sx={{
                  fontSize: FONT_SIZES.sm,
                  fontWeight: 'fontWeightMedium',
                  textTransform: 'uppercase',
                }}
              >
                Data Quality
              </Typography>
            </Box>

            <Box sx={{ height: '1px', width: '100%', bgcolor: 'success.main', my: '12px' }}></Box>

            <Box sx={{ display: 'flex', gap: '8px' }}>
              <Box>
                <Typography
                  sx={{
                    fontWeight: 'fontWeightMedium',
                    fontSize: FONT_SIZES.sm,
                    color: 'neutral.700',
                  }}
                >
                  Quality:
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 'fontWeightMedium',
                    fontSize: FONT_SIZES.sm,
                    color: 'neutral.700',
                  }}
                >
                  Consistency:
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 'fontWeightMedium',
                    fontSize: FONT_SIZES.sm,
                    color: 'neutral.700',
                  }}
                >
                  Warnings:
                </Typography>
              </Box>

              <Box>
                <Typography sx={{ fontSize: FONT_SIZES.sm, color: 'neutral.700' }}>Good</Typography>
                <Typography sx={{ fontSize: FONT_SIZES.sm, color: 'neutral.700' }}>High</Typography>
                <Box
                  sx={{
                    bgcolor: (theme) =>
                      alpha(theme.palette.warning[100] || theme.palette.common.white, 0.3),
                    borderRadius: '99px',
                    display: 'flex',
                    gap: '4px',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '4px',
                      bgcolor: 'warning.main',
                    }}
                  ></Box>
                  <Typography sx={{ fontSize: FONT_SIZES.sm, color: 'warning.main' }}>
                    3 low-confidence
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              width: '100%',
              bgcolor: 'common.white',
              p: '16px',
              borderRadius: '8px',
              border: '1px solid',
              borderColor: 'neutral.200',
              boxShadow: (theme) => `0px 1px 3px 0px ${alpha(theme.palette.common.black, 0.14)}`,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'neutral.700' }}>
              <ArrowCircleDownIcon />

              <Typography
                sx={{
                  fontSize: FONT_SIZES.sm,
                  fontWeight: 'fontWeightMedium',
                  textTransform: 'uppercase',
                }}
              >
                Export
              </Typography>
            </Box>

            <Box sx={{ height: '1px', width: '100%', bgcolor: 'success.main', my: '12px' }}></Box>

            <Box sx={{ display: 'flex', gap: '8px' }}>
              <Box>
                <Box
                  sx={{
                    fontSize: FONT_SIZES.sm,
                    color: 'neutral.700',
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center',
                    mb: '4px',
                  }}
                >
                  <ArrowCircleDownIcon />
                  Ready to download
                </Box>

                <Box
                  sx={{
                    fontSize: FONT_SIZES.sm,
                    color: 'neutral.700',
                    display: 'flex',
                    gap: '8px',
                  }}
                >
                  <CheckCircleOutlinedIcon sx={{ color: 'success.main' }} />
                  Session only — download before leaving
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            flex: 1,
            width: '100%',
            bgcolor: 'common.white',
            p: '16px',
            borderRadius: '8px',
            border: '1px solid',
            borderColor: 'neutral.200',
            boxShadow: (theme) => `0px 1px 3px 0px ${alpha(theme.palette.common.black, 0.14)}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'neutral.700' }}>
            <SvgIcon component={TableChartIcon} inheritViewBox />

            <Typography
              sx={{
                fontSize: FONT_SIZES.sm,
                fontWeight: 'fontWeightMedium',
                textTransform: 'uppercase',
              }}
            >
              Dataset Summary
            </Typography>
          </Box>

          <Box sx={{ height: '1px', width: '100%', bgcolor: 'success.main', my: '12px' }}></Box>

          <Box sx={{ display: 'flex', gap: '8px' }}>
            <Box>
              <Typography
                sx={{
                  fontWeight: 'fontWeightMedium',
                  fontSize: FONT_SIZES.sm,
                  color: 'neutral.700',
                }}
              >
                Format:
              </Typography>
              <Typography
                sx={{
                  fontWeight: 'fontWeightMedium',
                  fontSize: FONT_SIZES.sm,
                  color: 'neutral.700',
                }}
              >
                Records:
              </Typography>
              <Typography
                sx={{
                  fontWeight: 'fontWeightMedium',
                  fontSize: FONT_SIZES.sm,
                  color: 'neutral.700',
                }}
              >
                Fields:
              </Typography>
            </Box>

            <Box>
              <Typography sx={{ fontSize: FONT_SIZES.sm, color: 'neutral.700' }}>CSV</Typography>
              <Typography sx={{ fontSize: FONT_SIZES.sm, color: 'neutral.700' }}>1,000</Typography>
              <Typography sx={{ fontSize: FONT_SIZES.sm, color: 'neutral.700' }}>24</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: '24px', flexDirection: { xs: 'column', md: 'row' }, mb: 4 }}>
        <Box
          sx={{
            flex: 2,
            width: '100%',
            borderRadius: '8px',
            bgcolor: 'white',
            border: '1px solid',
            borderColor: 'neutral.200',
            boxShadow: (theme) => `0px 1px 3px 0px ${alpha(theme.palette.common.black, 0.14)}`,
          }}
        >
          <Box sx={{ p: '16px', display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Typography
                sx={{
                  fontSize: FONT_SIZES.sm,
                  fontWeight: 'fontWeightSemiBold',
                  color: 'neutral.900',
                }}
              >
                Preview Records
              </Typography>
              <Typography sx={{ fontSize: FONT_SIZES.sm, color: 'neutral.500' }}>
                Showing 8 of 1,000 records
              </Typography>
            </Box>

            <Button
              sx={{ color: 'primary.500' }}
              startIcon={<SettingsIcon />}
              onClick={() => setIsCustomizeColumnsDrawerOpen(true)}
            >
              Columns
            </Button>
          </Box>

          <Table size="small" aria-label="a dense table">
            <TableHead sx={{ bgcolor: 'neutral.50' }}>
              <TableRow>
                <TableCell
                  sx={{
                    color: 'neutral.500',
                    fontSize: FONT_SIZES.sm,
                    fontWeight: 'fontWeightMedium',
                  }}
                >
                  Record_ID
                </TableCell>
                <TableCell
                  sx={{
                    color: 'neutral.500',
                    fontSize: FONT_SIZES.sm,
                    fontWeight: 'fontWeightMedium',
                  }}
                >
                  Doc Type
                </TableCell>
                <TableCell
                  sx={{
                    color: 'neutral.500',
                    fontSize: FONT_SIZES.sm,
                    fontWeight: 'fontWeightMedium',
                  }}
                >
                  Age Range
                </TableCell>
                <TableCell
                  sx={{
                    color: 'neutral.500',
                    fontSize: FONT_SIZES.sm,
                    fontWeight: 'fontWeightMedium',
                  }}
                >
                  Date
                </TableCell>
                <TableCell
                  sx={{
                    color: 'neutral.500',
                    fontSize: FONT_SIZES.sm,
                    fontWeight: 'fontWeightMedium',
                  }}
                >
                  Quality
                </TableCell>
                <TableCell
                  sx={{
                    color: 'neutral.500',
                    fontSize: FONT_SIZES.sm,
                    fontWeight: 'fontWeightMedium',
                  }}
                >
                  Action
                </TableCell>
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
                  <TableCell
                    sx={{
                      color: 'primary.500',
                      fontSize: FONT_SIZES.xs,
                      fontWeight: 'fontWeightMedium',
                    }}
                  >
                    <Button
                      sx={{ color: 'primary.500' }}
                      onClick={() => setIsRecordDetailsDrawerOpen(true)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        <Box
          sx={{
            flex: 1,
            width: '100%',
            bgcolor: 'common.white',
            p: '16px',
            borderRadius: '8px',
            border: '1px solid',
            borderColor: 'neutral.200',
            boxShadow: (theme) => `0px 1px 3px 0px ${alpha(theme.palette.common.black, 0.14)}`,
          }}
        >
          <Typography
            sx={{
              color: 'neutral.900',
              fontSize: FONT_SIZES.lg,
              fontWeight: 'fontWeightSemiBold',
              mb: '17px',
            }}
          >
            Compliance Validation
          </Typography>

          <Box sx={{ display: 'flex', gap: '8px' }}>
            <Box>
              <Typography
                sx={{
                  fontWeight: 'fontWeightMedium',
                  fontSize: FONT_SIZES.sm,
                  color: 'primary.700',
                }}
              >
                Framework:
              </Typography>
              <Typography
                sx={{
                  fontWeight: 'fontWeightMedium',
                  fontSize: FONT_SIZES.sm,
                  color: 'primary.700',
                }}
              >
                Risk level:
              </Typography>
              <Typography
                sx={{
                  fontWeight: 'fontWeightMedium',
                  fontSize: FONT_SIZES.sm,
                  color: 'primary.700',
                }}
              >
                Export status:
              </Typography>
            </Box>

            <Box>
              <Typography sx={{ fontSize: FONT_SIZES.sm, color: 'neutral.500' }}>
                HIPAA Safe Harbor
              </Typography>
              <Typography sx={{ fontSize: FONT_SIZES.sm, color: 'neutral.500' }}>Low</Typography>
              <Typography sx={{ fontSize: FONT_SIZES.sm, color: 'neutral.500' }}>
                Safe to download
              </Typography>
            </Box>
          </Box>

          <Box sx={{ height: '1px', width: '100%', my: '17px', bgcolor: 'neutral.200' }}></Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '2px' }}>
            <CheckIcon sx={{ color: 'success.main' }} />
            <Typography sx={{ color: 'neutral.500', fontSize: FONT_SIZES.sm }}>
              Dates transformed
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '2px' }}>
            <CheckIcon sx={{ color: 'success.main' }} />
            <Typography sx={{ color: 'neutral.500', fontSize: FONT_SIZES.sm }}>
              Free-text fields checked
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '2px' }}>
            <CheckIcon sx={{ color: 'success.main' }} />
            <Typography sx={{ color: 'neutral.500', fontSize: FONT_SIZES.sm }}>
              Export format validated
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '2px' }}>
            <CheckIcon sx={{ color: 'success.main' }} />
            <Typography sx={{ color: 'neutral.500', fontSize: FONT_SIZES.sm }}>
              Synthetic identifiers generated
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '2px' }}>
            <CheckIcon sx={{ color: 'success.main' }} />
            <Typography sx={{ color: 'neutral.500', fontSize: FONT_SIZES.sm }}>
              Synthetic identifiers generated
            </Typography>
          </Box>

          <Box sx={{ height: '1px', width: '100%', my: '17px', bgcolor: 'neutral.200' }}></Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              mb: '17px',
              bgcolor: (theme) =>
                alpha(theme.palette.warning[100] || theme.palette.common.white, 0.3),
              borderRadius: '8px',
              p: '12px',
            }}
          >
            <WarningAmberIcon sx={{ color: 'warning.main' }} />
            <Typography sx={{ color: 'warning.main', fontSize: FONT_SIZES.sm }}>
              3 low-confidence fields may require review
            </Typography>
          </Box>

          <Button
            sx={{ color: 'primary.500', fontWeight: 'fontWeightMedium', fontSize: FONT_SIZES.sm }}
            endIcon={<ArrowForwardIcon />}
            onClick={() => setIsValidationDetailsDrawerOpen(true)}
          >
            View validation details
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
          Regenerate
        </Button>

        <Button
          sx={{
            color: 'common.white',
            fontWeight: 'fontWeightMedium',
            fontSize: FONT_SIZES.sm,
            bgcolor: 'primary.500',
          }}
          endIcon={<AutorenewIcon />}
          onClick={() => setIsDownloadPopupOpen(true)}
        >
          Download
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

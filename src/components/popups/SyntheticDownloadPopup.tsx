import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FONT_SIZES } from '@/constants';
import {
  alpha,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import {
  Close as CloseIcon,
  ArrowCircleDown as ArrowCircleDownIcon,
  ArrowBack as ArrowBackIcon,
  InfoOutlined as InfoOutlinedIcon,
} from '@mui/icons-material';
import BasePopup from '@/components/popups/BasePopup';

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  onDownload: () => void;
}

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.500' }}>{label}</Typography>
    <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.900' }}>{value}</Typography>
  </Box>
);

const PopupCheckbox = ({
  label,
  defaultChecked = false,
}: {
  label: string;
  defaultChecked?: boolean;
}) => (
  <FormControlLabel
    control={
      <Checkbox
        defaultChecked={defaultChecked}
        sx={{ '&.Mui-checked': { color: 'primary.500' }, color: 'neutral.400' }}
      />
    }
    label={label}
    slotProps={{
      typography: { fontSize: FONT_SIZES.xs },
    }}
  />
);

const SyntheticDownloadPopup: FC<IProps> = ({ isVisible, onClose, onDownload }) => {
  const { t } = useTranslation();

  const infoItems = [
    { labelKey: 'format', valueKey: 'syntheticData.syntheticResults.datasetSummary.formatTitle' },
    { labelKey: 'records', valueKey: 'syntheticData.syntheticResults.datasetSummary.recordsTitle' },
    { labelKey: 'fields', valueKey: 'syntheticData.syntheticResults.datasetSummary.fieldsTitle' },
    { labelKey: 'framework', valueKey: 'syntheticData.results.drawers.validationDetails.HIPAA' },
    {
      labelKey: 'validation',
      valueKey: 'syntheticData.results.drawers.recordDetails.fields.compliance',
    },
  ];

  return (
    <BasePopup isVisible={isVisible} onClose={onClose}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '8px' }}
        >
          <Typography
            variant="h3"
            component="h2"
            align="center"
            sx={{ color: 'neutral.900', fontWeight: 'fontWeightMedium' }}
          >
            {t('syntheticData.results.downloadPopup.title')}
          </Typography>

          <IconButton
            onClick={onClose}
            sx={{ color: 'neutral.500', '&:hover': { bgcolor: 'whiteOpacity.8' } }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            bgcolor: 'neutral.50',
            borderRadius: '8px',
            p: '16px',
            mb: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          {infoItems.map((item) => (
            <InfoRow
              key={item.labelKey}
              label={t(`syntheticData.results.downloadPopup.fields.${item.labelKey}`)}
              value={t(item.valueKey)}
            />
          ))}
        </Box>

        <Box
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            px: '16px',
            py: '12px',
            mb: '20px',
            borderRadius: '8px',
            border: '1px solid',
            borderColor: 'info.main',
            bgcolor: alpha(theme.palette.info.light, 0.3),
            boxShadow: `0px 1px 3px 0px ${alpha(theme.palette.common.black, 0.14)}`,
          })}
        >
          <InfoOutlinedIcon sx={{ color: 'info.main' }} />
          <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'info.main' }}>
            {t('syntheticData.results.downloadPopup.info')}
          </Typography>
        </Box>

        <FormGroup
          sx={{
            color: 'neutral.700',
            mb: '20px',
            '& .MuiFormControlLabel-root': {
              marginBottom: '-10px',
            },
          }}
        >
          <PopupCheckbox
            label={t('syntheticData.results.downloadPopup.includeValidation')}
            defaultChecked
          />
          <PopupCheckbox label={t('syntheticData.results.downloadPopup.includeSchema')} />
        </FormGroup>

        <Box sx={{ height: '1px', width: '100%', bgcolor: 'neutral.200', mb: '20px' }}></Box>

        <Stack direction="row" spacing={2} justifyContent="end">
          <Button
            onClick={onClose}
            variant="outlined"
            color="inherit"
            sx={{
              color: 'neutral.700',
              borderColor: 'whiteOpacity.8',
              fontWeight: 'fontWeightMedium',
            }}
            startIcon={<ArrowBackIcon />}
          >
            {t('common.cancel')}
          </Button>

          <Button
            onClick={onDownload}
            sx={{
              color: 'common.white',
              bgcolor: 'primary.500',
              fontWeight: 'fontWeightMedium',
              '&:hover': { bgcolor: 'primary.600' },
            }}
            startIcon={<ArrowCircleDownIcon />}
          >
            {t('common.download')}
          </Button>
        </Stack>
      </Box>
    </BasePopup>
  );
};

export default SyntheticDownloadPopup;

import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import BasePopup from '@/components/popups/BasePopup';
import CloseIcon from '@mui/icons-material/Close';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const PopupContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
  padding: theme.spacing(0.5),
}));

const CloseRow = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
});

const CloseButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.neutral[500],
  '&:hover': {
    backgroundColor: theme.palette.whiteOpacity[8],
  },
}));

const WarningIcon = styled(WarningAmberIcon)(({ theme }) => ({
  color: theme.palette.warning.main,
  marginLeft: 'auto',
  marginRight: 'auto',
  height: theme.spacing(4.75),
  width: theme.spacing(5.5),
  marginBottom: theme.spacing(3.75),
}));

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.neutral[900],
  fontWeight: theme.typography.fontWeightMedium,
  marginBottom: theme.spacing(1),
  textAlign: 'center',
}));

const DescriptionBlock = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const Description = styled(Typography)(({ theme }) => ({
  color: theme.palette.neutral[500],
  textAlign: 'center',
}));

const Divider = styled(Box)(({ theme }) => ({
  height: 1,
  width: '100%',
  backgroundColor: theme.palette.neutral[500],
  marginBottom: theme.spacing(3),
}));

const ButtonRow = styled(Stack)({
  justifyContent: 'center',
});

const CancelButton = styled(Button)(({ theme }) => ({
  color: theme.palette.neutral[700],
  borderColor: theme.palette.whiteOpacity[8],
  fontWeight: theme.typography.fontWeightMedium,
}));

const ConfirmButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary[500],
  fontWeight: theme.typography.fontWeightMedium,
  '&:hover': {
    opacity: 0.8,
    backgroundColor: theme.palette.primary[500],
  },
}));

const ReplaceTextPopup: FC<IProps> = ({ isVisible, onClose, onConfirm }) => {
  const { t } = useTranslation();

  return (
    <BasePopup isVisible={isVisible} onClose={onClose}>
      <PopupContent>
        <CloseRow>
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </CloseRow>

        <WarningIcon />

        <Title variant="h3">{t('deIdentify.input.replaceDialog.title')}</Title>

        <DescriptionBlock>
          <Description variant="body2">{t('deIdentify.input.replaceDialog.message')}</Description>
          <Description variant="body2">
            {t('deIdentify.input.replaceDialog.reassurance')}
          </Description>
        </DescriptionBlock>

        <Divider />

        <ButtonRow direction="row" spacing={2}>
          <CancelButton
            onClick={onClose}
            variant="outlined"
            color="inherit"
            startIcon={<ArrowBackIcon />}
          >
            {t('deIdentify.input.replaceDialog.cancel')}
          </CancelButton>

          <ConfirmButton onClick={onConfirm} endIcon={<ArrowForwardIcon />}>
            {t('deIdentify.input.replaceDialog.confirm')}
          </ConfirmButton>
        </ButtonRow>
      </PopupContent>
    </BasePopup>
  );
};

export default ReplaceTextPopup;

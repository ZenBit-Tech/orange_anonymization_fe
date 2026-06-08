import React from 'react';

import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { useTranslation } from 'react-i18next';

import { ExportButton, ExportButtonText } from './styled';

interface ExportCsvButtonProps {
  onClick: () => void;
}

export const ExportCsvButton: React.FC<ExportCsvButtonProps> = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <ExportButton onClick={onClick}>
      <ArrowCircleDownIcon />
      <ExportButtonText>{t('dashboard.analyses.exportCsv')}</ExportButtonText>
    </ExportButton>
  );
};

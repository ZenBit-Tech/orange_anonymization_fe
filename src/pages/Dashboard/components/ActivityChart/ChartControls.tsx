import React from 'react';

import { useTranslation } from 'react-i18next';

import { ControlLabel, ControlRadio, ControlsGroup } from './styled';
import { CHART_TYPES, type ChartType } from './types';

interface ChartControlsProps {
  chartType: ChartType;
  setChartType: (value: ChartType) => void;
}

export const ChartControls: React.FC<ChartControlsProps> = ({ chartType, setChartType }) => {
  const { t } = useTranslation();

  return (
    <ControlsGroup
      value={chartType}
      onChange={(event) => setChartType(event.target.value as ChartType)}
    >
      <ControlLabel
        value={CHART_TYPES.DOCUMENTS}
        control={<ControlRadio />}
        label={t('dashboard.chart.documents')}
      />

      <ControlLabel
        value={CHART_TYPES.ENTITIES}
        control={<ControlRadio />}
        label={t('dashboard.chart.entities')}
      />
    </ControlsGroup>
  );
};

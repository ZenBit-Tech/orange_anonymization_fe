import React from 'react';

import { AnalysesTable } from '@/features/analyses/components/AnalysesTable';

import { AnalysesCard, PageWrapper } from './styled';

import { useAnalyses } from './useAnalyses';

const Analyses: React.FC = () => {
  const { rows } = useAnalyses();

  return (
    <PageWrapper>
      <AnalysesCard>
        <AnalysesTable rows={rows} />
      </AnalysesCard>
    </PageWrapper>
  );
};

export default Analyses;

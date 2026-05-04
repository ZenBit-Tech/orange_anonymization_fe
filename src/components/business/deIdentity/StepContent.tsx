import type { FC } from 'react';
import Compliance from './Compliance';
import DataInput from './DataInput';
import Configuration from './Configuration';
import ReviewAndRun from './ReviewAndRun';
import { useAppSelector } from '@/store/store';

interface IProps {
  step: number;
  jobId: string;
}

export const StepContent: FC<IProps> = ({ step, jobId }) => {
  const { currentJob } = useAppSelector((state) => state.jobs);
  const localOriginalText = useAppSelector(
    (state) => state.jobs.localOriginalTexts[currentJob?.id as string],
  );

  switch (step) {
    case 0:
      return <Compliance />;
    case 1:
      return (
        <DataInput
          key={currentJob?.id ?? 'no-job'}
          currentJob={currentJob}
          localOriginalText={localOriginalText}
        />
      );
    case 2:
      return <Configuration />;
    case 3:
      return <ReviewAndRun jobId={jobId} />;
    default:
      return null;
  }
};

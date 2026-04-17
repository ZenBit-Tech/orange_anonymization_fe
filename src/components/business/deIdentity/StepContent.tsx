import type { FC } from 'react';
import Compliance from './Compliance';
import DataInput from './DataInput';
import Configuration from './Configuration';

interface IProps {
  step: number;
}

export const StepContent: FC<IProps> = ({ step }) => {
  switch (step) {
    case 0:
      return <Compliance />;
    case 1:
      return <DataInput />;
    case 2:
      return <Configuration />;
    default:
      return 'Unknown step';
  }
};

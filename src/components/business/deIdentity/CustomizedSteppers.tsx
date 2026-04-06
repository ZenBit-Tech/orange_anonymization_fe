import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  Stack,
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
  Typography,
  StepConnector,
  stepConnectorClasses,
} from '@mui/material';
import {
  Check as CheckIcon,
  ArrowCircleUp as ArrowCircleUpIcon,
  Tune as TuneIcon,
  PostAdd as PostAddIcon,
} from '@mui/icons-material';
import { type StepIconProps } from '@mui/material/StepIcon';
import { StepContent } from './StepContent';

// --- СТИЛІЗОВАНІ КОМПОНЕНТИ (Colorlib) ---

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: theme.palette.gradients.primaryAccent,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: theme.palette.gradients.primaryAccent,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.divider,
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.neutral[300],
  zIndex: 1,
  color: theme.palette.accent[400],
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundColor: theme.palette.primary[500],
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundColor: theme.palette.primary[500],
  }),
  ...(!ownerState.active &&
    !ownerState.completed && {
      color: theme.palette.common.white,
    }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className, icon } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <PostAddIcon />,
    2: <ArrowCircleUpIcon />,
    3: <TuneIcon />,
    4: <CheckIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {completed ? <CheckIcon /> : icons[String(icon)]}
    </ColorlibStepIconRoot>
  );
}

// --- КОНТЕНТ ДЛЯ КРОКІВ ---

const steps = ['Compliance', 'Data Input', 'Configuration', 'Review & Run'];

// --- MAIN COMPONENT ---

export default function CustomizedSteppers() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Stack sx={{ width: '100%', height: '100%' }} spacing={4}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 2, mb: 1, minHeight: '100px' }}>
        {activeStep === steps.length ? (
          <Box sx={{ textAlign: 'center', p: 3 }}>
            <Typography sx={{ mb: 2 }}>Всі кроки завершені!</Typography>
            <Button variant="contained" onClick={handleReset}>
              Скинути
            </Button>
          </Box>
        ) : (
          <Box>
            <StepContent step={activeStep} />

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Назад
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{
                  background: (theme) => theme.palette.gradients.primaryAccent,
                  '&:hover': { opacity: 0.9 },
                }}
              >
                {activeStep === steps.length - 1 ? 'Завершити' : 'Далі'}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Stack>
  );
}

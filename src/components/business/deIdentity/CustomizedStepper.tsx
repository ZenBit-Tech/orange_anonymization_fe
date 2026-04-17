import { useEffect, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import {
  Stack,
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
  StepConnector,
  stepConnectorClasses,
} from '@mui/material';
import {
  Check as CheckIcon,
  Tune as TuneIcon,
  PostAdd as PostAddIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { type StepIconProps } from '@mui/material/StepIcon';
import { StepContent } from './StepContent';
import DataInputIcon from '@/assets/icons/dataInputIcon.svg?react';
import PreviewIcon from '@/assets/icons/preview.svg?react';
import ReviewAndRun from './ReviewAndRun';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { jobsService } from '@/services/jobsService';
import { setJobAC } from '@/store/slices/jobsSlice';
import type { IJob } from '@/pages/DeIdentify/types';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 30,
    left: 'calc(-50% + 20px)',
    right: 'calc(50% + 20px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.primary[500],
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.primary[500],
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.divider,
    borderRadius: 1,
    margin: '0 30px',
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  zIndex: 1,
  color: theme.palette.accent[400],
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active
    ? {
        backgroundColor: theme.palette.primary[500],
        width: 60,
        height: 60,
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
      }
    : {
        margin: 14,
        backgroundColor: theme.palette.neutral[300],
        width: 36,
        height: 36,
      }),
  ...(ownerState.completed && {
    backgroundColor: theme.palette.primary[500],
    color: theme.palette.common.white,
    ...(!ownerState.active && { margin: 14 }),
  }),
  ...(!ownerState.active &&
    !ownerState.completed && {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.neutral[400],
    }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className, icon } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <PostAddIcon />,
    2: <DataInputIcon />,
    3: <TuneIcon />,
    4: <PreviewIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {completed ? <CheckIcon /> : icons[String(icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = ['Compliance', 'Data Input', 'Configuration', 'Review & Run'];

export default function CustomizedSteppers() {
  const { currentJob } = useAppSelector((state) => state.jobs);

  const activeStep = useMemo(() => (currentJob?.wizardState?.currentStep ?? 1) - 1, [currentJob]);
  const selectedFramework = useMemo(
    () => currentJob?.wizardState?.frameworkSelection ?? null,
    [currentJob],
  );
  const text = useMemo(() => currentJob?.originalText, [currentJob]);

  const dispatch = useAppDispatch();

  const createJob = async () => {
    const response = await jobsService.createJob();
    dispatch(setJobAC(response));
  };

  const getLatestDraft = async () => {
    const response = await jobsService.getLatestDraft();

    if (!response) {
      createJob();
    } else {
      dispatch(setJobAC(response));
    }
  };

  useEffect(() => {
    getLatestDraft();
  }, []);

  const updateJob = async (jobId: string, updateData: Partial<IJob>) => {
    const response = await jobsService.updateJob(jobId, updateData);
    dispatch(setJobAC(response));
  };

  const handleNext = async () => {
    const data: Partial<IJob> = {
      wizardState: {
        currentStep: activeStep + 2,
        frameworkSelection: currentJob?.wizardState?.frameworkSelection || null,
        inputData: currentJob?.wizardState?.inputData || null,
        configSettings: currentJob?.wizardState?.configSettings || {},
      },
    };
    updateJob(currentJob?.id as string, data);
  };

  const handleBack = () => {
    const data: Partial<IJob> = {
      wizardState: {
        currentStep: activeStep,
        frameworkSelection: currentJob?.wizardState?.frameworkSelection || null,
        inputData: currentJob?.wizardState?.inputData || null,
        configSettings: currentJob?.wizardState?.configSettings || {},
      },
    };
    updateJob(currentJob?.id as string, data);
  };

  const handleReset = () => {
    const data: Partial<IJob> = {
      wizardState: {
        currentStep: 1,
        frameworkSelection: null,
        inputData: null,
        configSettings: {},
      },
    };
    updateJob(currentJob?.id as string, data);
  };

  return (
    <Stack
      sx={{
        width: '100%',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
      }}
      spacing={4}
    >
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
        sx={{
          flexShrink: 0,
          '& .MuiStepLabel-label': {
            color: 'neutral.400',
            mt: 1,
            fontWeight: 600,
            fontSize: '14px',
          },
          '& .MuiStepLabel-label.Mui-active': {
            color: 'primary.500',
            fontWeight: 600,
            fontSize: '16px',
          },
          '& .MuiStepLabel-label.Mui-completed': {
            color: 'primary.500',
            fontWeight: 600,
            fontSize: '14px',
          },
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box
        sx={{
          mt: 2,
          mb: 1,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {activeStep === steps.length ? (
          <ReviewAndRun onReset={handleReset} />
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              height: '100%',
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <StepContent step={activeStep} />
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                mt: 'auto',
                zIndex: 10,
              }}
            >
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1, color: (theme) => theme.palette.neutral[700] }}
                startIcon={<ArrowBackIcon />}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button
                variant="contained"
                disabled={
                  (activeStep === 0 && !selectedFramework) ||
                  (activeStep === 1 && (!text || text.length < 50 || text.length > 5000))
                }
                onClick={handleNext}
                sx={{
                  background: (theme) => theme.palette.primary[500],
                  '&:hover': { opacity: 0.9 },
                }}
                endIcon={activeStep === steps.length - 1 ? null : <ArrowForwardIcon />}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Continue'}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Stack>
  );
}

import type { HIPAAMethod, IJob } from '@/pages/DeIdentify/types';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Box, Grid, Typography } from '@mui/material';
import {
  RadioButtonCheckedOutlined as RadioButtonCheckedOutlinedIcon,
  RadioButtonUncheckedOutlined as RadioButtonUncheckedOutlinedIcon,
  ReportProblemOutlined as ReportProblemOutlinedIcon,
} from '@mui/icons-material';
import { setJobAC } from '@/store/slices/jobsSlice';
import { jobsService } from '@/services/jobsService';

const HIPAAMethods: HIPAAMethod[] = [
  {
    id: 1,
    title: 'Safe Harbor',
    description: 'Automatically removes all 18 HIPAA identifiers',
    comment: 'Best for standard HIPAA workflows',
  },
  {
    id: 2,
    title: 'Expert Determination',
    description: 'Customize which identifiers to remove',
    comment: 'Requires expert validation before use',
  },
];

const HIPAAConfiguration = () => {
  const { currentJob } = useAppSelector((state) => state.jobs);
  const dispatch = useAppDispatch();

  const updateJob = async (jobId: string, updateData: Partial<IJob>) => {
    const response = await jobsService.updateJob(jobId, updateData);
    dispatch(setJobAC(response));
  };

  const selectMethod = async (method: HIPAAMethod) => {
    if (!currentJob?.wizardState) return;

    const data: Partial<IJob> = {
      wizardState: {
        ...currentJob?.wizardState,
        configSettings: {
          ...currentJob?.wizardState?.configSettings,
          method: method.title,
        },
      },
    };
    await updateJob(currentJob?.id as string, data);
  };

  return (
    <Box>
      <Typography sx={{ color: 'neutral.400', mb: '10px' }}>1. De-Identification Method</Typography>
      <Grid container spacing={2}>
        {HIPAAMethods.map((method) => {
          const isActive = currentJob?.wizardState?.configSettings.method === method.title;

          return (
            <Grid size={{ xs: 12, md: 6 }} key={method.id}>
              <Box
                onClick={() => selectMethod(method)}
                sx={{
                  border: `${isActive ? 2 : 1}px solid`,
                  borderColor: `${isActive ? 'primary.500' : 'neutral.200'}`,
                  borderRadius: '12px',
                  backgroundColor: `${isActive ? 'primary.50' : 'common.white'}`,
                  boxShadow: '0px 1px 3px 0px #00000014',
                  padding: '20px',
                  cursor: 'pointer',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
              >
                <Box
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: '24px' }}>
                    {isActive ? (
                      <RadioButtonCheckedOutlinedIcon />
                    ) : (
                      <RadioButtonUncheckedOutlinedIcon sx={{ color: 'neutral.400' }} />
                    )}
                    <Typography sx={{ color: 'primary.500', fontWeight: 600, fontSize: '18px' }}>
                      {method.title}
                    </Typography>
                  </Box>
                  {method.id === 1 && (
                    <Box
                      sx={{
                        padding: '4px 12px',
                        borderRadius: '999px',
                        bgcolor: '#00BFA526',
                        color: 'accent.500',
                        border: '1px solid',
                        borderColor: 'accent.500',
                      }}
                    >
                      Recommended
                    </Box>
                  )}
                </Box>
                <Typography sx={{ color: 'neutral.700', fontSize: '16px' }}>
                  {method.description}
                </Typography>
                {method?.id === 1 ? (
                  <Typography sx={{ color: 'neutral.500', fontSize: '14px' }}>
                    {method.comment}
                  </Typography>
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'warning.main',
                    }}
                  >
                    <ReportProblemOutlinedIcon sx={{ width: '16px', height: '16px' }} />
                    <Typography sx={{ fontSize: '14px' }}>{method.comment}</Typography>
                  </Box>
                )}
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default HIPAAConfiguration;

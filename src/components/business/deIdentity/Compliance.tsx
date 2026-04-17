import { Box, Grid, Typography } from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/store/store';
import type { IComplianceFramework, IJob, WizardState } from '@/pages/DeIdentify/types';
import { jobsService } from '@/services/jobsService';
import { setJobAC } from '@/store/slices/jobsSlice';

const complianceFrameworks: IComplianceFramework[] = [
  {
    id: 1,
    slug: 'hipaa',
    title: 'HIPAA',
    description: 'Safe Harbor / Expert Determination',
    tag: 'US Healthcare',
  },
  {
    id: 2,
    slug: 'eu-gdpr',
    title: 'EU GDPR',
    description: 'General Data Protection Regulation',
    tag: 'European Union',
  },
  {
    id: 3,
    slug: 'uk-gdpr',
    title: 'UK GDPR',
    description: 'UK General Data Protection Regulation',
    tag: 'United Kingdom',
  },
  {
    id: 4,
    slug: 'swiss-fadp',
    title: 'Swiss FADP',
    description: 'Federal Act on Data Protection',
    tag: 'Switzerland',
  },
];

const Compliance = () => {
  const { currentJob } = useAppSelector((state) => state.jobs);
  const dispatch = useAppDispatch();

  const updateJob = async (jobId: string, updateData: Partial<IJob>) => {
    const response = await jobsService.updateJob(jobId, updateData);
    dispatch(setJobAC(response));
  };

  const selectFramework = async (framework: IComplianceFramework) => {
    const data: Partial<IJob> = {
      framework: framework.slug,
      wizardState: {
        ...(currentJob?.wizardState as WizardState),
        frameworkSelection: framework.slug,
      },
    };
    await updateJob(currentJob?.id as string, data);
  };

  return (
    <Box sx={{ mx: '20px' }}>
      <Typography sx={{ color: 'neutral.900', fontWeight: 600, fontSize: '24px', mb: '8px' }}>
        Select Compliance Framework
      </Typography>
      <Typography sx={{ color: 'neutral.500', fontSize: '14px', mb: '48px' }}>
        Ensure all data handling meets regulatory requirements.
      </Typography>

      <Grid container spacing={2}>
        {complianceFrameworks.map((framework) => {
          const isActive = currentJob?.wizardState?.frameworkSelection === framework.slug;

          return (
            <Grid size={{ xs: 12, md: 6 }} key={framework.id}>
              <Box
                onClick={() => selectFramework(framework)}
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
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Typography sx={{ color: 'primary.500', fontWeight: 600 }}>
                    {framework.title}
                  </Typography>
                  {isActive && <CheckIcon sx={{ color: 'primary.500' }} />}
                </Box>
                <Typography sx={{ color: 'primary.500', fontSize: '12px', mb: '54px' }}>
                  {framework.description}
                </Typography>
                <Box
                  sx={{
                    display: 'inline-block',
                    backgroundColor: 'primary.50',
                    color: 'primary.500',
                    fontSize: '12px',
                    fontWeight: 500,
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: `1px solid`,
                    borderColor: `${isActive ? 'primary.300' : 'primary.500'}`,
                  }}
                >
                  {framework.tag}
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Compliance;

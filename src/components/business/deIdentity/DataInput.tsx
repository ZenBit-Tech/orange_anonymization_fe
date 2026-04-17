import Tabs, { Tab } from '@/components/UI/Tabs';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import {
  Edit as EditIcon,
  ArrowCircleUpOutlined as ArrowCircleUpOutlinedIcon,
  Close as CloseIcon,
  PriorityHigh as PriorityHighIcon,
  ArrowCircleUp as ArrowCircleUpIcon,
  Check as CheckIcon,
  ArrowUpward as ArrowUpwardIcon,
} from '@mui/icons-material';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '@/store/store';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';
import pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.mjs?url';
import { jobsService } from '@/services/jobsService';
import type { IJob, WizardState } from '@/pages/DeIdentify/types';
import { setJobAC } from '@/store/slices/jobsSlice';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const schema = yup
  .string()
  .required('This field is required')
  .min(50, 'Text must be at least 50 characters')
  .max(5000, 'Text cannot exceed 5000 characters');

const DataInput = () => {
  const [currentTab, setCurrentTab] = useState('Enter Text');
  const [error, setError] = useState<string | null>(null);
  const [isTouched, setIsTouched] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const { currentJob } = useAppSelector((state) => state.jobs);

  const [text, setText] = useState(currentJob?.originalText ?? '');

  const dispatch = useAppDispatch();

  const updateJob = async (jobId: string, updateData: Partial<IJob>) => {
    const response = await jobsService.updateJob(jobId, updateData);
    dispatch(setJobAC(response));
  };

  const validate = (value: string) => {
    try {
      schema.validateSync(value);
      setError(null);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setError(err.message);
      } else {
        setError('Unexpected error occor.');
      }
    }
  };

  const handleBlur = () => {
    setIsTouched(true);
    validate(text);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
    if (isTouched) {
      validate(value);
    }
  };

  const handleFileUpload = async (file: File) => {
    setFileError(null);

    const allowedExtensions = ['text/plain', 'application/pdf'];

    if (!allowedExtensions.includes(file.type)) {
      setFileError('Unsupported format. Please upload .txt or .pdf');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFileError('File is too large. Max size is 5 MB');
      return;
    }

    const response = await jobsService.uploadFile(currentJob?.id as string, file);
    dispatch(setJobAC(response));
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
    e.target.value = '';
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileUpload(file);
  };

  const onRemoveFile = async () => {
    const data: Partial<IJob> = {
      wizardState: {
        ...(currentJob?.wizardState as WizardState),
        inputData: null,
      },
    };
    await updateJob(currentJob?.id as string, data);
  };

  return (
    <Box sx={{ mx: '20px' }}>
      <Typography sx={{ color: 'neutral.900', fontWeight: 600, fontSize: '24px', mb: '8px' }}>
        Enter Your Data
      </Typography>
      <Typography sx={{ color: 'neutral.500', fontSize: '14px', mb: '48px' }}>
        Paste text or upload a file to anonymize
      </Typography>

      <Tabs active={currentTab} setActive={setCurrentTab}>
        <Tab name="Enter Text" icon={<EditIcon />}>
          <Box sx={{ width: '100%' }}>
            <TextField
              fullWidth
              multiline
              rows={10}
              placeholder="Paste your text here — minimum 50 characters required"
              value={text}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!error}
              helperText={error}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  backgroundColor: 'common.white',
                  padding: '16px',
                  '& fieldset': {
                    borderColor: 'neutral.200',
                  },
                },
                '& .MuiFormHelperText-root': {
                  mx: 0,
                  mt: 1,
                  fontSize: '12px',
                },
              }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0.5 }}>
              <Typography
                sx={{
                  fontSize: '12px',
                  color: text.length > 5000 ? 'error.main' : 'neutral.500',
                }}
              >
                {text.length.toLocaleString()} / 5,000 characters
              </Typography>
            </Box>
          </Box>
        </Tab>

        <Tab name="Upload File" icon={<ArrowCircleUpOutlinedIcon />}>
          <Box
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            sx={{
              width: '720px',
              minHeight: '300px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px dashed',
              borderColor: fileError
                ? 'error.main'
                : currentJob?.wizardState?.inputData?.fileName
                  ? '#16A34A99'
                  : 'neutral.300',
              borderRadius: '12px',
              backgroundColor: fileError
                ? '#DC262605'
                : currentJob?.wizardState?.inputData?.fileName
                  ? '#16A34A05'
                  : 'common.white',
              p: 3,
              marginX: 'auto',
            }}
          >
            <Box
              sx={{
                width: 46,
                height: 46,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid',
                borderColor: fileError
                  ? 'error.main'
                  : currentJob?.wizardState?.inputData?.fileName
                    ? 'success.main'
                    : 'neutral.900',
                mb: 3,
              }}
            >
              {fileError ? (
                <PriorityHighIcon sx={{ fontSize: 28, color: 'error.main' }} />
              ) : (
                <>
                  {currentJob?.wizardState?.inputData?.fileName ? (
                    <CheckIcon sx={{ fontSize: 28, color: 'success.main' }} />
                  ) : (
                    <ArrowUpwardIcon sx={{ fontSize: 28, color: 'primary.800' }} />
                  )}
                </>
              )}
            </Box>

            {!currentJob?.wizardState?.inputData?.fileName ? (
              <>
                <Typography sx={{ fontSize: '24px', fontWeight: 500, color: 'neutral.700', mb: 1 }}>
                  Upload your file
                </Typography>

                <Typography sx={{ fontSize: '16px', color: 'neutral.500', mb: 3 }}>
                  Drag & drop
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: '300px',
                    mb: 3,
                    '&::before, &::after': {
                      content: '""',
                      flex: 1,
                      borderBottom: '1px solid',
                      borderColor: 'neutral.100',
                    },
                  }}
                >
                  <Typography sx={{ px: 2, fontSize: '14px', color: 'neutral.400' }}>or</Typography>
                </Box>
              </>
            ) : (
              <>
                {fileError ? (
                  <>
                    <Typography sx={{ color: 'error.main', mb: 3 }}>{fileError}</Typography>
                  </>
                ) : (
                  <>
                    <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <Typography sx={{ color: 'neutral.900', fontSize: '16px' }}>
                        {currentJob?.wizardState?.inputData.fileName}
                      </Typography>
                      <Button sx={{ color: 'neutral.500' }} onClick={onRemoveFile}>
                        <CloseIcon />
                      </Button>
                    </Box>
                    <Typography sx={{ mb: 3, color: 'neutral.500', fontSize: '12px' }}>
                      {`${((currentJob?.wizardState?.inputData.fileSize ?? 0) / (1024 * 1024)).toFixed(1)} MB - ${currentJob?.wizardState?.inputData.fileName?.split('.').pop()?.toUpperCase()}`}
                    </Typography>
                  </>
                )}
              </>
            )}

            {!fileError ? (
              <>
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    backgroundColor: (theme) => `${theme.palette.accent?.[400]}`,
                    color: 'primary.800',
                    textTransform: 'none',
                    borderRadius: '8px',
                    px: 4,
                    py: 1,
                    fontSize: '14px',
                    fontWeight: 500,
                    boxShadow: 'none',
                    backgroundImage: 'none',
                    '&:hover': {
                      backgroundImage: 'none',
                      backgroundColor: (theme) => `${theme.palette.accent?.[500]}`,
                      boxShadow: 'none',
                    },
                  }}
                >
                  {currentJob?.wizardState?.inputData?.fileName ? 'Replace file' : 'Browse file'}
                  <input type="file" hidden accept=".txt,.pdf" onChange={onFileInputChange} />
                </Button>

                <Typography sx={{ mt: 2, fontSize: '12px', color: 'neutral.400' }}>
                  Supported formats: .txt, .pdf — max 5 MB
                </Typography>
              </>
            ) : (
              <>
                <Button
                  component="label"
                  sx={{
                    color: 'primary.800',
                    textTransform: 'none',
                    borderRadius: '8px',
                    px: 4,
                    py: 1,
                    fontSize: '14px',
                    fontWeight: 500,
                    boxShadow: 'none',
                  }}
                  endIcon={<ArrowCircleUpIcon />}
                >
                  Replace file
                  <input type="file" hidden accept=".txt,.pdf" onChange={onFileInputChange} />
                </Button>
              </>
            )}
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              mt: 1,
              width: '720px',
              marginX: 'auto',
            }}
          >
            {fileError ? (
              <Typography sx={{ fontSize: '12px', color: 'error.main' }}>{fileError}</Typography>
            ) : (
              <>
                {!currentJob?.wizardState?.inputData?.fileName && (
                  <Typography sx={{ fontSize: '12px', color: 'neutral.400' }}>
                    Upload a file to continue
                  </Typography>
                )}
              </>
            )}
          </Box>
        </Tab>
      </Tabs>
    </Box>
  );
};

export default DataInput;

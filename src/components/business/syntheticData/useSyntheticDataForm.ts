import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ComplianceFramework } from '@/pages/DeIdentify/types';
import { useTranslation } from 'react-i18next';
import type { SyntheticOutputFormat } from '@/services/synthetic/types';
import { syntheticService } from '@/services/synthetic/syntheticService';
import { useAppSelector } from '@/store/store';

const limits = {
  maxRecords: 100000,
};

export function useSyntheticDataForm(sourceJobId?: string) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { localOriginalTexts } = useAppSelector((state) => state.jobs);

  const [records, setRecords] = useState<number>(1000);
  const [framework, setFramework] = useState<string>(ComplianceFramework.HIPAA);
  const [outputFormat, setOutputFormat] = useState<SyntheticOutputFormat>('CSV');
  const [loading, setLoading] = useState<boolean>(false);
  const [previewLoading, setPreviewLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [deidentifiedPreview, setDeidentifiedPreview] = useState<string | null>(null);
  const [fullRawText, setFullRawText] = useState<string>('');

  useEffect(() => {
    let isMounted = true;

    const loadPreview = async () => {
      if (!sourceJobId) {
        setDeidentifiedPreview(null);
        setFullRawText('');
        return;
      }

      setPreviewLoading(true);
      try {
        if (!isMounted) return;

        const anonymizedText = localOriginalTexts[sourceJobId] || '';
        setFullRawText(anonymizedText.trim());

        const preview = anonymizedText
          .split(/\r?\n/)
          .map((line) => line.trim())
          .filter(Boolean)
          .slice(0, 2)
          .join('\n');

        setDeidentifiedPreview(preview || anonymizedText.trim());
      } catch (fetchError) {
        if (!isMounted) return;
        setDeidentifiedPreview(null);
        setFullRawText('');
        setError(fetchError instanceof Error ? fetchError.message : t('errors.generic'));
      } finally {
        if (isMounted) {
          setPreviewLoading(false);
        }
      }
    };

    void loadPreview();

    return () => {
      isMounted = false;
    };
  }, [sourceJobId, t]);

  const frameworks = useMemo(
    () => [
      { value: ComplianceFramework.HIPAA },
      { value: ComplianceFramework.EU_GDPR },
      { value: ComplianceFramework.SWISS_FADP },
      { value: ComplianceFramework.UK_GDPR },
    ],
    [],
  );

  const isValid = useMemo(() => {
    if (!framework) return false;
    if (!outputFormat) return false;
    if (records < 1 || records > limits.maxRecords) return false;
    if (!sourceJobId || !fullRawText) return false;
    return true;
  }, [framework, outputFormat, records, sourceJobId, fullRawText]);

  const handleSubmit = async (): Promise<void> => {
    if (!isValid) return;
    setLoading(true);
    setError(null);

    try {
      const payload = {
        raw_text: fullRawText,
        dataset_type: 'medical_records',
        num_records: records,
        compliance_framework: framework,
        output_format: outputFormat.toUpperCase() as SyntheticOutputFormat,
      };

      const response = await syntheticService.generateSyntheticData(payload);

      setSuccess(t('syntheticData.generatedSuccess'));

      setTimeout(() => {
        navigate(`/app/synthetic-data/${response.dataset_id}`);
      }, 1500);
    } catch (serviceErr: unknown) {
      const message =
        serviceErr instanceof Error
          ? serviceErr.message
          : String(serviceErr ?? t('errors.generic'));
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    records,
    framework,
    outputFormat,
    loading,
    previewLoading,
    error,
    success,
    deidentifiedPreview,
    frameworks,
    isValid,
    setRecords,
    setFramework,
    setOutputFormat,
    handleSubmit,
    setError,
    setSuccess,
  } as const;
}

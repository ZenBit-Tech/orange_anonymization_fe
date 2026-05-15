import { useEffect, useMemo, useState } from 'react';
import { ComplianceFramework } from '@/pages/DeIdentify/types';
import { syntheticDataService } from '@/services/syntheticDataService';
import { resultsService } from '@/services/resultsService';
import { useTranslation } from 'react-i18next';

type GeneratePayload = {
  records: number;
  framework: string;
  outputFormat: string;
  useDeidentifiedSource?: boolean;
  sourceJobId?: string;
  sourceText?: string;
};

const limits = {
  maxRecords: 1000000,
};

export function useSyntheticDataForm(sourceJobId?: string) {
  const { t } = useTranslation();
  const [records, setRecords] = useState<number>(1000);
  const [framework, setFramework] = useState<string>(ComplianceFramework.HIPAA);
  const [outputFormat, setOutputFormat] = useState<string>('csv');
  const [loading, setLoading] = useState<boolean>(false);
  const [previewLoading, setPreviewLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [deidentifiedPreview, setDeidentifiedPreview] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadPreview = async () => {
      if (!sourceJobId) {
        setDeidentifiedPreview(null);
        return;
      }

      setPreviewLoading(true);
      try {
        const response = await resultsService.getResults(sourceJobId);
        if (!isMounted) return;

        const preview = response.mainContent.anonymizedText
          .split(/\r?\n/)
          .map((line) => line.trim())
          .filter(Boolean)
          .slice(0, 2)
          .join('\n');

        setDeidentifiedPreview(preview || response.mainContent.anonymizedText.trim());
      } catch (fetchError) {
        if (!isMounted) return;
        setDeidentifiedPreview(null);
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
      {
        value: ComplianceFramework.HIPAA,
        label: 'HIPAA',
        desc: 'Removes all 18 HIPAA identifiers (Safe Harbor)',
      },
      {
        value: ComplianceFramework.EU_GDPR,
        label: 'EU GDPR',
        desc: 'Applies GDPR risk-based anonymisation rules',
      },
      {
        value: ComplianceFramework.SWISS_FADP,
        label: 'Swiss FADP',
        desc: 'Applies Swiss data protection rules (nDSG)',
      },
      {
        value: ComplianceFramework.UK_GDPR,
        label: 'UK DPI',
        desc: 'Applies UK GDPR anonymisation requirements',
      },
    ],
    [],
  );

  const isValid = useMemo(() => {
    if (!framework) return false;
    if (!outputFormat) return false;
    if (records < 1 || records > limits.maxRecords) return false;
    if (!sourceJobId) return false;
    return true;
  }, [framework, outputFormat, records, sourceJobId]);

  const handleSubmit = async (): Promise<void> => {
    if (!isValid) return;
    setLoading(true);
    setError(null);
    try {
      const payload: GeneratePayload = {
        records,
        framework,
        outputFormat,
        useDeidentifiedSource: Boolean(sourceJobId),
        sourceJobId,
      };
      try {
        await syntheticDataService.generate(payload);
        setSuccess(t('syntheticData.generatedSuccess'));
      } catch (serviceErr: unknown) {
        const message =
          serviceErr instanceof Error
            ? serviceErr.message
            : String(serviceErr ?? t('errors.generic'));
        setError(message);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err ?? t('errors.generic'));
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

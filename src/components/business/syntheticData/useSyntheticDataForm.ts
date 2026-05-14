import { useMemo, useState } from 'react';
import { ComplianceFramework } from '@/pages/DeIdentify/types';
import { syntheticDataService } from '@/services/syntheticDataService';
import { useTranslation } from 'react-i18next';

type GeneratePayload = {
  records: number;
  framework: string;
  outputFormat: string;
};

const limits = {
  maxRecords: 1000000,
};

export function useSyntheticDataForm() {
  const { t } = useTranslation();
  const [records, setRecords] = useState<number>(1000);
  const [framework, setFramework] = useState<string>(ComplianceFramework.HIPAA);
  const [outputFormat, setOutputFormat] = useState<string>('csv');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const deidentifiedPreview: string | null = null;

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
    return true;
  }, [framework, outputFormat, records]);

  const handleSubmit = async (): Promise<void> => {
    if (!isValid) return;
    setLoading(true);
    setError(null);
    try {
      const payload: GeneratePayload = {
        records,
        framework,
        outputFormat,
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

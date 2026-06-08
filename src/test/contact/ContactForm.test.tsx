import { render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import type { Mock } from 'vitest';
import { theme } from '@/theme';
import { ContactForm } from '@/components/business/contact/ContactForm';
import { emailService } from '@/services/emailService';
import type { ContactFormData } from '@/pages/Contact/types';

vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (k: string) => k }) }));
vi.mock('@/services/emailService', () => ({
  emailService: {
    sendContactUsEmail: vi.fn(),
  },
}));
vi.mock('react-hook-form', () => ({
  useForm: () => ({
    register: () => ({}),
    handleSubmit:
      (handler: (values: ContactFormData) => unknown) =>
      (event?: { preventDefault?: () => void }) => {
        event?.preventDefault?.();
        return handler({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          company: 'Acme',
          message: 'This is a valid message longer than twenty chars',
        });
      },
    watch: () => 'This is a valid message longer than twenty chars',
    formState: {
      errors: {},
      isSubmitting: false,
      isValid: true,
      touchedFields: {},
    },
    reset: vi.fn(),
  }),
}));

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function renderForm() {
    return render(
      <ThemeProvider theme={theme}>
        <ContactForm />
      </ThemeProvider>,
    );
  }

  it('shows success state after successful submit', async () => {
    (emailService.sendContactUsEmail as Mock).mockResolvedValue(undefined);

    renderForm();

    screen.getByRole('button', { name: 'landing.contact.form.submit' }).click();

    await waitFor(() => expect(screen.getByText('landing.contact.form.backToForm')).toBeTruthy());
  });

  it('shows error state when backend returns error', async () => {
    (emailService.sendContactUsEmail as Mock).mockRejectedValue(new Error('fail'));

    renderForm();

    screen.getByRole('button', { name: 'landing.contact.form.submit' }).click();

    await waitFor(() => expect(screen.getByText('errors.generic')).toBeTruthy());
  });
});

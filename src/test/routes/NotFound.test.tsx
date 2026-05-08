import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from '@/routes';
import { renderWithProviders } from '@/test/renderWithProviders';

vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (k: string) => k }) }));

describe('NotFound page', () => {
  it('renders 404 page on unknown route', () => {
    const { getByText } = renderWithProviders(
      <MemoryRouter initialEntries={['/no-such-route']}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(getByText('notFound.title')).toBeTruthy();
  });
});

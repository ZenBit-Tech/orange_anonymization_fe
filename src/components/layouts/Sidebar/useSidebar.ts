import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import FindReplaceOutlinedIcon from '@mui/icons-material/FindReplaceOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import { ROUTES } from '@/constants';
import { useAppDispatch } from '@/store/store';
import { useAppSelector } from '@/store/store';
import { logout } from '@/store/auth';

interface NavItem {
  labelKey: string;
  path: string;
  icon: typeof DashboardOutlinedIcon;
}

const NAV_ITEMS: NavItem[] = [
  { labelKey: 'nav.dashboard', path: ROUTES.DASHBOARD, icon: DashboardOutlinedIcon },
  { labelKey: 'nav.deIdentify', path: ROUTES.DE_IDENTIFY, icon: FindReplaceOutlinedIcon },
  { labelKey: 'nav.syntheticData', path: ROUTES.SYNTHETIC_DATA, icon: StorageOutlinedIcon },
];

export function useSidebar(onNavigate?: () => void) {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentJobId = useAppSelector((state) => state.jobs.currentJob?.id);

  const isActive = (path: string): boolean => {
    const regexPath = path.replace(/:[^/]+/g, '[^/]+');
    const regex = new RegExp(`^${regexPath}$`);

    return regex.test(location.pathname);
  };

  const handleNavigate = (path: string) => {
    if (path === ROUTES.SYNTHETIC_DATA && currentJobId) {
      navigate(`${path}?jobId=${encodeURIComponent(currentJobId)}#settings`);
    } else {
      navigate(path);
    }
    onNavigate?.();
  };

  const handleSignOut = () => {
    dispatch(logout());
    navigate(ROUTES.LOGIN);
    onNavigate?.();
  };

  return {
    t,
    navItems: NAV_ITEMS,
    isActive,
    handleNavigate,
    handleSignOut,
  };
}

import { useState, useMemo, type FC, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  InputAdornment,
  Chip,
  alpha,
  ButtonBase,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Language as LanguageIcon,
  Search as SearchIcon,
  Check as CheckIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import type { IJob, Language } from '@/pages/DeIdentify/types';
import { ALL_LANGUAGES, RECENTLY_USED } from '@/constants';
import { FONT_SIZES } from '@/constants';

interface IProps {
  updateJob: (jobId: string, updateData: Partial<IJob>) => Promise<void>;
  currentJob: IJob | null;
}

const LanguageSelect: FC<IProps> = ({ currentJob, updateJob }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const [search, setSearch] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);
  const currentLangCode = currentJob?.wizardState?.configSettings.language || 'en';
  const currentLangName = ALL_LANGUAGES.find((l) => l.code === currentLangCode)?.name || 'English';

  const [selectedLanguage, setSelectedLanguage] = useState<Language>({
    code: currentLangCode,
    name: currentLangName,
    isAutoDetected: true,
  });

  const filteredAll = useMemo(
    () => ALL_LANGUAGES.filter((l) => l.name.toLowerCase().includes(search.toLowerCase())),
    [search],
  );

  const checkPosition = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const menuHeight = 400;

      setDropUp(spaceBelow < menuHeight && rect.top > menuHeight);
    }
  };

  const handleToggle = () => {
    if (!isOpen) checkPosition();
    setIsOpen(!isOpen);
    if (isOpen) setSearch('');
  };

  const handleSelect = async (lang: Language) => {
    if (!currentJob?.wizardState) return;
    setSelectedLanguage(lang);
    setIsOpen(false);
    setSearch('');

    await updateJob(currentJob.id, {
      wizardState: {
        ...currentJob.wizardState,
        configSettings: {
          ...currentJob.wizardState.configSettings,
          language: lang.code,
        },
      },
    });
  };

  const renderLanguageItem = (lang: Language) => {
    const isSelected = selectedLanguage.code === lang.code;
    return (
      <ListItemButton
        key={lang.code}
        onClick={() => handleSelect(lang)}
        sx={{
          py: 1.5,
          px: 2,
          bgcolor: isSelected ? 'primary.50' : 'transparent',
          '&:hover': { bgcolor: isSelected ? 'primary.50' : 'action.hover' },
        }}
      >
        <ListItemText
          primary={
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography
                sx={{
                  fontSize: FONT_SIZES.md,
                  fontWeight: isSelected ? 'fontWeightSemiBold' : 'fontWeightRegular',
                  color: isSelected ? 'primary.500' : 'neutral.900',
                }}
              >
                {lang.name}
              </Typography>
              {isSelected && lang.isAutoDetected && (
                <Chip
                  icon={<CheckIcon sx={{ fontSize: FONT_SIZES.xs, color: 'inherit !important' }} />}
                  label={t('deIdentify.languageSelect.autoDetected')}
                  size="small"
                  sx={{
                    bgcolor: (theme) => alpha(theme.palette.accent[400]!, 0.1),
                    color: 'accent.400',
                    border: 'none',
                    height: '20px',
                    fontSize: FONT_SIZES.xs,
                    fontWeight: 'fontWeightMedium',
                  }}
                />
              )}
            </Box>
          }
        />
      </ListItemButton>
    );
  };

  return (
    <Box ref={containerRef} sx={{ position: 'relative', width: '100%' }}>
      <ButtonBase
        onClick={handleToggle}
        sx={{
          width: '100%',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: '20px',
          border: '1px solid',
          borderColor: isOpen ? 'primary.500' : 'divider',
          borderRadius: '8px',
          bgcolor: 'common.white',
          zIndex: 12,
          transition: 'all 0.2s ease',
          '&:hover': { borderColor: 'primary.500' },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <LanguageIcon sx={{ color: 'neutral.400' }} />
          <Typography sx={{ fontWeight: 'fontWeightSemiBold', color: 'neutral.800' }}>
            {selectedLanguage.name}
          </Typography>
        </Box>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ExpandMoreIcon sx={{ color: 'neutral.400' }} />
        </motion.div>
      </ButtonBase>

      <AnimatePresence>
        {isOpen && (
          <>
            <Box
              onClick={() => setIsOpen(false)}
              sx={{ position: 'fixed', inset: 0, zIndex: 10 }}
            />

            <Box
              component={motion.div}
              initial={{ opacity: 0, y: dropUp ? 10 : -10, scale: 0.98 }}
              animate={{ opacity: 1, y: dropUp ? -4 : 4, scale: 1 }}
              exit={{ opacity: 0, y: dropUp ? 10 : -10, scale: 0.98 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              sx={{
                position: 'absolute',
                [dropUp ? 'bottom' : 'top']: '100%',
                left: 0,
                right: 0,
                zIndex: 11,
                bgcolor: 'common.white',
                borderRadius: '8px',
                boxShadow: (theme) => `0px 10px 30px ${alpha(theme.palette.common.black, 0.15)}`,
                border: '1px solid',
                borderColor: 'divider',
                overflow: 'hidden',
                transformOrigin: dropUp ? 'bottom' : 'top',
              }}
            >
              <Box
                sx={{
                  p: 1,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  bgcolor: 'common.white',
                }}
              >
                <TextField
                  fullWidth
                  size="small"
                  autoFocus
                  placeholder={t('deIdentify.languageSelect.search')}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: 'neutral.400', fontSize: FONT_SIZES.xl, ml: 1 }} />
                      </InputAdornment>
                    ),
                    sx: { px: 1, py: 1, fontSize: FONT_SIZES.sm },
                  }}
                />
              </Box>

              <Box sx={{ maxHeight: 320, overflowY: 'auto' }} className="scrollbar-md">
                {selectedLanguage.isAutoDetected && !search && (
                  <Box sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
                    {renderLanguageItem(selectedLanguage)}
                  </Box>
                )}

                {!search && (
                  <>
                    <Box sx={{ px: 2, py: 1, bgcolor: 'neutral.50' }}>
                      <Typography
                        sx={{
                          fontSize: FONT_SIZES.xs,
                          fontWeight: 'fontWeightSemiBold',
                          color: 'neutral.400',
                          textTransform: 'uppercase',
                        }}
                      >
                        {t('deIdentify.languageSelect.recentlyUsed')}
                      </Typography>
                    </Box>
                    <List sx={{ p: 0 }}>{RECENTLY_USED.map(renderLanguageItem)}</List>
                  </>
                )}

                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    bgcolor: 'neutral.50',
                    borderY: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: FONT_SIZES.xs,
                      fontWeight: 'fontWeightSemiBold',
                      color: 'neutral.400',
                      textTransform: 'uppercase',
                    }}
                  >
                    {t('deIdentify.languageSelect.allLanguages')}
                  </Typography>
                </Box>
                <List sx={{ p: 0 }}>
                  {filteredAll.length > 0 ? (
                    filteredAll.map(renderLanguageItem)
                  ) : (
                    <Typography
                      sx={{
                        p: 3,
                        textAlign: 'center',
                        color: 'neutral.400',
                        fontSize: FONT_SIZES.xs,
                      }}
                    >
                      {t('deIdentify.languageSelect.noLanguages')}
                    </Typography>
                  )}
                </List>
              </Box>
            </Box>
          </>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default LanguageSelect;

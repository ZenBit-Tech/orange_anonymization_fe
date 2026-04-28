import { useState, type FC, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FONT_SIZES } from '@/constants';
import {
  ExpandMore as ExpandMoreIcon,
  Block as RedactIcon,
  Cached as ReplaceIcon,
  AutoAwesome as SyntheticIcon,
  VisibilityOff as MaskIcon,
  LockClock as HashIcon,
  Check as CheckIcon,
} from '@mui/icons-material';
import {
  Box,
  Typography,
  ButtonBase,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  alpha,
} from '@mui/material';
import type { IJob, RedactOption } from '@/pages/DeIdentify/types';

const OPTIONS: RedactOption[] = [
  {
    id: 'Redact',
    category: 'REMOVE',
    categoryLabel: 'deIdentify.settings.strategies.categories.remove',
    titleKey: 'deIdentify.settings.strategies.redact.title',
    descKey: 'deIdentify.settings.strategies.redact.description',
    icon: <RedactIcon />,
  },
  {
    id: 'Replace',
    category: 'REPLACE',
    categoryLabel: 'deIdentify.settings.strategies.categories.replace',
    titleKey: 'deIdentify.settings.strategies.replace.title',
    descKey: 'deIdentify.settings.strategies.replace.description',
    icon: <ReplaceIcon />,
  },
  {
    id: 'Synthetic',
    category: 'REPLACE',
    categoryLabel: 'deIdentify.settings.strategies.categories.replace',
    titleKey: 'deIdentify.settings.strategies.synthetic.title',
    descKey: 'deIdentify.settings.strategies.synthetic.description',
    icon: <SyntheticIcon />,
  },
  {
    id: 'Mask',
    category: 'PROTECT',
    categoryLabel: 'deIdentify.settings.strategies.categories.protect',
    titleKey: 'deIdentify.settings.strategies.mask.title',
    descKey: 'deIdentify.settings.strategies.mask.description',
    icon: <MaskIcon />,
  },
  {
    id: 'Hash',
    category: 'PROTECT',
    categoryLabel: 'deIdentify.settings.strategies.categories.protect',
    titleKey: 'deIdentify.settings.strategies.hash.title',
    descKey: 'deIdentify.settings.strategies.hash.description',
    icon: <HashIcon />,
  },
];

interface IProps {
  updateJob: (jobId: string, updateData: Partial<IJob>) => Promise<void>;
  currentJob: IJob | null;
}

const StrategyDropdown: FC<IProps> = ({ updateJob, currentJob }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const firstEntity = currentJob?.wizardState?.configSettings.entities?.[0];
  const strategies = currentJob?.wizardState?.configSettings.strategies as
    | Record<string, string>
    | undefined;

  const selectedId = (firstEntity && strategies?.[firstEntity]) || 'Redact';
  const selectedOption = OPTIONS.find((opt) => opt.id === selectedId);

  const checkPosition = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const menuHeight = 380;

      if (spaceBelow < menuHeight && rect.top > menuHeight) {
        setDropUp(true);
      } else {
        setDropUp(false);
      }
    }
  };

  const handleToggle = () => {
    if (!isOpen) checkPosition();
    setIsOpen(!isOpen);
  };

  const handleSelect = async (id: string) => {
    if (!currentJob?.wizardState) return;
    setIsOpen(false);

    const entities = currentJob.wizardState.configSettings.entities || [];
    const newStrategies = entities.reduce<Record<string, string>>((acc, entity) => {
      acc[entity] = id;
      return acc;
    }, {});

    await updateJob(currentJob.id, {
      wizardState: {
        ...currentJob.wizardState,
        configSettings: {
          ...currentJob.wizardState.configSettings,
          strategies: newStrategies,
        },
      },
    });
  };

  const renderGroup = (category: string) => {
    const groupOptions = OPTIONS.filter((opt) => opt.category === category);
    const categoryLabel = groupOptions[0]?.categoryLabel;

    return (
      <Box key={category}>
        <Box
          sx={{
            px: 2,
            py: 0.8,
            bgcolor: 'neutral.50',
            borderY: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography
            sx={{
              fontSize: '10px',
              fontWeight: 'fontWeightBold',
              color: 'neutral.400',
              textTransform: 'uppercase',
            }}
          >
            {categoryLabel ? t(categoryLabel) : category}
          </Typography>
        </Box>
        <List sx={{ p: 0 }}>
          {groupOptions.map((opt) => {
            const isSelected = selectedId === opt.id;
            return (
              <ListItemButton
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                sx={{
                  py: 1.5,
                  px: 2,
                  bgcolor: isSelected ? 'primary.50' : 'transparent',
                  '&:hover': { bgcolor: isSelected ? 'primary.50' : 'action.hover' },
                }}
              >
                <ListItemIcon
                  sx={{ minWidth: 40, color: isSelected ? 'primary.600' : 'neutral.500' }}
                >
                  {opt.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontSize: FONT_SIZES.md,
                        fontWeight: isSelected ? 'fontWeightSemiBold' : 'fontWeightRegular',
                        color: isSelected ? 'primary.500' : 'neutral.900',
                      }}
                    >
                      {t(opt.titleKey)}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      sx={{
                        fontSize: FONT_SIZES.xs,
                        color: isSelected ? 'neutral.700' : 'neutral.400',
                      }}
                    >
                      {t(opt.descKey)}
                    </Typography>
                  }
                />
                {isSelected && <CheckIcon sx={{ color: 'primary.600', fontSize: 18 }} />}
              </ListItemButton>
            );
          })}
        </List>
      </Box>
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
          p: 2,
          border: '1px solid',
          borderColor: isOpen ? 'primary.500' : 'divider',
          borderRadius: '8px',
          bgcolor: 'common.white',
          zIndex: 12,
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: 'primary.500',
            boxShadow: (theme) => `0 2px 8px ${alpha(theme.palette.common.black, 0.05)}`,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, textAlign: 'left' }}>
          <Box sx={{ color: 'neutral.800', display: 'flex' }}>{selectedOption?.icon}</Box>
          <Box>
            <Typography sx={{ fontWeight: 'fontWeightSemiBold', color: 'neutral.800' }}>
              {selectedOption ? t(selectedOption.titleKey) : ''}
            </Typography>
            <Typography sx={{ fontSize: FONT_SIZES.xs, color: 'neutral.400', mt: 0.5 }}>
              {selectedOption ? t(selectedOption.descKey) : ''}
            </Typography>
          </Box>
        </Box>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ExpandMoreIcon sx={{ color: 'neutral.400' }} />
        </motion.div>
      </ButtonBase>

      <AnimatePresence>
        {isOpen && (
          <>
            <Box
              onClick={() => setIsOpen(false)}
              sx={{
                position: 'fixed',
                inset: 0,
                zIndex: 10,
                bgcolor: 'transparent',
              }}
            />

            <Box
              component={motion.div}
              className="scrollbar-md"
              initial={{ opacity: 0, y: dropUp ? 10 : -10, scale: 0.95 }}
              animate={{ opacity: 1, y: dropUp ? -4 : 4, scale: 1 }}
              exit={{ opacity: 0, y: dropUp ? 10 : -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
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
                maxHeight: '380px',
                overflowY: 'auto',
                transformOrigin: dropUp ? 'bottom' : 'top',
              }}
            >
              {renderGroup('REMOVE')}
              {renderGroup('REPLACE')}
              {renderGroup('PROTECT')}
            </Box>
          </>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default StrategyDropdown;

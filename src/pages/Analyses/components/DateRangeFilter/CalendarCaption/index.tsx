import React, { useMemo } from 'react';

import { useDayPicker } from 'react-day-picker';
import { useTranslation } from 'react-i18next';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import {
  CaptionContainer,
  CaptionGroup,
  CaptionSelect,
  CaptionArrowButton,
  CaptionMenuItem,
  CaptionCheckIconContainer,
  CaptionCheckIcon,
} from '@/pages/Analyses/components/DateRangeFilter/styled';

const YEARS = Array.from({ length: 51 }, (_, i) => 2000 + i);

interface Props {
  calendarMonth: {
    date: Date;
  };
}

export const CalendarCaption = ({ calendarMonth }: Props) => {
  const { t } = useTranslation();
  const { goToMonth } = useDayPicker();

  const date = calendarMonth.date;
  const month = date.getMonth();
  const year = date.getFullYear();

  const navigate = (targetDate: Date) => {
    goToMonth(targetDate);
  };

  const months = useMemo(
    () => [
      t('dashboard.analyses.filters.months.january'),
      t('dashboard.analyses.filters.months.february'),
      t('dashboard.analyses.filters.months.march'),
      t('dashboard.analyses.filters.months.april'),
      t('dashboard.analyses.filters.months.may'),
      t('dashboard.analyses.filters.months.june'),
      t('dashboard.analyses.filters.months.july'),
      t('dashboard.analyses.filters.months.august'),
      t('dashboard.analyses.filters.months.september'),
      t('dashboard.analyses.filters.months.october'),
      t('dashboard.analyses.filters.months.november'),
      t('dashboard.analyses.filters.months.december'),
    ],
    [t],
  );

  return (
    <CaptionContainer>
      <CaptionGroup>
        <CaptionArrowButton onClick={() => navigate(new Date(year, month - 1))}>
          <KeyboardArrowLeftIcon />
        </CaptionArrowButton>

        <CaptionSelect
          value={month}
          onChange={(e) => navigate(new Date(year, Number(e.target.value)))}
          IconComponent={KeyboardArrowDownIcon}
          renderValue={(value) => months[Number(value)]}
        >
          {months.map((monthName, index) => (
            <CaptionMenuItem key={monthName} value={index}>
              <CaptionCheckIconContainer>
                {month === index && <CaptionCheckIcon />}
              </CaptionCheckIconContainer>

              {monthName}
            </CaptionMenuItem>
          ))}
        </CaptionSelect>

        <CaptionArrowButton onClick={() => navigate(new Date(year, month + 1))}>
          <KeyboardArrowRightIcon />
        </CaptionArrowButton>
      </CaptionGroup>

      <CaptionGroup>
        <CaptionArrowButton onClick={() => navigate(new Date(year - 1, month))}>
          <KeyboardArrowLeftIcon />
        </CaptionArrowButton>

        <CaptionSelect
          value={year}
          onChange={(e) => navigate(new Date(Number(e.target.value), month))}
          IconComponent={KeyboardArrowDownIcon}
          renderValue={(value) => String(value)}
        >
          {YEARS.map((y) => (
            <CaptionMenuItem key={y} value={y}>
              <CaptionCheckIconContainer>
                {year === y && <CaptionCheckIcon />}
              </CaptionCheckIconContainer>

              {y}
            </CaptionMenuItem>
          ))}
        </CaptionSelect>

        <CaptionArrowButton onClick={() => navigate(new Date(year + 1, month))}>
          <KeyboardArrowRightIcon />
        </CaptionArrowButton>
      </CaptionGroup>
    </CaptionContainer>
  );
};

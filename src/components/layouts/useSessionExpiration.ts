import { useEffect, useMemo, useState } from 'react';

import { AUTH_SESSION_MAX_AGE_MS, AUTH_SESSION_STARTED_AT_KEY, AUTH_TOKEN_KEY } from '@/constants';

const WARNING_THRESHOLD_MS = 10 * 60 * 1000;
const CRITICAL_THRESHOLD_MS = 2 * 60 * 1000;
const TICK_MS = 1000;

type SessionExpirationState = {
  isVisible: boolean;
  isWarning: boolean;
  isCritical: boolean;
  remainingLabel: string;
  remainingMs: number;
};

const getSessionRemainingMs = (now: number) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  if (!token) {
    return null;
  }

  const sessionStartedAt = localStorage.getItem(AUTH_SESSION_STARTED_AT_KEY);
  const parsedSessionStartedAt = sessionStartedAt ? Number(sessionStartedAt) : NaN;

  if (!Number.isFinite(parsedSessionStartedAt) || parsedSessionStartedAt <= 0) {
    return null;
  }

  const remainingMs = AUTH_SESSION_MAX_AGE_MS - (now - parsedSessionStartedAt);

  return Math.max(0, remainingMs);
};

const formatRemainingLabel = (remainingMs: number) => {
  const totalSeconds = Math.floor(remainingMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export function useSessionExpiration(enabled = true): SessionExpirationState {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setNow(Date.now());
    }, TICK_MS);

    return () => window.clearInterval(intervalId);
  }, [enabled]);

  return useMemo(() => {
    if (!enabled) {
      return {
        isVisible: false,
        isWarning: false,
        isCritical: false,
        remainingLabel: '',
        remainingMs: 0,
      };
    }

    const remainingMs = getSessionRemainingMs(now);

    if (remainingMs === null) {
      return {
        isVisible: false,
        isWarning: false,
        isCritical: false,
        remainingLabel: '',
        remainingMs: 0,
      };
    }

    const isCritical = remainingMs <= CRITICAL_THRESHOLD_MS && remainingMs > 0;
    const isWarning = remainingMs <= WARNING_THRESHOLD_MS && remainingMs > CRITICAL_THRESHOLD_MS;

    return {
      isVisible: isWarning || isCritical,
      isWarning,
      isCritical,
      remainingLabel: formatRemainingLabel(remainingMs),
      remainingMs,
    };
  }, [enabled, now]);
}

import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react';

const PromiseThrower = () => {
  throw new Promise(() => {});
};

const FallbackDelayer = ({
  fallback,
  fallbackDelayMs = 0,
  onShowFallback,
}: {
  fallback: React.ReactNode;
  fallbackDelayMs?: number;
  onShowFallback: () => void;
}) => {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    if (fallbackDelayMs) {
      const timeoutId = setTimeout(() => {
        setShowFallback(true);
        onShowFallback();
      }, fallbackDelayMs);

      return () => {
        clearInterval(timeoutId);
      };
    } else {
      setShowFallback(true);
      onShowFallback();
    }
    return;
  }, [fallbackDelayMs, onShowFallback]);

  return showFallback ? fallback : null;
};

const MIN_FALLBACK_DELAY_MS = 500;

export const SmartSuspense = ({
  children,
  fallback,
  fallbackDelayMs = 0,
  fallbackMinDurationMs = MIN_FALLBACK_DELAY_MS,
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
  fallbackDelayMs?: number;
  fallbackMinDurationMs?: number;
}) => {
  const [isWaitingFallbackMinDurationMs, setIsWaitingFallbackMinDurationMs] = useState(false);

  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const onShowFallback = useCallback(() => {
    setIsWaitingFallbackMinDurationMs(true);

    timeoutIdRef.current && clearInterval(timeoutIdRef.current);
    timeoutIdRef.current = setTimeout(() => {
      setIsWaitingFallbackMinDurationMs(false);
    }, fallbackMinDurationMs);
  }, [fallbackMinDurationMs]);

  useEffect(() => {
    return () => timeoutIdRef.current && clearInterval(timeoutIdRef.current);
  }, []);

  return (
    <Suspense
      fallback={
        <FallbackDelayer
          fallback={fallback}
          fallbackDelayMs={fallbackDelayMs}
          onShowFallback={onShowFallback}
        />
      }
    >
      {isWaitingFallbackMinDurationMs && <PromiseThrower />}
      {children}
    </Suspense>
  );
};

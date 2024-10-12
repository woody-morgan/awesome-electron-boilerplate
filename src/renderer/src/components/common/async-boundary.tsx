import { Text } from '@radix-ui/themes';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { FunctionComponent } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import type { FallbackProps } from 'react-error-boundary';

import { Center } from './center';
import { SmartSuspense } from './smart-suspense';
import { Button } from '../ui/button';

export const AsyncBoundary: FunctionComponent<{
  children: React.ReactNode;
  resetKeys?: string[];
  pendingFallback?: React.ReactNode;
  rejectedFallbackRender?: (props: FallbackProps) => React.ReactNode;
}> = ({
  children,
  resetKeys,
  // @TODO: make good loading spinner
  pendingFallback = <Center>loading ...</Center>,
  rejectedFallbackRender = (props: FallbackProps) => (
    <Center direction="column">
      <Text size="5" weight="bold">
        Error
      </Text>
      <Text size="2">{props.error.message}</Text>
      <Button onClick={props.resetErrorBoundary}>Try again</Button>
    </Center>
  ),
}) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          resetKeys={resetKeys}
          fallbackRender={rejectedFallbackRender}
          onReset={reset}
        >
          <SmartSuspense fallback={pendingFallback}>{children}</SmartSuspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

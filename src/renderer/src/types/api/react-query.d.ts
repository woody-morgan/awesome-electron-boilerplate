import { MutationOptions, UseSuspenseQueryOptions } from '@tanstack/react-query';

import { ExtractRequestFromApi, ExtractResponseFromApi } from './ts-rest';
import { PartiallyOptional } from '../typescript';

type ExtractSuspenseQueryArgs<T> = [
  req: ExtractRequestFromApi<T>,
  options?: PartiallyOptional<
    UseSuspenseQueryOptions<
      ExtractResponseFromApi<T>['success'],
      ExtractResponseFromApi<T>['error']
    >,
    'queryKey' | 'queryFn'
  >,
];

type ExtractMutationFromApi<T> = [
  options?: PartiallyOptional<
    MutationOptions<
      ExtractResponseFromApi<T>['success'],
      ExtractResponseFromApi<T>['error'],
      ExtractRequestFromApi<T>
    >,
    'mutationFn'
  >,
];

export type { ExtractSuspenseQueryArgs, ExtractMutationFromApi };

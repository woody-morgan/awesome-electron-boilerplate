import { IntRange } from '@shared/types/typescript';

type ApiSuccessStatusCode = IntRange<200, 300>;
type ApiErrorStatusCode = IntRange<400, 600>;
type ExtractParams<T> = T extends { params?: infer P } ? P : never;
type ExtractBody<T> = T extends { body?: infer B } ? B : never;
type ExtractQuery<T> = T extends { query?: infer Q } ? Q : never;

type MakeOptionalIfNever<T> = {
  [K in keyof T as T[K] extends never ? never : K]: T[K];
} & {
  [K in keyof T as T[K] extends never ? K : never]?: T[K];
};

type ExtractRequest<T> = MakeOptionalIfNever<{
  params: ExtractParams<T>;
  body: ExtractBody<T>;
  query: ExtractQuery<T>;
}>;

type ExtractRequestFromApi<T> = ExtractRequest<Parameters<T>[0]>;
type ExtractResponse<T> = Awaited<ReturnType<T>>;
type ExtractSuccessResponseFromApi<T> = Extract<
  ExtractResponse<T>,
  { status: ApiSuccessStatusCode }
>['body'];
type ExtractErrorResponseFromApi<T> = Extract<
  ExtractResponse<T>,
  { status: ApiErrorStatusCode }
>['body'];

type ExtractResponseFromApi<T> = {
  success: ExtractSuccessResponseFromApi<T>;
  error: ExtractErrorResponseFromApi<T>;
};

export type {
  ExtractRequestFromApi,
  ExtractResponseFromApi,
  ApiSuccessStatusCode,
  ApiErrorStatusCode,
};

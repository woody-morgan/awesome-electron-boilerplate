import { A } from '@mobily/ts-belt';

export const accessibleRoute = ['/', '/posts', `/posts/:postId`, '/error'] as const;

// convert parameter route to string
export type ConvertRouteToParams<T extends string> = T extends `${infer L}/:${string}/${infer R}`
  ? `${L}/${string}/${ConvertRouteToParams<R>}`
  : T extends `${infer L}/:${string}`
    ? `${L}/${string}`
    : T extends `:${string}`
      ? `${string}`
      : T;

export type AccessibleRoute = ConvertRouteToParams<(typeof accessibleRoute)[number]>;

export const AccessibleRouteGuard = (route: string): route is AccessibleRoute => {
  return A.find(accessibleRoute, (r) => r === route) !== undefined;
};

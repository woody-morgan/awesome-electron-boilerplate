import { IndexRouteObject, NonIndexRouteObject, createHashRouter } from 'react-router-dom';

import { DefaultLayout } from '@/components/layout';
import { AccessibleRoute } from '@/types/route';

import { pages } from '../pages';

interface TypedIndexRouteObject extends Omit<IndexRouteObject, 'path'> {
  // for asterisk path
  path?: AccessibleRoute | '*';
}

interface TypedNonIndexRouteObject extends Omit<NonIndexRouteObject, 'path' | 'children'> {
  // for asterisk path
  path?: AccessibleRoute | '*';
  children?: TypedRouteObject[];
}

type TypedRouteObject = TypedIndexRouteObject | TypedNonIndexRouteObject;

const routes: TypedRouteObject[] = [
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        caseSensitive: true,
        element: <pages.posts />,
      },
      {
        path: '/posts',
        caseSensitive: true,
        element: <pages.posts />,
      },
      {
        path: '/posts/:postId',
        caseSensitive: true,
        element: <pages.postById />,
      },
      {
        path: '/error',
        element: <pages.error />,
      },
      {
        path: '*',
        element: <pages.error />,
      },
    ],
  },
];

// Electron should use hash router
export const router = createHashRouter(routes);

import { A, S, flow } from '@mobily/ts-belt';

const parsePath = (where: number) =>
  flow(
    S.split('/'),
    A.filter((path) => path !== ''),
    A.get(where),
  );

export const parseFirstPath = parsePath(0);
export const parseSecondPath = parsePath(1);
export const parseThirdPath = parsePath(2);

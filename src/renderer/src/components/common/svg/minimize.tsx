import { FC } from 'react';

import { CustomSVGProps } from './type';

export const MinimizeSVG: FC<CustomSVGProps> = ({ size = 10, ...rest }) => {
  return (
    <svg aria-hidden="true" version="1.1" width={size} height={size} viewBox="0 0 10 10" {...rest}>
      <path fill="currentColor" d="M 0,5 10,5 10,6 0,6 Z" />
    </svg>
  );
};

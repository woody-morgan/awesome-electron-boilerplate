import { FC } from 'react';

import { CustomSVGProps } from './type';

export const MaxmimizeSVG: FC<CustomSVGProps> = ({ size = 10, ...rest }) => {
  return (
    <svg aria-hidden="true" version="1.1" width={size} height={size} viewBox="0 0 10 10" {...rest}>
      <path fill="currentColor" d="M 0,0 0,10 10,10 10,0 Z M 1,1 9,1 9,9 1,9 Z" />
    </svg>
  );
};

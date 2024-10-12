import { FC } from 'react';

import { CustomSVGProps } from './type';

export const CloseSVG: FC<CustomSVGProps> = ({ size = 10, ...rest }) => {
  return (
    <svg aria-hidden="true" version="1.1" width={size} height={size} viewBox="0 0 10 10" {...rest}>
      <path
        fill="currentColor"
        d="M 0,0 0,0.7 4.3,5 0,9.3 0,10 0.7,10 5,5.7 9.3,10 10,10 10,9.3 5.7,5 10,0.7 10,0 9.3,0 5,4.3 0.7,0 Z"
      />
    </svg>
  );
};

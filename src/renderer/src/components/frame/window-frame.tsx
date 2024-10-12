import React, { PropsWithChildren } from 'react';

import { Titlebar } from './title-bar';

export const WindowFrame: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Titlebar />
      <div className="h-screen overflow-auto pt-7">{children}</div>
    </>
  );
};

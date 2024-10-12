import { useCallback } from 'react';
import { NavigateOptions, useNavigate } from 'react-router-dom';

import { TypedTo } from '@/components/common/typed-link';

export const useTypedRouter = () => {
  const navigate = useNavigate();

  const push = useCallback(
    (to: TypedTo, options?: NavigateOptions) => {
      navigate(to, options);
    },
    [navigate],
  );

  const replace = useCallback(
    (to: TypedTo, options?: Omit<NavigateOptions, 'replace'>) => {
      navigate(to, { ...options, replace: true });
    },
    [navigate],
  );

  const forward = useCallback(() => {
    navigate(1);
  }, [navigate]);

  const back = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const reload = useCallback(() => {
    navigate(0);
  }, [navigate]);

  return {
    push,
    replace,
    forward,
    back,
    reload,
  };
};

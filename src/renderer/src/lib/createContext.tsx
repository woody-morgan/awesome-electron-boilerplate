import {
  PropsWithChildren,
  createContext as createContextRaw,
  useContext as useContextRaw,
  useMemo,
} from 'react';

export const createContext = <ContextValueType extends object | null>(
  rootComponentName: string,
  defaultContext?: ContextValueType,
) => {
  const Context = createContextRaw<ContextValueType | undefined>(defaultContext);

  const Provider = (props: PropsWithChildren<ContextValueType>) => {
    const { children, ...context } = props;

    const value = useMemo(() => context, [context]) as ContextValueType;

    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  const useContext = (consumerName: string) => {
    const context = useContextRaw(Context);
    if (context == null) {
      throw new Error(`${consumerName}은 ${rootComponentName}하위에서 사용해야 합니다.`);
    }

    return context;
  };

  Provider.displayName = `${rootComponentName}Provider`;
  return [Provider, useContext] as const;
};

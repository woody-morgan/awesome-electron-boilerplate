type PropsFrom<TComponent> =
  TComponent extends React.FC<infer Props>
    ? Props
    : TComponent extends React.Component<infer Props>
      ? Props
      : never;

type PropsFromWithoutRef<TComponent> =
  TComponent extends React.FC<infer Props>
    ? Omit<Props, 'ref'>
    : TComponent extends React.Component<infer Props>
      ? Omit<Props, 'ref'>
      : never;

type InferRefFromExoticRefComponent<T> =
  T extends React.ForwardRefExoticComponent<infer Ref>
    ? Ref extends React.RefAttributes<infer RefElement>
      ? RefElement
      : never
    : never;

export type { PropsFrom, PropsFromWithoutRef, InferRefFromExoticRefComponent };

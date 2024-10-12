export type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

export type IntRange<From extends number, To extends number> = Exclude<
  Enumerate<To>,
  Enumerate<From>
>;

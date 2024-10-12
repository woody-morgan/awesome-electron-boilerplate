type NonEmptyArray<T> = readonly [T, ...T[]];

const nonEmptyArray = <T>(arr: readonly T[]): arr is NonEmptyArray<T> => arr.length > 0;

export const G = {
  nonEmptyArray,
};

export type SlashRemoved<T extends string> = T extends `/${infer U}` ? U : T;
export type PartiallyOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type ToLowerCase<T extends string> = Lowercase<T>;

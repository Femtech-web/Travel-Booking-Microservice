export const isUndefined = (value: unknown): value is undefined =>
  typeof value === 'undefined';

export const isNull = (value: unknown): value is null => value === null;

import { BaseEntity } from 'typeorm';

export type OmitBaseEntity<T, N extends keyof T> = Omit<
  T,
  keyof BaseEntity | N
>;

export type OmitBaseEntityAndId<T, N extends keyof T> = Omit<
  OmitBaseEntity<T, N>,
  'id'
>;

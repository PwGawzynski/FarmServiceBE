export type DtoToInterface<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? never : T[K];
};

export type AreInterfacesEqual<T, U, Y = true, N = false> = (<
  G,
>() => G extends T ? 1 : 2) extends <G>() => G extends U ? 1 : 2
  ? Y
  : N;

export type Equal<T, M> = AreInterfacesEqual<DtoToInterface<T>, M>;

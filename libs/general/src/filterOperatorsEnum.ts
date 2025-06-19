export enum filterOperatorsEnum {
  contains= 1,
  doesNotContains = 2,
  equals= 3,
  notEquals= 4,
  greaterThan= 5,
  greaterThanOrEqual= 6,
  lessThan= 7,
  lessThanOrEqual= 8,
  startsWith = 9,
  endsWith = 10,
  null = 11,
  notNull = 12,
  empty = 13,
  NotEmpty = 14
};

export type FilterOperator =
  (typeof filterOperatorsEnum)[keyof typeof filterOperatorsEnum];

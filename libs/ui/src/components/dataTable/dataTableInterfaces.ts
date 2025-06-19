export interface Filters {
  value: string;
  field: string;
  filterType: number;
  logicalOperator: number;
}

export interface FilterGroups {
  filters: Array<Filters>;
  logicalOperator: number;
}

export interface SendData {
  first: number;
  pageSize: number;
  sortField: string | null;
  sortOrder: number | null;
  filterGroups: Array<FilterGroups>;
  page: number;
}

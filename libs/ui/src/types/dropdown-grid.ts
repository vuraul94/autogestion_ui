export type DropdownGridKey = {
  value: string;
  label: string;
}

export type DropdownGridColumn = {
  name: string;
  value: string;
}

export type DropdownGridOption = {
  value: string | number;
  columns: DropdownGridColumn[];
}

export type DropdownGridProps = {
  options: DropdownGridOption[];
  icon?: [string, string];
  value?: DropdownGridOption;
  keys: DropdownGridKey[];
}

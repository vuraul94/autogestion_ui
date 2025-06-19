export type DropdownOption = {
  label: string;
  value: string | number;
}

export type DropdownProps = {
  options: DropdownOption[];
  icon?: [string, string];
  value?: DropdownOption;
}

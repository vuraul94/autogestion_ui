export type DropdownCardSections = {
  title: string;
  content: string | number;
}

export type DropdownCardProps = {
  sections: DropdownCardSections[];
  icon?: [string, string];
  title?: string;
  link?: string;
  buttonText?: string;
}

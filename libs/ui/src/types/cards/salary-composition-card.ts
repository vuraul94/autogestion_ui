export type SalaryCompisitionCardLabels = {
  concept?: string;
  currency?: string;
  percent?: string;
  unit?: string;
  value?: number;
}

export type SalaryCompositionCardProps = {
  type?: string;
  icon?: [string, string];
  concept?: string;
  currency?: string;
  percent?: number;
  unit?: string;
  value?: number;
  labels?: SalaryCompisitionCardLabels;
}

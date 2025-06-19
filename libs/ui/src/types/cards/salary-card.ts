export type SalaryCardLabels = {
  period: string;
  download: string;
  seeMore: string;
}

export type SalaryCardProps = {
  nominaId: number;
  currency?: string;
  startDate?: string;
  endDate?: string;
  docLink?: string;
  tipoNominaId: number;
  labels?: SalaryCardLabels;
}

export type PaymentCardLabels = {
  name?: string;
  bank?: string;
  currency?: string;
  account?: string;
}

export type PaymentCardProps = {
  name?: string;
  bank?: string;
  currency?: string;
  account?: string;
  labels?: PaymentCardLabels;
}

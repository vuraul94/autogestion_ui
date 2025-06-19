export type JobCardLabels = {
  name?: string;
  state?: string;
  schedule?: string;
}

export type JobCardProps = {
  name?: string;
  state?: string;
  schedule?: string;
  color?: string;
  labels?: JobCardLabels;
}

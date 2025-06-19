export type PermitCardLabels = {
  name?: string;
  applicationNumber?: string;
  id?: string;
  actionType?: string;
  registrationDate?: string;
  startDate?: string;
  endDate?: string;
  reason?: string;
  state?: string;
  doc?: string;
  time?: string;
  detailBtn?: string;
}

export type PermitCardProps = {
  name?: string;
  applicationNumber?: number;
  id?: number;
  actionType?: string;
  registrationDate?: string;
  startDate?: string;
  endDate?: string;
  reason?: string;
  state?: string;
  doc?: string;
  time?: string;
  labels?: PermitCardLabels;
  detailURL?: string;
}

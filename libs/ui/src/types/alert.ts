export type AlertProps = {
  title?: string;
  content?: string;
  type?: string;
  isOutline?: boolean;
  setShowMessage?: (newValue: boolean) => void;
}

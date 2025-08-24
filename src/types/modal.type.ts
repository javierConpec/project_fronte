export interface ModalInput {
  name: string;
  label?: string;
  type?: string;
  value?: string | number | boolean;
  disabled?: boolean;
  customComponent?: React.ReactNode; 
  fullWidth?: boolean;
}

export interface modalCustomProps {
  isOpen: boolean;
  inputs: ModalInput[];
  onClose: () => void;
  onSubmit: (data: Record<string, string | number>) => void;
  title: string;
  disabled?: boolean;
  variant?: "normal" | "wide";
}

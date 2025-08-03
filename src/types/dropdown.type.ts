export interface Option {
  id: number;
  label: string|number;
}

export interface DropdownProps {
  label: string;
  options: Option[];
  variant: string;
  onSelect: (id: number) => void;
  selectedId?: number;
}
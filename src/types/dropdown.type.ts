export interface Option {
  id: number;
  label: string|number;
}

export interface DropdownProps {
  label: string;
  options: Option[];
  onSelect: (id: number) => void;
}
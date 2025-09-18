export interface Option {
  id?: number ;
  label: string|number;
}

export interface DropdownProps {
  label?: string;
  options: Option[];
  variant: string;
  onSelectValue?: (value: string | number | null) => void; // devolver el dato
  onSelectId?: (id: number | null) => void;                // devolver el id
  selectedId?: number| string | null;
  selectedValue?: string | number; 
}
import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import type { DropdownProps,Option } from "../types/dropdown.type";

export const CustomDropdown = ({ label, options, onSelect }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);

  const handleSelect = (option: Option) => {
    setSelected(option);
    onSelect(option.id);
    setOpen(false);
  };

  return (
    <div className="relative w-auto text-sm">
      <div
        className="bg-gray-800 text-white px-2 py-2  flex items-center justify-between cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span>{selected ? selected.label : `* ${label}`}</span>
        <ChevronDownIcon className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </div>

      {open && (
        <ul className="relative z-10 mt-1 text-[12px] bg-gray-800  max-h-60 overflow-y-auto animate-fade-in">
          {options.map((opt) => (
            <li
              key={opt.id}
              onClick={() => handleSelect(opt)}
              className="px-4 py-2 ml-2 hover:bg-gray-700 cursor-pointer text-white"
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
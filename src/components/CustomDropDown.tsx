import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import type { DropdownProps, Option } from "../types/dropdown.type";

export const CustomDropdown = ({ label, options, onSelect }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: Option) => {
    setSelected(option);
    onSelect(option.id);
    setOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div ref={dropdownRef} className="relative inline-block  text-sm ">
      <label className="block mb-1 text-white font-semibold">{label}</label>

      <div
        className="bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded-lg  flex items-center justify-between cursor-pointer transition-colors hover:bg-gray-700"
        onClick={() => setOpen(!open)}
      >
        <span>{selected ? selected.label : "-- Seleccionar --"}</span>
        <ChevronDownIcon
          className={`w-4 h-4  transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </div>

      <div className="relative">
        <ul
          className={`absolute w-full mt-1 rounded-md  bg-gray-800 overflow-y-auto max-h-60 transform transition-all duration-800 origin-top 
          ${open ? "scale-y-100 opacity-100 relative" : "scale-y-0 opacity-0 pointer-events-none"} z-10`}
          style={{ transitionTimingFunction: "cubic-bezier(0.8, 0, 0.2, 1)" }}
        >
          {options.map((opt) => (
            <li
              key={opt.id}
              onClick={() => handleSelect(opt)}
              className="px-4 py-2 text-white hover:bg-gray-700 cursor-pointer transition-colors"
            >
              {opt.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

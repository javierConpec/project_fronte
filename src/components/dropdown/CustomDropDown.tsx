import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import type { DropdownProps, Option } from "../../types/dropdown.type";

export const CustomDropdown = ({ label, options,selectedId, onSelect, variant = "default" }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  

  useEffect(() => {
  if (selectedId !== undefined) {
    const match = options.find((opt) => opt.id === selectedId);
    if (match) setSelected(match);
  }
}, [selectedId, options]);

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
    <div
      ref={dropdownRef}
      className={`relative inline-block text-sm ${
        variant === "minimal" ? "w-full" : "w-auto "
      }`}
    >
      <label className={`block mb-1  font-semibold
        ${variant === "minimal" ? "text-black my-3 " : "text-white"}`}>{label}</label>

      <div
        className={`cursor-pointer flex items-center justify-between transition-colors rounded-lg 
          ${variant === "minimal"
            ? "bg-gray-100 border-b border-gray-400 text-black py-2 px-3 hover:bg-gray-200"
            : "bg-transparent border  border-gray-700 text-white px-3 py-3 hover:bg-gray-700"}`}
        onClick={() => setOpen(!open)}
      >
        <span>{selected ? selected.label : "-- Seleccionar --"}</span>
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </div>

      <div className="relative">
        <ul
          className={`absolute w-full mt-1 rounded-md  overflow-y-auto max-h-60 transform transition-all duration-800 origin-top ${variant === "minimal" ? "bg-gray-100" : "bg-transparent"}
            ${open ? "scale-y-100 opacity-100 relative" : "scale-y-0 opacity-0 pointer-events-none"} z-10`}
          style={{ transitionTimingFunction: "cubic-bezier(0.8, 0, 0.2, 1)" }}
        >
          {options.map((opt) => (
            <li
              key={opt.id}
              onClick={() => handleSelect(opt)}
              className={`px-4 py-2  cursor-pointer transition-colors  ${variant === "minimal" ? "text-black hover:bg-gray-200" : "text-white hover:bg-gray-700"}`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
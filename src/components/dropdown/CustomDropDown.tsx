import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import type { DropdownProps, Option } from "../../types/dropdown.type";

export const CustomDropdown = ({
  label,
  options,
  selectedId,
  selectedValue,
  onSelectValue,
  onSelectId,
  variant = "default",
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  //Seleccion por ID
  useEffect(() => {
    if (selectedId !== undefined) {
      const match = options.find((opt) => opt.id === selectedId);
      setSelected(match ?? null);
    }
  }, [selectedId, options]);

  //Seleccion por valor
  useEffect(() => {
    if (selectedValue !== undefined) {
      const match = options.find((opt) => opt.label === selectedValue);
      setSelected(match ?? null);
    }
  }, [selectedValue, options]);

  const handleSelect = (option: Option) => {
    // si clickeas en el mismo lo va limpiar
    if (selected?.id === option.id || selected?.label === option.label) {
      setSelected(null);
      if (onSelectId) onSelectId(null);
      if (onSelectValue) onSelectValue(null);
    } else {
      setSelected(option);
      if (onSelectId && option.id !== undefined) onSelectId(option.id);
      if (onSelectValue) onSelectValue(option.label);
    }
    setOpen(false);
  };

  // Cerrar el dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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
      <label
        className={`block mb-1 font-semibold ${
          variant === "minimal" ? "text-black my-3 " : "text-white"
        }`}
      >
        {label}
      </label>

      <div
        className={`cursor-pointer flex items-center justify-between transition-colors rounded-lg 
          ${
            variant === "minimal"
              ? "bg-background-100 border-b border-background-400 text-text-950 py-2 px-3 hover:bg-text-200"
              : "bg-text-800 border  border-text-700 text-text-50 px-3 py-3 hover:bg-text-700"
          }`}
        onClick={() => setOpen(!open)}
      >
        <span>{selected ? selected.label : "-- Seleccionar --"}</span>
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      <div className="relative">
        <ul
          className={`absolute w-full mt-1 rounded-md  overflow-y-auto max-h-60 transform transition-all duration-800 origin-top ${
            variant === "minimal" ? "bg-gray-100" : "bg-transparent"
          }
            ${
              open
                ? "scale-y-100 opacity-100 relative"
                : "scale-y-0 opacity-0 pointer-events-none"
            } z-10`}
          style={{ transitionTimingFunction: "cubic-bezier(0.8, 0, 0.2, 1)" }}
        >
          {options.map((opt, index) => (
            <li
              key={`${opt.id}-${index}`} 
              onClick={() => handleSelect(opt)}
              className={`px-4 py-2 cursor-pointer transition-colors ${
                variant === "minimal"
                  ? "text-text-950 hover:bg-background-100"
                  : "text-text-50 hover:bg-text-700"
              }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

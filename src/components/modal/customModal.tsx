import { useState } from "react";
import type { modalCustomProps } from "../../types/modal.type";
import { SectionTitle } from "../sectionTitle";
import { PencilIcon } from "lucide-react";

export const CustomModal = ({
  isOpen,
  inputs,
  onClose,
  onSubmit,
  title,
  disabled,
  variant = "normal", // style por defecto
}: modalCustomProps) => {
  const [formData, setFormData] = useState<Record<string, string | number>>(
    () =>
      inputs.reduce((acc, curr) => {
        acc[curr.name] =
          typeof curr.value === "boolean" ? String(curr.value) : curr.value ?? "";
        return acc;
      }, {} as Record<string, string | number>)
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  // Clases condicionales
  const modalWidth = variant === "wide" ? "max-w-4xl" : "max-w-md";
  const inputWrapperClass =
    variant === "wide" ? "grid grid-cols-2 gap-4" : "grid grid-cols-1 gap-4";

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex justify-center items-center z-50">
      <div className={`bg-background-0 p-6 rounded-xl w-full ${modalWidth} shadow-4xl`}>
        <div className="flex justify-center mb-6">
          <SectionTitle icon={PencilIcon} title={title} />
        </div>

        <div className={inputWrapperClass}>
          {inputs.map((input) => (
            <div
              key={input.name}
              className={input.fullWidth ? "col-span-2" : ""}
            >
              {input.customComponent ? (
                input.customComponent
              ) : (
                <>
                  <label className="block text-md font-medium">{input.label}</label>
                  <input
                    type={input.type || "text"}
                    name={input.name}
                    value={formData[input.name]}
                    onChange={handleChange}
                    disabled={input.disabled}
                    className="mt-1 p-2 w-full border rounded-md border-accent-700"
                  />
                </>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-8 space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-background-200 font-semibold rounded hover:bg-background-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-primary-600 text-text-50 font-semibold rounded hover:bg-primary-700"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

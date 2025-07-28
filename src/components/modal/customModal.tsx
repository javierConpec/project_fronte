import { useState } from "react";
import type {modalCustomProps} from "../../types/modal.type"
import { SectionTitle } from "../sectionTitle";
import { PencilIcon } from "lucide-react";

export const CustomModal = ({isOpen,inputs,onClose,onSubmit,title,disabled,optionalComponent}:modalCustomProps)=>{
    const [formData, setFormData] = useState<Record<string, string | number>>(
    () =>
      inputs.reduce((acc, curr) => {
        acc[curr.name] = curr.value ?? "";
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-4xl ">
        <div className="flex justify-center"><SectionTitle icon={PencilIcon} title={title} /></div>
        <div className="space-y-4">
          {inputs.map((input) => (
            <div key={input.name}>
              <label className="block text-md font-medium">{input.label}</label>
              <input
                type={input.type || "text"}
                name={input.name}
                value={formData[input.name]}
                onChange={handleChange}
                disabled={input.disabled}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
          ))}
          {optionalComponent && (
  <div className="mt-4">
    {optionalComponent}
  </div>
)}
        </div>
        <div className="flex justify-end mt-8 space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 font-semibold rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600"
            
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

import { useState } from "react";
import { FiltroVentasModal } from "../dropdown/filterChart";

interface ModalProps {
  open: boolean;
  onClose: () => void;
   onApply: (anio?: number, mes?: number) => void;
}

export const FilterVentaModal = ({ open, onClose, onApply }: ModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.6)] backdrop-blur-sm ">
      <div className="bg-background-0 rounded-lg p-6 w-96 relative">
        
        <button
          onClick={onClose}
          className="absolute top-2 right-2 "
        >
          ✖
        </button>

        <FiltroVentasModal
          onApply={(anio, mes) => {
            console.log("Filtros aplicados:", { anio, mes });
            onApply(anio, mes);
            onClose();           
          }}
        />
      </div>
    </div>
  );
};


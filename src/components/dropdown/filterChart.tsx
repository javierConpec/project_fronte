// src/components/FiltroVentasModal.tsx
import { useState } from "react";
import { useYearMonthFilter } from "../../hooks/chartHook";
import { CustomDropdown } from "./CustomDropDown";
import { MES_NOMBRES } from "../../utils/functionsGen";

interface FiltroVentasModalProps {
  onApply: (year?: number, month?: number) => void;
}

export const FiltroVentasModal = ({ onApply }: FiltroVentasModalProps) => {
  const {
    years,
    months,
    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth,
    loading,
  } = useYearMonthFilter();

  const handleApply = () => {
    onApply(selectedYear ?? undefined, selectedMonth ?? undefined);
  };

  if (loading) return <p>Cargando filtros...</p>;

  return (
    <div className="flex flex-col gap-4">
      <CustomDropdown
        label="Año"
        options={years.map((y) => ({ id: y, label: y.toString() }))}
        selectedId={selectedYear ?? undefined}
        onSelectId={setSelectedYear}
        variant="minimal"
      />

      <CustomDropdown
        label="Mes"
        options={months.map((m) => ({
          id: m, 
          label: MES_NOMBRES[m], 
        }))}
        selectedId={selectedMonth ?? undefined}
        onSelectId={setSelectedMonth}
        variant="minimal"
      />

      <button
        disabled={loading}
        className="bg-accent-600 text-text-50 mt-5 px-4 py-2 rounded hover:bg-accent-700 "
        onClick={handleApply}
      >
        Aplicar
      </button>
    </div>
  );
};

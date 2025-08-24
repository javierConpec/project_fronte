import { useNozzle } from "../../hooks/nozzleHook";
import { useProduct } from "../../hooks/productHook";
import { RiGasStationFill } from "react-icons/ri";
import { SectionTitle } from "../sectionTitle";
import type { Inozzle } from "../../types/nozzle.type";
import { useState, useEffect } from "react";
import { CustomModal } from "../modal/customModal";
import { Pencil, Trash } from "lucide-react";
import { CustomDropdown } from "../dropdown/CustomDropDown";
import { getLastAssignedNozzle, getValidNozzles } from "../../utils/functionsGen";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UseLoading } from "../../hooks/loaderHook";
import { SpinnerBeat } from "../Loader/spinner";

export  function NozzlePage() {
  const { nozzle, loading, error, updateNozzle } = useNozzle();
  const { products } = useProduct();

  const [productoId, setProductoId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [mangueraId, setMangueraId] = useState<number | null>(null);
  const [selectNozzle, setSelectNozzle] = useState<Inozzle | null>(null);
  const [fromAsignar, setFromAsignar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Paginación
  const totalPages = Math.ceil(nozzle.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = nozzle.slice(startIndex, startIndex + itemsPerPage);

  // Resetear página cuando cambien los datos
  useEffect(() => {
    setCurrentPage(1);
  }, [nozzle]);

  const openModal = (
    nozzle: Inozzle,
    nozzleNumber: number | null = null,
    asignar: boolean = false
  ) => {
    setSelectNozzle(nozzle);
    setMangueraId(nozzleNumber);
    setFromAsignar(asignar);
    setShowModal(true);
  };

  const handleModalSubmit = async (data: any) => {
    try {
      if (!selectNozzle) return;
      if (!mangueraId) {
        toast.warn("Debes seleccionar una manguera");
        return;
      }
      if (productoId === null) {
        toast.warn("Debes seleccionar un producto");
        return;
      }

      await updateNozzle({
        id: mangueraId,
        fuelPointId: selectNozzle.FuelPointId,
        nozzleNumber: mangueraId,
        productId: productoId !== null ? productoId : 0,
      });

      if (productoId === 0) {
        toast.info(`Producto desasignado de la manguera ${mangueraId}`);
      } else {
        toast.success(`Manguera ${mangueraId} actualizada exitosamente`);
      }

      setShowModal(false);
    } catch (error) {
      toast.error("Error al actualizar la manguera");
      console.error("Error al actualizar:", error);
    }
  };

  //Carga de la pagina
  const showLoader = UseLoading(loading, 1000);

  if (showLoader) return <SpinnerBeat />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div>
        <SectionTitle icon={RiGasStationFill} title="Mangueras" />
        <table className="w-full">
          <thead className="bg-primary-900 text-sm uppercase font-semibold text-text-50 text-center">
            <tr>
              <th className="px-3 py-3">N° Surtidor</th>
              <th className="px-3 py-3">Manguera N° 1</th>
              <th className="px-3 py-3">Manguera N° 2</th>
              <th className="px3 py-3">Manguera N° 3</th>
              <th className="px-3 py-3">Manguera N° 4</th>
              <th className="px-3 py-3">Manguera N° 5</th>
              <th className="px-3 py-3">Manguera N° 6</th>
              <th className="px-3 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-text-100 text-center">
            {paginatedData.map((fila) => (
              <tr key={fila.FuelPointId} className="border-t text-sm">
                <td className="px-6 py-2">{fila.FuelPointId}</td>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <td key={num} className="px-6 py-2">
                    {fila[`ProductNameN${num}` as keyof Inozzle] || (
                      <span
                        className="text-secondary-200 font-semibold cursor-pointer hover:text-primary-500"
                        onClick={() => openModal(fila, num, true)}
                      >
                        asignar
                      </span>
                    )}
                  </td>
                ))}
                <td className="px-6 py-3">
                  <button
                    onClick={() => openModal(fila, null, false)}
                    className="text-accent-700 hover:text-accent-900"
                    title="Editar"
                  >
                    <Pencil size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginador */}
        {nozzle.length > itemsPerPage && (
          <div className="flex justify-between items-center pt-4">
            <button
              className="px-4 py-2 bg-text-700 text-text-50 rounded-xl hover:bg-text-900 disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span className="text-sm text-accent-600">
              Página {currentPage} de {totalPages}
            </span>
            {/* Selector de página */}
            <select
              className="mx-2 border rounded-md px-2 py-1 text-sm"
              value={currentPage}
              onChange={(e) => setCurrentPage(Number(e.target.value))}
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <option key={page} value={page}>
                    {page}
                  </option>
                )
              )}
            </select>
            <button
              className="px-4 py-2 bg-text-700 text-text-50 rounded-xl hover:bg-text-900 disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>

      {showModal && selectNozzle && (
        <CustomModal
          isOpen={showModal}
          title="Editar Surtidor"
          onClose={() => setShowModal(false)}
          onSubmit={handleModalSubmit}
          inputs={[
            {
              name: "id",
              label: "ID",
              type: "number",
              value: selectNozzle.FuelPointId,
              disabled: true,
            },
            {
              name: "Surtidor",
              label: "Surtidor",
              type: "String",
              value: `Surtidor ${selectNozzle.FuelPointId}`,
              disabled: true,
            },
            // Mostrar combo de manguera desde editar
            ...(fromAsignar
              ? []
              : [
                  {
                    name: "manguera",
                    customComponent: (
                      <CustomDropdown
                        label="Manguera"
                        options={getValidNozzles(
                          selectNozzle.FuelPointId,
                          nozzle
                        )}
                        onSelectId={(id) => setMangueraId(id)}
                        variant="minimal"
                      />
                    ),
                  },
                ]),
            {
              name: "producto",
              customComponent:
                mangueraId !== null ? (
                  <div className="flex gap-2 items-end">
                    <div className="flex-1">
                      <CustomDropdown
                        label="Producto"
                        options={products.map((p) => ({
                          id: p.id,
                          label: p.name,
                        }))}
                        onSelectId={(id) => setProductoId(id)}
                        variant="minimal"
                      />
                    </div>

                    {mangueraId === getLastAssignedNozzle(selectNozzle) && (
                      <button
                        type="button"
                        className="w-32 h-10 bg-extras-rojo text-text-50 rounded-lg flex items-center justify-center"
                        onClick={() => setProductoId(0)}
                      >
                        Quitar <Trash className="ml-2" size={18} />
                      </button>
                    )}
                  </div>
                ) : null,
            },
          ].filter((input) => input.customComponent !== null)}
        />
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

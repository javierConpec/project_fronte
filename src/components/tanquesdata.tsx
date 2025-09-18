import React, { useEffect, useState } from "react";
import type { ITank } from "../types/tankData.type";
import tanksDataJSON from "../data/combustibles.json";
import { SectionTitle } from "./sectionTitle";
import { RiGasStationFill } from "react-icons/ri";
import { SpinnerClip } from "./Loader/spinner";
import Wave from "react-wavify";

const getColor = (level: number) => {
  if (level > 60) return "#1c3de3";
  if (level > 30) return "#4964e9";
  return "#b3bfe6";
};

const TanquesDashboard: React.FC = () => {
  const [tanksData, setTanksData] = useState<ITank[]>([]);
  const [animatedLevels, setAnimatedLevels] = useState<number[]>([]);

  useEffect(() => {
    // Simulamos carga
    setTimeout(() => {
      setTanksData(tanksDataJSON);
      setAnimatedLevels(tanksDataJSON.map(() => 0));

      setTimeout(() => {
        setAnimatedLevels(
          tanksDataJSON.map((tank: ITank) =>
            Math.round((tank.currentVolume / tank.capacity) * 100)
          )
        );
      }, 300);
    }, 500);
  }, []);

  return (
    <div className=" min-h-screen  rounded-xl">
      <header className="mb-6 p-2 text-center bg-background-0 pl-4 pt-5 rounded-xl">
        <SectionTitle icon={RiGasStationFill} title="Telemetria de Tanques" />
      </header>

      {tanksData.length === 0 ? (
        <div className="flex justify-center items-center h-[60vh]">
          <SpinnerClip />
        </div>
      ) : (
        <main className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tanksData.map((tank, index) => {
            const levelPercent = animatedLevels[index];
            const isLow = levelPercent < tank.minLevel;

            return (
              <div
                key={index}
                className="bg-background-0  rounded-lg shadow-3xl flex flex-col items-center"
              >
                {/* Tanque */}
                <div
                  className="relative w-[350px] mt-8 h-[160px] border-[3px] border-text-900 rounded-[50px] 
                bg-gradient-to-r from-background-0 to-text-50 
                shadow-[inset_0_0_25px_rgba(0,0,0,0.8),0_4px_25px_rgba(0,0,0,0.6)] overflow-hidden"
                >
                  
                  <div
                    className="absolute bottom-0 w-full "
                    style={{
                      height: `${levelPercent}%`,
                      transition: "height 2.5s ease-in-out",
                    }}
                  >
                    <Wave
                      fill={getColor(levelPercent)} // el color  
                      paused={false}
                      options={{
                        height: 5, // altura de la ola
                        amplitude: 10, // intensidad del movimiento
                        speed: 0.15, // velocidad de la animación
                        points: 5, // suavidad de la ola
                      }}
                    />
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-[140px] w-[2px] h-full bg-text-800"></div>
                  <div className="absolute bottom-0 left-1/2 translate-x-[140px] w-[2px] h-full bg-text-800"></div>

                  {/* Datos en el Tanque */}
                  <div className="absolute w-full bottom-6 text-center  text-text-900 flex flex-col gap-1">
                    <span className="uppercase font-bold text-xl">
                      {tank.type}
                    </span>
                    <span className="text-2xl">{levelPercent}%</span>
                    <span className=" font-semibold text-xl">
                      {tank.currentVolume}L
                    </span>
                  </div>
                </div>

                {/* Base  del tanque */}
                <div className="relative w-[260px] h-[6px] bg-[#666] flex justify-between mt-1">
                  <div className="w-[40px] h-[12px] bg-[#555] rounded-[3px]"></div>
                  <div className="w-[40px] h-[12px] bg-[#555] rounded-[3px]"></div>
                </div>

                {/* Información */}
                <div className="w-full max-w-md">
                  <h2 className="my-5 text-center font-extrabold text-2xl">{tank.name}</h2>
                  <table className="w-full">
                    <tbody className="text-sm">
                      <tr className="border-b  border-text-200  bg-background-50 ">
                        <td className="py-2 pl-4 font-bold text-text-900 w-40">
                          Tipo
                        </td>
                        <td className="py-2  w-4 text-center">:</td>
                        <td className="py-2 text-text-700">{tank.type}</td>
                      </tr>
                      <tr className="border-b border-text-200">
                        <td className="py-2 pl-4 font-bold text-text-900">
                          Volumen
                        </td>
                        <td className="py-2 text-center">:</td>
                        <td className="py-2 text-text-700">
                          {tank.currentVolume}L / {tank.capacity}L
                        </td>
                      </tr>
                      <tr className="border-b border-text-200 bg-background-50">
                        <td className="py-2 pl-4 font-bold text-text-900">
                          Pct Minimo
                        </td>
                        <td className="py-2 text-center">:</td>
                        <td className="py-2 text-text-700">{tank.minLevel}%</td>
                      </tr>
                      <tr className="border-b border-text-200">
                        <td className="py-2 pl-4 font-bold text-text-900">
                          Ubicación
                        </td>
                        <td className="py-2 text-center">:</td>
                        <td className="py-2 text-text-700">{tank.location}</td>
                      </tr>
                      <tr className="border-b border-text-200 bg-background-50">
                        <td className="py-2 pl-4 font-bold text-text-900">
                          Temperatura
                        </td>
                        <td className="py-2 text-center">:</td>
                        <td className="py-2 text-text-700">
                          {tank.temperature}°C
                        </td>
                      </tr>
                      <tr className="border-b border-text-200">
                        <td className="py-2 pl-4 font-bold text-text-900">
                          Presión
                        </td>
                        <td className="py-2 text-center">:</td>
                        <td className="py-2 text-text-700">
                          {tank.pressure} bar
                        </td>
                      </tr>
                      <tr className="border-b border-text-200 bg-background-50">
                        <td className="py-2 pl-4 font-bold text-text-900">
                          Cons. Diario
                        </td>
                        <td className="py-2 text-center">:</td>
                        <td className="py-2 text-text-700">
                          {tank.dailyConsumption} L
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 pl-4 font-bold text-text-900">
                          Estado
                        </td>
                        <td className="py-2 text-center">:</td>
                        <td className="py-2 text-text-700">{tank.status}</td>
                      </tr>
                      {isLow && (
                        <tr>
                          <td
                            colSpan={3}
                            className="py-2 text-extras-rojo text-center font-bold"
                          >
                            ¡Nivel crítico!
                          </td>
                        </tr>
                      )}
                      {tank.alert && (
                        <tr>
                          <td
                            colSpan={3}
                            className="py-2 text-extras-rojo text-center pb-5 font-bold"
                          >
                            {tank.alert}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </main>
      )}
    </div>
  );
};

export default TanquesDashboard;

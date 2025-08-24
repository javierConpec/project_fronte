import { useEffect, useState } from "react";
import type { Inozzle,InozzleUpdate } from "../types/nozzle.type";
import { nozzleService,nozzleUpdateService } from "../services/nozzleService";

export const useNozzle = () => {
    const [nozzle, setNozzle] = useState<Inozzle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState<string | null>(null);

    const fetchNozzle = async () => {
        try{
            const [nozzleData] = await Promise.all([nozzleService()]);
            setNozzle(nozzleData);
        }catch(err: any) {
            setError(err.message || "Error al obtener las mangueras")
        } finally {
            setLoading(false);
        }
    };

    const updateNozzle = async (updated: InozzleUpdate)=>{
        if(!updated.id || updated.fuelPointId == null || updated.nozzleNumber == null ){
            console.warn("Faltan datos para actualizar: ", updated)
            return;
        }
        try{
            await nozzleUpdateService({id: updated.id, fuelPointId: updated.fuelPointId, nozzleNumber : updated.nozzleNumber, productId : updated.productId})
            console.log ("Actualizando: ", updated);
            fetchNozzle();
        } catch ( err){
            console.error("Error al actualizar la manguera: ", err);
        }
    };

    useEffect(() =>{
        fetchNozzle();
    },[]);

    return {nozzle,loading,error, fetchNozzle, updateNozzle};
}
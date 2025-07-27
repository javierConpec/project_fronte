import { useEffect, useState } from "react";
import type { Inozzle } from "../types/nozzle.type";
import { nozzleService } from "../services/nozzleService";

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

    useEffect(() =>{
        fetchNozzle();
    },[]);

    return {nozzle,loading,error, fetchNozzle};
}
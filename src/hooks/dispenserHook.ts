import { useEffect, useState } from "react";
import type { Idispenser } from "../types/dispenser.type";
import { dispencerService } from "../services/dispenserService";

export const useDispenser = () =>{
    const [dispenser, setDispenser] = useState<Idispenser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<String | null>(null);

    const fetchDispenser = async () =>{
        try{
            const [dispenserData] = await Promise.all([dispencerService()]);
            setDispenser(dispenserData);
        }catch (err: any){
            setError(err.message || "Error al obtener los Surtidores")
        }finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        fetchDispenser();
    },[]);

    return {dispenser,loading,error,fetchDispenser}
}
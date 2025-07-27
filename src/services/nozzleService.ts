const API_MANUEL = import.meta.env.PUBLIC_API_URL_2;
import type {Inozzle, InozzleUpdate} from "../types/nozzle.type"

export const nozzleService = async():Promise<Inozzle[]> => {
    const response = await fetch (`${API_MANUEL}/Nozzle/pivot`)
    if(!response.ok) throw new Error ("Error al obtener las mangueras")
        const data = await response.json()
    return data as Inozzle[];
}
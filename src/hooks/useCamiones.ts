import { useState } from "react";
import { GetCamionesAdapter } from "../infraestructure/camiones/adapter/getCamionesAdapter";
import { Camion } from "../infraestructure/camiones/domain/dto/Camion";

export function useCamiones() {
    const [camiones, setCamiones] = useState<Camion[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const camionesAdapter = new GetCamionesAdapter()
    
    const getCamiones = async () => {
        setCamiones(null)
        setLoading(true);
        setError(null);
        try{
            const response = await camionesAdapter.execute();
            if(response.data){
                setCamiones(response.data);
            }
            else {
                throw response.error ?? new Error("Error al obtener las órdenes");
            }
        }
        catch (error) {
            if (error instanceof Error) {
                setError(error);
            } else {
                setError(new Error(String(error)));
            }
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return { camiones, loading, error,success, getCamiones };
}

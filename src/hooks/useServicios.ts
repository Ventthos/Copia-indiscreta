import { useState } from "react";
import { GetServiciosAdapter } from "../infraestructure/servicios/adapter/GetServiciosAdapter";
import { Servicio } from "../infraestructure/servicios/domain/dto/Servicio";

export function useServices() {
    const [services, setServices] = useState<Servicio[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const serviciosUseCase = new GetServiciosAdapter()

    async function getServicios(sucursalId: number){
        setLoading(true);
        setError(null);
        const response = await serviciosUseCase.execute(sucursalId);
        console.log(response);
        if(response.data){
            setServices(response.data);
        }
        else{
            if (response.error instanceof Error) {
                setError(response.error);
            }
        }
        setLoading(false);
    }

    return { services, loading, error, success, getServicios };
}
import { useEffect, useState } from "react";
import { Order } from "../infraestructure/orders/domain/dto/Order";
import { PatchOrderAdapter } from "../infraestructure/orders/adapter/patchOrderAdapter";
import { GerOrdersAdapter } from "../infraestructure/orders/adapter/getOrdersAdapter";
import { Operador } from "../objects/Operador";
import { Camion } from "../infraestructure/camiones/domain/dto/Camion";
import { ServicioOrden } from "../infraestructure/servicios/domain/dto/ServicioOrden";

export function useOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const OrdersAdapter = new GerOrdersAdapter()
    const patchOrderAdapter = new PatchOrderAdapter()

    const getOrders = async () => {
        setError(null);
        setLoading(true);
        
        try {
            const response = await OrdersAdapter.execute();
 
            if(response.data){
                setOrders(response.data);
            }
            else {
                throw response.error ?? new Error("Error al obtener las órdenes");
            }
        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false);
        }
    };

    const patchOrder = async (orderId: number, updates:{newState?: string, operador?: Operador, camion?: Camion, nuevoPrecio?: number, servicios?: ServicioOrden[], linkRastreo:string}) => {
        setLoading(true);
        setError(null);
        try {         
            const response = await patchOrderAdapter.execute(orderId, {status:updates.newState, operator:updates.operador, camion:updates.camion, nuevoPrecio:updates.nuevoPrecio, servicios:updates.servicios, linkCamion:updates.linkRastreo});
            if(response.data){
                setSuccess(response.data);
            }
            else {
                throw response.error ?? new Error("Error al actualizar la orden");
            }
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleError = (error: unknown) => {
        if (error instanceof Error) {
            setError(error);
        } else {
            setError(new Error(String(error)));
        }
        throw error;
    };

    return { orders, loading, error,success, getOrders, patchOrder };
}
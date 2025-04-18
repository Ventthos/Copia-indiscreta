import { createContext, useEffect, useState } from "react";
import { Order } from "../infraestructure/orders/domain/dto/Order";
import { useOrders } from "../hooks/useOrders";
import { Operador } from "../objects/Operador";
import { Camion } from "../infraestructure/camiones/domain/dto/Camion";
import { ServicioOrden } from "../infraestructure/servicios/domain/dto/ServicioOrden";

export interface MessageState {
    type: "error" | "warning" | "question" | "message" | "correct";
    mode: "waiting" | "accept" | "yesNo" | "retry" ;
    title: string;
    message: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    onRetry?: () => void;
}

interface OrderContextType {
    currentOrder: Order | null;
    setCurrentOrder: React.Dispatch<React.SetStateAction<Order | null>>;
    orders: Order[];
    getOrders: () => Promise<void>;
    patchOrder(orderId: number, updates: { 
        newState?: string, 
        operador?: Operador, 
        camion?: Camion, 
        nuevoPrecio?: number, 
        servicios?: ServicioOrden[],
        linkRastreo?:string
      }): Promise<void>;
    messageState: MessageState | null;
    setMessageState: (state: MessageState| null) => void;
    error: Error | null;
    loading: boolean;
    selectingTruck: boolean
    setSelectingTruck: (state: boolean) => void
    selectingServices: boolean
    setSelectingServices: (state: boolean) => void
    productEdited: boolean
    setProductEdited: (state: boolean) => void
    usingCalculator: boolean
    setUsingCalculator: (state: boolean) => void
    usingGallery: boolean
    setUsingGallery: (state: boolean) => void
}

export const OrderContext = createContext<OrderContextType>({
    currentOrder: null,
    setCurrentOrder: () => {},
    orders: [],
    getOrders: async () => {},
    patchOrder: async () => {},
    messageState: null,
    setMessageState: () => {},
    error: null,
    loading: false,
    selectingTruck: false,
    setSelectingTruck: () => {},
    selectingServices: false,
    setSelectingServices: () => {},
    productEdited: false,
    setProductEdited: () => {},
    usingCalculator: false,
    setUsingCalculator: () => {},
    usingGallery: false,
    setUsingGallery: () => {}
})


export function OrderContextProvider({ children }: { readonly children: React.ReactNode }) {
    const { orders, loading, error, getOrders, patchOrder } = useOrders();
    const [messageState, setMessageState] = useState<MessageState|null>(null);
    const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
    const [selectingTruck, setSelectingTruck] = useState<boolean>(false);
    const [selectingServices, setSelectingServices] = useState<boolean>(false);
    const [productEdited, setProductEdited] = useState<boolean>(false);
    const [usingCalculator, setUsingCalculator] = useState<boolean>(false);
    const [usingGallery, setUsingGallery] = useState<boolean>(false);

    /*
    useEffect(() => {

       if(loading){

        setMessageState({
            type: "message",
            mode: "waiting",
            title: "Cargando",
            message: "Cargando ordenes..."
        })
       }else if (!loading && messageState?.title == "Cargando") {
        setMessageState(null);  // Elimina el mensaje cuando termina de cargar
      }
      
    }, [loading])
   */
    useEffect(() => {
        if (currentOrder) {
            const updatedOrder = orders.find(order => order.id === currentOrder.id);
            if (updatedOrder) {
                setCurrentOrder(updatedOrder);
                
            }
            else{
                setCurrentOrder(orders[0]);
                setProductEdited(false)
                
            }
        } else if (orders.length > 0) {
            setCurrentOrder(orders[0]);
            setProductEdited(false)
        }
        
    }, [orders]);

    return (
        <OrderContext.Provider value={{ currentOrder, setCurrentOrder, orders, getOrders, patchOrder, messageState, 
        setMessageState, error, loading, selectingTruck,setSelectingTruck, selectingServices, setSelectingServices, productEdited, setProductEdited, usingCalculator, setUsingCalculator, usingGallery, setUsingGallery}}>
            {children}
        </OrderContext.Provider>
    );
}
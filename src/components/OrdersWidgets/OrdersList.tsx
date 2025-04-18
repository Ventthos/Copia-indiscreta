import { PedidoWidget } from "./OrderListWidget"
import { Pages } from "../../pages/Orders";
import { useEffect, useContext, useState, useRef, useCallback } from "react";
import { OrderContext } from "../../context/OrderContext";
import { List } from "../GeneralUse/List";
import { Order } from "../../infraestructure/orders/domain/dto/Order";
import { OrderState } from "../../objects/StateEnum";
import { twMerge } from "tailwind-merge";
import { setLoadingState } from "../../utils/SetLoadingState";

export function OrdersList({pageChanger, styles} : {readonly pageChanger: (page:Pages)=>void, readonly styles?:string}) {

  const {currentOrder, setCurrentOrder, orders, getOrders, productEdited, setProductEdited, setMessageState, loading, error} = useContext(OrderContext);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders)

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState(0);

  const stateMap = [
    {name:"Ninguno", value:0},
    {name:OrderState.PENDIENTE.toString(), value:1},
    {name:OrderState.COMPLETADO.toString(), value: 2},
    {name:OrderState.ACEPTADO.toString(), value: 3},
    {name:OrderState.RECHAZADO.toString(), value: 4},
    {name:OrderState.EN_PROCESO.toString(), value: 5}
  ];

  // Esto es solo para poder mostrar cosas mientras cargan los elementos de la lista real
  const elementosMuck = Array.from({ length: 8 });

  // Para poder detectar cuando traer más ordenes
  const observer = useRef<IntersectionObserver | null>(null);

  function openDetails(index:number) {
    // Si la pantalla es muy chica, lo mandamos directamente a detalles
    if(window.innerWidth <= 768){
      pageChanger(Pages.Details);
    }

    // Debemos encontrar que orden es, eso lo hacemos con el id
    const order = orders?.find((order)=>order.id == index);

    // Si no existe la orden (porque la eliminaron o algo asi) o la orden actual es la misma a la que le dieron clic no hacemos nada
    if(!order || (currentOrder && order.id == currentOrder.id)){
      return;
    }

    // Si la orden actual es diferente a la que le dieron clic y la actual está editada, le preguntamos si quiere cambiar de orden
    // Esto porque si no se perderán los cambios
    // Notese que cambiamos el pedido, y decimos que ya no estamos editando. Además, cerramos la pantalla de pregunta.
    if(productEdited){
      setMessageState(
        {
          type: "question",
          mode: "yesNo",
          title: "Confirmación",
          message: "¿Está seguro de que desea cambiar de orden? Se perderán los cambios.",
          onConfirm: ()=> {
            setProductEdited(false);
            setCurrentOrder(order);
            setMessageState(null);
          },
          onCancel: ()=> setMessageState(null)
        }
      )
      return
    }

    setCurrentOrder(order);
  }
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoadingState(setMessageState, "Cargando órdenes.")
        await getOrders();
        setCurrentOrder(orders[0]);
        setMessageState(null)
      } catch{
        setMessageState({
          type: "error",
          mode: "retry", 
          title: "Error al cargar pedidos",
          message: "Hubo un problema al cargar los pedidos.",
          onRetry: ()=>fetchOrders()
        });
      }
    };
  
    fetchOrders();
  }, []);

  // Filtrar las órdenes cuando se actualizan
  useEffect(()=>{
    if(filteredOrders.length == 0){
      setFilteredOrders(orders)
      return
    }

    applyFilters(searchTerm, selectedState);
  },[orders])

  // Esta será una función para poder hacer búsquedas. La búsqueda la hago en local para evitar un fetch cada que se escribe.
  // Si quieren que no sea así me dicen.
  function applyFilters(search: string, state: number) {
    let result = orders;

    if (state !== 0) {
      const stringState = stateMap.find((stateItem) => stateItem.value === state)?.name
      if(stringState){
        result = result?.filter(order => order.estadoOrden === stringState);
      }
      
    }
  
    if (search.trim() !== "") {
      result = result?.filter(order => {
        const fullName = `${order.cliente.nombre} ${order.cliente.apellido_pat} ${order.cliente.apellido_mat}`.toLowerCase();
        return fullName.includes(search.toLowerCase());
      });
    }
  
    setFilteredOrders(result);
  }


  // Maneja el input de búsqueda
function handleSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
  const value = e.target.value;
  setSearchTerm(value);
  applyFilters(value, selectedState);
}

  // Maneja el filtro por estado
  function handleFilterChange(value: number) {
    setSelectedState(value);
    applyFilters(searchTerm, value);
  }

  // Función para poder detectar cuando llega al último elemento de la lista
  const lastOrderRef = useCallback((node: HTMLDivElement | null) => {
    if (observer.current) observer.current.disconnect();
  
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        console.log("Cargar más órdenes...");
      }
    });
  
    if (node) observer.current.observe(node);
  }, []);

  return (
    <List title="Pedidos" containerStyles={twMerge("min-w-[16.25rem] border-r-5 border-r-(--background-gray) h-[calc(100vh-1rem)] md:h-[calc(100vh-2rem)]", styles)}
    onSearchInput={handleSearchInput}
    filters={stateMap} onFilterSelected={handleFilterChange}>
      {
        (orders.length ==0 && (loading || error)) ? 
          elementosMuck.map((_, index) => (
            <div key={index} className="w-full h-14 rounded-md mb-2 animate-pulse bg-(--background-gray)"></div>
          ))
        :
        filteredOrders?.map((order, index) => {
          const isLast = index === filteredOrders.length - 1;
        
          return (
            <div
              key={order.id}
              ref={isLast ? lastOrderRef : null}
            >
              <PedidoWidget
                nombre={`${order.cliente.nombre} ${order.cliente.apellido_pat}`}
                estado={order.estadoOrden}
                imagenURL="src/assets/img/person.png"
                onClick={() => openDetails(order.id)}
                active={currentOrder?.id === order.id}
              />
            </div>
          );
        })
      }
      {loading && orders.length != 0 && <p className="text-(--accent-gray)">Cargando...</p>}
    </List>
  );
}

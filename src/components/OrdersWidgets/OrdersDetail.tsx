import { useContext, useEffect, useState } from "react";
import { ContainerWithDescription } from "../GeneralUse/ContainerWithDescription";
import { OrderContext } from "../../context/OrderContext";
import { UserContext } from "../../context/UserContext";
import { Operador } from "../../objects/Operador";
import { StateWidget } from "./OrderListWidget";
import { ServicioListWidget } from "../Servicios/ServicioListWidget";
import { GreenButton } from "../GeneralUse/GreenButton";
import { twMerge } from "tailwind-merge";
import { ServicioOrden } from "../../infraestructure/servicios/domain/dto/ServicioOrden";
import { setLoadingState } from "../../utils/SetLoadingState";

export function OrdersDetail({styles}:{readonly styles?: string}) {
  const {currentOrder, patchOrder, getOrders, setMessageState,  setSelectingTruck, setSelectingServices, productEdited, setProductEdited, orders, setUsingGallery} = useContext(OrderContext);
  const {currentUser} = useContext(UserContext);
  const [precio, setPrecio] = useState<number>(0)
  const [suggestedPrice, setSuggestedPrice] = useState<number>(0)
  const [linkRastreo, setLinkRastreo] = useState<string>("")

  async function changeState(state:string){
    try{
      setLoadingState(setMessageState, "Actualizando estado")
      await patchOrder(currentOrder!.id, {newState:state, operador:currentUser as Operador});
      await getOrders();
      setMessageState({
        type: "correct",
        mode: "accept",
        title: "Éxito",
        message: "Se ha actualizado el estado de la orden",
        onConfirm: () => {
          setMessageState(null)
        }
      })
    }
    catch(error){
      if(error instanceof Error)
        setMessageState({
          type: "error",
          mode: "accept",
          title: "Error",
          message: error.message,
          onConfirm: () => {
            setMessageState(null)
          }
        })
    }
  }

  const areArraysEqual = (a:any, b:any) => 
    Array.isArray(a) && Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);


  // Aquí se manejan los cambios para saber que actualizar
  async function handleChanges(){
    if(productEdited && currentOrder){
      // Tenemos que saber que cambio para poder saber que actualizar
      // Para esto defino un diccionario que me va a ayudar a saber que actualizar
      // El operador va por defecto el que está guardado acrtualmente en el contexto
      const cambios: { nuevoPrecio?: number, servicios?: ServicioOrden[], operador:Operador, linkRastreo?: string} = {operador:currentUser as Operador}

      // Si el precio cambio, lo actualizamos
      if(currentOrder.costoTotal != precio){
        console.log("cambios", precio)
        cambios.nuevoPrecio = precio
      }


      // Si los servicios cambiaron, lo actualizamos
      if (!areArraysEqual(
        orders.find(order => order.id === currentOrder.id)?.servicios,
        currentOrder.servicios
      )) {
        cambios.servicios = currentOrder.servicios;
      }
      
      if(currentOrder.linkRastreo != linkRastreo){
        cambios.linkRastreo = linkRastreo
      }
      
      try{
        setLoadingState(setMessageState, "Actualizando orden.")
        await patchOrder(currentOrder.id, cambios);  
        await getOrders();
        setMessageState({
          type: "correct",
          mode: "accept",
          title: "Éxito",
          message: "Se han actualizado los elementos de la orden",
          onConfirm: () => {
            setMessageState(null)
          }
        })
        setProductEdited(false)
      }
      catch(error){
        if(error instanceof Error)
          setMessageState({
            type: "error",
            mode: "accept",
            title: "Error",
            message: error.message,
            onConfirm: () => {
              setMessageState(null)
            }
          })
      }

      
    }
  }

  // Aquí es donde controlamos el input que pone el usuario
  function handleChangePriceEvent(event:React.ChangeEvent<HTMLInputElement>){
    // Siempre y cuando haya una orden
    if(currentOrder){
      // Sabemos que la orden ha sido editada, entonces lo notificamos
      setProductEdited(true)

      // Checamos que el precio no sea vacio o que hayan puesto un numero que sea 0 o menor
      if(event.target.value === "" ||event.target.valueAsNumber <= 0){
        // Si eso no pasa, lo regresamos a 1
        setPrecio(1)
        return
      }
      // Si no, si actualizamos
      setPrecio(event.target.valueAsNumber)
    }
  }

  // Función para manejar que hayan escrito un nuevo Link
  function handleChangeLinkEvent(event:React.ChangeEvent<HTMLInputElement>){
    if(currentOrder){
      setProductEdited(true)
      setLinkRastreo(event.target.value)
    }
}

  // Nueva función para poder saber el precio que se sugiere para la orden
  function suggestPrice(){
    if(currentOrder){
      let precio = 0
      currentOrder.servicios.forEach(servicio => {
        precio += servicio.precio
      })
      setSuggestedPrice(precio)
    }
  }

  // Esto es solo para que se pueda poner el precio de la orden en el input y poder controlarlo
  useEffect(() => {
    if(currentOrder && !productEdited){
      setPrecio(currentOrder.costoTotal);
      setLinkRastreo(currentOrder?.linkRastreo ?? "")
    }
  }, [currentOrder])

  useEffect(() => {
    if(currentOrder?.servicios){
      suggestPrice()
    }
    
  }, [currentOrder])

  return (
    <div className={twMerge("h-[calc(100vh-4.5rem)] md:h-[calc(100vh-5.5rem)] lg:h-[calc(100vh-2rem)] flex flex-col bg-white p-4 rounded-r-2xl  gap-6", styles)}>
      <div className="overflow-y-auto flex flex-col gap-6">
        <div className="flex flex-col w-full">
          <p className="font-bold text-xl">Datos del pedido</p>
        </div>
        
        {/* Contenedor con la información del cliente*/}
        <ContainerWithDescription title="Cliente" containerStyles={`flex-row ${!currentOrder && "min-h-18 animate-pulse"}`}>
          { currentOrder &&
            <>
            <img src="src/assets/img/person.png" alt="Cliente" className="h-12 w-12"/>
            <div className="">
                
              <p><strong>{currentOrder?.cliente.nombre} {currentOrder?.cliente.apellido_pat} {currentOrder?.cliente.apellido_mat}</strong></p>
              <p>{currentOrder?.cliente.telefono}</p>
            </div>
            </>
          }
          
        </ContainerWithDescription>
        
        {/* Contenedor con detalles de la órden, como dirección, precio y estado*/}
        <ContainerWithDescription title="Pedido" containerStyles={`${!currentOrder && "min-h-50 animate-pulse"}`}>
          {currentOrder &&
            <>
              <ContainerWithDescription title="Dirección" titleStyles="text-(--accent-gray) font-normal" containerStyles="p-0">
                <p className="font-bold">345 C. 45ᴬ , Col. San Francisco de
                Motejo II, Mperida, Yucatán</p>
              </ContainerWithDescription>

              <ContainerWithDescription title="Precio" titleStyles="text-(--accent-gray) font-normal" containerStyles="p-0">
                <div className="flex gap-1">
                  <p className="font-bold">$ </p>
                  <input className="bg-white border-2 rounded-md px-2 max-w-27.5 inline" value={precio} type="number" onChange={handleChangePriceEvent}/>
                  <p className="font-bold"> MXN</p>
                  
                </div>
                {productEdited && <p>Precio sugerido: ${suggestedPrice} MXN</p>}
              </ContainerWithDescription>


              <ContainerWithDescription title="Fecha" titleStyles="text-(--accent-gray) font-normal" containerStyles="p-0">
                <p className="font-bold">{currentOrder?.fecha}</p>
              </ContainerWithDescription>

              <ContainerWithDescription title="Estado" titleStyles="text-(--accent-gray) font-normal" containerStyles="p-0">
                <StateWidget estado={currentOrder?.estadoOrden ?? ""} styles="self-start"/>
              </ContainerWithDescription>

              <GreenButton title="Ver imagenes adjuntas" styles="w-full" onClick={()=>setUsingGallery(true)}/>
            </>
          }
           
          
        </ContainerWithDescription>

        {/* Container con los productos de la orden*/}
        <div>
          <ContainerWithDescription title="Servicios" containerStyles="max-h-110 overflow-y-auto">
            { (currentOrder?.servicios && currentOrder?.servicios?.length > 0) ?
              currentOrder?.servicios.map((servicio) => (
                <ServicioListWidget key={servicio.id} nombre={servicio.nombre} imagen={servicio.imagen} cantidad={servicio.cantidad} precio={servicio.precio}/>
              ))
              :
              <p>No hay servicios para mostrar</p>
            }
          </ContainerWithDescription>
          <GreenButton title="Editar productos" styles="w-full" onClick={()=>setSelectingServices(true)}/>
        </div>
        
        {/* Container con cosas relacionadas al personal y cosas asi */}
        <ContainerWithDescription title="Administración" containerStyles={`${!currentOrder && "min-h-30 animate-pulse"}`}>
          {currentOrder &&
            <>
              <ContainerWithDescription title="Operador" titleStyles="text-(--accent-gray) font-normal" containerStyles="p-0">
                {currentOrder?.operador ?
                  <div className="flex gap-1">
                    <p className="font-bold">{currentOrder?.operador.nombre} {currentOrder?.operador.apellido_pat} {currentOrder?.operador.apellido_mat}</p>
                  </div>
                  :
                  <p className="font-bold">Sin operador asignado</p>
                }
              </ContainerWithDescription>
              <ContainerWithDescription title="Choferes" titleStyles="text-(--accent-gray) font-normal" containerStyles="p-0 gap-1">
                {currentOrder?.camion?.choferes || currentOrder.camion?.choferes?.length == 0 ?
                  currentOrder?.camion?.choferes.map(chofer =>{
                    return(
                      <div key={chofer.id} className="flex gap-1">
                        <p className="font-bold">{chofer.nombre} {chofer.apellido_pat} {chofer.apellido_pat}</p>
                      </div>
                    )
                  })
                  :
                  <p className="font-bold">Sin choferes asignados</p>
                }
              </ContainerWithDescription>
              <ContainerWithDescription title="Enlace al rastreo del camión" titleStyles="text-(--accent-gray) font-normal" containerStyles="p-0">
                <div>
                  <input type="url" onChange={handleChangeLinkEvent} className="bg-white rounded-md w-full border-2 border-black px-2" value={linkRastreo}/>
                </div>
              </ContainerWithDescription>
            </>
          }
        </ContainerWithDescription>

      </div>
         
      <div className="flex w-full justify-center flex-wrap gap-1">
        <div  className="flex w-full">
          <button className="py-2 px-4 bg-[#cf2323] rounded-md text-white font-sm hover:bg-[#e64343] transition duration-300 h-full mr-1 flex-1"
          onClick={()=>{
            setMessageState(
              {
                type: "question",
                mode: "yesNo",
                title: "Confirmación",
                message: "¿Está seguro de que desea cancelar la orden?",
                onConfirm: ()=> changeState("Rechazado"),
                onCancel: ()=> setMessageState(null)
              }
            )
          }}>Rechazar</button>
          <button className="py-2 px-4 bg-(--mainColor) rounded-md text-black hover:bg-[#99FFC7] transition duration-300 h-full flex-1"
          onClick={async () => setSelectingTruck(true)}>Aceptar</button>
        </div>
        

        <button className={twMerge("py-2 px-4 bg-white rounded-md text-black hover:bg-[#c9c3c3] transition duration-300 border-3 border-black disabled:bg-[#c9c3c3] w-full", `${productEdited&& "animate-blinkGreen"}`)}
        onClick={handleChanges} disabled={!productEdited}>Guardar cambios</button>
        
        
      </div>
    </div>
  );
}

import { useContext, useEffect } from "react"
import { OrderContext } from "../../context/OrderContext"
import { CamionWidget } from "./CamionWidget";
import { Camion } from "../../infraestructure/camiones/domain/dto/Camion";
import { useCamiones } from "../../hooks/useCamiones";
import { ButtonImage } from "../GeneralUse/ButtonImg";
import { UserContext } from "../../context/UserContext";
import { Operador } from "../../objects/Operador";
import { setLoadingState } from "../../utils/SetLoadingState";

export function TruckSelectionPage(){
    const {selectingTruck, setSelectingTruck, patchOrder, currentOrder, setMessageState, error, getOrders} = useContext(OrderContext)
    const {camiones, getCamiones, loading} = useCamiones()
    const {currentUser} = useContext(UserContext);
    
    useEffect(() => {
        const fetchCamiones = async () => {
            try {
                setLoadingState(setMessageState, "Obteniendo camiones")
                await getCamiones();
                setMessageState(null);
            } catch(error) {
                if(error instanceof Error)
                    setMessageState({
                        type: "error",
                        mode: "retry",
                        title: "Error",
                        message: "Error al cargar los camiones de la sucursal.",
                        onRetry: () => {
                            fetchCamiones();
                        }
                    });
            }
        }

        if (selectingTruck) {
            fetchCamiones()    
        }
    }, [selectingTruck]);


    const elementosMuck = Array.from({ length: 8 });

    async function changeState(state:string, camion:Camion){
        try{
            setLoadingState(setMessageState, "Asignando camión.")
            await patchOrder(currentOrder!.id, {newState:state, camion:camion, operador:currentUser as Operador});
            await getOrders();
            setMessageState({
              type: "correct",
              mode: "accept",
              title: "Éxito",
              message: "Se ha aceptado la orden",
              onConfirm: () => {
                setMessageState(null)
              }
            })
            setSelectingTruck(false)
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

    return(
        <>
            {selectingTruck && (
                <div className="w-full h-full bg-black/40 absolute flex place-content-center items-center z-10">
                    <div className="w-8/10 bg-[#e2e2e2] rounded-md h-8/10 flex flex-col">
                        <div className="bg-(--dark-gray) p-2 lg:px-5 lg:py-3 rounded-t-md flex gap-1.5">
                            <ButtonImage iconURL="src/assets/img/backButton.jpg" iconStyles="h-5.25 w-5.5" buttonStyles="p-2 bg-(--dark-gray)" onClick={()=>setSelectingTruck(false)}/>
                            <h1 className="text-2xl/10  font-bold text-center text-white">Seleccionar camión</h1>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 p-2 gap-2 overflow-auto">
                            {
                                camiones && !loading? 
                                (
                                    camiones.map((camion: Camion) => (
                                        <CamionWidget key={camion.id_camion} camion={camion} assignFunction={()=>changeState("Aceptado", camion)}/>
                                    ))
                                )
                                :
                                elementosMuck.map((_, index) => (
                                    <div key={index} className="w-full h-50 rounded-md mb-2 animate-pulse bg-(--accent-gray-light)"></div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            )}
        </>     
    )
}
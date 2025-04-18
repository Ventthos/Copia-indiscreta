import { useEffect, useState } from "react"
import { CamionWidget } from "../components/Camiones/CamionWidget"
import { NavBarAsideComponent } from "../components/NavBar/NavBarAside"
import { useCamiones } from "../hooks/useCamiones"
import { MessageWindow } from "../components/GeneralUse/MessageWindow"
import { MessageState } from "../context/OrderContext"

export function Camiones(){
    const { camiones, getCamiones, loading} = useCamiones()
    const [messageState, setMessageState] = useState<MessageState|null>()
    const elementosMuck = Array.from({ length: 8 });
    useEffect(()=>{
        const fetchCamiones = async () => {
            try {
              await getCamiones();
            } catch{
              setMessageState({
                type: "error",
                mode: "retry", 
                title: "Error al cargar pedidos",
                message: "Hubo un problema al cargar los camiones de la sucursal.",
                onRetry: ()=>fetchCamiones()
              });
            }
          };
        
        fetchCamiones();
      

    },[])

    useEffect(() => {
        if (loading) {
            setMessageState({
                type: "message",
                mode: "waiting",
                title: "Cargando",
                message: "Cargando camiones..."
            })
        } else if (!loading && messageState?.title == "Cargando") {
            setMessageState(null); 
        }
    }, [loading])
    
    return(
        <NavBarAsideComponent>
            <main className="relative">
                {messageState && <MessageWindow {...messageState} />}
                <div className="bg-white h-[100dvh] p-4">

                    <div className="h-[calc(100%-5rem)]">
                        <div className="bg-(--dark-gray) rounded-t-md">
                            <p className="text-white text-2xl py-6 px-4 font-bold">Camiones de la sucursal</p>
                        </div>
                        <div className="bg-(--background-gray) rounded-b-md h-full">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 xl:grid-cols-4 p-3 overflow-y-auto h-auto max-h-full">
                                {
                                    camiones ? 
                                    (
                                        camiones.map((camion)=>(
                                            <CamionWidget key={camion.id_camion} camion={camion} activateButtonToAsign={false}/>
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
                </div>
            </main>
        </NavBarAsideComponent>
    )
}
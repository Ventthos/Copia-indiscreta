import { Camion } from "../../infraestructure/camiones/domain/dto/Camion"
import { Chofer } from "../../objects/Chofer"
import { GreenButton } from "../GeneralUse/GreenButton"
import { ChoferWidget } from "./ChoferWidget"

export function CamionWidget({camion, assignFunction, activateButtonToAsign=true }:{readonly camion: Camion, readonly assignFunction?: ()=>void, readonly activateButtonToAsign?: boolean}){

    return(
        <div className="bg-white p-3 rounded-md flex flex-col">
            <div className="flex flex-row place-content-between gap-3">
                <div>
                    <h1 className="font-bold text-lg">{camion.modelo}</h1>
                    <p>Capacidad: {camion.capacidad} L </p>       
                </div>

                <div>
                    <p>Estado:</p>
                    <p><strong>{camion.disponibilidad?"Disponible" : "Ocupado"}</strong></p>
                </div>
            </div>
   
            <div className="mt-2 flex-1">
                <p><strong>Choferes: </strong></p>
                {
                    camion.choferes && camion.choferes.length>0?               
                    <div className="flex flex-col gap-2">
                        {camion.choferes?.map((chofer: Chofer) => (
                            <ChoferWidget key={chofer.id} id={chofer.id} nombre={chofer.nombre} telefono={chofer.telefono} nombreSucursal={chofer.sucursal.nombre}/>
                        ))}
                    </div>
                    :
                    
                    <p>No hay choferes para mostrar.</p>
                    
                }
                
            </div>
            { activateButtonToAsign && camion.disponibilidad && <GreenButton title="Asignar" onClick={assignFunction}/>}
            
        </div>
   
    )
}
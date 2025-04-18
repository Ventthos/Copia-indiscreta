import { useState } from "react"
import { twMerge } from "tailwind-merge"
type Props = {
    readonly nombre: string,
    readonly estado: string,
    readonly imagenURL: string
    readonly onClick?: () => void,
    readonly active: boolean
}

const estadoColores: Record<string, string> = {
    pendiente: "bg-yellow-400",
    completado: "bg-green-500",
    aceptado: "bg-green-300",
    rechazado: "bg-red-500",
    en_proceso: "bg-blue-400"
};

export function StateWidget({estado, styles}: {readonly estado: string, readonly styles?:string}){
    return(
        <div className={twMerge("rounded-full p-2", `${estadoColores[estado.toLowerCase()]}`, styles)}>
            <p className="text-sm text-white">{estado}</p>
        </div>
    )

}

export function PedidoWidget({ nombre, estado, imagenURL, onClick, active}: Props){
    const [hovered,setHovered] = useState(false)

    return(
        <button className={twMerge("flex p-2 items-center relative border-b-2 border-b-(--background-gray) w-full", `${active && "bg-(--background-gray)"}`)} onClick={onClick} 
        onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
            <div className="flex items-center gap-2 max-w-7/10 text-left">
                <img src={imagenURL} alt="" className="w-9"/>
                <div>
                    <p className="font-bold text-sm">{nombre}</p>
                    <div className={twMerge("rounded-full ", `${estadoColores[estado.toLowerCase()]}`, `${hovered? "w-auto px-2 py-1": "w-4 h-4"}`)}>
                        {hovered && <p className="text-xs text-white">{estado}</p>}
                    </div>
                </div>
                
            </div>
        </button>
    )

}
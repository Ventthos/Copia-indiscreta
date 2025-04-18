import { useState } from "react";
import { GreenButton } from "../GeneralUse/GreenButton";

type props = {
    readonly id: number,
    readonly title: string,
    readonly imagen: string,
    readonly precio: number
    readonly onClickAdd?: (id: number, quantity: number, precio: number) => void
}

export function ServiciosWidget({id, title, imagen, precio, onClickAdd}:props){
    const [count, setCount] = useState<number>(1);

    function manageInput(event: any){
        const value = Number(event.target.value);
        if(value < 1){
            event.target.value = 1
            return
        }
        setCount(value)
    }

    return(
        <div className="flex flex-col gap-2 p-3 bg-white rounded-lg items-center">
            <img src={imagen} alt="" className="w-30 h-30 rounded-md"/>
            <div className="w-full flex flex-col items-center flex-1">
                <h2 className="font-bold text-xl text-center">{title}</h2>
                <p className="text-lg">${precio} MXN</p>
            </div>
            <div className="flex">
                <input type="number" min={1} className="border border-(--accent-gray) p-1 flex-1 h-10 rounded-none rounded-l-md text-right w-full" value={count} onChange={manageInput}/>
                <GreenButton title="Agregar" styles="m-0 h-10 rounded-none p-2 rounded-r-md" onClick={() => onClickAdd?.(id, count, precio)} />
            </div>
        </div>
    )

}
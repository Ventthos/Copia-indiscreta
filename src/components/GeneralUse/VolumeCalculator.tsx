import { useState } from "react";
import { DraggableWindow } from "./DraggableWindow";
import { InputWithLabel } from "./InputWithLabel";
import { GreenButton } from "./GreenButton";



export function VolumeCalculator({closeFunction}: {closeFunction?: ()=>void}){
    // States necesarios para poder manejar los inputs
    const [altitude, setAltitude] = useState(1)
    const [width, setWidth] = useState(1)
    const [length, setLength] = useState(1)
    const [volume, setVolume] = useState(1)

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, changer: React.Dispatch<React.SetStateAction<number>>) {
        const value = event.target.value;
        
        // Si el campo está vacío, lo mantenemos en 0
        if (value === "") {
            changer(0);
            return
        }
        
        const data = Number(value);  
        // Si el valor es negativo , no actualiza el estado
        if (data < 0) {
            return;
        }
    
        // Si el valor es válido, actualiza el estado
        changer(data);
    }

    // Función para calcular el volumen, la misma fórmula de siempre
    function calculateVolume(){
        let volume = altitude * width * length
        volume = Math.round(volume * 1000) / 1000
        setVolume(volume)
    }
    return(
        <DraggableWindow closeFunction={closeFunction}>
            <div className="w-full flex flex-col gap-2">
                <InputWithLabel
                    text="Ancho"
                    inputType="number"
                    inputStyles="font-md py-1"
                    value={width.toString()}
                    onChange={(e) => handleInputChange(e, setWidth)}
                    messureUnit="m"
                />
                <InputWithLabel
                    text="Largo"
                    inputType="number"
                    inputStyles="font-md py-1"
                    value={length.toString()}
                    onChange={(e) => handleInputChange(e, setLength)}
                    messureUnit="m"
                />
                <InputWithLabel
                    text="Alto"
                    inputType="number"
                    inputStyles="font-md py-1"
                    value={altitude.toString()}
                    onChange={(e) => handleInputChange(e, setAltitude)}
                    messureUnit="m"
                />

                <div className="flex flex-col items-center mt-1">
                    <p className="text-center">Total: {volume}m</p>
                    <GreenButton title="Calcular" styles="m-0 py-1 self-center" onClick={calculateVolume}/>
                </div>
            </div>
        </DraggableWindow>
    )
}
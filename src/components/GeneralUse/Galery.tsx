import { useReducer, useState } from "react";
import { IoCaretBack, IoCaretForward } from "react-icons/io5";

function reducerGallery(state: { currentIndex: number; list: string[] }, action: "BACK" | "FORWARD") {
    const maxIndex = state.list.length - 1;

    switch (action) {
        case 'BACK':
            return {
                ...state,
                currentIndex: state.currentIndex === 0 ? maxIndex : state.currentIndex - 1,
            };
        case 'FORWARD':
            return {
                ...state,
                currentIndex: state.currentIndex === maxIndex ? 0 : state.currentIndex + 1,
            };
        default:
            return state;
    }
}

export function Galllery({imageUrlList , closeFunction}:{readonly imageUrlList:string[], readonly closeFunction?: ()=> void}) {

   

    const [imagesList, dispatch] = useReducer(reducerGallery, {
        currentIndex:0,
        list:imageUrlList
    })

    return (
        <div className="w-full h-[100dvh] bg-black/80 absolute flex flex-col items-center z-50 overflow-hidden py-2 px-2 md:px-4">

            <div className="flex items-center justify-center w-full h-9/10 overflow-hidden">
                {
                    imagesList.list && imagesList.list.length>0 ?
                    <img
                        src={imagesList.list[imagesList.currentIndex]}
                        alt={`Imagen ${imagesList.currentIndex}`}
                        className="max-h-full max-w-full object-contain"
                    />
                    :
                    <p className="text-white">No hay imagenes para mostrar</p>
                }
                
            </div>

            {/* Controles siempre visibles */}
            <div className="flex items-center gap-4 text-white px-4">
                <button className="bg-(--accent-gray) p-2 rounded-md hover:bg-(--accent-gray-light) transition duration-300" onClick={()=>dispatch("BACK")}><IoCaretBack /></button>
                <p>{`${imagesList.currentIndex+1}/${imagesList.list.length}`}</p>
                <button className="bg-(--accent-gray) p-2 my-2 rounded-md hover:bg-(--accent-gray-light) transition duration-300" onClick={()=>dispatch("FORWARD")}><IoCaretForward /></button>
            </div>
            <button className="text-white bg-(--accent-gray) py-1 px-4 rounded-md hover:bg-(--accent-gray-light) transition duration-300"
            onClick={closeFunction}>Cerrar</button>
        </div>
    );
}
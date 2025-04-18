import { useContext } from "react";
import { OrderContext } from "../../context/OrderContext";
import { Galllery } from "../GeneralUse/Galery";

export function GalleryManager(){
    const {currentOrder, usingGallery, setUsingGallery} = useContext(OrderContext)
    return(
        <>
            {
                currentOrder&& usingGallery && <Galllery imageUrlList={currentOrder.imagenesOrden} closeFunction={()=>setUsingGallery(false)} />
            }
        </>
    )
}
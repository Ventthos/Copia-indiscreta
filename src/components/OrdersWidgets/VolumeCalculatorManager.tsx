import { useContext } from "react"
import { OrderContext } from "../../context/OrderContext"
import { VolumeCalculator } from "../GeneralUse/VolumeCalculator"

export function VolumeCalculatorManager(){
    const {usingCalculator, setUsingCalculator} = useContext(OrderContext)
    return(
        <>
            {usingCalculator && 
                <VolumeCalculator closeFunction={()=>setUsingCalculator(false)}/>
            }
        </>
    )  
}
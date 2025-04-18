import { MessageState } from "../objects/MessageState";

export function  setLoadingState(setState:(state: MessageState | null) => void, body:string){
    setState({
        type: "message",
        mode: "waiting",
        title: "Cargando",
        message: body
    })
}
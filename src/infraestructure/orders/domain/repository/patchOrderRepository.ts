import { patch } from "../../../../services/patch";
import { Operador } from "../../../../objects/Operador";
import { ordersUrl } from "../../../../config/apiUrls";
import { Camion } from "../../../camiones/domain/dto/Camion";
import { ServicioOrden } from "../../../servicios/domain/dto/ServicioOrden";

export class PatchOrderRepository{
    async execute(id:number, body:{estadoOrden?: string, operador?: Operador, camion?:Camion, costoTotal?: number, servicios?: ServicioOrden[], linkRastreo?:string }){
        console.log(body)
        return await patch(ordersUrl + id, body)
    }
}


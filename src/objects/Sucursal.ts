import { Direccion } from "./Direccion"
import { Servicio } from "../infraestructure/servicios/domain/dto/Servicio"

export type Sucursal = {
    id_sucursal:number,
    nombre: string,
    direccion?: Direccion,
    servicios?: (Servicio | number)[]
}
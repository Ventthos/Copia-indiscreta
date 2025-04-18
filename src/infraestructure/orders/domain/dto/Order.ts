import { Cliente } from "../../../../objects/Cliente"
import { Operador } from "../../../../objects/Operador"
import { Camion } from "../../../camiones/domain/dto/Camion"
import { ServicioOrden } from "../../../servicios/domain/dto/ServicioOrden"

export type Order = {
    id: number,
    cliente: Cliente,
    imagenesOrden: string[],
    servicios: ServicioOrden[],
    costoTotal: number,
    estadoOrden: string,
    fecha: Date,
    ubicacion: string,
    operador?: Operador,
    camion?: Camion,
    chatId?:number
    calificacionCliente?: number,
    calificacionOperador?: number,
    calificacionCamion?: number
    linkRastreo?: string
}
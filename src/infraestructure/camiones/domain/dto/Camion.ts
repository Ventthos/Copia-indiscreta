import { Chofer } from "../../../../objects/Chofer";
import { Sucursal } from "../../../../objects/Sucursal"
export type Camion = {
    id_camion:number;
    modelo:string;
    capacidad:number;
    disponibilidad:boolean;
    sucursal?:Sucursal;
    choferes?: Chofer[];
}
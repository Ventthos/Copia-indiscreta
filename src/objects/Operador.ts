import { Usuario } from "./User";
import { Sucursal } from "./Sucursal";

export class Operador extends Usuario {
    id_operador: number;
    sueldo?: number;
    sucursal: Sucursal;
    calificacion?: number;

    constructor(
        id: number,
        nombre: string,
        apellido_pat: string,
        apellido_mat: string,
        telefono: string,
        correo: string,
        sucursal: Sucursal,
        id_operador: number,
        sueldo?: number,
        calificacion?: number,
        pass_hash?: string
    ) {
        super(id, nombre, apellido_pat, apellido_mat, telefono, correo, pass_hash);
        this.id_operador = id_operador;
        this.sucursal = sucursal;
        this.sueldo = sueldo;
        this.calificacion = calificacion;
    }

    
}
import { Usuario } from "./User";
import { Direccion } from "./Direccion";

export class Cliente extends Usuario {
    id_cliente: number;
    calificacion?: number;
    direcciones?: Direccion[];

    constructor(
        id: number,
        nombre: string,
        apellido_pat: string,
        apellido_mat: string,
        telefono: string,
        correo: string,
        id_cliente: number,
        calificacion?: number,
        direcciones?: Direccion[],
        pass_hash?: string
    ) {
        super(id, nombre, apellido_pat, apellido_mat, telefono, correo, pass_hash);
        this.id_cliente = id_cliente;
        this.calificacion = calificacion;
        this.direcciones = direcciones;
    }
}
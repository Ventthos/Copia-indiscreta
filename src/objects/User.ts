export class Usuario {
    id: number;
    nombre: string;
    apellido_pat: string;
    apellido_mat: string;
    telefono: string;
    correo: string;
    pass_hash?: string;

    constructor(
        id: number,
        nombre: string,
        apellido_pat: string,
        apellido_mat: string,
        telefono: string,
        correo: string,
        pass_hash?: string
    ) {
        this.id = id;
        this.nombre = nombre;
        this.apellido_pat = apellido_pat;
        this.apellido_mat = apellido_mat;
        this.telefono = telefono;
        this.correo = correo;
        this.pass_hash = pass_hash;
    }
}

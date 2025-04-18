type props = {
    readonly id: number;
    readonly nombre: string;
    readonly telefono: string;
    readonly nombreSucursal: string;
}
export function ChoferWidget({ nombre, telefono}: props){
    return(
        <div className="bg-(--background-gray) rounded-md p-2">
            <p><strong>Nombre:</strong> {nombre}</p>
            <p><strong>Telefono:</strong> {telefono}</p>
        </div>
   
    )
}
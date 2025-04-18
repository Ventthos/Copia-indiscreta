type props = {
    readonly nombre: string,
    readonly imagen: string,
    readonly cantidad: number
    readonly precio: number
    readonly children?: React.ReactNode
}

export function ServicioListWidget({ nombre, imagen, cantidad, precio, children}: props){
    return(
        <div className="flex gap-2 items-center bg-white px-2.25 py-2 rounded-lg">
            <img src={imagen} alt={nombre} className="h-14 w-14 rounded-full"/>
            <div>     
                <p><strong className="text-ellipsis">{nombre}</strong></p>
                <p>Cantidad: {cantidad}</p>
                <p>Total: ${precio} MXN</p>
                {children}
            </div>       
        </div>
    )
}
import { use, useContext, useEffect, useState } from "react";
import { List } from "../GeneralUse/List";
import { ServiciosWidget } from "./ServiciosWidget";
import { OrderContext } from "../../context/OrderContext";
import { ServicioListWidget } from "./ServicioListWidget";
import { GetServiciosAdapter } from "../../infraestructure/servicios/adapter/GetServiciosAdapter";
import { ServicioOrden } from "../../infraestructure/servicios/domain/dto/ServicioOrden";
import { ButtonImage } from "../GeneralUse/ButtonImg";
import { GreenButton } from "../GeneralUse/GreenButton";

export function ServiciosSelectionPage() {
    const {
        currentOrder,
        setSelectingServices,
        selectingServices,
        setMessageState,
        setProductEdited,
        setCurrentOrder,
        setUsingCalculator,
    } = useContext(OrderContext);

    // Servicios generales
    const [services, setServices] = useState<ServicioOrden[]>([]);
    // Servicios generales pero filtrados
    const [filteredServices, setFilteredServices] = useState<ServicioOrden[]>(services);

    // Servicios de la orden
    const [currentServices, setCurrentServices] = useState(currentOrder?.servicios);
    // Filtros de servicios de la orden
    const [filteredCurrentServices, setFilteredCurrentServices] = useState<ServicioOrden[]|undefined>(currentServices);

    const [currentServicesFilter, setCurrentServicesFilter] = useState<string>("");

    const getServicios = new GetServiciosAdapter();

    // Necesario para la responsividad
    const [currentPage, setCurrentPage] = useState<number>(0);

    // Para hacer mucks
    const elementosMuck = Array.from({ length: 9 });

    // Use Effect necesario para obtener los servicios, jala datos cada que se abre la pantalla
    useEffect(() => {
        if(selectingServices){
            setCurrentServices(currentOrder?.servicios);
            setFilteredCurrentServices(currentOrder?.servicios);
            const fetchData = async () => {
                
                const data = await getServicios.execute(1)
                if(data.data){
                    setServices(data.data as ServicioOrden[]);
                    return
                }
                setMessageState({
                    type: "error",
                    mode: "retry",
                    title: "Error al obtener servicios",
                    message: "No se pudieron obtener los servicios",
                    onRetry: () => {
                        setMessageState(null);
                        fetchData();
                    }
                })
                
            };
    
            fetchData();    
            setCurrentServicesFilter("")
        }
    }, [selectingServices]);

    useEffect(() => {
        if (services) {
            setFilteredServices(services);
        }
    }, [services])

    useEffect(() => {
        if (currentServices) {
            if (currentServicesFilter === "") {
                setFilteredCurrentServices(currentServices);
            } else {
                setFilteredCurrentServices(
                    currentServices.filter(servicio =>
                        servicio.nombre.toLowerCase().includes(currentServicesFilter.toLowerCase())
                    )
                );
            }
        }
    }, [currentServices]);
    

    // Función para añadir productos
    function addProduct(id: number, cuantity: number, precio: number) {
        // Trata de encontrar primero si ya esta
        const inList = currentServices?.find(servicio => servicio.id == id);
        // Si ya está solo modifica la cantidad y el precio de lo actual
        if (inList) {
            setCurrentServices(
                currentServices?.map(servicio => {
                    if (servicio.id == id) {
                        return {
                            ...servicio,
                            cantidad: servicio.cantidad + cuantity,
                            precio: (servicio.cantidad + cuantity) * precio,
                        };
                    }
                    return servicio;
                })
            );
            
            return;
        }
        // Si no, tenemos que buscarlo en la lista de todos los servicios
        const newService = services.find(servicio => servicio.id == id);
        // Y ya lo agregamos
        if (newService) {
            setCurrentServices([
                ...(currentServices ?? []),
                {
                    ...newService,
                    cantidad: cuantity,
                    precio: cuantity * newService.precio,
                } as ServicioOrden,
            ]);
            return;
        }
        // Si no encuentra el servicio a agregar muestra un error
        setMessageState({
            type: "error",
            mode: "accept",
            title: "Error al agregar",
            message: "El servicio que se ha intentado agregar no existe",
        });
    }

    // Simplemente elimina productos
    function removeProduct(id: number) {
        setCurrentServices(currentServices?.filter(servicio => servicio.id != id));
    }

    // Manda a guardar los cambios locales hechos en la orden, ya que si no guarda, no se actualiza
    // Cabe destacar que igual en la pantalla de detalles tiene que guardar, ya que sigue local
    function saveChanges() {
        if (currentServices && currentOrder) {
            setCurrentOrder({
                ...currentOrder,
                servicios: currentServices,
            });
        }
        setProductEdited(true);
    }

    // Solo es para poder manejar el estado de selectingServices y poder cerrar la pantalla
    function handleSave() {
        saveChanges();
        setSelectingServices(false);
    }

    // Función para filtrar los productos de la orden actual
    function filterCurrentProducts(event: React.ChangeEvent<HTMLInputElement>) {
        const data = event.target.value;
        setCurrentServicesFilter(data);
    
        if (data === "") {
            setFilteredCurrentServices(currentServices);
            return;
        }
    
        setFilteredCurrentServices(
            currentServices?.filter(servicio =>
                servicio.nombre.toLowerCase().includes(data.toLowerCase())
            )
        );
    }

    // Para filtrar los productos de la sucursal
    function filterProducts(event: React.ChangeEvent<HTMLInputElement>){
        const data = event.target.value;
        // Si no escribe nada, entonces retornamos todos los productos
        if(data == ""){
            setFilteredServices(services);
            return;
        }
        // Aqui se filtran los servicios de acuerdo a su nombre
        setFilteredServices(services.filter(servicio => servicio.nombre.toLowerCase().includes(data.toLowerCase())))
    }

    return (
        <>
            {selectingServices && (
                <div className="w-full h-full bg-black/40 absolute flex place-content-center items-center z-10">
                    <div className="w-8/10 bg-[#e2e2e2] rounded-md h-[95%] flex flex-col">
                        {/* HEADER */}
                        <div className="bg-(--dark-gray) rounded-t-md flex items-center px-2 py-3 justify-between">
                            <div className="flex items-center gap-2">
                                <ButtonImage
                                    iconURL="src/assets/img/backButton.jpg"
                                    iconStyles="h-5.25 w-5.5"
                                    buttonStyles="p-2 bg-(--dark-gray)"
                                    onClick={() => setSelectingServices(false)}
                                />
                                <h1 className="text-2xl/5 font-bold text-white">
                                    Servicios de la orden
                                </h1>
                            </div>
                            <ButtonImage
                                iconURL="src/assets/img/calculator.png"
                                iconStyles="h-5.25 w-5.5 filter invert"
                                buttonStyles="py-2 px-5 hidden md:block"
                                onClick={() => setUsingCalculator(true)}
                            />
                        </div>

                        {/* MAIN CONTENT */}
                        <div className="flex-1 flex flex-col bg-(--background-gray) min-h-0">
                            {/* MOBILE BUTTONS */}
                            <div className="md:hidden py-1.5 px-2.5 flex gap-2 bg-(--accent-gray-light)">
                                <GreenButton title="Actuales" styles="mt-0 py-1.5 px-4 bg-white text-black" onClick={() => setCurrentPage(0)} />
                                <GreenButton title="Todos" styles="mt-0 py-1.5 px-4 bg-white text-black" onClick={() => setCurrentPage(1)} />
                                <ButtonImage
                                    iconURL="src/assets/img/calculator.png"
                                    iconStyles="h-5.25 w-5.5 filter invert"
                                    buttonStyles="py-2 px-5 md:hidden rounded-md"
                                    onClick={() => setUsingCalculator(true)}
                                />
                            </div>

                            <div className="flex flex-row flex-1 min-h-0">
                                {/* LISTA DE SERVICIOS ACTUALES */}
                                <List
                                    title="Editar servicios"
                                    containerStyles={`w-full flex-2 md:flex ${currentPage == 1 ? "hidden" : ""}`}
                                    extraElements={<GreenButton title="Guardar" styles="w-full" onClick={handleSave} />}
                                    onSearchInput={filterCurrentProducts}
                                >
                                    {filteredCurrentServices ? (
                                        filteredCurrentServices.map(servicio => (
                                            <ServicioListWidget
                                                key={servicio.id}
                                                nombre={servicio.nombre}
                                                imagen={servicio.imagen}
                                                cantidad={servicio.cantidad}
                                                precio={servicio.precio}
                                            >
                                                <button
                                                    className="bg-[#cf2323] text-white text-sm rounded-md p-2 hover:bg-[#e64343] transition duration-300"
                                                    onClick={() => removeProduct(servicio.id)}
                                                >
                                                    Eliminar
                                                </button>
                                            </ServicioListWidget>
                                        ))
                                    ) : 
                                    (
                                        elementosMuck.map((_, index) => (
                                            <div key={index} className="w-full h-20 rounded-md mb-2 animate-pulse bg-(--background-gray)"></div>
                                        ))
                                    )
                                }
                                    
                                </List>

                                {/* LISTA DE TODOS LOS SERVICIOS */}
                                <div className={`flex-4 flex flex-col ${currentPage == 0 ? "hidden" : ""} md:block min-h-0`}>
                                    <div className="px-4 py-2">
                                        <input
                                            type="text"
                                            placeholder="Buscar servicio..."
                                            className="w-full p-2 rounded-md border border-gray-300 bg-white"
                                            onChange={filterProducts}
                                        />
                                    </div>
                                    <div className="flex-1 max-h-[calc(100%-3.625rem)] overflow-y-auto min-h-0 px-2 md:px-6 flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        { services ?
                                            (
                                                filteredServices.map(servicio => (
                                                    <ServiciosWidget
                                                        key={servicio.id}
                                                        id={servicio.id}
                                                        title={servicio.nombre}
                                                        imagen={servicio.imagen}
                                                        precio={servicio.precio}
                                                        onClickAdd={addProduct}
                                                    />
                                                ))
                                            ):(
                                            elementosMuck.map((_, index) => (
                                                <div key={index} className="w-full h-50 rounded-md mb-2 animate-pulse bg-(--accent-gray-light)"></div>
                                            )))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
import { NavBarAsideComponent } from "../components/NavBar/NavBarAside"
import { ButtonImage } from "../components/GeneralUse/ButtonImg"
import { OrdersList } from "../components/OrdersWidgets/OrdersList"
import { useEffect, useState } from "react"
import { OrderPageRouter } from "../components/OrdersWidgets/OrderPageRouter"
import { twMerge } from 'tailwind-merge';
import { OrderContextProvider } from "../context/OrderContext"
import { OrdersMessageHandler } from "../components/OrdersWidgets/OrdersMessageHandler"
import { TruckSelectionPage } from "../components/Camiones/CamionSelection"
import { ServiciosSelectionPage } from "../components/Servicios/ServiciosSelectionPage"
import { VolumeCalculatorManager } from "../components/OrdersWidgets/VolumeCalculatorManager"
import { Galllery } from "../components/GeneralUse/Galery"
import { GalleryManager } from "../components/OrdersWidgets/GalleryManager"

export enum Pages {
    Chat,    // 0
    Details,   // 1
    List, // 2
    General //3
}

function debounce(fn: Function, ms: number) {
    let timeoutId: ReturnType<typeof setTimeout>
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    }
};

export function determinateWidth() {
    if (typeof window === "undefined") return 6;
    const windowWidth: number = window.innerWidth;

    if (windowWidth < 768) return 2;
    else if (windowWidth < 1024) return 3;
    return 4;
};

function handleResize(setCurrentPage : (page:Pages)=>void) {
    let count: number = determinateWidth();
    if(count == 4){
        setCurrentPage(Pages.General)
    }
    else if(count == 3){
        setCurrentPage(Pages.Details)
    }
    else if(count == 2){
        setCurrentPage(Pages.List)
    }
}


export function OrdersPage(){
    const [currentPage, setCurrentPage] = useState<Pages>(Pages.General)
    let windowWidth = window.innerWidth

    function openPage(page: Pages){
        if(determinateWidth() == 4){
            return
        }
        if(determinateWidth() != 2 && page == Pages.List){
            return
        }
        setCurrentPage(page)
    }

    useEffect(() => {
        const debounceHandleResize = debounce(() => handleResize(setCurrentPage), 5);
        
        window.addEventListener('resize', function(event) {
            if (window.innerWidth != windowWidth) {
                windowWidth = window.innerWidth;
                debounceHandleResize();
            }
        });
        handleResize(setCurrentPage)

        return () => {
            window.removeEventListener('resize', debounceHandleResize)
        }
       
    }, []);

    return(    
            <NavBarAsideComponent>
                <main className="w-full h-screen relative bg-(--background-gray)">           
                    <OrderContextProvider>
                        <OrdersMessageHandler/>
                        <TruckSelectionPage/>
                        <ServiciosSelectionPage/>
                        <VolumeCalculatorManager/>
                        <GalleryManager/>
                        <div className={twMerge("w-full h-full grid  md:grid-cols-[auto_1fr] p-2.25 md:p-4")} >
                            
                            <OrdersList pageChanger={setCurrentPage} styles={`${currentPage != Pages.List && "hidden"} md:flex`}/>
                            
                            <div className= {twMerge("flex flex-col", `${currentPage == Pages.List && "hidden"}`)}>
                                                                
                                <div className="flex bg-(--accent-gray-light) py-2 px-2 gap-2 lg:hidden rounded-t-md">
                                    {determinateWidth()==2 && 
                                        <ButtonImage iconURL="src\assets\img\back.png" text="Atrás" iconStyles="w-6 h-6" textStyles="text-md" buttonStyles="bg-white p-2"
                                        onClick={()=>openPage(Pages.List)}/>
                                    }
                                
                                    <ButtonImage iconURL="src\assets\img\details.png" text="Chat" iconStyles="w-6 h-6" textStyles="text-md" buttonStyles="bg-white p-2"
                                    onClick={()=>openPage(Pages.Chat)}/>
                                    <ButtonImage iconURL="src\assets\img\dialog.png" text="Detalles" iconStyles="w-6 h-6" textStyles="text-md" buttonStyles="bg-white p-2"
                                    onClick={()=>openPage(Pages.Details)}/>
                                </div>

                                
                                <OrderPageRouter currentPage={currentPage}/>  
                                        
                            </div>
                        </div>
                           
                    </OrderContextProvider>
                </main>
            </NavBarAsideComponent>
        
    )
}
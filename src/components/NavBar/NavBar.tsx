import { NavBarItem } from "./NavItem"
import { ButtonImage } from "../GeneralUse/ButtonImg"
import { twMerge } from 'tailwind-merge';
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useLocation } from "react-router-dom";

type Props = {
    readonly expanded: boolean;
    readonly setExpanded: (state: boolean) => void;
}

export function NavBar({ expanded, setExpanded }: Props){

    const {currentUser} = useContext(UserContext)
    const location = useLocation()

    return(
        <aside className={twMerge("bg-(--dark-gray) h-[100dvh] lg:static z-80 lg:shadow-none", `${expanded && "absolute h-screen shadow-[6px_0_10px_rgba(0,0,0,0.3)]"}`)}>
            <nav className="flex flex-col items-center gap-2 h-[100dvh]">
                <div className="flex flex-row justify-end self-end">
                    <ButtonImage iconURL="/src/assets/img/burgerMenu.png" iconStyles="p-0 h-8 w-8 " buttonStyles="mr-1 p-1 bg-[#3f3f3f]" onClick={()=>setExpanded(!expanded)}/>
                </div>
                {expanded && <img src="/img/RapidcolectaLogo.png" alt="Logo" className="w-40 mb-4"/> }
    
                <div className={twMerge("flex-1 w-full",`${!expanded && "hidden"}`)}>
                    <NavBarItem imgRoute="/src/assets/img/clipboard.png" text="Ordenes" link="/orders" active={location.pathname == "/orders"}/>
                    <NavBarItem imgRoute="/src/assets/img/truck.png" text="Camiones" link="/camiones" active={location.pathname == "/camiones"}/>
                </div>
                <div className= {twMerge("flex items-center px-2 my-2 gap-2 max-w-46 text-wrap mb-6 bg-white p-4", `${!expanded && "hidden"}`)}>
                    <img src="/src/assets/img/person.png" alt="User" className="w-12"/>
                    <p className="font-bold text-xl leading-5 text-wrap">{currentUser?.nombre} {currentUser?.apellido_pat} </p>
                </div>
            </nav>
        </aside>
    )
}
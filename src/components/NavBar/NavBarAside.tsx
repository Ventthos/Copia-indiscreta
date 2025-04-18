import { ReactNode, useState } from "react";
import { NavBar } from "./NavBar";
import { twMerge } from 'tailwind-merge';

type Props = {
    readonly children?: ReactNode; 
};

export function NavBarAsideComponent({children}: Props){
    const [expanded, setExpanded] = useState(false);
    return(
        <div className={twMerge("grid h-[100dvh] lg:grid-cols-[auto_1fr]", `${!expanded && "grid-cols-[auto_1fr]"}`)}>
            <NavBar expanded={expanded} setExpanded={setExpanded}/>
            <div className={twMerge("",`${expanded&&"ml-11 lg:ml-0"}`)}>
                {children}
            </div>
        </div>

    )
}
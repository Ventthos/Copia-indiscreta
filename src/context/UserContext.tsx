import { createContext, useEffect, useState } from "react";
import { Usuario } from "../objects/User";
import { Operador } from "../objects/Operador";

interface UserContextType {
    currentUser: Usuario | null;
    setCurrentUser: React.Dispatch<React.SetStateAction<Usuario | null>>;
    currentToken: string;
    setCurrentToken: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext<UserContextType>({
    currentUser: null,
    setCurrentUser: () => {},
    currentToken: "",
    setCurrentToken: () => {}
});

const operadorDefault = new Operador(
    1,
    "Fernando",
    "Hernandez",
    "Garcia",
    "1234567890",
    "XXXXXXXXXXXXX",
    {
        id_sucursal:1,
        nombre:"Sucursal 1",
        servicios:[]
    },
    1,
    1000
);

export function UserContextProvider({children} : {readonly children: React.ReactNode}){
    const [currentUser, setCurrentUser] = useState<Usuario | null>(operadorDefault);
    const [currentToken, setCurrentToken] = useState<string>("");

    function processToken(){
        const token = localStorage.getItem('token');
        if(token){
            setCurrentToken(token);
        }
        setCurrentToken("");
    }

    useEffect(() => {
        processToken();
    }, [])


    

    return(
        <UserContext.Provider value={{currentUser, setCurrentUser, currentToken, setCurrentToken}}>
            {children}
        </UserContext.Provider>
    )
}
import {Routes, Route } from "react-router-dom";
import {Login} from "../pages/Login"
import { OrdersPage } from "../pages/Orders";
import { Camiones } from "../pages/Camiones";

export function RapidColectaRouter(){
    return(
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path='/orders' element={<OrdersPage/>}/>
          <Route path='/camiones' element={<Camiones/>}/>
        </Routes>
    )
}
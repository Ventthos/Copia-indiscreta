import { Pages } from "../../pages/Orders"
import { Chat } from "./Chat"
import { OrdersDetail } from "./OrdersDetail"

export function OrderPageRouter({currentPage} : {readonly currentPage:Pages}){
    return(
        <div className="flex flex-col lg:grid lg:grid-cols-[2fr_1fr] h-[calc(100vh-4.5rem)] md:h-[calc(100vh-5.5rem)] lg:h-[calc(100vh-2rem)]">
        {
            (()=>{
                switch(currentPage){
                    case Pages.Chat:
                        return <Chat/>
                    case Pages.Details:
                        return <OrdersDetail/>
                    case Pages.General:
                        return(<>
                            <Chat/>
                            <OrdersDetail/>
                        </>) 
                }
            })()
        }
    </div>  
    )
}
import { ordersUrl } from "../../../../config/apiUrls";
import { getJson } from "../../../../services/getJson";

export class GetOrdersRepository{
    async execute(){
        return await getJson(ordersUrl)
    }

}


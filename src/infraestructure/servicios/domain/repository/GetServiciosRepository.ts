import { serviciosUrl } from "../../../../config/apiUrls";
import { getJson } from "../../../../services/getJson";

export class GetServiciosRepository{
    async execute(idSucursal: number){
        return await getJson(serviciosUrl)
    }
}
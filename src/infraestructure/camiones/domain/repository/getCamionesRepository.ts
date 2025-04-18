import { camionesUrl, choferesUrl } from "../../../../config/apiUrls";
import { getJson } from "../../../../services/getJson";

export class GetCamionesRepository{
    async execute(){
        return getJson(camionesUrl)
    }
}
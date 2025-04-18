import { getJson } from "../../../../services/getJson"
import { imagenesOrdenUrl } from "../../../../config/apiUrls"

export class GetImagenesOrden {
    execute(idOrden: number) {
        return getJson(imagenesOrdenUrl + idOrden)
    }
}
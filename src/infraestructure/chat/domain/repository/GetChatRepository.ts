import { getJson } from "../../../../services/getJson";
import { chatUrl } from "../../../../config/apiUrls";

export class GetChatRepository {

    async execute(id: number) {
        return await getJson(chatUrl + id)
    }
}
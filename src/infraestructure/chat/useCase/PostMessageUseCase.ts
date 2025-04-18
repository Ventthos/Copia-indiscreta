import { Message } from "../domain/dto/Message";
import { PostMessageRepository } from "../domain/repository/PostMessageRepository";
import { chatUrl } from "../../../config/apiUrls";

export class PostMessageUseCase{
    postMessageRepository = new PostMessageRepository();
    async execute(chatId: number, newMessage: Message) {
        // Juntamos la url del chat con el id del chat y la url de los mensajes
        // para obtener la url completa de los mensajes del chat
        const url = chatUrl + chatId + "/messages";
        const response = await this.postMessageRepository.execute(url, newMessage);

        if (response.error) {
            response.error = response.error instanceof Error 
                ? response.error 
                : new Error(String(response.error));
        }
        return response;
    }
}
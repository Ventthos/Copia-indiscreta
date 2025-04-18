import { Message } from "../domain/dto/Message";
import { PostMessageUseCase } from "../useCase/PostMessageUseCase";

export class PostMessageAdapter {
    postMessageUsecase = new PostMessageUseCase()

    async execute(chatId: number, newMessage: Message) {
        const response = await this.postMessageUsecase.execute(chatId, newMessage);
        return response;
    }
}
import { GetChatUseCase } from "../useCase/GetChatUseCase";

export class GetChatAdapter{
    chatUseCase = new GetChatUseCase();

    async execute(id: number) {
        const response = await this.chatUseCase.execute(id);
        return response;
    }
} 
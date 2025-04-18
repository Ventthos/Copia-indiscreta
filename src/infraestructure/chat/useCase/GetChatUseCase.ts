import { GetChatRepository } from "../domain/repository/GetChatRepository";

export class GetChatUseCase {
     private readonly getChatRepository = new GetChatRepository();
    
    async execute(id: number) {
        const response = await this.getChatRepository.execute(id);
        console.log(response);  
        if (response.error) {
            response.error = response.error instanceof Error 
                ? response.error 
                : new Error(String(response.error));
        }

        return response;
    }
}
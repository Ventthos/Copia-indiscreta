import { GetCamionesRepository } from "../domain/repository/getCamionesRepository";

export class GetCamionesUseCase{
    private readonly camionesRepository = new GetCamionesRepository()

    async execute() {
        const response = await this.camionesRepository.execute();
        console.log(response);  
        if (response.error) {
            response.error = response.error instanceof Error 
                ? response.error 
                : new Error(String(response.error));
        }

        return response;
    }

}
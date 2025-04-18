import { GetCamionesUseCase } from "../useCase/getCamionesUseCase";

export class GetCamionesAdapter{
    private readonly camionesRepository = new GetCamionesUseCase()
    async execute() {
        return this.camionesRepository.execute()
    }
}
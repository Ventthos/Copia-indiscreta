import { GetServiciosUseCase } from "../useCase/GetServiciosUseCase";

export class GetServiciosAdapter{
    serviciosUseCase = new GetServiciosUseCase()
    async execute(idSucursal:number){
        return this.serviciosUseCase.execute(idSucursal)
    }
}
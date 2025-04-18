import { GetServiciosRepository } from "../domain/repository/getServiciosRepository";

export class GetServiciosUseCase{
    seviciosRepository = new GetServiciosRepository();
    async execute(idSucursal: number){
        return this.seviciosRepository.execute(idSucursal)
    }

}
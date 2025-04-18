import { Operador } from "../../../objects/Operador";
import { Camion } from "../../camiones/domain/dto/Camion";
import { ServicioOrden } from "../../servicios/domain/dto/ServicioOrden";
import { PatchOrderRepository} from "../domain/repository/patchOrderRepository";

export class PatchOrderUseCase {
    patchOrderStateRepository = new PatchOrderRepository()

    async execute(orderId: number, body:{estadoOrden?: string, operador?: Operador, camion?: Camion, costoTotal?: number, servicios?: ServicioOrden[], linkRastreo?: string}) {
    const result = await this.patchOrderStateRepository.execute(orderId, body);
    return result;
  }
}
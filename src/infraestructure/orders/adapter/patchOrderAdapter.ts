import { Operador } from "../../../objects/Operador";
import { Camion } from "../../camiones/domain/dto/Camion";
import { ServicioOrden } from "../../servicios/domain/dto/ServicioOrden";
import { PatchOrderUseCase } from "../useCase/patchOrderUseCase";

export class PatchOrderAdapter{
    patchOrderStateUseCase = new PatchOrderUseCase()

    async execute(orderId: number, updates:{status?: string, operator?: Operador, camion?: Camion, nuevoPrecio?: number, servicios?: ServicioOrden[], linkCamion?:string }) {
        const body = {
            estadoOrden: updates.status,
            operador: updates.operator,
            camion: updates.camion,
            costoTotal: updates.nuevoPrecio,
            servicios: updates.servicios,
            linkRastreo: updates.linkCamion

        }
        const order = await this.patchOrderStateUseCase.execute(orderId, body);

        return order;
    }
}
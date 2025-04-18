import { GetOrdersUseCase } from "../useCase/getOrdersUseCase";

export class GerOrdersAdapter{
    getOrdersUseCase = new GetOrdersUseCase()
    async execute(){
        const orders = await this.getOrdersUseCase.execute()
        return orders
    }
}
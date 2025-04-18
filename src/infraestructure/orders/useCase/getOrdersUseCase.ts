
import { GetOrdersRepository } from "../domain/repository/getOrdersRepository";
import { GetImagenesOrden } from "../../imagenesOrden/domain/repository/GetImagenOrden";

export class GetOrdersUseCase{
    ordersRepository = new GetOrdersRepository();
    imagenesOrdenRepository = new GetImagenesOrden();
    async execute(){
        const data = await this.ordersRepository.execute();
        //const imagenes = await this.imagenesOrdenRepository.execute(data.data[0].id)
        //data.data[0].imagenesOrden = imagenes.data.imagenes
        console.log(data)
        return data

    }
}
    


/*
export class GetOrdersUseCase{
    ordersRepository = new GetOrdersRepository();
    async execute(){
        const data = await this.ordersRepository.execute();
        data.data = data.data["existen"]
        return data

    }
}*/
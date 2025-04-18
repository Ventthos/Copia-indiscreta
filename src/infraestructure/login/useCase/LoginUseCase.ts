import { LoginForApi } from "../domain/dto/loginForApi";
import { LoginRepository } from "../domain/repository/LoginRepository";

export class LoginUseCase{
    loginRepository = new LoginRepository()
    execute = async (data: LoginForApi) => {
        const response = await this.loginRepository.execute(data);
        return response;
    }
}
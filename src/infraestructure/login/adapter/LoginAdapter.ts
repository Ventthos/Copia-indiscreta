import { LoginUseCase } from "../useCase/LoginUseCase";
import { LoginForApi } from "../domain/dto/loginForApi";
import { LoginResponse } from "../domain/dto/loginResponse";
import { Response } from "../../../objects/Response";

export class LoginAdapter{
    loginUseCase = new LoginUseCase()

    execute = async (email: string, password: string) => {
        const data: LoginForApi = {
            email: email,
            password: password
        };
        //const response = await this.loginUseCase.execute(data);
        const response: Response<LoginResponse> = {
            data: {
                status: "authenticated",
                message: "User Logged In Sucessfully",
                token: "12|RsISzOZ7DX4Y91YXtDcXEIO11YaBo3Sq3MW36tE4ef3c9efa"
            } as LoginResponse,
            error: null
        }
        return response;
    }
}
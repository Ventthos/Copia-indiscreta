import { post } from "../../../../services/post";
import { loginUrl } from "../../../../config/apiUrls";
import { LoginForApi } from "../dto/loginForApi";
import { LoginResponse } from "../dto/loginResponse";
import { Response } from "../../../../objects/Response";

export class LoginRepository {
  execute = async (data: LoginForApi): Promise<Response<LoginResponse>> => {
    try {
      const response = await post(loginUrl, data);

      // Asumiendo que si no hay error, response.data tiene la info correcta
      const formatedResponse: Response<LoginResponse> = {
        data: {
          status: response.data.status,
          message: response.data.message,
          token: response.data.token,
        },
        error: null,
      };

      return formatedResponse;

    } catch (error) {
      // Si hay error pues, data debe ser null y regresa el error
      const errorResponse: Response<LoginResponse> = {
        data: null,
        error: error,
      };

      return errorResponse;
    }
  };
}
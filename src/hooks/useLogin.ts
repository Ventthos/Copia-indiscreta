import { useState } from "react";
import { LoginAdapter } from "../infraestructure/login/adapter/LoginAdapter";
import { Response } from "../objects/Response";
import { LoginResponse } from "../infraestructure/login/domain/dto/loginResponse";

export function useLogin(){
    const loginAdapter = new LoginAdapter()
    const [response, setResponse] = useState<Response<LoginResponse>>({data: null, error: null})
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | null>(null)

    function login(email: string, password: string){
        setLoading(true)
        loginAdapter.execute(email, password)
            .then((response: Response<LoginResponse>) => {
                setResponse(response)
                setLoading(false)
            })
            .catch((error: Error) => {
                setLoading(false)
                setError(error)   
            })
    }
    return {response, loading, error, login}
}
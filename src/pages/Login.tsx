
import { useEffect, useState } from "react";
import { InputWithLabel } from "../components/GeneralUse/InputWithLabel"
import { useLogin } from "../hooks/useLogin";
import { MessageState } from "../objects/MessageState";
import { MessageWindow } from "../components/GeneralUse/MessageWindow";

export function Login(){

    const {login, response, loading, error} = useLogin()
    const [message, setMessage] = useState<MessageState | null>(null)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const formDataObject = Object.fromEntries(formData.entries())
        const correo = formDataObject.correo as string
        const password = formDataObject.password as string
        login(correo, password)
    }

    function setErrorMessage(error:string){
        setMessage({
            type: "error",
            mode: "accept",
            title: "Error al iniciar sesión",
            message: error
        })
    
    }

    function uploadTokenToLocalStorage(){
        if(response.data?.token){
            localStorage.setItem("token", response.data.token)
        }
    
    }

    useEffect(() => {
        if(loading){
            setMessage({
                type: "message",
                mode: "waiting",
                title: "Iniciando sesión",
                message: "Iniciando sesión..."
            })
        }
        else if(!loading && message?.mode === "waiting"){
            setMessage(null)
        }
        
    }, [loading])

    useEffect(() => {
        if(error){
            setErrorMessage(error.message)
        }
        
    }, [error])

    useEffect(() => {
        if(response.error && response.error instanceof Error){
            setErrorMessage(response.error.message)
        }
        else{
            uploadTokenToLocalStorage()
        }
    }, [response])

    return(
        <div className="flex flex-col justify-center h-[100vh] bg-[url(src/assets/img/newLoginBackground.png)] bg-center bg-no-repeat bg-cover relative">
            {message && <MessageWindow title={message.title} message={message.message} type={message.type} mode={message.mode}/>}
            <form className=" bg-white self-center flex flex-col items-center p-8 rounded-2xl w-8/10 md:w-auto md:min-w-110 border-2 border-(--accent-gray)" onSubmit={handleSubmit}>
                <img src="src/assets/img/person.png" alt="Usuario" className="w-18 h-18 mb-4"/>
                <h1 className="font-bold text-3xl mb-7 text-center">Iniciar sesión</h1>
                <InputWithLabel text="Correo" inputStyles="mb-3.5 px-4 text-md" labelStyles="text-(--dark-gray) font-semibold" inputName="correo"/>
                <InputWithLabel text="Contraseña" inputStyles="px-4 " labelStyles="text-(--dark-gray) font-semibold" inputType="password" inputName="password"/>
                <div className="flex justify-center mt-6">
                    <input type="submit" value="Iniciar sesión" className="greenButton"/>
                </div>
            </form>
        </div>
    )
}
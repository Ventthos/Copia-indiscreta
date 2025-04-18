import { useState } from "react";
import  {GetChatAdapter} from "../infraestructure/chat/adapter/GetChatAdapter";
import { Chat } from "../infraestructure/chat/domain/dto/Chat";
import { PostMessageAdapter } from "../infraestructure/chat/adapter/PostMessageAdapter";
import { Message } from "../infraestructure/chat/domain/dto/Message";

export function useChat() {
    const [chat, setChat] = useState<Chat | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const getChatAdapter = new GetChatAdapter()
    const postChatAdapter = new PostMessageAdapter()

    const getChat = async (id: number) => {
        setLoading(true);
        setError(null);
        const response = await getChatAdapter.execute(id);

        if(response.data){
            setChat(response.data);
            setSuccess("Se ha cargado el chat correctamente");
        }
        else{
            if (response.error instanceof Error) {
                setError(response.error);
            } 
        }
        setLoading(false);
    }

    const postMessage = async (chatId: number, message: Message) => {
        setLoading(true);
        setError(null);

        const response = await postChatAdapter.execute(chatId, message);
        if(response.data){
            setChat(response.data);
            setSuccess("Se ha cargado el chat correctamente");
        }
        else{
            if (response.error instanceof Error) {
                setError(response.error);
            } 
        }
        setLoading(false);
    };
    

    return { chat, loading, error,success, getChat, postMessage };
}
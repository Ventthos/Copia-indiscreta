import { ButtonImage } from "../GeneralUse/ButtonImg"
import { ChatBubble } from "./ChatBubble";
import { useChat } from "../../hooks/useChat";
import { useContext, useEffect, useRef, useState } from "react";
import { OrderContext } from "../../context/OrderContext";
import { UserContext } from "../../context/UserContext";
import { twMerge } from "tailwind-merge";
import { Message } from "../../infraestructure/chat/domain/dto/Message";
import { Usuario } from "../../objects/User";
import ImageUploadButton from "../GeneralUse/ImageUploadButton";

// Esta función la ocupo para saber que meter en el chat, dependiendo de si es un error, loading o si hay mensajes


export function Chat({styles}: {readonly styles?:string}) {
  // Necesitamos saber cual es la orden actual, el cual esta en el contexto
  const {currentOrder, productEdited} = useContext(OrderContext)

  // Igal necesitamos saber el usuario actual, el cual esta en el contexto
  const {currentUser} = useContext(UserContext)

  // Uso mi propio hook para obtener el chat
  const { chat, loading, error, getChat, postMessage } = useChat();

  // ref para guardar el input del mensaje
  const inputRef = useRef<HTMLInputElement>(null);

  // State para poder saber si el usuario ha escrito algo
  const [written, setWritten] = useState<boolean>(false);

  useEffect(() => {
    // Se necesita saber que si hay una orden acutal y que no es la misma pero editada (disparada cuando se cambian los servicios
    // o el precio de la orden)
    if(currentOrder && !productEdited && currentOrder.chatId) {
      // Si hay una orden actual, se obtiene el chat de la orden actual
      getChat(currentOrder.chatId)
    }
  }, [currentOrder]) 

  useEffect(() => {
    console.log("Chat", chat)
  }, [chat])


  function renderChatContent() {
    if(!currentOrder?.chatId)
      return <p className="text-center">No hay chat disponible</p>;

    if (loading) {
      return <p className="text-center">Cargando...</p>;
    }
  
    else if(error) {
      return <p className="text-center text-red-500">{error.message}</p>;
    }
  
    else if(chat?.messages && chat.messages.length > 0) {
      return chat.messages.map((mensaje: any) => (
        <ChatBubble
          key={mensaje.id}
          sender={mensaje.sender.name}
          direction={mensaje.sender.id === currentUser?.id ? "outgoing" : "incoming"}
          type={mensaje.type === "text" ? "text" : "image"}
          text={mensaje.text}
          imageUrl={mensaje.imageUrl}
          bubbleStyles={twMerge(
            "max-w-8/10",
            mensaje.sender.id === currentUser?.id
              ? "self-end bg-(--chat-green-color) after:border-t-(--chat-green-color) text-white"
              : "self-start"
          )}
        />
      ));
    }
  }

  // Función para manejar el estado del mensaje
  function handleTextChanged(event: React.ChangeEvent<HTMLInputElement>){
    if(event.target.value.length <= 0){
      setWritten(false);  
      return  
    }
    setWritten(true);  
  }

  // La siguiente función es para poder mandar un mensaje de texto
  async function handleSendMessage(){
    if (currentOrder?.chatId && written) {
      const newMessage = {
        id: 0,
        sender: {id:currentUser?.id, name: currentUser?.nombre},
        type: "text",
        text: inputRef.current?.value,
        imageUrl: undefined
      } as Message;
      postMessage(currentOrder.chatId, newMessage);
    }
  };

  function manageImage(file: File){

  }

  

  return (
    <div className={twMerge("flex flex-col h-[calc(100vh-4.5rem)] md:h-[calc(100vh-5.5rem)] lg:h-[calc(100vh-2rem)]", styles)}>
      {/* Header del chat*/}
      <div className="bg-(--dark-gray) flex py-3 px-5 items-center gap-4">
        <img
          src="src\assets\img\person.png"
          alt="Foto del cliente"
          className="w-17.5 h-17.5 rounded-full border-2 border-white"
        />
        <div>
          <p className="text-lg md:text-2xl font-bold text-white">Eduardo Chan</p>
          <p className="text-white">Camionero 1, Camionero 2, Operador</p>
        </div>
      </div>
       
      <div className="h-[calc(100%-5.875rem)] bg-[url(/src/assets/img/ChatImage.png)] bg-center bg-contain flex flex-col">
        {/* Cuerpo del chat*/}
        <div className="py-3 px-7 overflow-y-auto flex flex-col gap-2.5 flex-1">
          {renderChatContent()}
        </div>

        {/* Este es el footer del chat*/}
        <div className="px-3 py-2 flex gap-2">
          <ImageUploadButton callbackFuncion={manageImage} />

          <input
            type="text"
            className="bg-white flex-1 rounded-xl p-1.5"
            placeholder="Escribe aqui"
            onChange={handleTextChanged}
            ref={inputRef}
          />
          <ButtonImage
            iconURL="src\assets\img\sendMessageIcon.png"
            buttonStyles={`p-3 rounded-full min-w-10 ${written? "bg-(--mainColor)":"bg-white hover:bg-white"}`}
            iconStyles={`w-8 h-8 ${!written && "filter invert"}`}
            onClick={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
}

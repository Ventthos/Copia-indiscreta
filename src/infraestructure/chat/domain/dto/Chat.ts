import { Message } from "postcss";
import { ChatParticipant } from "./ChatParticipant";

export type Chat = {
    id: number;
    idOrdrer: number;
    participants: ChatParticipant[];
    messages: Message[];
}
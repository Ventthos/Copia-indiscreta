import { post } from "../../../../services/post";
import { Message } from "../dto/Message";

export class PostMessageRepository {

  async execute(url:string, newMessage: Message) {
    const response = await post(url, newMessage);
    return response;
  }
}
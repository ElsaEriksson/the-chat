import { Message } from "./Message";

export type Room = {
  room_id: string;
  room_name: string;
  messages: Message[];
};

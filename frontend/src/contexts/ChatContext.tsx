import { Dispatch, SetStateAction, createContext } from "react";
import { Socket } from "socket.io-client";
import { Room } from "../models/Room";

export interface IChatContext {
  socket: Socket | null;
  room: Room | null;
  setSelectedRoom: Dispatch<SetStateAction<Room | null>>;
  rooms: Room[];
}

export const ChatContext = createContext<IChatContext>({
  socket: null,
  room: null,
  setSelectedRoom: () => {},
  rooms: [],
});

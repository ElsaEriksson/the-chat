import { RouterProvider, useNavigate } from "react-router-dom";
import "./App.scss";
import { ChatContext, IChatContext } from "./contexts/ChatContext";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { router } from "./Router";
import { Room } from "./models/Room";
import { AuthContext, IAuthContext } from "./contexts/AuthContext";
import { Message } from "./models/Message";
import { User } from "./models/User";

function App() {
  const [socket, setSocket] = useState<Socket>();
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);

  const [auth, setAuth] = useState<IAuthContext>({
    users: [],
    updateUsers: () => {},
    currentUser: null,
    updateCurrentUser: () => {},
  });

  const [state, setState] = useState<IChatContext>({
    socket: null,
    room: null,
    setSelectedRoom: () => {},
    rooms: [],
  });

  useEffect(() => {
    if (socket) return;

    const s = io("http://localhost:3000");

    const currentUser = sessionStorage.getItem("currentUser");
    console.log(currentUser);

    if (currentUser) {
      s.emit("get_user_current", { username: currentUser });
    }

    s.on("username_taken", (takenUsername) => {
      alert(`Användarnamnet "${takenUsername}" är upptaget. Välj ett annat!`);
    });

    s.on("room_list", (rooms: Room[]) => {
      setRooms(rooms);
    });

    s.on("join_mainchat", (room: Room) => {
      setSelectedRoom(room);
      console.log(room);
    });

    s.on("logged_out", () => {});

    s.on("room_joined", (room: Room) => {
      setSelectedRoom(room);
    });

    s.on("message_ok", (selectedRoom: Room) => {
      setSelectedRoom(selectedRoom);
    });

    s.on("message_edited", (updatedMessages: Message[]) => {
      setSelectedRoom((selectedRoom) => {
        if (selectedRoom === null) {
          return null;
        }
        return {
          ...selectedRoom,
          messages: updatedMessages,
        };
      });
    });

    s.on("message_deleted", (updatedMessages: Message[]) => {
      setSelectedRoom((selectedRoom) => {
        if (selectedRoom === null) {
          return null;
        }
        return {
          ...selectedRoom,
          messages: updatedMessages,
        };
      });
    });

    s.on("persons_updated", (users: string[]) => {});

    s.on("user_list", (users: User[]) => {
      auth.updateUsers(users);
    });

    s.on("current_user", (currentUser: User) => {
      auth.updateCurrentUser(currentUser);
    });

    s.on("get_current_user", (currentUser: User) => {
      auth.updateCurrentUser(currentUser);
      console.log(currentUser);
    });

    setState({ ...state, socket: s });
  }, [setSocket, socket]);

  auth.updateUsers = (info: User[]) => {
    setAuth({ ...auth, users: info });
  };

  auth.updateCurrentUser = (info: User | null) => {
    setAuth({ ...auth, currentUser: info });
  };

  return (
    <>
      <ChatContext.Provider
        value={{
          ...state,
          room: selectedRoom,
          rooms: rooms,
          setSelectedRoom,
        }}
      >
        <AuthContext.Provider value={auth}>
          <RouterProvider router={router}></RouterProvider>
        </AuthContext.Provider>
      </ChatContext.Provider>
    </>
  );
}

export default App;

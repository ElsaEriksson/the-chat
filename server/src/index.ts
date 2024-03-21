import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { Room } from "./models/Room";
import { Message } from "./models/Message";
import { User } from "./models/User";
import { register } from "module";

let rooms: Room[] = [
  {
    room_id: "mainchat",
    room_name: "Öppen chatt",
    messages: [
      {
        userName: "Admin",
        messageText: "Välkommen! Nu kan du börja chatta! (Men uppför dig!)",
        posted: new Date().toLocaleString(),
        messageId: "",
        roomId: "mainchat",
        isEditable: false,
      },
    ],
  },
  {
    room_id: "room1",
    room_name: "Trädgårdsskötsel",
    messages: [
      {
        userName: "Ernst",
        messageText: "Gillar ni att få skit under naglarna där ute?",
        posted: new Date().toLocaleString(),
        messageId: "",
        roomId: "room1",
        isEditable: true,
      },
      {
        userName: "Carl-Frederique",
        messageText: "Alltid! Älskar att komma hem med smutsiga händer.",
        posted: new Date().toLocaleString(),
        messageId: "",
        roomId: "room1",
        isEditable: true,
      },
    ],
  },
  {
    room_id: "room2",
    room_name: "Snabbmat",
    messages: [
      {
        userName: "Persbrantaste_backen",
        messageText:
          "Stockholms bästa falafel och hummus finns i Rågsved! Försök få mig att ändra uppfattning!",
        posted: new Date().toLocaleString(),
        messageId: "",
        roomId: "room2",
        isEditable: true,
      },
    ],
  },
  {
    room_id: "room3",
    room_name: "Parprogrammerings- rådgivning",
    messages: [
      {
        userName: "Marlena",
        messageText:
          "Erbjuder rådgivning för er parprogrammerare som har det svårt.",
        posted: new Date().toLocaleString(),
        messageId: "",
        roomId: "room3",
        isEditable: true,
      },
      {
        userName: "Olle",
        messageText:
          "Hur ska man kunna hantera konflikter i sin programmering om man inte kan prata med sin partner?",
        posted: new Date().toLocaleString(),
        messageId: "",
        roomId: "room3",
        isEditable: true,
      },
      {
        userName: "Marlena",
        messageText:
          "Kommunikation är otroligt viktigt genom hela processen, samt att inte hålla på och peta i din partners kod samtidigt som hen skriver den.",
        posted: new Date().toLocaleString(),
        messageId: "",
        roomId: "room3",
        isEditable: true,
      },
    ],
  },
];

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

let usernameInSession: string | null = null;
let registeredUsers: User[] = [];

app.get("/", (req, res) => {
  res.send("Hello World");
});

const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.on("get_user_current", (currentUser: User) => {
    console.log("Received current user:", currentUser);
    console.log(registeredUsers);

    const isRegistered = registeredUsers.some((user) => {
      return user.username === currentUser.username;
    });

    console.log(isRegistered);

    if (isRegistered) {
      console.log("Current user is registered");
      socket.emit("current_user", currentUser);
    } else {
      console.log("Current user is not registered");
    }
  });

  socket.on("add_user", (newUser: string) => {
    console.log("add_user", newUser);
    const usernameTaken = registeredUsers.some(
      (user) => user.username === newUser
    );

    if (usernameTaken) {
      socket.emit("username_taken", newUser);
    } else {
      const currentUser = { socketId: socket.id, username: newUser };
      registeredUsers.push(currentUser);
      console.log(registeredUsers);
      io.emit("persons_updated", registeredUsers);
      socket.emit("get_current_user", currentUser);
    }
  });

  socket.on("get_current_user", (User: string) => {});

  console.log("a user connected:", socket.id);

  socket.emit("room_list", rooms);

  socket.on("create_room", (room: Room) => {
    console.log("Recieved room:", room);

    rooms.push(room);

    console.log("Current rooms:", rooms);

    socket.join(room.room_id);

    io.emit("room_list", rooms);
  });

  socket.emit("user_list", registeredUsers);

  socket.on("join_mainchat", () => {
    const mainChat = "mainchat";
    socket.join(mainChat);
    console.log("Joined: ", mainChat);
    socket.emit("join_mainchat", rooms[0]);
  });

  socket.on("join_room", (id: string, callback) => {
    socket.rooms.forEach((room) => {
      console.log("Leaving room: ", room);

      socket.leave(room);
    });

    console.log("Joining room: ", id);

    socket.join(id);

    callback(rooms.find((r) => r.room_id === id));
  });

  socket.on("log_out", () => {
    registeredUsers = registeredUsers.filter((u) => u.socketId !== socket.id);
    socket.emit("logged_out");
  });

  socket.on("disconnect", () => {
    const disconnectedUser = registeredUsers.find(
      (user) => user.socketId === socket.id
    );

    if (disconnectedUser) {
      const disconnectedIndex = registeredUsers.indexOf(disconnectedUser);
      registeredUsers.splice(disconnectedIndex, 1);
      socket.disconnect(true);
    }
  });

  socket.on("sent_message", (message: Message) => {
    const room = rooms.find((r) => r.room_id === message.roomId);
    room?.messages.push(message);
    console.log(message);

    io.to(message.roomId).emit(
      "message_ok",
      rooms.find((r) => r.room_id === message.roomId)
    );
  });

  socket.on("edit_message", (message: Message) => {
    const room = rooms.find((r) => r.room_id === message.roomId);

    if (room) {
      const updateMessage = room.messages.map((m) =>
        m.messageId === message.messageId
          ? { ...m, messageText: message.messageText }
          : m
      );
      room.messages = updateMessage;
    }
    console.log(room?.messages);

    io.to(message.roomId).emit("message_edited", room?.messages);
  });

  socket.on("delete_message", (message: Message) => {
    const room = rooms.find((r) => r.room_id === message.roomId);
    if (room) {
      room.messages = room.messages.filter(
        (m) => m.messageId !== message.messageId
      );

      io.to(message.roomId).emit("message_deleted", room.messages);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

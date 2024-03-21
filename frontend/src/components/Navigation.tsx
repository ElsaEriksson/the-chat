import { useContext, useState } from "react";
import { ChatContext } from "../contexts/ChatContext";
import { Room } from "../models/Room";
import RoomModal from "./CreateRoomModal";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../contexts/AuthContext";

export const Nav = () => {
  const { socket, room, rooms, setSelectedRoom } = useContext(ChatContext);
  const [tooltip, setTooltip] = useState("");
  const { currentUser } = useContext(AuthContext);

  const generateInitials = (roomName: string) => {
    return roomName.charAt(0).toUpperCase();
  };

  const joinRoom = (id: string) => {
    socket?.emit("join_room", id, (room: Room) => {
      console.log("Joined room: ", room);
      setSelectedRoom(room);
    });
  };

  const truncateTooltip = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + "...";
    } else {
      return text;
    }
  };

  return (
    <div className="nav-container">
      <h2>{currentUser?.username} </h2>
      <RoomModal />
      <div className="nav-items">
        {rooms.map((room) => {
          const initials = generateInitials(room.room_name);
          return (
            <>
              <AnimatePresence>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="chat-room"
                  key={room.room_id}
                  onClick={() => {
                    joinRoom(room.room_id);
                  }}
                  onMouseEnter={() => setTooltip(room.room_name)}
                  onMouseLeave={() => setTooltip("")}
                >
                  <div className="chat-room__icon">{initials}</div>
                </motion.button>

                <div className="absolute">
                  {tooltip && tooltip === room.room_name && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="tooltip"
                    >
                      {truncateTooltip(room.room_name, 20)}
                    </motion.div>
                  )}
                </div>
              </AnimatePresence>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Nav;

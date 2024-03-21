import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { ChatContext } from "../contexts/ChatContext";
import { Room } from "../models/Room";

import { v4 as uuidv4 } from "uuid";
import { FaPlus } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

export const RoomModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [roomName, setRoomName] = useState("");
  const { socket, setSelectedRoom } = useContext(ChatContext);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const room: Room = {
      room_id: uuidv4(),
      room_name: roomName,
      messages: [],
    };

    sendRoomToServer(room);

    setRoomName("");
    setIsOpen(false);
  };

  const sendRoomToServer = (room: Room) => {
    socket?.emit("create_room", room);
    setSelectedRoom(room);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="open-modal__button"
      >
        <FaPlus />
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="modal-overlay"
          >
            <div className="modal-test">
              <motion.div
                initial={{ scale: 0, rotate: "12.5deg" }}
                animate={{ scale: 1, rotate: "0deg" }}
                exit={{ scale: 0, rotate: "0deg" }}
                onClick={(e) => e.stopPropagation()}
                className="modal-container"
              >
                <button onClick={() => setIsOpen(false)}>
                  <FaXmark />
                </button>
                <div className="modal-form__container">
                  <form onSubmit={handleFormSubmit}>
                    <input
                      type="text"
                      placeholder="Channel name"
                      value={roomName}
                      onChange={(e) => setRoomName(e.target.value)}
                    />

                    <button type="submit">Create</button>
                  </form>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RoomModal;

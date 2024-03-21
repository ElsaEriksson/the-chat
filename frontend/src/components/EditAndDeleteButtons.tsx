import { useContext } from "react";
import { ChatContext } from "../contexts/ChatContext";
import { Message } from "../models/Message";
import { IoTrashOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";

interface IEditAndDeleteMessageProps {
  message: Message;
  handleEditChange: (messageId: string) => void;
}

export const EditAndDeleteButtons = (props: IEditAndDeleteMessageProps) => {
  const { socket } = useContext(ChatContext);

  const deleteMessage = () => {
    socket?.emit("delete_message", {
      messageId: props.message.messageId,
      roomId: props.message.roomId,
    });
    console.log("du klickade på", props.message.messageId);
  };

  const editMessage = () => {
    props.handleEditChange(props.message.messageId);
  };

  return (
    <>
      <section className="container--deleteAndEditButtons">
        <button className="deleteMessageButton" onClick={deleteMessage}>
          <IoTrashOutline />
        </button>
        <button className="editMessageButton" onClick={editMessage}>
          <CiEdit />
        </button>
      </section>
    </>
  );
};

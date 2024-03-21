import { Message } from "../models/Message";
import { Room } from "../models/Room";
import { User } from "../models/User";
import { EditAndDeleteButtons } from "./EditAndDeleteButtons";

interface IMessagetype {
  message: Message;
  currentUser: User | null;
  room: Room | null;
  handleEditPostChange: (newEditPost: string) => void;
  handleEditCancel: (cancelEditPost: string) => void;
}

export const MessageType = (props: IMessagetype) => {
  const handleEditChange = (messageId: string) => {
    props.handleEditCancel(messageId);
    const findMessage = props.room?.messages.find(
      (m) => m.messageId === messageId
    );
    if (findMessage) {
      findMessage.isEditable = true;
      props.handleEditPostChange(findMessage.messageText);
    }
  };
  return (
    <>
      <li
        className={
          props.currentUser?.username === props.message.userName
            ? "textMessageSent"
            : "textMessageRecieved"
        }
      >
        {props.message.messageText}
        <EditAndDeleteButtons
          message={props.message}
          handleEditChange={handleEditChange}
        />
      </li>
    </>
  );
};

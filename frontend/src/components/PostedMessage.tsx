import { Message } from "../models/Message";
import { Room } from "../models/Room";
import { User } from "../models/User";
import { MessageType } from "./MessageType";
import { SenderInfo } from "./SenderInfo";

interface IPostedMessageProps {
  message: Message;
  currentUser: User | null;
  room: Room | null;
  handleEditPostChange: (newEditPost: string) => void;
  handleEditCancel: (cancelEditPost: string) => void;
}

export const PostedMessage = (props: IPostedMessageProps) => {
  return (
    <>
      <section
        className={
          props.currentUser?.username === props.message.userName
            ? "container--messageSent"
            : "container--messageRecieved"
        }
      >
        <SenderInfo message={props.message} currentUser={props.currentUser} />
        <MessageType
          message={props.message}
          currentUser={props.currentUser}
          room={props.room}
          handleEditPostChange={props.handleEditPostChange}
          handleEditCancel={props.handleEditCancel}
        />
      </section>
    </>
  );
};

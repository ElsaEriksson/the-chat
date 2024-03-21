import { useContext } from "react";
import { ChatContext } from "../contexts/ChatContext";
import { Message } from "../models/Message";
import { InputEditMessage } from "./InputEditMessage";
import { SaveAndCancelButtons } from "./SaveAndCancelButtons";

interface IEditableMessageProps {
  message: Message;
  editMode: String | null;
  editPost: string;
  handleEditPostChange: (newEditPost: string) => void;
  handleEditCancel: (cancelEditPost: string) => void;
}

export const EditableMessage = (props: IEditableMessageProps) => {
  const { socket } = useContext(ChatContext);

  const handleSaveEdit = (message: Message) => {
    if (props.editMode) {
      socket?.emit("edit_message", {
        messageId: message.messageId,
        messageText: props.editPost,
        roomId: message.roomId,
      });
      props.handleEditPostChange("");
    }
  };

  const handleCancelEdit = () => {
    props.handleEditCancel("");
  };

  return (
    <>
      <section className="container--editModeMessage">
        <InputEditMessage
          editPost={props.editPost}
          message={props.message}
          handleEditPostChange={props.handleEditPostChange}
        />
        <SaveAndCancelButtons
          message={props.message}
          handleCancelEdit={handleCancelEdit}
          handleSaveEdit={handleSaveEdit}
        />
      </section>
    </>
  );
};

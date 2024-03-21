import { useContext, useState } from "react";
import { ChatContext } from "../contexts/ChatContext";
import { EditableMessage } from "./EditableMessage";
import { AuthContext } from "../contexts/AuthContext";
import { PostedMessage } from "./PostedMessage";

export const ShowMessages = () => {
  const [editMode, setEditMode] = useState<string | null>(null);
  const [editPost, setEditPost] = useState("");

  const { currentUser } = useContext(AuthContext);
  const { room } = useContext(ChatContext);

  const handleEditPostChange = (newEditPost: string) => {
    setEditPost(newEditPost);
  };

  const handleEditCancel = (cancelEditPost: string) => {
    setEditMode(cancelEditPost);
  };

  return (
    <>
      <div className="container--roomTitle">
        <h3>{room?.room_name}</h3>
      </div>
      <section className="container--messagesList">
        <section className="container--messagesList__scrollbehavior">
          <ul className="messagesList">
            {room?.messages.map((message, i) =>
              message.isEditable &&
              editMode === message.messageId &&
              currentUser?.username === message.userName ? (
                <EditableMessage
                  key={i}
                  message={message}
                  editMode={editMode}
                  editPost={editPost}
                  handleEditPostChange={handleEditPostChange}
                  handleEditCancel={handleEditCancel}
                />
              ) : (
                <PostedMessage
                  key={i}
                  message={message}
                  currentUser={currentUser}
                  room={room}
                  handleEditPostChange={handleEditPostChange}
                  handleEditCancel={handleEditCancel}
                />
              )
            )}
          </ul>
        </section>
      </section>
    </>
  );
};

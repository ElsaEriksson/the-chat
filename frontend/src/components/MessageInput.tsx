import { useContext, useRef, useState } from "react";
import { ChatContext } from "../contexts/ChatContext";
import { ShowMessages } from "./ShowMessages";
import { AuthContext } from "../contexts/AuthContext";
import { MessageInputTextArea } from "./MessageInputTextArea";
import { IoSend } from "react-icons/io5";

export const MessageInput = () => {
  const [newPost, setNewPost] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { socket, room } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const messageId = new Date().toISOString();

  const postMessage = () => {
    socket?.emit("sent_message", {
      messageId: messageId,
      messageText: newPost,
      roomId: room?.room_id,
      userName: currentUser?.username,
      posted: new Date().toLocaleString(),
    });
    setNewPost("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleSetNewPost = (newPost: string) => {
    setNewPost(newPost);
  };

  return (
    <>
      <>
        <ShowMessages />
        <section className="container--messageInput">
          <MessageInputTextArea
            postMessage={postMessage}
            textareaRef={textareaRef}
            newPost={newPost}
            handleSetNewPost={handleSetNewPost}
          />
          <button onClick={postMessage} className="sendMessageButton">
            <IoSend />
          </button>
        </section>
      </>
    </>
  );
};

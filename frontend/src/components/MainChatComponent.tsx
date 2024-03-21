import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ChatContext } from "../contexts/ChatContext";
import { ShowMessages } from "./ShowMessages";

export const MainChatComponent = () => {
  const [newPost, setNewPost] = useState("");
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
  };
  return (
    <>
      <ShowMessages />
      <input
        type="text"
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
      />
      <button onClick={postMessage}>Skicka</button>
    </>
  );
};

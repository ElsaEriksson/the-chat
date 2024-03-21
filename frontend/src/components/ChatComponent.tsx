import { useContext } from "react";

import { MessageInput } from "./MessageInput";
import { ChatContext } from "../contexts/ChatContext";
import Nav from "./Navigation";
import { LogOutButton } from "./LogOutButton";

export const ChatComponent = () => {
  const { room } = useContext(ChatContext);

  return (
    <>
      <div className="page-wrapper">
        <Nav />
        <div className="chat-container">{room ? <MessageInput /> : null}</div>
        <LogOutButton />
      </div>
    </>
  );
};

export default ChatComponent;

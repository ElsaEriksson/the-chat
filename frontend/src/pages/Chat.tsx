import { useContext, useEffect } from "react";
import { ChatComponent } from "../components/ChatComponent";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Chat = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <ChatComponent />
    </>
  );
};

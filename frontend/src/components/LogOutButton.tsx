import { useContext } from "react";
import { ChatContext } from "../contexts/ChatContext";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

export const LogOutButton = () => {
  const { socket } = useContext(ChatContext);
  const { updateCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    socket?.emit("log_out");

    sessionStorage.removeItem("currentUser");
    updateCurrentUser(null);

    console.log(sessionStorage);

    navigate("/login");
  };

  return (
    <>
      <button className="logout-button" onClick={logout}>
        Logga ut
      </button>
    </>
  );
};

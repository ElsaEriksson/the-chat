import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ChatContext } from "../contexts/ChatContext";
import { useNavigate } from "react-router";

export const Login = () => {
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(ChatContext);

  const [username, setUsername] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    socket?.emit("add_user", username);
    sessionStorage.setItem("currentUser", username);
    socket?.emit("join_mainchat");

    console.log(currentUser);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <>
      <div className="login-form__container">
        <h2>Pick a name</h2>
        <form className="login-form" onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={username}
            onChange={handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

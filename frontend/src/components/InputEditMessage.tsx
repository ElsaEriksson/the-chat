import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Message } from "../models/Message";

interface IInputEditMessagProps {
  message: Message;
  editPost: string;
  handleEditPostChange: (newEditPost: string) => void;
}

export const InputEditMessage = (props: IInputEditMessagProps) => {
  const [textInput, setTextInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [props.editPost]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(event.target.value);
    props.handleEditPostChange(event.target.value);
  };

  return (
    <>
      <textarea
        ref={textareaRef}
        style={{ height: "50px" }}
        className="textarea--editMessage"
        value={props.editPost}
        onChange={handleChange}
      />
    </>
  );
};

import { ChangeEvent } from "react";

interface IMessageInputTextArea {
  newPost: string;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  postMessage: () => void;
  handleSetNewPost: (newPost: string) => void;
}

export const MessageInputTextArea = (props: IMessageInputTextArea) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
    props.handleSetNewPost(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      props.postMessage();
    }
  };

  return (
    <>
      <textarea
        ref={props.textareaRef}
        placeholder="Skriv ett meddelande"
        className="inputTextForMessage"
        value={props.newPost}
        onChange={handleChange}
        style={{ minHeight: "30px" }}
        onKeyDown={handleKeyPress}
      />
    </>
  );
};

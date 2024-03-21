import { Message } from "../models/Message";

interface ISaveAndCancelButtons {
  message: Message;
  handleCancelEdit: () => void;
  handleSaveEdit: (message: Message) => void;
}

export const SaveAndCancelButtons = (props: ISaveAndCancelButtons) => {
  return (
    <>
      <section className="container--saveAndCancelButtons">
        <button className="cancelEditButton" onClick={props.handleCancelEdit}>
          Cancel
        </button>
        <button
          className="saveEditButton"
          onClick={() => props.handleSaveEdit(props.message)}
        >
          Save
        </button>
      </section>
    </>
  );
};

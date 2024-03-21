import { Message } from "../models/Message";
import { User } from "../models/User";

interface ISenderInfo {
  message: Message;
  currentUser: User | null;
}

export const SenderInfo = (props: ISenderInfo) => {
  return (
    <>
      <section className="container--messageUserAndTime">
        <p className="text--userNameForMessage">
          {props.currentUser?.username === props.message.userName
            ? props.currentUser?.username
            : props.message.userName}
        </p>
        <p className="text--formattedDateForMessage">{props.message.posted}</p>
      </section>
    </>
  );
};

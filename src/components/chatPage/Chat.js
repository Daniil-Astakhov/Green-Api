import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import { sendMessage } from "../../services/sendMessage";
import { getMessage } from "../../services/getMessage";
import { useDispatch, useSelector } from "react-redux";
import {
  messageChanged,
  nickNameChanged,
  userNamedChanged,
} from "./messageSlice";
import ChatList from "./ChatList";
import Messages from "./Messages";

import styles from "../../styles/Chat.module.scss";
import icon from "../../images/emoji.svg";

const Chat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { apiTokenInstance, idInstance } = useSelector(
    (state) => state.welcomeSlice
  );
  const { messages, nickName, chatId, userName } = useSelector(
    (state) => state.messageSlice
  );

  const leaveRoom = () => navigate("/");

  const getDate = () =>
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  const handleChange = ({ target: { value } }) => setMessage(value);

  const onEmojiClick = ({ emoji }) => setMessage(`${message} ${emoji}`);

  const handleMessageReceived = (body) => {
    console.log(body);
    dispatch(
      messageChanged([
        body.senderData.chatName,
        body.messageData.textMessageData.textMessage,
        getDate(),
      ])
    );
    dispatch(userNamedChanged(body.senderData.chatName));
  };

  const getMessages = async () =>
    getMessage(idInstance, apiTokenInstance, handleMessageReceived);

  const sendMessages = async (e) => {
    e.preventDefault();
    await sendMessage(idInstance, apiTokenInstance, chatId[0], message);
    dispatch(messageChanged([idInstance, message, getDate()]));
    setMessage([]);
  };

  useEffect(() => {
    dispatch(nickNameChanged(idInstance));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      getMessages();
    }, 8000);
    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.title}></div>
        <div className={styles.users}>
          {chatId.length >= 1 ? (
            <div>Chat with {userName.length ? userName : chatId}</div>
          ) : (
            <div>Select user</div>
          )}
        </div>
        <button className={styles.left} onClick={leaveRoom}>
          Leave session
        </button>
      </div>

      <div className={styles.messages}>
        <ChatList />
        <Messages message={messages} name={nickName} />
      </div>

      <form className={styles.form} onSubmit={sendMessages}>
        <div className={styles.emoji}>
          <img src={icon} alt="icon" onClick={() => setIsOpen(!isOpen)} />
          {isOpen && (
            <div className={styles.emojies}>
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>
        <div className={styles.input}>
          <input
            type="text"
            name="message"
            value={message}
            placeholder="Enter your message"
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <button
          className={styles.button}
          type="submit"
          onClick={sendMessages}
          value="Send a massage"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;

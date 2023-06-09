import React from "react";
import styles from "../../styles/Messages.module.scss";

const Messages = ({ message, name }) => {
  return (
    <div className={styles.messages}>
      {message.map((message, i) => {
        const itsMe = message[0].trim() === name.trim();
        const className = itsMe ? styles.me : styles.user;
        return (
          <div key={i} className={`${styles.message} ${className}`}>
            <span className={styles.user}>{message[0]}</span>
            <div className={styles.text}>
              {message[1]}
              <div className={styles.time}>{message[2]}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;

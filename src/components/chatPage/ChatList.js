import styles from '../../styles/Chat.module.scss'
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { chatIdChanged } from './messageSlice';

const ChatList = () => {
    const dispatch = useDispatch();
    const { chatId, userName, messages } = useSelector(state => state.messageSlice);
    const [user, setUser] = useState('');
    const handleChange = ({ target: { value } }) => setUser(value);

    const handleSubmit = (e) => {
        if(chatId.length >= 1) {
            e.preventDefault();
            setUser('Test. Only 1 user.')
            return;
        }
        e.preventDefault();
        dispatch(chatIdChanged(user));
        setUser('');    
    }
    
    return ( 
        <div className={styles.containerChat}>
         <form onSubmit={handleSubmit} className={styles.containerForm} >
                <div className={styles.containerInput}>
                    <input
                        type="text"
                        name="message"
                        placeholder="79123456780"
                        value={user}
                        onChange={handleChange}
                        autoComplete="off"
                        required
                    />
                </div>
                <button className={styles.containerSubBtn}></button>
            </form>
            {(userName.length >= 1 ? userName : chatId).map(user => (
                <div className={styles.containerUser} key={user}>
                    {user}
                   <div 
                      className={styles.lastMessage}
                      >
                      {messages && messages.length > 0 ? messages[messages.length - 1][1] : null}
                    </div> 
                </div>
            ))}
        </div>
     );
}
 
export default ChatList;
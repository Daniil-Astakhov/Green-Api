import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Main.module.scss"
import { useDispatch, useSelector } from 'react-redux';
import { tokenChanged, idChanged} from './welcomeSlice';

const Welcome = () => {
    const {apiTokenInstance, idInstance} = useSelector(state => state.welcomeSlice);
    const dispatch = useDispatch();


    const handleClick = (e) => {
        const isDisabled = idInstance.length < 10 && apiTokenInstance < 15;
        console.log(isDisabled)
        if (isDisabled) e.preventDefault();
    };

    const handleTokenChange = (event) => {
        dispatch(tokenChanged(event.target.value));
    };

    const handleIdChange = (event) => {
        dispatch(idChanged(event.target.value));
    };
    

    return (
        <div className={styles.wrap}>
            <div className={styles.container}>
                <h1 className={styles.heading}>Join</h1>
                <form className={styles.form}>
                    <div className={styles.group}>
                        <input 
                          type="text" 
                          name="id" 
                          placeholder="idInstance"
                          className={styles.input}
                          onChange={handleIdChange}
                          autoComplete="on"
                          required
                        />
                    </div>
                    <div className={styles.group}>
                        <input 
                          type="text" 
                          name="api" 
                          placeholder="apiTokenInstance"
                          className={styles.input}
                          onChange={handleTokenChange}
                          autoComplete="on"
                          required
                        />
                    </div>
                    <Link 
                      className={styles.group} 
                      to={`/chat?name=${apiTokenInstance}&room=${idInstance}`}
                      onClick={handleClick}>
                        <button type="submit" className={styles.button}>
                            Sign In
                        </button>
                    </Link>
                </form>
                
            </div>
        </div>
    )
};
export default Welcome;
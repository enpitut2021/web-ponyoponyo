import React, {useRef} from 'react';
import axios from 'axios';
import styles from "./episode.module.css";



const episode_page = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const inputEl1 = useRef<HTMLInputElement>(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const inputEl2 = useRef<HTMLInputElement>(null);
    const handleClick = () => {
        // @ts-ignore
        axios({
            method: 'POST',
            url: 'https://api.digital-future.jp/episode',
            data: {user_id: inputEl1.current!!.value, desc: inputEl2.current!!.value}
        }).then(response => console.log('response body:', response.data));
    };

    return (

        <div className={styles.input}>
            <h1 className={styles.title}>恥</h1>
            <br/>
            <br/>
            <br/>
            <br/>
            <input className={styles.font_2} ref={inputEl1} type="text" placeholder={"ユーザー名を入力"}/>
            <br/>
            <input className={styles.font_2} ref={inputEl2} type="text" placeholder={"恥ずかしエピソードを入力"}/>
            <br/>
            <button className={styles.font} onClick={handleClick}>登録</button>
        </div>
    )
}
export default episode_page;

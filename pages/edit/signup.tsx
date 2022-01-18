import React ,{ useRef, useEffect, useState} from 'react';
import axios from 'axios';
import styles from "./episode.module.css";
import { useRouter } from 'next/router';


const Signup_page = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const inputEl1 = useRef<HTMLInputElement>(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const inputEl2 = useRef<HTMLInputElement>(null);

    const router = useRouter(); 


    const handleClick = () => {
        // @ts-ignore
        axios({
            method: 'POST',
            url: 'https://api.digital-future.jp/signup',
            data: {email: inputEl1.current!!.value, password: inputEl2.current!!.value}
        }).then(response => {
            if(response.status === 200){alert("success!")}
        });
        router.push({
            pathname:"/edit/signin",   //URL
        })
    };

    return (

        <div className={styles.input}>
            <h1 className={styles.title}>sign up</h1>
            <br/>
            <br/>
            <br/>
            <br/>
            <input className={styles.font_2} ref={inputEl1} type="text" placeholder={"email"}/>
            <br/>
            <input className={styles.font_2} ref={inputEl2} type="text" placeholder={"password"}/>
            <br/>
            <button className={styles.font} onClick={handleClick}>sign up</button>
        </div>
    )
}
export default Signup_page;
import React ,{ useState, useRef} from 'react';
import axios from 'axios';
import styles from "./signin.module.css";
import { useRouter } from 'next/router';


const Signin_page = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const inputEl1 = useRef<HTMLInputElement>(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const inputEl2 = useRef<HTMLInputElement>(null);
    const [isRevealPassword, setIsRevealPassword] = useState(false);
    const router = useRouter(); 

    const eyeon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
    const eyeoff = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye-off"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
    
    const [eye, setEye] = useState(eyeoff);

    const togglePassword = () => {
        setIsRevealPassword((prevState) => !prevState);
        if (isRevealPassword === true){
            setEye(eyeoff);
        }
        if (isRevealPassword === false){
            setEye(eyeon);
        }
    }

    const handleClick = () => {
      
        // @ts-ignore
        axios({
            method: 'POST',
            url: 'https://api.digital-future.jp/signin',
            data: {email: inputEl1.current!!.value, password: inputEl2.current!!.value}
        }).then(response => {
            if(response.status === 200){alert("success!")
            router.push({
                pathname:"/edit/episode",   //URL
                query: {user_id :response.data.id} //検索クエリ
            })}
            if(response.status !== 200){
                alert("failed!")
            }
        });
    };

    return (

        <div className={styles.input}>
            <h1 className={styles.title}>Sign in</h1>
            <br/>
            <br/>
            <br/>
            <br/>
            <input className={styles.font_2} ref={inputEl1} type="text" placeholder={"Email"}/>
            <br/>
            <div>
            <input placeholder="Password" type={isRevealPassword ? 'text' : 'password'} className={styles.font_2} name="password" ref={inputEl2} />
            <span onClick={togglePassword} >{eye}</span>
            </div>
            <br/>
            <button className={styles.font} onClick={handleClick}>Sign in</button>
        </div>
    )
}
export default Signin_page;
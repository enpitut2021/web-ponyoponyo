import React ,{ useRef, useEffect, useState} from 'react';
import axios from 'axios';
import styles from "./episode.module.css";
import { useRouter } from 'next/router';


const Episode_page = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const inputEl1 = useRef<HTMLInputElement>(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const inputEl2 = useRef<HTMLInputElement>(null);

    const router = useRouter(); 

    const [data, setData] = useState<any>({ tasks: [] });
        useEffect(() => {
        const fetchData = async () => {
        const result = await axios(
            'https://api.digital-future.jp/task/read',
        );

        setData(result.data);
        };

        fetchData();
        }, []);

    const handleClick = () => {
        // @ts-ignore
        axios({
            method: 'POST',
            url: 'https://api.digital-future.jp/episode',
            data: {user_id: router.query.id, desc: inputEl2.current!!.value}
        }).then(response =>  {
        alert(response.status)            
        router.push({
            pathname:"/edit/todopage",   //URL
            query: {id :router.query.id} //検索クエリ
        })}
        );
    };

    return (

        <div className={styles.input}>
            <h1 className={styles.title}>恥</h1>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <input className={styles.font_2} ref={inputEl2} type="text" placeholder={"恥ずかしいエピソードを入力"}/>
            <br/>
            <button className={styles.font} onClick={handleClick}>登録</button>
        </div>
    )
}
export default Episode_page;

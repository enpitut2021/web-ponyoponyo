import React ,{ useRef, useEffect, useState} from 'react';
import axios from 'axios';
import styles from "./episode.module.css";
import { useRouter } from 'next/router';


const Episode_page = () => {
    const inputEl1 = useRef<any>(null);
    const router = useRouter(); 


    const [data, setData] = useState<any>({ episodes: [] });
        useEffect(() => {
        const fetchData = async () => {
        const result = await axios(
            `https://api.digital-future.jp/episode?user_id=${router.query.user_id}`,
        );

        setData(result.data);
        };

        fetchData();
        }, [data]);



    const handleClick = () => {
        // @ts-ignore
        axios({
            method: 'POST',
            url: 'https://api.digital-future.jp/episode',
            data: {user_id: router.query.user_id, desc: inputEl1.current.value}
        }).then(response =>  {
        if(response.status === 200){alert("success!")}
        router.push({
            pathname:"/edit/todopage",   //URL
            query: {user_id :router.query.user_id} //検索クエリ
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
            <input className={styles.font_2} ref={inputEl1} type="text" placeholder={"恥ずかしいエピソードを入力"}/>
            <br/>
            <button className={styles.font} onClick={handleClick}>登録</button>
            <h3>your episodes:</h3>
            
            {data.episodes.filter((episode:any) => (
               router.query.user_id === episode.user_id
            )).map((episode:any) => (
            <div key={episode.user_id}>
            <ul><li>{episode.desc}</li></ul>
            </div>
            ))}
        </div>
    )
}
export default Episode_page;

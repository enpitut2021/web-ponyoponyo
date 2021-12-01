import React, {useRef, useEffect, useState} from 'react';
import axios from 'axios';

const todo_page = () => {
    const inputEl1 = useRef(null);
    const inputEl2 = useRef(null);
    const inputEl3 = useRef(null);

    const handleClick = () => {
        const cur_time = new Date()
        const getTime = cur_time.getTime();
        const getDdl = Date.parse(inputEl2.current.value);
        if (inputEl1.current.value.length !== 0 && getTime < getDdl) {
            axios({
                method: 'POST',
                url: 'https://api.digital-future.jp/task',
                data: {name: inputEl1.current.value, deadline: inputEl2.current.value, is_finished: false}
            }).then(response => console.log('response body:', response.data));
        }
    }

    // const data = [{name: "finish my work", deadline: "2021-12-05", id: "1", is_finished: true}]

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [data, setData] = useState([]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios('https://api.digital-future.jp/task/read',);

            setData(result.data);
        };

        fetchData();
    }, []);


    const handleOnchange = () => {
        axios({
            method: 'POST',
            url: 'https://api.digital-future.jp/task/',
            data: {id: inputEl3.current.id, is_finished: inputEl3.current.checked}
        }).then(response => console.log('response body:', response.data));
    }


    // @ts-ignore
    return (<>
            <div>
                <input
                    ref={inputEl1}
                    type="text"
                    placeholder={"Enter your tasks here"}
                /><br/>
                <input
                    ref={inputEl2}
                    type="date"
                />
                <button
                    onClick={handleClick}
                >登録
                </button>
                {data !== undefined ? data.map(item => (

                    <ul key={uuid.v4()}>
                        <li>
                            <input
                                ref={inputEl3}
                                id={item.id}
                                type="checkbox"
                                //チェックボックスの値が格納される
                                defaultChecked={false}
                                checked={item.is_finished}
                                //値が変わるときに呼ばれる関数
                                onChange={handleOnchange}
                            />
                            <label className="todo-label" htmlFor={item.id}>
                                {item.name}&emsp;&emsp;&emsp;{item.deadline}
                            </label>
                        </li>
                    </ul>)) : <div></div>}
            </div>
        </>)
}
export default todo_page;
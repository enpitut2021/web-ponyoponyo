import React ,{ useRef, useEffect, useState} from 'react';
import axios from 'axios';

const todo_page = () => {
    const inputEl1 = useRef<HTMLDivElement>(null);
    const inputEl2 = useRef<HTMLDivElement>(null);
    const inputEl3 = useRef<HTMLDivElement>(null);
    const inputEl4 = useRef<HTMLDivElement>(null);

    const handleClick = () => { 
        const cur_time = new Date()
        const getTime = cur_time.getTime();
        const getDdl = Date.parse(inputEl2.current.value);
        if (inputEl1.current.value.length !== 0 && getTime < getDdl) {
        axios({
            method : 'POST',
            url    : 'https://api.digital-future.jp/task',
            data   : { name: inputEl1.current.value, deadline: inputEl2.current.value + inputEl4.current.value, is_finished:false}
        }).then(response => console.log('response body:', response.data.tasks));
        }
    }





    //{task:[{name:"finish my work", deadline:"2021-12-05", id:"1", is_finished:true}{}{}{}]}
    //task:[{}][{}][{}]


    const [data, setData] = useState({ tasks: [] });

        useEffect(() => {
        const fetchData = async () => {
        const result = await axios(
            'https://api.digital-future.jp/task/read',
        );

        setData(result.data);
        };

        fetchData();
        }, []);



    const handleOnchange =() =>{
        axios({
            method : 'POST',
            url    : 'https://api.digital-future.jp/task',
            data   : { id: inputEl3.current.id, is_finished:inputEl3.current.checked}
        }).then(response => console.log('response body:', response.data));
    }


    return (
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
            <input
                ref={inputEl4}
                type="time"
            />
            <button 
                onClick={handleClick}
            >登録
            </button>


            {data.tasks.map(task => (
            <ul>
            <li>
                <input
                ref={inputEl3}
                id={task.id}
                type="checkbox"
                //チェックボックスの値が格納される
                defaultChecked={false}
                checked={task.is_finished}
                //値が変わるときに呼ばれる関数
                onChange={handleOnchange}
                />
                <label className="todo-label" htmlFor={task.id}>
                {task.name}&emsp;&emsp;&emsp;{task.deadline}
                </label>
            </li>
            </ul>
            ))}

        </div>
    )
}

export default todo_page;
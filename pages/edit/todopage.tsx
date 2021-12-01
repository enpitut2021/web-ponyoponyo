import React ,{ useRef, useEffect, useState} from 'react';
import axios from 'axios';

const todo_page = () => {
    const inputEl1 = useRef<HTMLDivElement>(null);
    const inputEl2 = useRef<HTMLDivElement>(null);
    const inputEl3 = useRef<HTMLDivElement>(null);

    const handleClick = () => { 
        const cur_time = new Date()
        const getTime = cur_time.getTime();
        const getDdl = Date.parse(inputEl2.current.value);
        if (inputEl1.current.value.length !== 0 && getTime < getDdl) {
        axios({
            method : 'POST',
            url    : 'http://localhost:9002/task/read',
            data   : { name: inputEl1.current.value, deadline: inputEl2.current.value, is_finished:false}
        }).then(response => console.log('response body:', response.data));
        }
    }





    const data=[{name:"finish my work", deadline:"2021-12-05", id:"1", is_finished:true}]

    const [data, setData] = useState();

        useEffect(() => {
        const fetchData = async () => {
        const result = await axios(
            'http://localhost:9002/task',
        );

        setData(result.data);
        };

        fetchData();
        }, []);



    const handleOnchange =() =>{
        axios({
            method : 'POST',
            url    : 'http://localhost:9002/task/read',
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
            <button 
                onClick={handleClick}
            >登録
            </button>


            {data.map(data => (
            <ul>
            <li>
                <input
                ref={inputEl3}
                id={data.id}
                type="checkbox"
                //チェックボックスの値が格納される
                defaultChecked={false}
                checked={data.is_finished}
                //値が変わるときに呼ばれる関数
                onChange={handleOnchange}
                />
                <label className="todo-label" htmlFor={data.id}>
                {data.name}&emsp;&emsp;&emsp;{data.deadline}
                </label>
            </li>
            </ul>
            ))}

        </div>
    )
}
export default todo_page;
import React ,{ useRef, useEffect, useState} from 'react';
import axios from 'axios';
import Link from 'next/link';

const Todo_page = () => {
    const InputEl1 = useRef<any>(null);
    const InputEl2 = useRef<any>(null);
    const InputEl3 = useRef<any>(null);
    const InputEl4 = useRef<any>(null);


    const cur_time = new Date()
    const getTime = cur_time.getTime();    

    const handleClick = () => { 
        const getDdl = Date.parse(InputEl2.current.value);
        if (InputEl1.current.value.length !== 0 && getTime < getDdl) {
        axios({
            method : 'POST',
            url    : 'https://api.digital-future.jp/task',
            data   : { user_id: "example_user_id", name: InputEl1.current.value, deadline: InputEl2.current.value, is_done:false}
        }).then(response => console.log('response body:', response.data));
        alert("your episode has been sent")
        }
    }



    const [data, setData] = useState<any>({ tasks: [] });
    const [finish, setFinish] = useState('not');

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
            data   : { id: InputEl3.current.id, is_finished:InputEl3.current.checked}
        }).then(response => console.log('response body:', response.data));
    }

    const progress = () =>{
        let countChecked = 0
        let countUnchecked = 0

        data.tasks.map((task:any) => {
            const getDdl = Date.parse(task.deadline);
            if (task.is_done = false && getTime > getDdl){
                countUnchecked += 1
            }
            else{
                countChecked += 1
            }

        })
        const unfinished = countUnchecked / (countChecked + countUnchecked)
        if ( unfinished > 0.3){
            setFinish('');
        }
    }


    return (
        <div>
            <input
                ref={InputEl1}
                type="text"
                placeholder={"Enter your tasks here"}
            /><br/>
            <input
                ref={InputEl2}
                type="date"
            />
            <input
                ref={InputEl4}
                type="time"
            />
            <button 
                onClick={handleClick}
            >登録
            </button>


            {
            data.tasks.map((task:any) => (
            <div key={task.id}>
            <ul>
            <li>
                <input
                ref={InputEl3}
                id={task.id}
                type="checkbox"
                //チェックボックスの値が格納される.
                defaultChecked={false}
                checked={task.is_done}
                //値が変わるときに呼ばれる関数.
                onChange={handleOnchange}
                />
                <label className="todo-label" htmlFor={task.id}>
                {task.name}&emsp;&emsp;&emsp;{task.deadline}
                </label>
            </li>
            </ul>
            </div>
            ))}
        <br/>
        <p>your episode will {finish} be shown</p>
        <Link href="/edit/episode">episodeを登録</Link>
        </div>
    )

}

export default Todo_page;
import React ,{ useRef, useEffect, useState} from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Todo_page = () => {
    const InputEl1 = useRef<any>(null);
    const InputEl2 = useRef<any>(null);
    const InputEl3 = useRef<any>(null);
    const InputEl4 = useRef<any>(null);



    const cur_time = new Date();
    const getTime = cur_time.getTime();
    const router = useRouter(); 
    const [data, setData] = useState<any>({ tasks: [] });
    const [order, setOrder] = useState<any>();
    const [finish, setFinish] = useState('not');
    

    const handleClick = () => {
        const getDdl = Date.parse(InputEl2.current.value + " " + InputEl4.current.value);
        const ddl = new Date(InputEl2.current.value + " " + InputEl4.current.value);
        if (InputEl1.current.value.length !== 0 && getTime < getDdl) {
        axios({
            method : 'POST',
            url    : 'https://api.digital-future.jp/task',
            data   : { user_id:router.query.user_id , name: InputEl1.current.value, deadline:ddl.toUTCString() , is_done:false}
        }).then(response => {
            if(response.status === 200){alert("your task has been sent!")}
        });
        }
    }


    useEffect(() => {
    const fetchData = async () => {
    const result = await axios(
        `https://api.digital-future.jp/task/read?user_id=${router.query.user_id}`,
    );

    setData(result.data);
    };

    fetchData();
    } ,[data]);


    const handleOnchange = (e:any) =>{
        axios({
            method : 'POST',
            url    : 'https://api.digital-future.jp/task',
            data   : { user_id:router.query.user_id, id:e.target.id, is_done:e.target.checked}
        })//.then(response => alert(e.target.checked));


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

    const compare = (a:any, b:any) => {
        if (order === "ddl"){
        let A = Date.parse(a.deadline); 
        let B = Date.parse(b.deadline); 
        if (A < B) {
            return -1;
          }
          if (A > B) {
            return 1;
          }
          return 0;
        }
        if (order === "name"){
        let A = a.name; 
        let B = b.name; 
        
        if (A < B) {
          return -1;
        }
        if (A > B) {
          return 1;
        }
        return 0;
      }}


      const changeOrder = (e:any) =>{
          if (e.target.value === "deadline"){
            setOrder("ddl");
          }
          if (e.target.value === "task"){
            setOrder("name");
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
            <br/>
            <button 
                onClick={handleClick}
            >登録
            </button>

            <p>
            <label htmlFor="order">Choose an order:</label>
            <select name="order" id="order" onChange={changeOrder}>
                <option value="">--Please choose an option--</option>
                <option value="deadline">deadline</option>
                <option value="task">task</option>
            </select>
            </p>
            
            {data.tasks.sort(compare).map((task:any) => (
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
        <p><Link href={"/edit/episode"}>see episodes</Link></p>
        </div>
    )

}

export default Todo_page;
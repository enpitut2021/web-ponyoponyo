import React from "react";
import { useDispatch, useSelector } from "react-redux";
import taskSlice, { Task, TaskState } from "../../state/Task";
import { Form } from "../../components/Form";
import styles from "./todo.module.css";
import { Todo } from "../../components/Todo";
import axios from "axios";
import { useState, useEffect } from "react";

import Link from "next/link";

function TodoPage() {
  //ストアを呼んでくる

  const dispatch = useDispatch();
  const taskState = useSelector(
    (state: { taskState: TaskState }) => state
  ).taskState;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>This is todo page!</h1>

      <Form
        InputValue={taskState.input_value}
        onChangeCalenderValue={(e: React.ChangeEvent<HTMLInputElement>) => {
          let b = e.target.value;
          dispatch(taskSlice.actions.notifyGetDdl(b));
          console.log(b);
        }}
        deadline={taskState.input_deadline_value}
        onChangeValue={(e: React.ChangeEvent<HTMLInputElement>) => {
          let a = e.target.value;
          dispatch(taskSlice.actions.notifyChangeInputValue(a));
          console.log(a);
        }}
        onClick={() => {
          let getTime = taskState.cur_time.getTime();
          let getDdl = Date.parse(taskState.input_deadline_value);
          if (taskState.input_value.length !== 0 && getTime < getDdl) {
            const tmpArray = taskState.tasks.filter((task) => {
              task.is_finished === true;
              task.inTime === true;
            });
            var taskNum = taskState.tasks.length + 1;
            var progressNum = tmpArray.length;
            var done = progressNum / taskNum;

            let p: Task = {
              task: taskState.input_value,
              is_finished: false,
              deadline: taskState.input_deadline_value,
              task_id: taskNum,
              inTime: true,
            };
            dispatch(taskSlice.actions.notifyChangeProgress(done));
            dispatch(taskSlice.actions.notifyAddNewTask(p));
            dispatch(taskSlice.actions.notifyChangeInputValue(""));
          }
        }}
      />
      {taskState.tasks.map((value: Task, index: number) => {
        return (
          <>
            <div className={styles.footer}>
              <Todo
                task={value.task}
                is_finished={value.is_finished}
                task_id={value.task_id}
                deadline={value.deadline}
                onChange={() => {
                  dispatch(
                    taskSlice.actions.notifyChangeTaskState(value.task_id)
                  );

                  console.log(value.task_id);
                  const tmpArray = taskState.tasks.filter((task) => {
                    task.is_finished;
                    task.inTime;
                  });

                  const taskNum = taskState.tasks.length;
                  let progressNum = tmpArray.length;
                  // if(value.is_finished)progressNum-=1

                  const done = progressNum / taskNum;
                  dispatch(taskSlice.actions.notifyChangeProgress(done));
                }}
              />
            </div>
          </>
        );
      })}
      <Link href={"/edit/episode"}>恥ずかしエピソードを登録</Link>
      <Link href={"/edit/todopage"}>todo</Link>
    </div>
  );
}

export default TodoPage;

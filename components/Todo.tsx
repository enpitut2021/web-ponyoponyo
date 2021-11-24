import React, { ChangeEvent } from "react";

interface OwnProps {
  task: string;
  is_finished: boolean;

  onChange(event: ChangeEvent): void;

  task_id: number;
  deadline: string;
}

type Props = OwnProps;
export const Todo: React.FC<Props> = (props) => {
  return (
    <div className="c-cb">
      <input
        id="todo-0"
        type="checkbox"
        //チェックボックスの値が格納される
        defaultChecked={false}
        checked={props.is_finished}
        //値が変わるときに呼ばれる関数
        onChange={(event) => props.onChange(event)}
      />
      <label className="todo-label" htmlFor="todo-0">
        {props.task}&emsp;&emsp;&emsp;{props.deadline}
      </label>
    </div>
  );
};

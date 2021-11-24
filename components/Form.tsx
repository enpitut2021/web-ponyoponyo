import React, {ChangeEvent} from "react";
import styles from "../pages/edit/todo.module.css";

interface OwnProps {
    InputValue: string
    deadline : string
    onChangeValue(event: React.ChangeEvent<HTMLInputElement>): void;
    onChangeCalenderValue(event:React.ChangeEvent<HTMLInputElement>):void;
    onClick(): void;
}

type Props = OwnProps
export const Form: React.FC<Props> = props => {
    return (
        <div>
            <input
                type="text"
                onChange={props.onChangeValue}
                placeholder={"Enter your tasks here"}
                value={props.InputValue}
            />
            <input
                type="date"
                onChange={props.onChangeCalenderValue}
                value={props.deadline}
            />
            <button className = {styles.button}
                onClick={props.onClick}
            >登録
            </button>
        </div>
    )
}

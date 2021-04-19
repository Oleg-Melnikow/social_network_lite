import React from "react";
import { MessageType } from "../../../redux/dialogsReducer";
import style from "../Dialogs.module.css";


export function Message(props: MessageType){
    return (
        <div className={style.message}>{props.message}</div>
    )
}
import React from "react";
import style from "./Post.module.css";
import {PostType} from "../../../../redux/profileReducer";


export function Post(props: PostType) {
    const {avatar, name, message, time} = props;
    return (
        <div className={style.wrap}>
            <img src={avatar} alt="avatar"/>
            <div className={style.droplet}/>
            <div className={style.message}>
                <div className={style.name}>{name}</div>
                <div className={style.text}>{message}</div>
                <div className={style.time}>{time}</div>
            </div>
        </div>
    )
}
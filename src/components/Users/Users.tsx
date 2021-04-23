import React from 'react';
import {UsersPropsType} from "./UsersContainer";
import style from "./Users.module.css"
import avatar from "../../assets/image/avatar-guest.gif"

export const Users = (props: UsersPropsType) => {
    return (
        <div className={style.container}>
            {props.users.map(u => {
                return <div key={`${u.id}_${u.name}`} className={style.users}>
                    <div className={style.avatarBlock}>
                            <img src={u.photos.small ? u.photos.small : avatar} alt="avatar"/>
                        <button>
                            {u.followed ? "unfollow" : "follow"}
                        </button>
                    </div>
                    <div className={style.description}>
                        <h2>{u.name}</h2>
                        <span><b>{u.status}</b></span>
                    </div>
                </div>
            })}
        </div>
    )
}
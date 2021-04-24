import React from 'react';
import style from "./Users.module.css"
import avatar from "../../assets/image/avatar-guest.gif"
import {UserType} from '../../redux/usersReducer';

type UsersPropType = {
    users: Array<UserType>,
    pageSize: number,
    currentPage: number,
    totalUsersCount: number,
    onPageChanged: (pageNumber: number) => void
}

export const Users = (props: UsersPropType) => {

    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages: number[] = []
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    return (
        <div className={style.container}>
            <div>
                {pages.map((p, i) => <span key={i}
                                           onClick={() => {props.onPageChanged(p)}}
                                           className={props.currentPage === p ? style.selectPage : ""}> {p}</span>)}
            </div>
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
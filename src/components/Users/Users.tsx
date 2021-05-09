import React from 'react';
import style from "./Users.module.css"
import avatar from "../../assets/image/avatar-guest.gif"
import {NavLink} from 'react-router-dom';
import { UserType } from '../../api/api';

type UsersPropType = {
    users: Array<UserType>,
    pageSize: number,
    currentPage: number,
    totalUsersCount: number,
    followingInProgress: number[],
    onPageChanged: (pageNumber: number) => void,
    follow: (userId: number) => void,
    unFollow: (userId: number) => void
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
                                           onClick={() => {
                                               props.onPageChanged(p)
                                           }}
                                           className={props.currentPage === p ? style.selectPage : ""}> {p}</span>)}
            </div>
            {props.users.map(u => {
                return <div key={`${u.id}_${u.name}`} className={style.users}>
                    <div className={style.avatarBlock}>
                        <NavLink to={`profile/${u.id}`}>
                            <img src={u.photos.small ? u.photos.small : avatar} alt="avatar"/>
                        </NavLink>
                        <button disabled={props.followingInProgress.some(id => id === u.id)}
                                onClick={() => {
                                    u.followed ? props.unFollow(u.id) : props.follow(u.id)
                                }}>
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
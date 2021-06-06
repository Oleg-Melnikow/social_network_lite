import React from 'react';
import style from "./Users.module.css"
import avatar from "../../assets/image/avatar-guest.gif"
import {NavLink} from 'react-router-dom';
import {UserType} from '../../api/api';

type UsersPropType = {
    user: UserType,
    followingInProgress: number[],
    follow: (userId: number) => void,
    unFollow: (userId: number) => void
}

export const User = (props: UsersPropType) => {

    let {user, follow, followingInProgress, unFollow} = props;

    return (
        <div className={style.users}>
            <div className={style.avatarBlock}>
                <NavLink to={`profile/${user.id}`}>
                    <img src={user.photos.small ? user.photos.small : avatar} alt="avatar"/>
                </NavLink>
                <button disabled={followingInProgress.some(id => id === user.id)}
                        onClick={() => {
                            user.followed ? unFollow(user.id) : follow(user.id)
                        }}>
                    {user.followed ? "unfollow" : "follow"}
                </button>
            </div>
            <div className={style.description}>
                <h2>{user.name}</h2>
                <span><b>{user.status}</b></span>
            </div>
        </div>

    )
}
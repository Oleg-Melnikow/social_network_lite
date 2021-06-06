import React from 'react';
import style from "./Users.module.css"
import {UserType} from '../../api/api';
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";

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

    return (
        <div className={style.container}>
            <Paginator currentPage={props.currentPage} pageSize={props.pageSize} totalUsersCount={props.totalUsersCount}
                       onPageChanged={props.onPageChanged}/>
            {props.users.map(u => {
                return <User user={u} followingInProgress={props.followingInProgress}
                             follow={props.follow} unFollow={props.unFollow} key={`${u.id}_${u.name}`}/>
            })}
        </div>
    )
}
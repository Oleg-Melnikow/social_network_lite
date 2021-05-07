import React from "react";
import style from "./Profile.module.css";
import MyPostsContainer from "./MyPosts/MyPostContainer";
import {profileType} from "../../redux/profileReducer";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";

export type ProfilePropsType = {
    profile: profileType | null,
    status: string
}

export function Profile(props: ProfilePropsType) {
    return (
        <div className={style.content}>
            <ProfileInfo profile={props.profile} status={props.status}/>
            <MyPostsContainer/>
        </div>
    )
}
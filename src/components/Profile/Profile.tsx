import React from "react";
import style from "./Profile.module.css";
import MyPostsContainer from "./MyPosts/MyPostContainer";
import {profileType} from "../../redux/profileReducer";

export type ProfilePropsType = {
    profile: profileType | null
}

export function Profile(props: ProfilePropsType) {
    return (
        <div className={style.content}>
            <div>
                <img src="https://pbs.twimg.com/profile_banners/3145195603/1500320606/1500x500" alt="pic"/>
            </div>
            <MyPostsContainer/>
        </div>
    )
}
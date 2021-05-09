import React from "react";
import style from "./Profile.module.css";
import MyPostsContainer from "./MyPosts/MyPostContainer";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfileType} from "../../api/api";

export type ProfilePropsType = {
    profile: ProfileType | null,
    status: string,
    updateStatusProfile: (status: string) => void
}

export function Profile(props: ProfilePropsType) {
    return (
        <div className={style.content}>
            <ProfileInfo profile={props.profile} status={props.status}
                         updateStatusProfile={props.updateStatusProfile}/>
            <MyPostsContainer/>
        </div>
    )
}
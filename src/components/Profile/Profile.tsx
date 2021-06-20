import React from "react";
import style from "./Profile.module.css";
import MyPostsContainer from "./MyPosts/MyPostContainer";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfileType} from "../../api/api";

export type ProfilePropsType = {
    profile: ProfileType | null,
    status: string,
    isOwner: boolean,
    updateStatusProfile: (status: string) => void,
    savePhoto: (photo: File) => void,
    saveProfile: (profile: ProfileType) => void
}

export function Profile(props: ProfilePropsType) {
    return (
        <div className={style.content}>
            <ProfileInfo profile={props.profile} status={props.status} isOwner={props.isOwner}
                         savePhoto={props.savePhoto} saveProfile={props.saveProfile}
                         updateStatusProfile={props.updateStatusProfile}/>
            <MyPostsContainer/>
        </div>
    )
}
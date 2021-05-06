import React from "react";
import {ProfilePropsType} from "../Profile";
import style from "./ProfileInfo.module.css"
import {ProfileStatus} from "./ProfileStatus";

export function ProfileInfo(props: ProfilePropsType) {
    return (
        <div>
            <div>
                <img src="https://pbs.twimg.com/profile_banners/3145195603/1500320606/1500x500" alt="pic"/>
            </div>
            <ProfileStatus/>
            <div className={style.avatar}>
                <img src={props.profile?.photos.small} alt=""/>
            </div>
            <div className={style.info}>
                <span>{props.profile?.aboutMe}</span>
                <span>{props.profile?.fullName}</span>
            </div>
        </div>
    )
}
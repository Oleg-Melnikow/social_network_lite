import React, {ChangeEvent} from "react";
import {ProfilePropsType} from "../Profile";
import style from "./ProfileInfo.module.css"
import {ProfileStatus} from "./ProfileStatus";

export function ProfileInfo(props: ProfilePropsType) {

    function handlerPhoto(e: ChangeEvent<HTMLInputElement>){
        if(e.target.files){
            props.savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            <div>
                <img src="https://pbs.twimg.com/profile_banners/3145195603/1500320606/1500x500" alt="pic"/>
            </div>
            <ProfileStatus status={props.status} updateStatusProfile={props.updateStatusProfile}/>
            <div className={style.avatar}>
                <img src={`${props.profile?.photos.small}`} alt=""/>
                {props.isOwner && <input type="file" onChange={handlerPhoto}/>}
            </div>
            <div className={style.info}>
                <span>{props.profile?.aboutMe}</span>
                <span>{props.profile?.fullName}</span>
            </div>
        </div>
    )
}
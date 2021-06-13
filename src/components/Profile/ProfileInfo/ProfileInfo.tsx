import React, {ChangeEvent, useState} from "react";
import {ProfilePropsType} from "../Profile";
import style from "./ProfileInfo.module.css"
import {ProfileStatus} from "./ProfileStatus";
import {ProfileType} from "../../../api/api";

export function ProfileInfo(props: ProfilePropsType) {

    function handlerPhoto(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            props.savePhoto(e.target.files[0])
        }
    }

    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    const goToEditMode = () => setIsEditMode(true);

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
            {isEditMode ?
                <ProfileDataForm/> :
                <ProfileData profile={props.profile} isOwner={props.isOwner} goToEditMode={goToEditMode}/>}
        </div>
    )
}

type ProfileDataPropsType = {
    profile: ProfileType | null,
    isOwner: boolean,
    goToEditMode: () => void
}

const ProfileData = (props: ProfileDataPropsType) => {

    const contacts = props.profile?.contacts
    return <div>
        {props.isOwner && <div>
            <button onClick={props.goToEditMode}>edit</button>
        </div>}
        <div className={style.info}>
            <span>{props.profile?.aboutMe}</span>
            <span>{props.profile?.fullName}</span>
        </div>
        <div>
            <b>Looking for a Job:</b> {props.profile?.lookingForAJob ? "yes" : "no"}
        </div>
        <div>
            <b>Looking for a Job description:</b> {props.profile?.lookingForAJobDescription}
        </div>
        <div>
            <b>Contacts</b>:
            {contacts && Object.keys(contacts).map(key => {
                // @ts-ignore
                return <Contacts contactTitle={key} contactValue={contacts[key]}/>
            })}
        </div>
    </div>
}

const ProfileDataForm = () => {
    return <div>
        Form
    </div>
}

const Contacts = (props: { contactTitle: string, contactValue: string }) => {
    return (<div>
            {props.contactValue &&
            <div><b>{props.contactTitle}</b>: {props.contactValue}</div>
            }
        </div>
    )
}
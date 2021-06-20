import React, {ChangeEvent, useState} from "react";
import {ProfilePropsType} from "../Profile";
import style from "./ProfileInfo.module.css"
import {ProfileStatus} from "./ProfileStatus";
import {ContactsType, ProfileType} from "../../../api/api";
import ProfileDataForm from "./ProfileDataForm";

export function ProfileInfo(props: ProfilePropsType) {

    function handlerPhoto(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            props.savePhoto(e.target.files[0]);
        }
    }

    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    const goToEditMode = () => setIsEditMode(true);

    const onSubmit = (formData: ProfileType) => {
        props.saveProfile(formData);
        setIsEditMode(false);
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
            {isEditMode ?
                <ProfileDataForm profile={props.profile} onSubmit={onSubmit}/> :
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

    const {isOwner, goToEditMode, profile} = props;
    const contacts = profile?.contacts;

    return <div>
        {isOwner && <div>
            <button onClick={goToEditMode}>edit</button>
        </div>}
        <div className={style.info}>
            <span>{profile?.aboutMe}</span>
            <span>{profile?.fullName}</span>
        </div>
        <div>
            <b>Looking for a Job:</b> {profile?.lookingForAJob ? "yes" : "no"}
        </div>
        <div>
            <b>Looking for a Job description:</b> {profile?.lookingForAJobDescription}
        </div>
        <div>
            <b>Contacts</b>:
            {contacts && Object.keys(contacts).map(key => {
                return <Contacts key={key} contactTitle={key} contactValue={contacts[key as keyof ContactsType]}/>
            })}
        </div>
    </div>
}

type ContactsPropsType = {
    contactTitle: string,
    contactValue: string
}

export const Contacts = (props: ContactsPropsType) => {
    return (<div>
            {props.contactValue &&
            <div><b>{props.contactTitle}</b>: {props.contactValue}</div>
            }
        </div>
    )
}
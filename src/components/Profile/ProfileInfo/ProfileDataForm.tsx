import React from "react";
import {ProfileType} from "../../../api/api";
import {CreateField, Input, TextArea} from "../../common/FormsControl/FormsControl";
import {InjectedFormProps, reduxForm} from "redux-form";

type PropsType = {
    profile: ProfileType | null
}


const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = (props) => {

    const contacts = props.profile?.contacts;
    const {error} = props;

    return <form onSubmit={props.handleSubmit}>

        {error && <div style={{border: "1px solid red", color: "darkred", padding: "10px"}}>
            {error}
        </div>}

        <div>
            <button type='submit'>save</button>
        </div>
        <div>
            <b>Full Name</b> : {CreateField(Input, "Full name", "fullName", [])}
        </div>
        <div>
            <b>Looking for a Job</b>: {CreateField(Input, "Looking for a Job", "lookingForAJob", [], "", "checkbox")}
        </div>
        <div>
            <b>Looking for a Job
                description:</b> {CreateField(TextArea, "My professional skills", "LookingForAJobDescription", [], "", "checkbox")}
        </div>
        <div>
            <b>About me:</b> {CreateField(TextArea, "About me", "aboutMe", [], "", "checkbox")}
        </div>
        <div>
            <b>Contacts</b>:
            {contacts && Object.keys(contacts).map(key => {
                return <div key={key}>
                    <b>{key}</b>: {CreateField(Input, `${key}`, `contacts.${key}`, [])}
                </div>
            })}
        </div>
    </form>
}

const ProfileReduxForm = reduxForm<ProfileType, PropsType>({form: "edit-profile"})(ProfileDataForm);

export default ProfileReduxForm;
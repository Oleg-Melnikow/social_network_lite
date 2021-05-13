import React from "react";
import style from "./Dialogs.module.css";
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogsPropsType} from "./DialogsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {TextArea} from "../common/FormsControl/FormsControl";
import {maxLength, required} from "../../utils/validators/validators";

export const Dialogs = (props: DialogsPropsType) => {
    const {dialogsPage} = props

    const addMessage = (formData: FormType) => {
        props.addMessage(formData.message)
    }

    return (
        <div>
            <div className={style.dialogs}>
                <div className={style.dialogsItem}>
                    {dialogsPage.dialogs.map(dialogs => <DialogItem key={dialogs.id} name={dialogs.name}
                                                                    id={dialogs.id}/>)}
                </div>
                <div className={style.messages}>
                    {dialogsPage.messages.map(m => <Message key={m.id} id={m.id} message={m.message}/>)}
                </div>
            </div>
            <div>
                <MessageForm onSubmit={addMessage}/>
            </div>
        </div>
    )
}

type FormType = {
    message: string
}

const maxLengthPost = maxLength(100);

const AddMessageForm: React.FC<InjectedFormProps<FormType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={TextArea} name="message" type="text"
                   validate={[required, maxLengthPost]} placeholder="Enter your message"/>
        </div>
        <div>
            <input type="submit" value="Send message"/>
        </div>
    </form>
}

const MessageForm = reduxForm<FormType>({form: "dialog"})(AddMessageForm);
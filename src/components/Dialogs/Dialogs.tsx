import React, {ChangeEvent} from "react";
import style from "./Dialogs.module.css";
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogsPropsType} from "./DialogsContainer";

export const Dialogs = (props: DialogsPropsType) => {

    const {dialogsPage} = props
    const onChangeMessageHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        props.onMessageChange(event.currentTarget.value)
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
            <div className={style.dialogsItem}>
                <div>
                <textarea value={props.dialogsPage.newMessageBody}
                          onChange={onChangeMessageHandler}
                          name="post" id="newPost"/>
                </div>
                <div>
                    <button onClick={props.addMessage}>Add post</button>
                </div>
            </div>
        </div>
    )
}
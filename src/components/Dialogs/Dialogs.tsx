import React, {ChangeEvent} from "react";
import style from "./Dialogs.module.css";
import {addMessage, DialogsPageType, onMessageChange} from "../../redux/dialogsReducer";
import {AppStateType} from "../../redux/store";
import {connect} from "react-redux";
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";

const Dialogs = (props: DialogsPropsType) => {

    const {dialogsPage} = props

    const onChangeMessageHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        props.onMessageChange(event.currentTarget.value)
    }

    return (
        <div>
            <div className={style.dialogs}>
                <div className={style.dialogsItem}>
                    {dialogsPage.dialogs.map(dialogs => <DialogItem key={dialogs.id} name={dialogs.name} id={dialogs.id}/>)}
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

type mapStateToPropsType = {
    dialogsPage: DialogsPageType
}

type mapDispatchToProps = {
    addMessage: () => void,
    onMessageChange: (message: string) => void
}

type DialogsPropsType = mapStateToPropsType & mapDispatchToProps;

let mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    dialogsPage: state.dialogsPage
})

export default connect(mapStateToProps, {addMessage, onMessageChange})(Dialogs);
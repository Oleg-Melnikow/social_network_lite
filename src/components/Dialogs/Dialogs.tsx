import React, {ChangeEvent} from "react";
import {addMessage, DialogsPageType, onMessageChange} from "../../redux/dialogsReducer";
import {AppStateType} from "../../redux/store";
import {connect} from "react-redux";

const Dialogs = (props: DialogsPropsType) => {

    const onChangeMessageHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        props.onMessageChange(event.currentTarget.value)
    }

    return (
        <div>
            <div>
                <textarea value={props.dialogsPage.newMessageBody}
                          onChange={onChangeMessageHandler}
                          name="post" id="newPost"/>
            </div>
            <div>
                <button onClick={props.addMessage}>Add post</button>
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
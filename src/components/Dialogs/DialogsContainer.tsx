import {addMessage, DialogsPageType, onMessageChange} from "../../redux/dialogsReducer";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import {Dialogs} from "./Dialogs";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import React from "react";


type mapStateToPropsType = {
    dialogsPage: DialogsPageType
}

type mapDispatchToProps = {
    addMessage: () => void,
    onMessageChange: (message: string) => void
}

export type DialogsPropsType = mapStateToPropsType & mapDispatchToProps;

let mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    dialogsPage: state.dialogsPage
})

export default compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, {addMessage, onMessageChange})
)(Dialogs);
export type MessageType = {
    id: number,
    message: string
}

export type DialogType = {
    id: number,
    name: string
}

export type DialogsPageType = {
    dialogs: Array<DialogType>,
    messages: Array<MessageType>,
    newMessageBody: string
}

const ADD_MESSAGE = "ADD_MESSAGE";
const UPDATE_MESSAGE_TEXT = "UPDATE_MESSAGE_TEXT";

export type addMessageActionType = {
    type: typeof ADD_MESSAGE
}

export type onMessageChangeActionType = {
    type: typeof UPDATE_MESSAGE_TEXT,
    newMessage: string
}

export type DialogsPageActionsTypes = addMessageActionType | onMessageChangeActionType

export const addMessage = (): addMessageActionType => ({type: ADD_MESSAGE})
export const onMessageChange = (newMessage: string): onMessageChangeActionType => ({type: UPDATE_MESSAGE_TEXT, newMessage})

let initialState: DialogsPageType = {
    dialogs: [
        {name: "Den", id: 1},
        {name: "Nixon", id: 2},
        {name: "Jack", id: 3},
    ],
    messages: [
        {id: 1, message: "Hi"},
        {id: 2, message: "Hello"},
        {id: 3, message: "Welcome"}
    ],
    newMessageBody: ""
}

const dialogsReducer = (state: DialogsPageType = initialState, action: DialogsPageActionsTypes): DialogsPageType => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                newMessageBody: "",
                messages: [...state.messages, {
                    id: state.messages.length + 1,
                    message: state.newMessageBody
                }]
            }
        case UPDATE_MESSAGE_TEXT:
            return {
                ...state,
                newMessageBody: action.newMessage
            }
        default:
            return state;
    }
}

export default dialogsReducer;
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
    messages: Array<MessageType>
}

const ADD_MESSAGE = "ADD_MESSAGE";

export type addMessageActionType = {
    type: typeof ADD_MESSAGE,
    newMessage: string
}

export type DialogsPageActionsTypes = addMessageActionType

export const addMessage = (newMessage: string): addMessageActionType => ({type: ADD_MESSAGE, newMessage})

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
}

const dialogsReducer = (state: DialogsPageType = initialState, action: DialogsPageActionsTypes): DialogsPageType => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {
                    id: state.messages.length + 1,
                    message: action.newMessage
                }]
            }
        default:
            return state;
    }
}

export default dialogsReducer;
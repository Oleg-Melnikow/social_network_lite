import {AppStateType} from "./store";
import {ThunkAction} from "redux-thunk";
import {getAuthUserData} from "./authReducer";

export type AppType = {
    initialized: boolean
}

let initialState: AppType = {
    initialized: false
}

export type AppActionsTypes = ReturnType<typeof setInitialized>;

export const setInitialized = () => ({type: "SET_INITIALIZED"} as const)

export const appReducer = (state: AppType = initialState, action: AppActionsTypes): AppType => {
    switch (action.type) {
        case "SET_INITIALIZED":
            debugger
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

type ThunkType = ThunkAction<void, AppStateType, unknown, AppActionsTypes>

export const initializeApp = (): ThunkType => (dispatch, getState: () => AppStateType) => {

    Promise.all([dispatch(getAuthUserData())])
        .then(() => {
            dispatch(setInitialized())
        })
}
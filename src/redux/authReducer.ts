import {ThunkAction} from "redux-thunk";
import { AuthAPI } from "../api/api";
import { AppStateType } from "./store";

const SET_USER_DATA = "SET_USER_DATA";

export type AuthType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}

let initialState: AuthType = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

export type setUserDataActionType = {
    type: typeof SET_USER_DATA,
    data: AuthType
}

export type AuthActionsTypes = setUserDataActionType;

export const setAuthUserData = (data: AuthType): setUserDataActionType => ({type: SET_USER_DATA, data})

export const authReducer = (state: AuthType = initialState, action: AuthActionsTypes): AuthType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            }
        default:
            return state;
    }
}

type ThunkType = ThunkAction<void, AppStateType, unknown, AuthActionsTypes>

export const getAuthUserData = (): ThunkType => (dispatch, getState: () => AppStateType) => {
    AuthAPI.me()
        .then((response) => {
            if (response.resultCode === 0) {
                let {id, login, email} = response.data
                dispatch(setAuthUserData({id, login, email, isAuth: true}));
            }
        })
}
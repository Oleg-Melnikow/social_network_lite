import {ThunkAction} from "redux-thunk";
import {AuthAPI} from "../api/api";
import {AppStateType} from "./store";
import {FormAction, stopSubmit} from "redux-form";

const SET_USER_DATA = "social_network/auth/SET_USER_DATA";

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

type ThunkType = ThunkAction<void, AppStateType, unknown, AuthActionsTypes | FormAction>

export const getAuthUserData = (): ThunkType => async (dispatch, getState: () => AppStateType) => {
    let response = await AuthAPI.me()
    if (response.resultCode === 0) {
        let {id, login, email} = response.data
        dispatch(setAuthUserData({id, login, email, isAuth: true}));
    }
}

export const login = (email: string, password: string, rememberMe: boolean): ThunkType => async (dispatch, getState: () => AppStateType) => {
    let response = await AuthAPI.login(email, password, rememberMe)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
        dispatch(stopSubmit("login", {_error: message}))
    }
}

export const logout = (): ThunkType => async (dispatch, getState: () => AppStateType) => {
    let response = await AuthAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData({id: null, login: null, email: null, isAuth: false}));
    }
}
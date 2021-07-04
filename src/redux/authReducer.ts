import {ThunkAction} from "redux-thunk";
import {AuthAPI, SecurityAPI} from "../api/api";
import {AppStateType} from "./store";
import {FormAction, stopSubmit} from "redux-form";

const SET_USER_DATA = "social_network/auth/SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "social_network/auth/GET_CAPTCHA_URL_SUCCESS";

export type AuthType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}

export type CaptchaType = { captchaUrl: string | null }

type initialStateType = AuthType & CaptchaType

let initialState: initialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

export type setUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: AuthType
}

export type getCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: CaptchaType
}

export type AuthActionsTypes = setUserDataActionType | getCaptchaUrlSuccessActionType;

export const setAuthUserData = (payload: AuthType): setUserDataActionType => ({type: SET_USER_DATA, payload});
export const getCaptchaUrlSuccess = (payload: CaptchaType): getCaptchaUrlSuccessActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload
});

export const authReducer = (state: initialStateType = initialState, action: AuthActionsTypes): initialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

type ThunkType = ThunkAction<void, AppStateType, unknown, AuthActionsTypes | FormAction>

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let response = await AuthAPI.me();
    if (response.resultCode === 0) {
        let {id, login, email} = response.data
        dispatch(setAuthUserData({id, login, email, isAuth: true}));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let response = await AuthAPI.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
        dispatch(getCaptchaUrlSuccess({captchaUrl: null}))
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
        dispatch(stopSubmit("login", {_error: message}))
    }
}

export const logout = (): ThunkType => async (dispatch) => {
    let response = await AuthAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData({id: null, login: null, email: null, isAuth: false}));
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let response = await SecurityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess({captchaUrl}));
}
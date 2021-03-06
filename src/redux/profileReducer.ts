import {ThunkAction} from "redux-thunk";
import {PhotosType, profileAPI, ProfileType} from "../api/api";
import {AppStateType} from "./store";
import {FormAction, stopSubmit} from "redux-form";

const ADD_POST = "social_network/profile/ADD_POST";
const SET_USER_PROFILE = "social_network/profile/SET_USER_PROFILE";
const SET_STATUS_PROFILE = "social_network/profile/SET_STATUS_PROFILE";
const DELETE_POST = "social_network/profile/DELETE_POST";
const SAVE_PHOTO = "social_network/profile/SAVE_PHOTO";

export type PostType = {
    id: number,
    avatar: string,
    name: string,
    message: string,
    time: string
}

export type ProfilePageType = {
    posts: Array<PostType>,
    profile: ProfileType | null,
    status: string
}

let initialState: ProfilePageType = {
    posts: [
        {
            id: 1,
            avatar: "https://s.starladder.com/uploads/user_logo/5/c/0/f/meta_tag_66fb805dd1ae6ed6151784bfe300298c.jpg",
            name: "Nick",
            message: "Welcome to the New",
            time: "20:00"
        },
        {
            id: 2,
            avatar: "https://s.starladder.com/uploads/user_logo/5/c/0/f/meta_tag_66fb805dd1ae6ed6151784bfe300298c.jpg",
            name: "Nick",
            message: "Hello boy!!",
            time: "21:22"
        }
    ],
    profile: null as ProfileType | null,
    status: ""
}


export type addPostActionType = {
    type: typeof ADD_POST,
    newText: string
}

export type setUserProfileActionType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}

export type setStatusProfileActionType = {
    type: typeof SET_STATUS_PROFILE,
    status: string
}

export type deletePostActionType = {
    type: typeof DELETE_POST,
    postId: number
}

export type savePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO,
    photos: PhotosType
}

export type ProfilePageActionsTypes = addPostActionType
    | setUserProfileActionType
    | setStatusProfileActionType
    | deletePostActionType
    | savePhotoSuccessActionType;

export const addPost = (newText: string): addPostActionType => ({type: ADD_POST, newText});
export const setUserProfile = (profile: ProfileType): setUserProfileActionType => ({type: SET_USER_PROFILE, profile});
export const setStatusProfile = (status: string): setStatusProfileActionType => ({type: SET_STATUS_PROFILE, status});
export const deletePost = (postId: number): deletePostActionType => ({type: DELETE_POST, postId});
export const savePhotoSuccess = (photos: PhotosType): savePhotoSuccessActionType => ({type: SAVE_PHOTO, photos});

const profileReducer = (state = initialState, action: ProfilePageActionsTypes): ProfilePageType => {
    switch (action.type) {
        case ADD_POST:
            const time = new Date()
            const postTime = `${time.getHours()}:${time.getMinutes()}`
            return {
                ...state,
                posts: [{
                    id: state.posts.length + 1,
                    avatar: "https://s.starladder.com/uploads/user_logo/5/c/0/f/meta_tag_66fb805dd1ae6ed6151784bfe300298c.jpg",
                    message: action.newText,
                    name: "Jack",
                    time: postTime
                }, ...state.posts]
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS_PROFILE:
            return {
                ...state,
                status: action.status
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        case SAVE_PHOTO:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state
    }
}

type ThunkType = ThunkAction<void, AppStateType, unknown, ProfilePageActionsTypes | FormAction>

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    let response = await profileAPI.setUserProfile(userId)
    dispatch(setUserProfile(response.data))
}

export const getStatusProfile = (userId: number): ThunkType => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatusProfile(response.data))
}

export const updateStatusProfile = (status: string): ThunkType => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatusProfile(status))
    }
}

export const savePhoto = (photo: File): ThunkType => async (dispatch) => {
    let response = await profileAPI.savePhoto(photo);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch,getState: () => AppStateType) => {
    const userId = getState().auth.id;
    let response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        if(userId !== null){
            dispatch(getUserProfile(userId));
        } else {
            throw new Error("userId can't be null")
        }
    } else {
        dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}))
    }
}

export default profileReducer;

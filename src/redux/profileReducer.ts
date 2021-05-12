import {ThunkAction} from "redux-thunk";
import {profileAPI, ProfileType} from "../api/api";
import {AppStateType} from "./store";

const ADD_POST = "ADD_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS_PROFILE = "SET_STATUS_PROFILE";

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
    profile: null,
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

export type ProfilePageActionsTypes = addPostActionType
    | setUserProfileActionType
    | setStatusProfileActionType;

export const addPost = (newText: string): addPostActionType => ({type: ADD_POST, newText});
export const setUserProfile = (profile: ProfileType): setUserProfileActionType => ({type: SET_USER_PROFILE, profile});
export const setStatusProfile = (status: string): setStatusProfileActionType => ({type: SET_STATUS_PROFILE, status});

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
        default:
            return state
    }
}

type ThunkType = ThunkAction<void, AppStateType, unknown, ProfilePageActionsTypes>

export const getUserProfile = (userId: string): ThunkType => (dispatch, getState: () => AppStateType) => {
    profileAPI.setUserProfile(userId)
        .then(response => {
            dispatch(setUserProfile(response.data))
            console.log(response.data)
        })
}

export const getStatusProfile = (userId: number): ThunkType => (dispatch, getState: () => AppStateType) => {
    profileAPI.getStatus(userId)
        .then(response => {
            dispatch(setStatusProfile(response.data))
        })
}

export const updateStatusProfile = (status: string): ThunkType => (dispatch,getState: () => AppStateType) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if(response.data.resultCode === 0) {
                dispatch(setStatusProfile(status))
                console.log(response.data)
            }
        })
}

export default profileReducer;

import {ThunkAction} from "redux-thunk";
import {profileAPI} from "../api/api";
import {AppStateType} from "./store";

const ADD_POST = "ADD_POST";
const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT";
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
    newPostText: string,
    profile: profileType | null,
    status: string
}

export type profileType = {
    aboutMe: string,
    fullName: string,
    userId: number,
    photos: {
        small: string,
        large: string
    }
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
    newPostText: "",
    profile: null,
    status: ""
}


export type addPostActionType = {
    type: typeof ADD_POST
}

export type onPostChangeActionType = {
    type: typeof UPDATE_NEW_POST_TEXT,
    newText: string
}

export type setUserProfileActionType = {
    type: typeof SET_USER_PROFILE,
    profile: profileType
}

export type setStatusProfileActionType = {
    type: typeof SET_STATUS_PROFILE,
    status: string
}

export type ProfilePageActionsTypes = addPostActionType
    | onPostChangeActionType
    | setUserProfileActionType
    | setStatusProfileActionType;

export const addPost = (): addPostActionType => ({type: ADD_POST});
export const onPostChange = (newText: string): onPostChangeActionType => ({type: UPDATE_NEW_POST_TEXT, newText});
export const setUserProfile = (profile: profileType): setUserProfileActionType => ({type: SET_USER_PROFILE, profile});
export const setStatusProfile = (status: string): setStatusProfileActionType => ({type: SET_STATUS_PROFILE, status});

const profileReducer = (state = initialState, action: ProfilePageActionsTypes): ProfilePageType => {
    switch (action.type) {
        case ADD_POST:
            const time = new Date()
            const postTime = `${time.getHours()}:${time.getMinutes()}`
            return {
                ...state,
                newPostText: "",
                posts: [{
                    id: state.posts.length + 1,
                    avatar: "https://s.starladder.com/uploads/user_logo/5/c/0/f/meta_tag_66fb805dd1ae6ed6151784bfe300298c.jpg",
                    message: state.newPostText,
                    name: "Jack",
                    time: postTime
                }, ...state.posts]
            }
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
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
            console.log(response.data)
        })
}

export default profileReducer;

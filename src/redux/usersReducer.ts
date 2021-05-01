import {ThunkAction} from "redux-thunk";
import {userAPI} from "../api/api";
import {AppStateType} from "./store";

const TOGGLE_FOLLOW = "TOGGLE_FOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

export type UserType = {
    id: number,
    name: string,
    status: string,
    followed: boolean,
    photos: {
        small?: string,
        large?: string
    }
}

export type UsersPageType = {
    users: UserType[],
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: number[]
}

let initialState: UsersPageType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 20,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}


export type toggleFollowActionType = {
    type: typeof TOGGLE_FOLLOW,
    userId: number
}

export type setUsersActionType = {
    type: typeof SET_USERS,
    users: Array<UserType>
}

export type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}

export type SetTotalCountType = {
    type: typeof SET_TOTAL_COUNT,
    totalCount: number
}

export type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}

export type followingInProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching: boolean
    userId: number
}

export type UsersActionsTypes = toggleFollowActionType
    | setUsersActionType
    | SetCurrentPageType
    | SetTotalCountType
    | ToggleIsFetchingType
    | followingInProgressType;

export const toggleFollow = (userId: number): toggleFollowActionType => ({type: TOGGLE_FOLLOW, userId});
export const setUsers = (users: Array<UserType>): setUsersActionType => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalCount = (totalCount: number): SetTotalCountType => ({type: SET_TOTAL_COUNT, totalCount});
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowingProgress = (isFetching: boolean, userId: number): followingInProgressType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
});

const usersReducer = (state = initialState, action: UsersActionsTypes): UsersPageType => {
    switch (action.type) {
        case TOGGLE_FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: !u.followed}
                    }
                    return u;
                })
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.userId] :
                    [...state.followingInProgress.filter(id => id !== action.userId)]

            }
        default:
            return state
    }
}

type ThunkType = ThunkAction<void, AppStateType, unknown, UsersActionsTypes>

export const getUsers = (currentPage: number, pageSize: number): ThunkType =>
    (dispatch, getState: () => AppStateType) => {
        dispatch(toggleIsFetching(true));
        userAPI.getUsers(currentPage, pageSize).then(response => {
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(response.items));
            dispatch(setTotalCount(response.totalCount));
        })
    };

export const unFollow = (userId: number): ThunkType => (dispatch, getState: () => AppStateType) => {
    dispatch(toggleFollowingProgress(true, userId))
    userAPI.unFollowed(userId).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(toggleFollow(userId))
        }
        dispatch(toggleFollowingProgress(false, userId))
    })
}

export const follow = (userId: number): ThunkType => (dispatch, getState: () => AppStateType) => {
    dispatch(toggleFollowingProgress(true, userId))
    userAPI.followed(userId).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(toggleFollow(userId))
        }
        dispatch(toggleFollowingProgress(false, userId))
    })
}


export default usersReducer;

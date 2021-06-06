import { Dispatch } from "redux";
import {ThunkAction} from "redux-thunk";
import {userAPI, UserType} from "../api/api";
import {AppStateType} from "./store";

const TOGGLE_FOLLOW = "social_network/users/TOGGLE_FOLLOW";
const SET_USERS = "social_network/users/SET_USERS";
const SET_CURRENT_PAGE = "social_network/users/SET_CURRENT_PAGE";
const SET_TOTAL_COUNT = "social_network/users/SET_TOTAL_COUNT";
const TOGGLE_IS_FETCHING = "social_network/users/TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "social_network/users/TOGGLE_IS_FOLLOWING_PROGRESS";

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
    async (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(currentPage));
        let response = await userAPI.getUsers(currentPage, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(response.items));
        dispatch(setTotalCount(response.totalCount));
    }

export const unFollow = (userId: number): ThunkType => async (dispatch) => {
    await followUnFollowFlow(dispatch, userId, userAPI.unFollowed);
}

export const follow = (userId: number): ThunkType => async (dispatch) => {
    await followUnFollowFlow(dispatch, userId, userAPI.followed);
}

async function followUnFollowFlow(dispatch: Dispatch, userId: number, apiMethod: any){
    dispatch(toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(toggleFollow(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}

export default usersReducer;

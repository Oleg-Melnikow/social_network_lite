const TOGGLE_FOLLOW = "TOGGLE_FOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT";

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

export type ProfilePageType = {
    users: UserType[],
    pageSize: number,
    totalUsersCount: number,
    currentPage: number
}

let initialState: ProfilePageType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 20,
    currentPage: 1
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

export type ProfilePageActionsTypes = toggleFollowActionType
    | setUsersActionType
    | SetCurrentPageType
    | SetTotalCountType;

export const toggleFollow = (userId: number): toggleFollowActionType => ({type: TOGGLE_FOLLOW, userId});
export const setUsers = (users: Array<UserType>): setUsersActionType => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalCount = (totalCount: number): SetTotalCountType => ({type: SET_TOTAL_COUNT, totalCount});

const usersReducer = (state = initialState, action: ProfilePageActionsTypes): ProfilePageType => {
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
        default:
            return state
    }
}

export default usersReducer;

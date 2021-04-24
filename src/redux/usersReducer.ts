const TOGGLE_FOLLOW = "TOGGLE_FOLLOW";
const SET_USERS = "SET_USERS";

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
    users: UserType[]
}

let initialState: ProfilePageType = {
    users: []
}


export type toggleFollowActionType = {
    type: typeof TOGGLE_FOLLOW,
    userId: number
}

export type setUsersActionType = {
    type: typeof SET_USERS,
    users: Array<UserType>
}

export type ProfilePageActionsTypes = toggleFollowActionType | setUsersActionType;

export const toggleFollow = (userId: number): toggleFollowActionType => ({type: TOGGLE_FOLLOW, userId});
export const setUsers = (users: Array<UserType>): setUsersActionType => ({type: SET_USERS, users});

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
                users: [...state.users, ...action.users]
            }
        default:
            return state
    }
}

export default usersReducer;

const SET_USER_DATA = "SET_USER_DATA";

export type AuthType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}

let initialState: AuthType = {
    userId: null,
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
                ...action.data,
                isAuth: true
            }
        default:
            return state;
    }
}
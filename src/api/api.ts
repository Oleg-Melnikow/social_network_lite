import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": process.env.REACT_APP_API_KEY
    }
})

export type UserType = {
    name: string,
    id: number,
    photos: PhotosType,
    status: null | string,
    followed: boolean
}

export type PhotosType = {
    small: null | string,
    large: null | string
}


export type ProfileType = {
    aboutMe: string
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: PhotosType
}

type ResponseUserType = {
    items: Array<UserType>,
    totalCount: number,
    error: string
}

type ResponseType<T = {}> = {
    resultCode: number,
    messages: string[],
    data: T
}

export const userAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<ResponseUserType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    followed(userId: number) {
        return instance.post<ResponseType>(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`, {})
    },
    unFollowed(userId: number) {
        return instance.delete<ResponseType>(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
    }
}

export const profileAPI = {
    setUserProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`)
    },
    getStatus(userId: number) {
        return instance.get<string>(`/profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>(`profile/status`, {status})
    },
    savePhoto(photo: File) {
        let formData = new FormData();
        formData.append("image", photo);
        return instance.put<ResponseType<{ photos: PhotosType }>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}

export const AuthAPI = {
    me() {
        return instance.get<ResponseType<{
            id: number,
            email: string,
            login: string
        }>>(`auth/me`).then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean = false) {
        return instance.post<ResponseType<{ userId: number }>>(`auth/login`, {email, password, rememberMe});
    },
    logout() {
        return instance.delete<ResponseType>(`auth/login`);
    }
}
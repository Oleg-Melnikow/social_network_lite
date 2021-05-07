import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "0441876e-68e3-4a7d-95e3-fa2fa5cddbeb"
    }
})

export const userAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    followed(userId: number){
        return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`, {})
    },
    unFollowed(userId: number){
        return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
    }
}

export const profileAPI = {
    setUserProfile(userId: string){
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId: number){
        return instance.get(`/profile/status/${userId}`)
    },
    updateStatus(status: string){
        return instance.put(`profile/status`, {status})
    }
}

export const AuthAPI = {
    me(){
        return instance.get(`auth/me`).then(response => response.data)
    }
}
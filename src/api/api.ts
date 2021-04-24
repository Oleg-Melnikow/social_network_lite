import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "0441876e-68e3-4a7d-95e3-fa2fa5cddbeb"
    }
})

export const userAPI = {
    getUsers() {
        return instance.get(`users?`)
            .then(response => response.data)
    },
}
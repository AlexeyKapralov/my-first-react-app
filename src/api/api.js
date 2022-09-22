import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials:true,
    headers: {
        "API-KEY": "a5656080-b348-40d8-a859-ae26d4a30ea1",
    }
})


export const UsersAPI = {
    getUsers(activePage = 1, usersCountOnPage = 10) {
        return instance.get(`users?page=${activePage}&count=${usersCountOnPage}`).then(response => (response.data))
    },
    unfollow(userID){
        return instance.delete(`follow/${userID}`).then(response => (response.data))
    },
    follow(userID){
        return instance.post(`follow/${userID}`).then(response => (response.data))
    }

}
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
    },
    getProfile(userId) {
        console.warn("Obsolete method, please use same method from ProfileAPI")
        return ProfileAPI.getProfile(userId)
    }
}
export const AuthAPI = {
    authMe() {
        return instance.get(`auth/me`).then(response => (response.data))
    },
    login(data){
        return instance.post(`auth/login`,{email: data.email, password: data.password, rememberMe: data.rememberMe}).then(response => (response.data))
    },
    logout(){
        return instance.delete(`auth/login`).then(response => (response.data))
    }
}
export const ProfileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`).then(response => (response.data))
    },
    setStatus(status) {
        return instance.put(`/profile/status`, {status: status}).then(response => (response.data))
    },
    getStatus(userId) {
        return instance.get(`/profile/status/${userId}`)
    },
    setPhoto(photo) {
        const formData = new FormData();
        formData.append("image", photo);

        return instance.put('/profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

    },

}

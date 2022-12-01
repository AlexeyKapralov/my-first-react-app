import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials:true,
    headers: {
        "API-KEY": "a5656080-b348-40d8-a859-ae26d4a30ea1",
    }
})
type User = {
    id: number
    name: string
    status: string
    photos: {
        small: string
        large: string
    }
    followed: boolean
}
type tGetUsers = {
    items: Array<User>
    totalCount: number
    error:string
}
type tUnfollowFollow = {
    resultCode: number
    messages: Array<string>
    data:object
}

export const UsersAPI = {
    getUsers(activePage = 1, usersCountOnPage = 10) {
        return instance.get<tGetUsers>(`users?page=${activePage}&count=${usersCountOnPage}`).then(response => (response.data))
    },
    unfollow(userID: number){
        return instance.delete<tUnfollowFollow>(`follow/${userID}`).then(response => (response.data))
    },
    follow(userID: number){
        return instance.post<tUnfollowFollow>(`follow/${userID}`).then(response => (response.data))
    },
    getProfile(userId: string) {
        console.warn("Obsolete method, please use same method from ProfileAPI")
        return ProfileAPI.getProfile(userId)
    }
}

type tAuthMe = {
    data: {
        id:number
        email:string
        login:string
    }
    resultCode:number
    messages:Array<string>
}
type tLoginLogout = {
    resultCode: number
    messages: Array<string>
    data:object
}
type tLoginData = {
    email: string
    password: string
    rememberMe: boolean
    captcha: boolean
}

export const AuthAPI = {
    authMe() {
        return instance.get<tAuthMe>(`auth/me`).then(response => (response.data))
    },
    login(data:tLoginData){
        return instance.post<tLoginLogout>(`auth/login`,{email: data.email, password: data.password, rememberMe: data.rememberMe, captcha: data.captcha}).then(response => (response))
    },
    logout(){
        return instance.delete<tLoginLogout>(`auth/login`).then(response => (response.data))
    }
}
type tGetProfile = {
    userId: string
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
    photos: {
        small: string
        large: string
    }
}
type tSetStatus = {
    resultCode: number
    messages: Array<string>
    data:object
}
type tSetPhoto = {
    data: {
        small: string
        large: string
    }
    resultCode: number
    messages: Array<string>
}
export type tProfileData = {
    userId: string
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
}
 type tSetNewProfileData = {
    resultCode: number
    messages: Array<String>
    data: object
}
export const ProfileAPI = {
    getProfile(userId:string) {
        return instance.get<tGetProfile>(`profile/${userId}`).then(response => (response.data))
    },
    setStatus(status:string) {
        return instance.put<tSetStatus>(`profile/status`, {status: status}).then(response => (response.data))
    },
    getStatus(userId:string) {
        return instance.get(`profile/status/${userId}`)
    },
    setPhoto(photo:any) {
        const formData = new FormData();
        formData.append("image", photo);

        return instance.put<tSetPhoto>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

    },
    setNewProfileData(data:tProfileData) {
        return instance.put<tSetNewProfileData>('profile',data)
    },
}
type tGetCaptchaUrl = {
    url:string
}
export const CaptchaAPI = {
    getCaptchaUrl() {
        return instance.get<tGetCaptchaUrl>(`security/get-captcha-url`).then(response => (response))
    }
}

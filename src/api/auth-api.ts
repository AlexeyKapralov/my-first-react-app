import {instance} from "./api";

type AuthType<D={}> = {
    resultCode: number
    messages: Array<string>
    data:D
}

type AuthDataType = {
    data: {
        id:number
        email:string
        login:string
    }
}
type tLoginData = {
    email: string
    password: string
    rememberMe: boolean
    captcha: boolean
}

export const AuthAPI = {
    authMe() {
        return instance.get<AuthType<AuthDataType>>(`auth/me`).then(response => (response.data))
    },
    login(data: tLoginData) {
        return instance.post<AuthType>(`auth/login`, {
            email: data.email,
            password: data.password,
            rememberMe: data.rememberMe,
            captcha: data.captcha
        }).then(response => (response))
    },
    logout() {
        return instance.delete<AuthType>(`auth/login`).then(response => (response.data))
    }
}
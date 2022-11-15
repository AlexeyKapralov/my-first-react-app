import {AuthAPI, CaptchaAPI} from "../api/api";

const SET_DATA_AUTH = "auth/SET_DATA_AUTH"
const SET_DATA_AUTH_NULL = "auth/SET_DATA_AUTH_NULL"
const SET_ERRORS_MESSAGES = "auth/SET_ERRORS_MESSAGES"
const SET_IS_INIT = "auth/SET_IS_INIT"
const SET_CAPTCHA_SUCCESS = "auth/SET_CAPTCHA_SUCCESS"

type initialDataType = {
    data: {
        id: number | null
        email: string | null
        password: string | null
        rememberMe: boolean | null
        login: string | null
    },
    resultCode: 1 | 0 | null
    messages: any | null
    isAuth: boolean
    isInit: boolean
    captcha: string | null

}

let initialData: initialDataType = {
    data: {
        id: null,
        email: null,
        password: null,
        rememberMe: false,
        login: null,
    },
    resultCode: null,
    messages: [],
    isAuth: false,
    isInit: false,
    captcha: null

}

export const AuthReducer = (state = initialData, action:any):initialDataType => {
    switch (action.type){
        case SET_DATA_AUTH: {
            return {
                ...state,
                ...action.data,
                isAuth: action.isAuth
            }

        }
        case SET_DATA_AUTH_NULL: {
            return {
                ...state,
                data: {
                    id: null,
                    email: null,
                    password: null,
                    rememberMe: null,
                    login: null,
                },
                isAuth: false
            }
        }
        case SET_ERRORS_MESSAGES: {
            return {
                ...state,
                messages: action.messages
            }
        }
        case SET_IS_INIT: {
            return {
                ...state,
                isInit: action.isInit
            }
        }
        case SET_CAPTCHA_SUCCESS: {
            return {
                ...state,
                captcha: action.captcha
            }
        }
        default:
            return state;
    }
}

type SetAuthDataActionType = {
    type: typeof SET_DATA_AUTH
    data: any
    isAuth: boolean
}
export const SetAuthData = (data:object, isAuth:boolean):SetAuthDataActionType => {
    return { type: SET_DATA_AUTH, data, isAuth}
}

type SetAuthDataNullActionType = {
    type: typeof SET_DATA_AUTH_NULL
}
export const SetAuthDataNull = ():SetAuthDataNullActionType => {
    return { type: SET_DATA_AUTH_NULL}
}

type SetErrorsMessagesActionType = {
    type: typeof SET_ERRORS_MESSAGES
    messages: object
}
export const SetErrorsMessages = (messages:object):SetErrorsMessagesActionType => {
    return { type: SET_ERRORS_MESSAGES, messages}
}

type SetIsInitActionType = {
    type: typeof SET_IS_INIT
    isInit: boolean
}
export const setIsInit = (isInit:boolean):SetIsInitActionType => {
    return { type: SET_IS_INIT, isInit}
}

type getCaptchaActionActionType = {
    type: typeof SET_CAPTCHA_SUCCESS
    captcha: string | null
}
export const getCaptcha = (captcha: string | null): getCaptchaActionActionType => {
    return { type: SET_CAPTCHA_SUCCESS, captcha}
}

//thunk's
export const Login = (data: any) => {
    return async (dispatch:any) => {
        setIsInit(true)
        let response = await AuthAPI.login(data)
        if (response.data.resultCode === 0) {
            dispatch(SetAuthData(data, true))
            dispatch(getCaptchaUrl(false))
        } else {
            if (response.data.resultCode === 10){
                dispatch(getCaptchaUrl())
            }
            dispatch(SetErrorsMessages(response.data.messages))
        }
        setIsInit(false)
    }
}
export const Logout = () => {
    return async (dispatch:any) => {
        let response = await AuthAPI.logout()
        if (response.resultCode === 0) {
            dispatch(SetAuthDataNull())
            dispatch(getCaptchaUrl(false))
        }
    };
}
export const getCaptchaUrl = (isActive= true) => {
    return async (dispatch: any) => {
        if (!isActive) {
            dispatch(getCaptcha(null))
            return
        }
        let response = await CaptchaAPI.getCaptchaUrl()
        dispatch(getCaptcha(response.data.url))
    };
}

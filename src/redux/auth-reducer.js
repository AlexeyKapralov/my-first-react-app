import {AuthAPI, CaptchaAPI} from "../api/api";

const SET_DATA_AUTH = "auth/SET_DATA_AUTH"
const SET_DATA_AUTH_NULL = "auth/SET_DATA_AUTH_NULL"
const SET_ERRORS_MESSAGES = "auth/SET_ERRORS_MESSAGES"
const SET_IS_INIT = "auth/SET_IS_INIT"
const SET_CAPTCHA_SUCCESS = "auth/SET_CAPTCHA_SUCCESS"


let initialData = {
    data: {
        id: null,
        email: null,
        password: null,
        rememberMe: null,
        login: null,
    },
    resultCode: null,
    messages: [],
    isAuth: false,
    isInit:false,
    captcha: null

}

export const AuthReducer = (state = initialData, action) => {
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

export const SetAuthData = (data, isAuth) => {
    return { type: SET_DATA_AUTH, data, isAuth}
}
export const SetAuthDataNull = () => {
    return { type: SET_DATA_AUTH_NULL}
}
export const SetErrorsMessages = (messages) => {
    return { type: SET_ERRORS_MESSAGES, messages}
}
export const setIsInit = (isInit) => {
    return { type: SET_IS_INIT, isInit}
}
export const getCaptcha = (captcha) => {
    return { type: SET_CAPTCHA_SUCCESS, captcha}
}
//thunk's
export const Login = data => {
    return async dispatch => {
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
    }
}
export const Logout = () => {
    return async dispatch => {
        let response = await AuthAPI.logout()
        if (response.resultCode === 0) {
            dispatch(SetAuthDataNull())
            dispatch(getCaptchaUrl(false))
        }
    };
}
export const getCaptchaUrl = (isActive= true) => {
    return async dispatch => {
        if (!isActive) {
            dispatch(getCaptcha(null))
            return
        }
        let response = await CaptchaAPI.getCaptchaUrl()
        dispatch(getCaptcha(response.data.url))
    };
}

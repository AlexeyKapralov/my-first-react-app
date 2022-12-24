import {ThunkAction} from "redux-thunk";
import {AppStateType, CommonThunkType, InferActionsType} from "./redux-store";
import {AuthAPI} from "../api/auth-api";
import {CaptchaAPI} from "../api/captcha-api";



let initialData: initialDataType = {
    data: {
        id: null,
        email: null,
        password: null,
        rememberMe: false,
        login: null,
    },
    resultCode: null,
    messages: {},
    isAuth: false,
    isInit: false,
    captcha: null

}

export const AuthReducer = (state = initialData, action:tActions):initialDataType => {
    switch (action.type){
        case "auth/SET_DATA_AUTH": {
            return {
                ...state,
                ...action.data,
                isAuth: action.isAuth
            }

        }
        case "auth/SET_DATA_AUTH_NULL": {
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
        case "auth/SET_ERRORS_MESSAGES": {
            return {
                ...state,
                messages: action.messages
            }
        }
        case "auth/SET_IS_INIT": {
            return {
                ...state,
                isInit: action.isInit
            }
        }
        case "auth/SET_CAPTCHA_SUCCESS": {
            return {
                ...state,
                captcha: action.captcha
            }
        }
        default:
            return state;
    }
}

export const actions = {
    SetAuthData: (data:object, isAuth:boolean) => ({type: "auth/SET_DATA_AUTH", data, isAuth} as const),
    SetAuthDataNull: () => ({type: "auth/SET_DATA_AUTH_NULL"} as const),
    SetErrorsMessages: (messages:object) => ( {type: "auth/SET_ERRORS_MESSAGES", messages} as const),
    setIsInit: (isInit:boolean) => ({ type: "auth/SET_IS_INIT", isInit} as const),
    getCaptcha: (captcha: string | null) => ({ type: "auth/SET_CAPTCHA_SUCCESS", captcha} as const)
}



//thunk's

export const Login = (data: any): CommonThunkType<tActions> => {
    return async (dispatch) => {
        actions.setIsInit(true)
        let response = await AuthAPI.login(data)
        if (response.data.resultCode === 0) {
            dispatch(actions.SetAuthData(data, true))
            dispatch(getCaptchaUrl(false))
        } else {
            if (response.data.resultCode === 10){
                dispatch(getCaptchaUrl())
            }
            dispatch(actions.SetErrorsMessages(response.data.messages))
        }
        actions.setIsInit(false)
    }
}
export const Logout = (): CommonThunkType<tActions> => {
    return async (dispatch) => {
        let response = await AuthAPI.logout()
        if (response.resultCode === 0) {
            dispatch(actions.SetAuthDataNull())
            dispatch(getCaptchaUrl(false))
        }
    };
}
export const getCaptchaUrl = (isActive= true):CommonThunkType<tActions> => {
    return async (dispatch) => {
        if (!isActive) {
            dispatch(actions.getCaptcha(null))
            return
        }
        let response = await CaptchaAPI.getCaptchaUrl()
        dispatch(actions.getCaptcha(response.data.url))
    };
}

type initialDataType = {
    data: {
        id: number | null
        email: string | null
        password: string | null
        rememberMe: boolean | null
        login: string | null
    },
    resultCode: 1 | 0 | null
    messages: {} | null
    isAuth: boolean
    isInit: boolean
    captcha: string | null

}
type tActions = InferActionsType<typeof actions>
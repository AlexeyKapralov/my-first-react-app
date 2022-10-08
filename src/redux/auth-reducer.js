import {AuthAPI} from "../api/api";

const SET_DATA_AUTH = "SET_DATA_AUTH"
const SET_DATA_AUTH_NULL = "SET_DATA_AUTH_NULL"
const SET_ERRORS_MESSAGES = "SET_ERRORS_MESSAGES"
const SET_IS_INIT = "SET_IS_INIT"


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
    isInit:false

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
//thunk's
export const Login = data => {
    return dispatch => {
        AuthAPI.login(data).then(
            response => {
                if (response.resultCode === 0) {
                    dispatch(SetAuthData(data, true))
                }else{
                    dispatch(SetErrorsMessages(response.messages))
                    console.log(response)
                }
            }
        );
    }
}
export const Logout = () => {
    return dispatch => {
        AuthAPI.logout().then(
            response => {
                if (response.resultCode === 0) {
                    dispatch(SetAuthDataNull())
                }
            }
        );
    }
}

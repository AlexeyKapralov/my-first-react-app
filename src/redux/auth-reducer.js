import {AuthAPI} from "../api/api";

const SET_DATA_AUTH = "SET_DATA_AUTH"

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
        default:
            return state;
    }
}

export const SetAuthData = (data, isAuth) => {
    return { type: SET_DATA_AUTH, data, isAuth}
}
//thunk's
export const Login = data => {
    return dispatch => {
        AuthAPI.login(data).then(
            response => {
                if (response.resultCode === 0) {
                    dispatch(SetAuthData(data, true))
                }
            }
        );
    }
}
export const Logout = (data) => {
    return dispatch => {
        AuthAPI.logout().then(
            response => {
                if (response.resultCode === 0) {
                    dispatch(SetAuthData(data, false))
                }
            }
        );
    }
}

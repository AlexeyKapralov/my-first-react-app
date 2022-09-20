const SET_DATA_AUTH = "SET_DATA_AUTH"

let InitialData = {
    data: {
        id: null,
        email: null,
        login: null,
    },
    resultCode: null,
    messages: [],
    isAuth: false,

}

export const AuthReducer = (state = InitialData, action) => {
    switch (action.type){
        case SET_DATA_AUTH: {
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        }
    }
}


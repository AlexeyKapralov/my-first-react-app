import {AppStateType} from "./redux-store";

export const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users
}
export const getStateSelector = (state: AppStateType) => {
    return state.usersPage
}
export const getUsersFilter = (state: AppStateType) => {
    return state.usersPage.filter
}
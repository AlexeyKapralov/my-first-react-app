import {AppStateType} from "./redux-store";

export const getUsersArraySelector = (state: AppStateType) => {
    return state.usersPage.users
}
export const getStateSelector = (state: AppStateType) => {
    return state.usersPage
}
export const getUsersFilter = (state: AppStateType) => {
    return state.usersPage.filter
}
export const getUsersCountOnPageSelector = (state: AppStateType) => {
    return state.usersPage.usersCountOnPage
}
export const getActivePageSelector = (state: AppStateType) => {
    return state.usersPage.activePage
}
export const getTotalCountSelector = (state: AppStateType) => {
    return state.usersPage.totalCount
}
export const getIsFetchingSelector = (state: AppStateType) => {
    return state.usersPage.isFetching
}
import {UsersAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const FOLLOW = "users/FOLLOW";
const UNFOLLOW = "users/UNFOLLOW";
const SET_USERS = "users/SET_USERS";
const SET_TOTAL_USERS_COUNT = "users/SET_TOTAL_USERS_COUNT";
const CHANGE_PAGE = "users/CHANGE_PAGE";
const TOGGLE_IS_FETCHING = "users/TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING = "users/TOGGLE_IS_FOLLOWING";

type PhotosType = {
	small: string
	large: string
}
 export type UserType = {
	id: number
	name: string
	status: string | null
	photos: PhotosType
	followed: boolean
}

let initialData = {
	users: [] as Array<UserType>,
	usersCountOnPage: 50,
	pageNumber: 10,
	activePage: 1,
	totalCount: 100,
	isFetching: false,
	isToggleFollowingUserID: [] as Array<number> //array of users IDs
}


export type initialDataType = typeof initialData

export const usersReducer = (state = initialData, action:tActions):initialDataType => {
	switch (action.type) {
		case FOLLOW: {
			return {
				...state,
				users: state.users.map ( u => {
					if (u.id === action.id){
						return {...u, followed: true}
					} return u
				} )
			}
		}
		case UNFOLLOW: {
			return {
				...state,
				users: state.users.map ( u => {
					if (u.id === action.id){
						return {...u, followed: false}
					} return u
				} )
			}
		}
		case SET_USERS: {
			return {...state, users: [...action.users]}
		}
		case SET_TOTAL_USERS_COUNT: {
			return {...state, totalCount: action.countTotalUsers}
		}
		case CHANGE_PAGE: {
			return {...state, activePage: action.page}
		}
		case TOGGLE_IS_FETCHING: {
			return {...state, isFetching: action.isFetching}
		}
		case TOGGLE_IS_FOLLOWING: {
			return {
				...state,
				isToggleFollowingUserID:
					action.isFetch
					? [action.IsToggleFollowingUserID]
					: state.isToggleFollowingUserID.filter(i => i !== action.IsToggleFollowingUserID)
				}
		}
		default:
			return state;
	}
}

type tActions = UpdateSubscribeFollowActionType | UpdateSubscribeUnfollowActionType | SetUsersActionType |
	CountTotalUsersActionType | setChangePageActionType | toggleIsFetchingActionType |
	ToggleFollowingUserIDActionType

type UpdateSubscribeFollowActionType = {
	type: typeof FOLLOW
	id: number
}
export const updateSubscribeFollow = (id:number):UpdateSubscribeFollowActionType => {
	return { type: FOLLOW, id: id }
}

type UpdateSubscribeUnfollowActionType = {
	type: typeof UNFOLLOW
	id: number
}
export const updateSubscribeUnfollow = (id:number):UpdateSubscribeUnfollowActionType => {
	return { type: UNFOLLOW, id: id }
}

type SetUsersActionType = {
	type: typeof SET_USERS
	users: Array<UserType>
}
export const setUsers = (users:Array<UserType>):SetUsersActionType => {
	return {type: SET_USERS, users: users}
}

type CountTotalUsersActionType = {
	type: typeof SET_TOTAL_USERS_COUNT
	countTotalUsers: number
}
export const setTotalUsers = (countTotalUsers: number):CountTotalUsersActionType => {
	return { type: SET_TOTAL_USERS_COUNT, countTotalUsers}
}

type setChangePageActionType = {
	type: typeof CHANGE_PAGE
	page: number
}
export const setChangePage = (page:number):setChangePageActionType => {
	return { type: CHANGE_PAGE, page}
}

type toggleIsFetchingActionType = {
	type: typeof TOGGLE_IS_FETCHING
	isFetching: boolean
}
export const toggleIsFetching = (isFetching:boolean):toggleIsFetchingActionType => {
	return { type: TOGGLE_IS_FETCHING, isFetching}
}

type ToggleFollowingUserIDActionType = {
	type: typeof TOGGLE_IS_FOLLOWING
	IsToggleFollowingUserID: number
	isFetch:boolean
}
export const ToggleFollowingUserID = (IsToggleFollowingUserID:number, isFetch:boolean):ToggleFollowingUserIDActionType => {
	return { type: TOGGLE_IS_FOLLOWING, IsToggleFollowingUserID, isFetch}
}
// below thunk functions

type tUserReducerThunk = ThunkAction<Promise<void>, AppStateType, unknown, tActions>
export const getUsers = (activePage:number, usersCountOnPage:number):tUserReducerThunk => {
	return async (dispatch, getState) => {
		dispatch(toggleIsFetching(true))
		let data = await UsersAPI.getUsers(activePage, usersCountOnPage)
		dispatch(toggleIsFetching(false))
		dispatch(setUsers(data.items))
		dispatch(setTotalUsers(data.totalCount))
	}
}
export const onChangePage = (page:number, usersCountOnPage:number):tUserReducerThunk => {
	return async (dispatch) => {
		dispatch(setChangePage(page));
		dispatch(toggleIsFetching(true))
		let data = await UsersAPI.getUsers(page, usersCountOnPage)
		dispatch(toggleIsFetching(false))
		dispatch(setUsers(data.items))
	}
}

export const follow = (userID: number):tUserReducerThunk => {
	return async (dispatch) => {
		dispatch(ToggleFollowingUserID(userID, true))
		let data = await UsersAPI.follow(userID)
		dispatch(ToggleFollowingUserID(userID, false))
		if (data.resultCode === 0) {
			dispatch(updateSubscribeFollow(userID))
		}
	}
}
export const unfollow = (userID:number):tUserReducerThunk => {
	return async (dispatch) => {
		dispatch(ToggleFollowingUserID(userID, true))
		let data = await UsersAPI.unfollow(userID)
		dispatch(ToggleFollowingUserID(userID, false))
		if (data.resultCode === 0) {
			dispatch(updateSubscribeUnfollow(userID))
		}
	}
}
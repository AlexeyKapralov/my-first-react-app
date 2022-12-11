import {UsersAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsType} from "./redux-store";

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
		case 'FOLLOW': {
			return {
				...state,
				users: state.users.map ( u => {
					if (u.id === action.id){
						return {...u, followed: true}
					} return u
				} )
			}
		}
		case 'UNFOLLOW': {
			return {
				...state,
				users: state.users.map ( u => {
					if (u.id === action.id){
						return {...u, followed: false}
					} return u
				} )
			}
		}
		case 'SET_USERS': {
			return {...state, users: [...action.users]}
		}
		case 'SET_TOTAL_USERS_COUNT': {
			return {...state, totalCount: action.countTotalUsers}
		}
		case 'CHANGE_PAGE': {
			return {...state, activePage: action.page}
		}
		case 'TOGGLE_IS_FETCHING': {
			return {...state, isFetching: action.isFetching}
		}
		case 'TOGGLE_IS_FOLLOWING': {
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

type tActions = InferActionsType<typeof actions>

export const actions = {
	updateSubscribeFollow: (id:number) => ({ type: 'FOLLOW', id: id } as const),
	updateSubscribeUnfollow: (id:number) => ({ type: 'UNFOLLOW', id: id } as const),
	setUsers: (users:Array<UserType>) => ({type: 'SET_USERS', users: users} as const),
	setTotalUsers: (countTotalUsers: number) => ({ type: 'SET_TOTAL_USERS_COUNT', countTotalUsers} as const),
	setChangePage: (page:number) => ({ type: 'CHANGE_PAGE', page} as const),
	toggleIsFetching: (isFetching:boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching} as const),
	ToggleFollowingUserID: (IsToggleFollowingUserID:number, isFetch:boolean) => ({ type: 'TOGGLE_IS_FOLLOWING', IsToggleFollowingUserID, isFetch} as const)
}
// below thunk functions

type tUserReducerThunk = ThunkAction<Promise<void>, AppStateType, unknown, tActions>
export const getUsers = (activePage:number, usersCountOnPage:number):tUserReducerThunk => {
	return async (dispatch, getState) => {
		dispatch(actions.toggleIsFetching(true))
		let data = await UsersAPI.getUsers(activePage, usersCountOnPage)
		dispatch(actions.toggleIsFetching(false))
		dispatch(actions.setUsers(data.items))
		dispatch(actions.setTotalUsers(data.totalCount))
	}
}
export const onChangePage = (page:number, usersCountOnPage:number):tUserReducerThunk => {
	return async (dispatch) => {
		dispatch(actions.setChangePage(page));
		dispatch(actions.toggleIsFetching(true))
		let data = await UsersAPI.getUsers(page, usersCountOnPage)
		dispatch(actions.toggleIsFetching(false))
		dispatch(actions.setUsers(data.items))
	}
}

export const follow = (userID: number):tUserReducerThunk => {
	return async (dispatch) => {
		dispatch(actions.ToggleFollowingUserID(userID, true))
		let data = await UsersAPI.follow(userID)
		dispatch(actions.ToggleFollowingUserID(userID, false))
		if (data.resultCode === 0) {
			dispatch(actions.updateSubscribeFollow(userID))
		}
	}
}
export const unfollow = (userID:number):tUserReducerThunk => {
	return async (dispatch) => {
		dispatch(actions.ToggleFollowingUserID(userID, true))
		let data = await UsersAPI.unfollow(userID)
		dispatch(actions.ToggleFollowingUserID(userID, false))
		if (data.resultCode === 0) {
			dispatch(actions.updateSubscribeUnfollow(userID))
		}
	}
}
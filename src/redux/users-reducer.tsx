import {ThunkAction} from "redux-thunk";
import {AppStateType, CommonThunkType, InferActionsType} from "./redux-store";
import {UsersAPI} from "../api/users-api";

type PhotosType = {
	small: string | null
	large: string | null
}
 export type UserType = {
	userId: number
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
		case 'usersPage/FOLLOW': {
			return {
				...state,
				users: state.users.map ( u => {
					if (u.userId === action.id){
						return {...u, followed: true}
					} return u
				} )
			}
		}
		case 'usersPage/UNFOLLOW': {
			return {
				...state,
				users: state.users.map ( u => {
					if (u.userId === action.id){
						return {...u, followed: false}
					} return u
				} )
			}
		}
		case 'usersPage/SET_USERS': {
			return {...state, users: [...action.users]}
		}
		case 'usersPage/SET_TOTAL_USERS_COUNT': {
			return {...state, totalCount: action.countTotalUsers}
		}
		case 'usersPage/CHANGE_PAGE': {
			return {...state, activePage: action.page}
		}
		case 'usersPage/TOGGLE_IS_FETCHING': {
			return {...state, isFetching: action.isFetching}
		}
		case 'usersPage/TOGGLE_IS_FOLLOWING': {
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
	updateSubscribeFollow: (id:number) => ({ type: 'usersPage/FOLLOW', id: id } as const),
	updateSubscribeUnfollow: (id:number) => ({ type: 'usersPage/UNFOLLOW', id: id } as const),
	setUsers: (users:Array<UserType>) => ({type: 'usersPage/SET_USERS', users: users} as const),
	setTotalUsers: (countTotalUsers: number) => ({ type: 'usersPage/SET_TOTAL_USERS_COUNT', countTotalUsers} as const),
	setChangePage: (page:number) => ({ type: 'usersPage/CHANGE_PAGE', page} as const),
	toggleIsFetching: (isFetching:boolean) => ({ type: 'usersPage/TOGGLE_IS_FETCHING', isFetching} as const),
	ToggleFollowingUserID: (IsToggleFollowingUserID:number, isFetch:boolean) => ({ type: 'usersPage/TOGGLE_IS_FOLLOWING', IsToggleFollowingUserID, isFetch} as const)
}
// below thunk functions
type tUserReducerThunk = CommonThunkType<tActions>
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
		let response = await UsersAPI.follow(userID)
		dispatch(actions.ToggleFollowingUserID(userID, false))
		if (response.resultCode === 0) {
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
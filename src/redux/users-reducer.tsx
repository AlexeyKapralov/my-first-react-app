import {ThunkAction} from "redux-thunk";
import {AppStateType, CommonThunkType, InferActionsType} from "./redux-store";
import {UsersAPI} from "../api/users-api";

type PhotosType = {
	small: string | null
	large: string | null
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
	isToggleFollowingUserID: [] as Array<number>, //array of users IDs
	filter: {
		term: "",
		friend: null as null | boolean
	}
}
export type initialDataType = typeof initialData
export type FilterType = typeof initialData.filter

export const usersReducer = (state = initialData, action:tActions):initialDataType => {
	switch (action.type) {
		case 'usersPage/FOLLOW': {
			return {
				...state,
				users: state.users.map ( u => {
					if (u.id === action.id){
						return {...u, followed: true}
					} return u
				} )
			}
		}
		case 'usersPage/UNFOLLOW': {
			return {
				...state,
				users: state.users.map ( u => {
					if (u.id === action.id){
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
		case 'userPage/SET_FILTER': {
			return {
				...state,
				filter: action.payload
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
	toggleFollowingUserID: (IsToggleFollowingUserID:number, isFetch:boolean) => ({ type: 'usersPage/TOGGLE_IS_FOLLOWING', IsToggleFollowingUserID, isFetch} as const),
	setFilter: (filter:FilterType) => ({type: 'userPage/SET_FILTER', payload: filter } as const)
}
// below thunk functions
type tUserReducerThunk = CommonThunkType<tActions>
export const getUsers = (activePage:number, usersCountOnPage:number, filter: FilterType):tUserReducerThunk => {
	return async (dispatch, getState) => {
		dispatch(actions.toggleIsFetching(true))
		dispatch(actions.setChangePage(activePage));
		dispatch(actions.setFilter(filter))
		let data = await UsersAPI.getUsers(activePage, usersCountOnPage, filter.term, filter.friend)
		dispatch(actions.toggleIsFetching(false))
		dispatch(actions.setUsers(data.items))
		dispatch(actions.setTotalUsers(data.totalCount))
	}
}
export const onChangePage = (page:number, usersCountOnPage:number, filter:FilterType):tUserReducerThunk => {
	return async (dispatch) => {
		dispatch(actions.setChangePage(page));
		dispatch(actions.toggleIsFetching(true))
		let data = await UsersAPI.getUsers(page, usersCountOnPage, filter.term)
		dispatch(actions.toggleIsFetching(false))
		dispatch(actions.setUsers(data.items))
	}
}

export const follow = (userID: number):tUserReducerThunk => {
	return async (dispatch) => {
		dispatch(actions.toggleFollowingUserID(userID, true))
		let response = await UsersAPI.follow(userID)
		dispatch(actions.toggleFollowingUserID(userID, false))
		if (response.resultCode === 0) {
			dispatch(actions.updateSubscribeFollow(userID))
		}
	}
}
export const unfollow = (userID:number):tUserReducerThunk => {
	return async (dispatch) => {
		dispatch(actions.toggleFollowingUserID(userID, true))
		let data = await UsersAPI.unfollow(userID)
		dispatch(actions.toggleFollowingUserID(userID, false))
		if (data.resultCode === 0) {
			dispatch(actions.updateSubscribeUnfollow(userID))
		}
	}
}

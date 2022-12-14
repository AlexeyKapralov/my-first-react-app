import {UsersAPI} from "../api/users-api";

const FOLLOW = "users/FOLLOW";
const UNFOLLOW = "users/UNFOLLOW";
const SET_USERS = "users/SET_USERS";
const SET_TOTAL_USERS_COUNT = "users/SET_TOTAL_USERS_COUNT";
const CHANGE_PAGE = "users/CHANGE_PAGE";
const TOGGLE_IS_FETCHING = "users/TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING = "users/TOGGLE_IS_FOLLOWING";


let initialData = {
	users:[],
	usersCountOnPage: 50,
	pageNumber: 10,
	activePage: 1,
	totalCount: 100,
	isFetching: false,
	isToggleFollowingUserID: []
}

export const usersReducer = (state = initialData, action) => {
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
					action.isFetch === true
					? [action.IsToggleFollowingUserID]
					: state.isToggleFollowingUserID.filter(i => i !== action.IsToggleFollowingUserID)
				}
		}
		default:
			return state;
	}
	
}

export const updateSubscribeFollow = (id) => {
	return { type: FOLLOW, id: id }
}
export const updateSubscribeUnfollow = (id) => {
	return { type: UNFOLLOW, id: id }
}
export const setUsers = (users) => {
	return {type: SET_USERS, users: users}
}
export const setTotalUsers = (countTotalUsers) => {
	return { type: SET_TOTAL_USERS_COUNT, countTotalUsers}
}
export const setChangePage = (page) => {
	return { type: CHANGE_PAGE, page}
}
export const toggleIsFetching = (isFetching) => {
	return { type: TOGGLE_IS_FETCHING, isFetching}
}
export const ToggleFollowingUserID = (IsToggleFollowingUserID, isFetch) => {
	return { type: TOGGLE_IS_FOLLOWING, IsToggleFollowingUserID, isFetch}
}
// below thunk functions

export const getUsers = (activePage, usersCountOnPage) => {
	return async dispatch => {
		dispatch(toggleIsFetching(true))
		let data = await UsersAPI.getUsers(activePage, usersCountOnPage)
		dispatch(toggleIsFetching(false))
		dispatch(setUsers(data.items))
		dispatch(setTotalUsers(data.totalCount))
	}
}
export const onChangePage = (page, usersCountOnPage) => {
	return async dispatch => {
		dispatch(setChangePage(page));
		dispatch(toggleIsFetching(true))
		let data = await UsersAPI.getUsers(page, usersCountOnPage)
		dispatch(toggleIsFetching(false))
		dispatch(setUsers(data.items))
	}
}

export const follow = (userID) => {
	return async dispatch => {
		dispatch(ToggleFollowingUserID(userID, true))
		let data = await UsersAPI.follow(userID)
		dispatch(ToggleFollowingUserID(userID, false))
		if (data.resultCode === 0) {
			dispatch(updateSubscribeFollow(userID))
		}
	}
}
export const unfollow = (userID) => {
	return async dispatch => {
		dispatch(ToggleFollowingUserID(userID, true))
		let data = await UsersAPI.unfollow(userID)
		dispatch(ToggleFollowingUserID(userID, false))
		if (data.resultCode === 0) {
			dispatch(updateSubscribeUnfollow(userID))
		}
	}
}